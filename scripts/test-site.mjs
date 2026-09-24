import {readFile, readdir, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import test from 'node:test';

const root=fileURLToPath(new URL('../public/',import.meta.url));
const read=file=>readFile(path.join(root,file),'utf8');
const allFiles=async dir=>(await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?allFiles(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();
const pages=(await allFiles(root)).filter(f=>f.endsWith('.html')&&!f.includes(`${path.sep}auth${path.sep}`)&&!f.includes(`${path.sep}abrir-conoche${path.sep}`));
const html=new Map(await Promise.all(pages.map(async f=>[f,await readFile(f,'utf8')])));
const unescape=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');

for(const [file,source] of html) {
  const label=path.relative(root,file);
  test(`${label}: metadata, landmarks and public support`,()=>{
    assert.match(source,/<!doctype html>/i);
    assert.match(source,/<html lang="(?:es|en)">/);
    assert.equal((source.match(/<h1[ >]/g)||[]).length,1);
    assert.equal((source.match(/<main[ >]/g)||[]).length,1);
    assert.match(source,/<meta name="description" content="[^"]+"/);
    assert.match(source,/<link rel="canonical" href="https:\/\/tikiziagames.com\//);
    assert.match(source,/support@tikiziagames\.com/);
    assert.match(source,/hello@tikiziagames\.com/);
    assert.match(source,/<!--email_off-->/,'Public contact addresses must work without Cloudflare email-decode JavaScript');
    assert.match(source,/href="(?:\/en)?\/delete-account\/"/);
    assert.match(source,/href="(?:\/en)?\/privacy\/"/);
    assert.match(source,/href="(?:\/en)?\/child-safety\/"/);
    assert.doesNotMatch(source,/\bTODO:|\bPLACEHOLDER\b/);
    assert.doesNotMatch(source,/Borrador para revisión|lorem ipsum|no publicado ni vigente|Tiquicia Games|KiseGames/i);
    const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length,'duplicate IDs');
    for(const image of source.matchAll(/<img\b[^>]+>/g)) assert.match(image[0],/\balt="[^"]+"/);
  });
  test(`${label}: every local link, anchor, script and image resolves`,async()=>{
    for(const m of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const href=unescape(m[1]);
      if(/^(?:mailto:|https?:)/.test(href))continue;
      const url=new URL(href,'https://tikiziagames.com/'+label.replaceAll(path.sep,'/'));
      let target=path.join(root,decodeURIComponent(url.pathname));
      if(url.pathname.endsWith('/'))target=path.join(target,'index.html');
      assert.ok((await stat(target)).isFile(),`${label}: missing ${href}`);
      if(url.hash) {
        const text=html.get(target)||await readFile(target,'utf8');
        assert.ok(text.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`${label}: broken anchor ${href}`);
      }
    }
  });
}

test('51 canonical FAQ answers in each language, available without JavaScript',async()=>{
  const app=JSON.parse(await readFile(new URL('../content/conoche-app.json',import.meta.url),'utf8'));
  assert.equal(app.faqs.length,51);
  for(const lang of ['es','en']) {
    const source=await read(`${lang==='en'?'en/':''}faq/index.html`);
    assert.equal((source.match(/data-faq>/g)||[]).length,51);
    assert.equal((source.match(/class="faq-topic"/g)||[]).length,10);
    for(const faq of app.faqs)assert.ok(unescape(source).includes(faq[lang].answer),`missing ${lang} answer ${faq.id}`);
    assert.doesNotMatch(source,/<section class="faq-topic"[^>]*hidden/);
  }
});

test('all current in-app terms, privacy and community sections are preserved',async()=>{
  const app=JSON.parse(await readFile(new URL('../content/conoche-app.json',import.meta.url),'utf8'));
  for(const doc of app.legal)for(const lang of ['es','en']) {
    const name=doc.id==='community'?'community-guidelines':doc.id;
    const source=unescape(await read(`${lang==='en'?'en/':''}${name}/index.html`));
    for(const s of doc.sections)assert.ok(source.includes(s[lang].body),`missing ${lang}/${name}/${s[lang].heading}`);
  }
});

test('no ad, analytics, external fonts, forms or speculative public download claims',async()=>{
  for(const source of html.values()) {
    assert.doesNotMatch(source,/fonts\.googleapis|googletagmanager|google-analytics|<form|fbq\(|gtag\(/);
    assert.doesNotMatch(source,/Available on the App Store|Disponible para iPhone|millones de usuarios|millions of users/i);
  }
  for(const file of ['download/index.html','en/download/index.html']) {
    const source=await read(file);
    assert.match(source,/apps\/internaltest\/4701275855618207343/);
    assert.match(source,/store\/apps\/details\?id=com\.tikiziagames\.conoche/);
  }
});

test('deletion entry point is a real email request, not a fake form or reinstall gate',async()=>{
  for(const file of ['delete-account/index.html','en/delete-account/index.html']) {
    const source=await read(file);
    assert.match(source,/mailto:support@tikiziagames.com\?subject=/);
    assert.match(source,/store\/account\/subscriptions/);
    assert.match(source,/30 d/);
    assert.match(source,/Resend/);
    assert.doesNotMatch(source,/<input.*password/i);
  }
});

test('account verification, recovery and Android App Links are unchanged apart from checkout line endings',async()=>{
  const protectedFiles={
    'auth/action/index.html':'da765c1600e254d82d5d0c303494a9150576679d645c70bd9c169f55afc434a3',
    'abrir-conoche/index.html':'7c7e518aa83601bfe1bff18bef1d949d5973a017e3523b7da963803e2a7d5781',
    '.well-known/assetlinks.json':'3cc4ac9f6720f2ad949db1bfabeecf0ff531785cda7f2c4ae5ab57a4b398d934',
  };
  // Hash the original f1c6f18 Git blobs after LF normalization, not a local
  // checkout containing mixed CRLF/LF. This must also work on Linux CI.
  for(const [file,expected] of Object.entries(protectedFiles)) {
    const text=(await read(file)).replace(/\r\n/g,'\n');
    assert.equal(createHash('sha256').update(text).digest('hex'),expected,`Protected route changed: ${file}`);
  }
  const links=JSON.parse(await read('.well-known/assetlinks.json'));
  assert.ok(links.some(l=>l.target.package_name==='com.tikiziagames.conoche'));
  assert.match(await read('_headers'),/no-referrer/);
  assert.match(await read('_headers'),/no-store/);
});

test('sitemap covers 22 localized pages and excludes action links',async()=>{
  const map=await read('sitemap.xml');
  assert.equal((map.match(/<loc>/g)||[]).length,22);
  assert.doesNotMatch(map,/auth\/|abrir-conoche/);
  for(const m of map.matchAll(/<loc>https:\/\/tikiziagames.com([^<]+)<\/loc>/g))assert.ok((await stat(path.join(root,m[1],'index.html'))).isFile());
});

test('old homepage support, FAQ, contact and deletion bookmarks still have visible destinations',async()=>{
  const home=await read('index.html');
  for(const id of ['games','about','support','faq','contact','delete-account'])assert.ok(home.includes(`id="${id}"`),id);
});
