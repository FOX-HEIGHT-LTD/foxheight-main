/* Simple AI-style autocomplete for Resources */
(function(){
  const DATA = [
    { label: 'Docs: Getting Started', url: 'docs.html#intro', type: 'Docs' },
    { label: 'API Reference: FoxCloud', url: 'docs.html#api', type: 'API' },
    { label: 'SDK: TypeScript', url: 'resources.html#sdks', type: 'SDK' },
    { label: 'SDK: Python', url: 'resources.html#sdks', type: 'SDK' },
    { label: 'Tutorial: Build with FoxAI', url: 'resources.html#tutorials', type: 'Tutorial' },
    { label: 'Changelog: Platform Updates', url: 'resources.html#changelog', type: 'Changelog' },
    { label: 'FoxFlight API', url: 'https://foxflight.foxheight.com', type: 'Product' },
    { label: 'FoxAI Research Hub', url: 'https://foxai.foxheight.com', type: 'Product' },
    { label: 'FoxCloud Developer APIs', url: 'https://foxcloud.foxheight.com', type: 'Product' },
    { label: 'FoxData Analytics Fabric', url: 'https://foxdata.foxheight.com', type: 'Product' },
    { label: 'FoxOS Experimental AGI OS', url: 'https://foxos.foxheight.com', type: 'Product' }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('[data-search]');
    const list = document.querySelector('[data-autocomplete]');
    if(!input || !list) return;

    function render(items){
      list.innerHTML = items.map(i => `<div class="item" data-url="${i.url}"><span class="small muted">${i.type}</span> — ${i.label}</div>`).join('');
      list.classList.toggle('show', items.length > 0);
      list.querySelectorAll('.item').forEach(el => el.addEventListener('click', () => {
        const url = el.getAttribute('data-url');
        if(!url) return;
        if(url.startsWith('http')){ window.open(url, '_blank'); } else { window.location.href = url; }
      }));
    }

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if(q.length === 0){ list.classList.remove('show'); list.innerHTML = ''; return; }
      const results = DATA.filter(d => d.label.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)).slice(0, 8);
      // naive AI suggestion boost: prefer items whose first token matches
      results.sort((a, b) => (Number(a.label.toLowerCase().startsWith(q)) > Number(b.label.toLowerCase().startsWith(q)) ? -1 : 1));
      render(results);
    });

    document.addEventListener('click', (e) => {
      if(!list.contains(e.target) && e.target !== input){ list.classList.remove('show'); }
    });
  });
})();
