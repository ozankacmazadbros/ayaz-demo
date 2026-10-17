/* Mağaza: kategori seçimi (seçilene kırmızı kalemle çember), ızgara */
(() => {
  const { D, $, $$, gsap, ST, motion, card, pen, reveal } = window.APP;
  const cats = [{ slug: 'all', name: 'Tümü' }, ...D.cats];
  const q = new URLSearchParams(location.search).get('k');
  let k = cats.some((c) => c.slug === q) ? q : 'all';
  const grid = $('[data-grid]');
  const chips = $('[data-chips]');

  chips.innerHTML = cats.map((c) => {
    const n = c.slug === 'all' ? D.products.length : D.products.filter((p) => p.cat === c.slug).length;
    return `<button type="button" data-k="${c.slug}" aria-pressed="${c.slug === k}">${c.name} <sup>${n}</sup><svg class="pen" data-pen='[{"t":"halo","cx":50,"cy":52,"rx":50,"ry":42,"loops":1.35,"rot":-4}]' data-manual data-seed="${n + 3}" aria-hidden="true"></svg></button>`;
  }).join('');

  function render(first) {
    const list = D.products.filter((p) => k === 'all' || p.cat === k);
    const name = k === 'all' ? 'Mağaza' : D.catName(k);
    $('[data-title]').textContent = name;
    $('[data-count]').textContent = `${list.length} parça`;
    document.title = `${name} — AYAZ`;
    history.replaceState(null, '', k === 'all' ? location.pathname : `${location.pathname}?k=${k}`);
    $$('button', chips).forEach((b) => {
      const on = b.dataset.k === k;
      b.setAttribute('aria-pressed', String(on));
      const s = $('svg', b);
      if (!s.dataset.built) { s.dataset.built = '1'; pen.build(s); }
      on ? pen.draw(s, { duration: 0.7 }) : pen.undraw(s);
    });
    grid.innerHTML = list.map(card).join('');
    if (motion && !first) {
      $$('.card', grid).forEach((c) => { c.dataset.rv = '1'; });
      gsap.fromTo($$('.card', grid), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05, clearProps: 'transform' });
      ST.refresh();
    } else reveal(grid);
  }

  chips.addEventListener('click', (e) => {
    const b = e.target.closest('[data-k]');
    if (!b || b.dataset.k === k) return;
    k = b.dataset.k;
    if (motion) gsap.to(grid, { autoAlpha: 0, duration: 0.18, onComplete: () => { gsap.set(grid, { autoAlpha: 1 }); render(); } });
    else render();
  });
  render(true);
  if (motion) gsap.fromTo('.shop-title .ln > span', { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', delay: 0.1 });
})();
