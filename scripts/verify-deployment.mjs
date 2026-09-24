// Read-only post-deploy check. Never pass account tokens to this script.
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../public/',import.meta.url));
const base=process.argv[2]||'https://tikiziagames.com';
const hostname=new URL(base).hostname;
assert.ok(hostname==='tikiziagames.com'||hostname.endsWith('.tikizia-games-website.pages.dev'),'Use the existing production site or its Cloudflare preview.');
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
const routes=[...sitemap.matchAll(/<loc>https:\/\/tikiziagames.com([^<]+)<\/loc>/g)].map(m=>m[1]);
routes.push('/auth/action/','/abrir-conoche/','/.well-known/assetlinks.json','/robots.txt','/sitemap.xml','/assets/css/site.css','/assets/js/site.js','/assets/images/conoche-sloths.png','/assets/images/favicon.svg','/assets/fonts/Nunito-Variable.ttf','/assets/fonts/LilitaOne-Regular.ttf','/assets/fonts/GreatVibes-Regular.ttf');
routes.push('/assets/css/styles.css','/assets/css/studio.css','/assets/images/tikizia-studio.svg','/assets/images/studio-favicon.svg','/assets/images/vinazo-cover.svg','/assets/images/under-construction-cover.svg','/assets/fonts/Inter-Variable.ttf','/assets/fonts/PermanentMarker-Regular.ttf');
const digest=data=>createHash('sha256').update(data).digest('hex');
// Cloudflare may consume these documented comments while keeping the public
// support addresses intact. No other HTML transformations are accepted.
const canonical=text=>text.replace(/\r\n/g,'\n').replace(/<!--\/?email_off-->/g,'');
let passed=0;
for(let i=0;i<routes.length;i+=5) {
  await Promise.all(routes.slice(i,i+5).map(async route=>{
    const response=await fetch(base+route,{signal:AbortSignal.timeout(20000)});
    assert.equal(response.status,200,route);
    const remote=Buffer.from(await response.arrayBuffer());
    const local=await readFile(path.join(root,route,route.endsWith('/')?'index.html':''));
    const binary=/\.(png|ttf)$/.test(route);
    assert.equal(digest(binary?remote:canonical(remote.toString('utf8'))),digest(binary?local:canonical(local.toString('utf8'))),`Stale/different response: ${route}`);
    if(route.endsWith('/')&&!route.startsWith('/auth/')&&!route.startsWith('/abrir-conoche/')) {
      assert.doesNotMatch(remote.toString('utf8'),/data-cfemail|email-decode\.min\.js/,'Public contact details must remain readable without JS');
      assert.match(remote.toString('utf8'),/mailto:support@tikiziagames.com/);
    }
    if(route==='/auth/action/'){
      assert.match(response.headers.get('cache-control')||'',/no-store/);
      assert.match(response.headers.get('referrer-policy')||'',/no-referrer/);
      assert.match(response.headers.get('x-robots-tag')||'',/noindex/);
    }
    if(route.endsWith('assetlinks.json'))assert.match(response.headers.get('content-type')||'',/application\/json/);
    passed++;
  }));
}
for(const [oldPath,newPath] of [['/games/conoche','/conoche/'],['/help/','/faq/']]) {
  const response=await fetch(base+oldPath,{redirect:'manual',signal:AbortSignal.timeout(20000)});
  assert.equal(response.status,301,oldPath);
  assert.equal(new URL(response.headers.get('location'),base).pathname,newPath,oldPath);
}
const missing=await fetch(base+'/missing-page-qa-20260924/',{signal:AbortSignal.timeout(20000)});
assert.equal(missing.status,404,'Missing routes must not silently serve the homepage');
assert.match(await missing.text(),/Este camino no era/);
console.log(JSON.stringify({origin:base,matchingRoutesAndAssets:passed,redirects:2,notFound:404,accountHeaders:'verified',result:'PASS'},null,2));
