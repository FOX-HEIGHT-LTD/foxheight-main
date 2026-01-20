/* FoxHeight global interactions */
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeToggle();
    setupDropdowns();
    setupScrollReveal();
    initAnimatedTagline();
    setupTabs();
    setupAccordions();
    setupContactOrb();
  });

  function initTheme(){
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'dark'); // default dark
    document.documentElement.setAttribute('data-theme', theme);
  }

  function setupThemeToggle(){
    const btns = document.querySelectorAll('[data-action="toggle-theme"]');
    btns.forEach(btn => btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    }));
  }

  function setupDropdowns(){
    document.querySelectorAll('.dropdown').forEach(dd => {
      const toggle = dd.querySelector('.dropdown-toggle');
      if(!toggle) return;
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const expanded = dd.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.dropdown[aria-expanded="true"]').forEach(open => {
          if(open !== dd) open.setAttribute('aria-expanded', 'false');
        });
        dd.setAttribute('aria-expanded', String(!expanded));
      });
      document.addEventListener('click', (e) => {
        if(!dd.contains(e.target)) dd.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function setupScrollReveal(){
    const els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window) || els.length === 0) return els.forEach(el => el.classList.add('reveal--visible'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if(ent.isIntersecting){
          ent.target.classList.add('reveal--visible');
          io.unobserve(ent.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  function initAnimatedTagline(){
    const el = document.querySelector('[data-animated-tagline]');
    if(!el) return;
    const text = el.getAttribute('data-animated-tagline');
    if(!text) return;
    el.textContent = '';
    let i = 0;
    const speed = 28;
    function type(){
      el.textContent = text.slice(0, i++);
      if(i <= text.length){
        requestAnimationFrame(() => setTimeout(type, speed));
      } else {
        setTimeout(() => { i = 0; el.textContent = ''; type(); }, 2600);
      }
    }
    type();
  }

  function setupTabs(){
    document.querySelectorAll('.tabs').forEach(group => {
      const tabs = group.querySelectorAll('.tab');
      tabs.forEach(tab => tab.addEventListener('click', () => {
        const panelId = tab.getAttribute('aria-controls');
        const container = group.parentElement;
        container.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', 'false'));
        container.querySelectorAll('.tabpanel').forEach(p => p.setAttribute('aria-hidden', 'true'));
        tab.setAttribute('aria-selected', 'true');
        const panel = container.querySelector('#' + panelId);
        if(panel) panel.setAttribute('aria-hidden', 'false');
      }));
    });
  }

  function setupAccordions(){
    document.querySelectorAll('.accordion-item').forEach(item => {
      const summary = item.querySelector('.accordion-summary');
      if(!summary) return;
      summary.addEventListener('click', () => {
        const expanded = item.getAttribute('aria-expanded') === 'true';
        item.setAttribute('aria-expanded', String(!expanded));
      });
    });
  }

  function setupContactOrb(){
    const orb = document.querySelector('.contact-orb');
    if(!orb) return;
    orb.addEventListener('click', () => {
      window.location.href = 'mailto:info@foxheight.com?subject=Contact%20FoxHeight';
    });
  }
})();
