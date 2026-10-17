/* Ürün: galeri (ürün · kombin · doku), beden, sekizgen sepet butonu,
   "bu kombinde" bölümünde ürünün yerini kalemle işaretleme */
(() => {
  const { D, $, $$, gsap, motion, ARR, bag, card, pen, initPens, reveal, openLayer } = window.APP;
  const p = D.byId(new URLSearchParams(location.search).get('id')) || D.products[0];
  const look = D.lookOf(p.look);
  const sizes = D.sizes(p);
  let size = sizes.length === 1 ? sizes[0] : null;
  const words = p.name.split(' ');
  const l1 = words.length > 2 ? words.slice(0, 2).join(' ') : words[0];
  const l2 = words.slice(l1.split(' ').length).join(' ');

  document.title = `${p.name} — ${p.color} — AYAZ`;
  $('meta[name="description"]').setAttribute('content', `${p.name}, ${p.color}. ${p.desc}`);

  const oct = (attrs) => `<button type="button" class="oct" ${attrs}>
      <svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,2 78.2,11.2 95.7,35.2 95.7,64.8 78.2,88.8 50,98 21.8,88.8 4.3,64.8 4.3,35.2 21.8,11.2"/></svg>
      <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9"/></svg>
    </button>`;

  /* ---------- Üst bölüm ---------- */
  $('[data-pdp]').innerHTML = `
    <div class="pdp__gal">
      <div class="pdp__track" data-track tabindex="0" aria-label="Ürün görselleri">
        <figure class="pdp__slide">
          <img src="${D.img(p)}" alt="${p.name}, ${p.color}" fetchpriority="high">
          <span class="mono br">Ürün</span>
          ${p.note ? `<p class="hand" aria-hidden="true">${p.note}</p>` : ''}
        </figure>
        <figure class="pdp__slide">
          <img src="${D.lookImg(p.look)}" alt="Look 0${look.n}: ${look.name}" loading="lazy">
          <span class="mono br">Look 0${look.n} — ${look.name}</span>
        </figure>
        <figure class="pdp__slide pdp__slide--detail">
          <img src="${D.detail(p)}" alt="Kumaş dokusunun yakın çekimi" loading="lazy">
          <span class="mono br" style="background:var(--paper);padding:3px 6px">Doku</span>
        </figure>
      </div>
      <span class="pdp__count mono" data-count>1 / 3</span>
    </div>
    <div class="pdp__info">
      <p class="mono muted"><a href="shop.html">Mağaza</a> / <a href="shop.html?k=${p.cat}">${D.catName(p.cat)}</a> / Look 0${p.look}</p>
      <h1 class="d1 pdp__title"><span class="ln"><span>${l1}</span></span>${l2 ? `<span class="ln"><span>${l2}</span></span>` : ''}</h1>
      <div class="size-row"><p class="pdp__price">${D.price(p.price)}</p><p class="mono muted">${p.color}${p.isNew ? ' · <span style="color:var(--pen)">Yeni</span>' : ''}</p></div>
      <p class="lede">${p.desc}</p>
      <ul class="specs mono">${p.specs.map((s) => `<li class="br">${s}</li>`).join('')}</ul>
      <div>
        <div class="size-row" style="margin-bottom:10px"><p class="mono">Beden</p>${sizes.length > 1 ? '<a class="cta" href="#size">Beden rehberi</a>' : ''}</div>
        <div class="sizes${sizes.length === 1 ? ' sizes--one' : ''}" role="radiogroup" aria-label="Beden" data-sizes>
          ${sizes.map((s) => `<button type="button" class="size" role="radio" aria-checked="${s === size}" data-size="${s}">${s}</button>`).join('')}
        </div>
        <p class="msg mono" data-msg aria-live="polite" style="margin-top:10px"></p>
      </div>
      <div class="buy" data-buy>
        ${oct(`data-add aria-label="${p.name} sepete ekle, ${D.price(p.price)}"`)}
        <div class="buy__txt"><span class="mono" data-add-label>Sepete ekle</span><b>${D.price(p.price)}</b></div>
      </div>
      <ul class="perks mono"><li>₺3.000 üzeri kargo ücretsiz</li><li>14 gün içinde ücretsiz iade</li><li>1–3 iş gününde kargoda</li></ul>
    </div>`;

  /* ---------- Bu kombinde ---------- */
  const lp = look.items.map(D.byId);
  const sum = lp.reduce((a, x) => a + x.price, 0);
  const [bx0, by0, bx1, by1] = p.box;
  $('[data-inlook]').innerHTML = `
    <div class="inlook__copy" style="display:grid;gap:18px;align-content:start">
      <p class="mono"><span class="br">Bu kombinde</span></p>
      <h2 class="d1" data-r="lines"><span class="ln"><span>Look 0${look.n}</span></span><span class="ln"><span>${look.name}</span></span></h2>
      <ul class="look__items">${lp.map((x) => `<li><a href="product.html?id=${x.id}"${x.id === p.id ? ' aria-current="page" style="color:var(--pen)"' : ''}>${x.name} — ${x.color}</a><span class="mono">${D.price(x.price)}</span></li>`).join('')}</ul>
      ${lp.length > 1 ? `<button type="button" class="btn btn--line" data-look style="justify-self:start">Kombini ekle — ${D.price(sum)}</button>` : ''}
    </div>
    <figure class="inlook__fig">
      <img src="${D.lookImg(p.look)}" alt="Look 0${look.n}, ${look.name}" loading="lazy">
      <svg class="pen" data-pen='[{"t":"halo","cx":${((bx0 + bx1) / 2) * 100},"cy":${((by0 + by1) / 2) * 100},"rx":${Math.min(60, ((bx1 - bx0) / 2) * 100 * 1.05)},"ry":${((by1 - by0) / 2) * 100 * 0.95},"loops":1.4,"rot":-5}]' data-seed="9" data-start="top 55%" aria-hidden="true"></svg>
      <p class="hand" style="position:absolute;z-index:5;left:${Math.min(62, Math.max(0, bx1 * 100 - 8))}%;top:${Math.max(2, by0 * 100)}%;transform:rotate(-8deg);white-space:nowrap" aria-hidden="true">bu parça</p>
    </figure>`;

  /* ---------- Benzerleri ---------- */
  const more = [...lp.filter((x) => x.id !== p.id), ...D.products.filter((x) => x.cat === p.cat && x.look !== p.look), ...D.products.filter((x) => x.cat !== p.cat && x.look !== p.look)].slice(0, 4);
  $('[data-more]').innerHTML = more.map(card).join('');

  /* ---------- Galeri sayacı ---------- */
  const track = $('[data-track]');
  track.addEventListener('scroll', () => { $('[data-count]').textContent = `${Math.round(track.scrollLeft / Math.max(1, track.clientWidth)) + 1} / 3`; }, { passive: true });

  /* ---------- Beden ve sepet ---------- */
  const sizesEl = $('[data-sizes]');
  const msg = (t, err) => { const m = $('[data-msg]'); m.textContent = t; m.classList.toggle('err', !!err); };
  sizesEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-size]'); if (!b) return;
    size = b.dataset.size;
    $$('[data-size]', sizesEl).forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    msg(size === 'Tek beden' ? '' : `${size} seçildi.`);
    $('[data-s-meta]').textContent = `${D.price(p.price)} · ${size}`;
  });
  function add() {
    if (!size) {
      sizesEl.classList.remove('shake'); void sizesEl.offsetWidth; sizesEl.classList.add('shake');
      msg('Önce bir beden seç.', true);
      sizesEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    bag.add(p.id, size, true);
    const lbl = $('[data-add-label]'); lbl.textContent = 'Çantada ✓';
    setTimeout(() => { lbl.textContent = 'Sepete ekle'; }, 1800);
    setTimeout(() => openLayer('bag'), 250);
  }
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-add]')) add();
    if (e.target.closest('[data-look]')) {
      lp.forEach((x) => bag.add(x.id, D.sizes(x).length === 1 ? 'Tek beden' : (x.id === p.id && size) || 'M', true));
      openLayer('bag');
    }
  });

  /* ---------- Mobilde alttaki sabit bar ---------- */
  $('[data-s-name]').textContent = p.name;
  $('[data-s-meta]').textContent = `${D.price(p.price)}${size ? ` · ${size}` : ''}`;
  const sticky = $('[data-sticky]');
  new IntersectionObserver(([en]) => {
    const on = !en.isIntersecting && en.boundingClientRect.top < 0;
    sticky.classList.toggle('is-on', on); sticky.setAttribute('aria-hidden', String(!on)); sticky.inert = !on;
  }).observe($('[data-buy]'));
  sticky.inert = true;

  initPens(); reveal();
  if (motion) {
    gsap.fromTo('.pdp__title .ln > span', { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: 0.1 });
    gsap.fromTo('.pdp__info > :not(h1)', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05, delay: 0.25, clearProps: 'transform' });
    gsap.fromTo('.pdp__slide .hand', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', delay: 0.9 });
    gsap.to('.buy polygon', { rotation: 360, transformOrigin: '50% 50%', duration: 24, ease: 'none', repeat: -1 });
  }
})();
