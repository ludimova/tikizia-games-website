// Progressive enhancement only: every answer/link is usable without JavaScript.
const search = document.querySelector('#faq-search');
if (search) {
  const es = document.documentElement.lang === 'es';
  const entries = [...document.querySelectorAll('[data-faq]')];
  const topics = [...document.querySelectorAll('.faq-topic')];
  const status = document.querySelector('#search-status');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const terms = new Map(entries.map(entry=>[entry,normalize(entry.textContent)]));
  document.querySelector('[data-search-box]').hidden = false;
  const applySearch = () => {
    const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const entry of entries) {
      entry.hidden = !words.every(word=>terms.get(entry).includes(word));
      if (!entry.hidden) visible++;
    }
    for (const topic of topics) topic.hidden = ![...topic.querySelectorAll('[data-faq]')].some(e=>!e.hidden);
    status.textContent = es ? `${visible} ${visible === 1 ? 'respuesta' : 'respuestas'}` : `${visible} ${visible === 1 ? 'answer' : 'answers'}`;
    document.querySelector('#empty-search').hidden = visible !== 0;
  };
  search.addEventListener('input',applySearch);
  // Topic links always reveal their target, even after a search with no matches.
  document.querySelectorAll('.topic-nav a').forEach(link=>link.addEventListener('click',()=>{
    search.value='';applySearch();
  }));
  const revealHash = () => {
    let hash;
    try { hash = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(hash);
    if (target?.matches('details[data-faq]')) {
      search.value='';applySearch();target.open=true;
    }
  };
  window.addEventListener('hashchange',revealHash);
  applySearch();
  revealHash();
}
