/* AYAZ — ortak: smooth scroll, header, kalem çizgileri, çanta, menü, kart, beliren öğeler */
(() => {
  const D = window.AYAZ;
  const html = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  const motion = !!(gsap && ST) && !reduce;
  if (gsap && ST) gsap.registerPlugin(ST);
  if (!motion) html.classList.remove('motion');

  let lenis = null;
  if (motion && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1 });
    lenis.on('scroll', ST.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Header, menü, footer ---------- */
  const ARR = '<span class="arr" aria-hidden="true">↗</span>';
  $('#hd').outerHTML = `
    <a class="skip" href="#main">İçeriğe geç</a>
    <header class="hd" data-inert>
      <a class="hd__logo" href="index.html" aria-label="AYAZ ana sayfa">AYAZ</a>
      <p class="hd__mid mono"><span class="br">Drop 02 / Kış 26</span></p>
      <nav class="hd__nav mono" aria-label="Ana menü">
        <a class="desk" href="shop.html">Mağaza</a>
        <a class="desk" href="index.html#kombinler">Kombinler</a>
        <a class="desk" href="hikaye.html">Hikâye</a>
        <button type="button" data-open="bag" aria-controls="bag" aria-expanded="false">Çanta (<span class="bag-n">0</span>)</button>
        <button type="button" class="mob" data-open="menu" aria-controls="menu" aria-expanded="false">Menü</button>
      </nav>
    </header>`;
  const SOCIAL = 'Sosyal medya hesabın eklendiğinde bu bağlantı ona gidecek.';
  const footCol = (t, items) => `<div><p class="mono" style="opacity:.55;margin-bottom:12px">${t}</p><ul class="mono">${items.map(([label, href]) => `<li><a href="${href}"${href === '#' ? ` data-proto="${SOCIAL}"` : ''}>${label}</a></li>`).join('')}</ul></div>`;
  $('#ft').outerHTML = `
    <footer class="ft" data-inert>
      <div class="ft__cols">
        ${footCol('Mağaza', [['Tümü', 'shop.html'], ...D.cats.map((c) => [c.name, `shop.html?k=${c.slug}`])])}
        ${footCol('Yardım', [['Kargo ve teslimat', 'yardim.html#kargo'], ['İade ve değişim', 'yardim.html#iade'], ['Beden rehberi', 'yardim.html#beden'], ['Sık sorulanlar', 'yardim.html#sss'], ['İletişim', 'yardim.html#iletisim']])}
        ${footCol('AYAZ', [['Hikâye', 'hikaye.html'], ['Kombinler', 'index.html#kombinler'], ['Mağaza ve atölye', 'yardim.html#iletisim']])}
        ${footCol('Takip et', [['Instagram', '#'], ['TikTok', '#'], ['Pinterest', '#']])}
      </div>
      <p class="ft__word d-mega" aria-hidden="true">${'AYAZ'.split('').map((l) => `<span><span>${l}</span></span>`).join('')}</p>
      <div class="ft__base mono"><span>© 2026 AYAZ — İstanbul</span><nav aria-label="Yasal"><a href="yasal.html#kvkk">KVKK</a> · <a href="yasal.html#gizlilik">Gizlilik</a> · <a href="yasal.html#mesafeli">Mesafeli satış</a> · <a href="yasal.html#cerez">Çerezler</a></nav></div>
    </footer>`;

  document.body.insertAdjacentHTML('beforeend', `
    <div class="layer" id="bag" aria-hidden="true">
      <div class="layer__scrim" data-close></div>
      <aside class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="bag-t">
        <div class="drawer__head"><h2 id="bag-t" class="mono">Çanta (<span class="bag-n">0</span>)</h2><button type="button" class="x-btn" data-close aria-label="Çantayı kapat"></button></div>
        <div class="drawer__body" data-lenis-prevent><div data-bag></div></div>
        <div class="drawer__foot" data-bag-foot></div>
      </aside>
    </div>
    <div class="layer" id="menu" aria-hidden="true">
      <nav class="menu__panel" role="dialog" aria-modal="true" aria-label="Menü">
        <button type="button" class="x-btn" data-close aria-label="Menüyü kapat"></button>
        <ul>${[['Mağaza', 'shop.html'], ...D.cats.map((c) => [c.name, `shop.html?k=${c.slug}`]), ['Kombinler', 'index.html#kombinler'], ['Hikâye', 'hikaye.html'], ['Yardım', 'yardim.html']].map(([t, h]) => `<li><a class="d1" href="${h}">${t}</a></li>`).join('')}</ul>
        <p class="mono" style="opacity:.6">Drop 02 / Kış 26 — İstanbul</p>
      </nav>
    </div>
    <div class="modal" id="size" aria-hidden="true">
      <div class="modal__scrim" data-close></div>
      <div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="size-t">
        <button type="button" class="x-btn" data-close aria-label="Kapat"></button>
        <h2 id="size-t" class="d3">Beden rehberi</h2>
        <p class="lede" style="margin-top:8px">Ölçüler santimetredir ve ürünün düz serilmiş hâlini gösterir. Kalıplarımız rahat; arada kaldıysan küçük bedeni seç.</p>
        <table class="size-table mono"><thead><tr><th>Beden</th><th>Göğüs</th><th>Boy</th><th>Bel (pantolon)</th></tr></thead>
          <tbody><tr><td>S</td><td>58</td><td>68</td><td>76</td></tr><tr><td>M</td><td>61</td><td>70</td><td>80</td></tr><tr><td>L</td><td>64</td><td>72</td><td>84</td></tr><tr><td>XL</td><td>67</td><td>74</td><td>88</td></tr></tbody></table>
      </div>
    </div>
    <div class="toast mono" role="status" aria-live="polite"></div>`);

  /* ---------- Header: koyu bölümde açık renk, aşağı inince gizlen ---------- */
  const hd = $('.hd');
  let lastY = scrollY; let acc = 0;
  const onScroll = (y) => {
    const dy = y - lastY; lastY = y;
    if (html.classList.contains('locked')) return;
    hd.classList.toggle('is-solid', y > 120);
    if (Math.sign(dy) !== Math.sign(acc)) acc = 0;
    acc += dy;
    if (y < 120 || acc < -30) hd.classList.remove('is-hidden');
    else if (acc > 30) hd.classList.add('is-hidden');
  };
  if (lenis) lenis.on('scroll', (e) => onScroll(e.scroll)); else addEventListener('scroll', () => onScroll(scrollY), { passive: true });
  function watchThemes() {
    $$('[data-theme="dark"]').forEach((sec) => {
      if (ST) ST.create({ trigger: sec, start: 'top 32px', end: 'bottom 32px', onToggle: (s) => hd.classList.toggle('is-dark', s.isActive) });
    });
  }

  /* ---------- Katmanlar ---------- */
  let open = null; let lastFocus = null;
  function openLayer(id, opener) {
    const el = document.getElementById(id);
    if (!el) return;
    if (open) closeLayer(true); else lastFocus = opener || document.activeElement;
    open = el;
    el.classList.add('is-open'); el.setAttribute('aria-hidden', 'false');
    $$(`[aria-controls="${id}"]`).forEach((b) => b.setAttribute('aria-expanded', 'true'));
    html.classList.add('locked'); html.style.overflow = 'hidden'; lenis?.stop();
    $$('main, [data-inert]').forEach((n) => { n.inert = true; });
    if (id === 'bag') renderBag();
    if (id === 'menu' && motion) gsap.fromTo('#menu li a', { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'expo.out', stagger: 0.04, delay: 0.18 });
    setTimeout(() => el.querySelector('button, a')?.focus({ preventScroll: true }), 60);
  }
  function closeLayer(swap) {
    if (!open) return;
    open.classList.remove('is-open'); open.setAttribute('aria-hidden', 'true');
    $$(`[aria-controls="${open.id}"]`).forEach((b) => b.setAttribute('aria-expanded', 'false'));
    open = null;
    if (swap === true) return;
    html.classList.remove('locked'); html.style.overflow = ''; lenis?.start();
    $$('main, [data-inert]').forEach((n) => { n.inert = false; });
    lastFocus?.focus?.({ preventScroll: true });
  }

  /* ---------- Toast ---------- */
  const toastEl = $('.toast'); let tt;
  function toast(t) { toastEl.textContent = t; toastEl.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('is-on'), 3000); }

  /* ---------- Çanta ---------- */
  const KEY = 'ayaz.bag.v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  let items = load().filter((i) => D.byId(i.id));
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* gizli sekme */ } count(); if (open?.id === 'bag') renderBag(); };
  const total = () => items.reduce((a, i) => a + D.byId(i.id).price * i.qty, 0);
  function count(bump) {
    const n = items.reduce((a, i) => a + i.qty, 0);
    $$('.bag-n').forEach((e) => { e.textContent = n; if (bump) { e.classList.remove('bump'); void e.offsetWidth; e.classList.add('bump'); } });
  }
  const bag = {
    add(id, size, quiet) {
      const key = `${id}|${size}`;
      const f = items.find((i) => i.key === key);
      if (f) f.qty = Math.min(f.qty + 1, 9); else items.unshift({ key, id, size, qty: 1 });
      save(); count(true);
      if (!quiet) toast(`${D.byId(id).name} · ${size} çantada.`);
    },
    set(key, q) { const f = items.find((i) => i.key === key); if (!f) return; if (q <= 0) items = items.filter((i) => i !== f); else f.qty = Math.min(q, 9); save(); },
    items: () => items.map((i) => ({ ...i })),
    total,
    clear() { items = []; save(); },
  };
  function renderBag() {
    const box = $('[data-bag]'); const foot = $('[data-bag-foot]');
    if (!items.length) {
      box.innerHTML = `<div class="bag-empty"><p class="d2">Çanta<br>boş.</p><p class="lede">Bir kat ekle; burada görünsün.</p><a class="btn" href="shop.html">Mağazaya gir ${ARR}</a></div>`;
      foot.innerHTML = '';
      return;
    }
    const sum = total(); const left = D.FREE - sum;
    box.innerHTML = items.map((i) => {
      const p = D.byId(i.id);
      return `<div class="bag-item">
        <a class="bag-item__img" href="product.html?id=${p.id}"><img src="${D.img(p)}" alt="" loading="lazy"></a>
        <div><p class="d4">${p.name}</p><p class="mono muted" style="margin-top:6px">${p.color} · ${i.size}</p>
          <div class="qty mono" role="group" aria-label="Adet"><button type="button" data-q="-1" data-k="${i.key}" aria-label="Bir azalt">−</button><span>${i.qty}</span><button type="button" data-q="1" data-k="${i.key}" aria-label="Bir artır">+</button></div></div>
        <p class="mono">${D.price(p.price * i.qty)}</p>
      </div>`;
    }).join('');
    foot.innerHTML = `
      <div><p class="mono" style="display:flex;justify-content:space-between"><span>Ara toplam</span><span>${D.price(sum)}</span></p>
      <p class="mono muted" style="margin-top:8px">${left > 0 ? `Ücretsiz kargoya ${D.price(left)} kaldı` : 'Kargo ücretsiz'}</p>
      <div class="ship-bar"><i style="transform:scaleX(${Math.min(1, sum / D.FREE)})"></i></div></div>
      <a class="btn btn--block" href="odeme.html">Ödemeye geç ${ARR}</a>`;
  }
  $('#bag').addEventListener('click', (e) => {
    const b = e.target.closest('[data-q]');
    if (b) { const it = items.find((i) => i.key === b.dataset.k); if (it) bag.set(it.key, it.qty + Number(b.dataset.q)); }
  });
  count();

  /* ---------- Kalem: elle çizilmiş çember, alt çizgi, ok ---------- */
  function rng(seed) { let s = (seed * 9301 + 49297) % 233280; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function smoothOpen(p) {
    let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[Math.max(0, i - 1)]; const p1 = p[i]; const p2 = p[i + 1]; const p3 = p[Math.min(p.length - 1, i + 2)];
      d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  }
  const SHAPES = {
    halo(w, h, o, R) {
      const cx = (o.cx / 100) * w; const cy = (o.cy / 100) * h; const rx = (o.rx / 100) * w; const ry = (o.ry / 100) * h;
      const loops = o.loops || 1.75; const rot = ((o.rot ?? -8) * Math.PI) / 180; const a0 = -2.2 + R() * 0.6;
      const N = Math.round(44 * loops); const pts = [];
      for (let i = 0; i <= N; i++) {
        const t = a0 + (i / N) * loops * Math.PI * 2; const k = 1 + (R() - 0.5) * 0.07 + (i / N) * 0.1;
        const x = Math.cos(t) * rx * k; const y = Math.sin(t) * ry * k;
        pts.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]);
      }
      return smoothOpen(pts);
    },
    under(w, h, o, R) {
      const x0 = (o.x0 / 100) * w; const x1 = (o.x1 / 100) * w; const y = (o.y / 100) * h; const pts = []; const n = 7;
      for (let i = 0; i <= n; i++) pts.push([x0 + ((x1 - x0) * i) / n, y + (R() - 0.5) * 4 - (i / n) * 3]);
      pts.push([x1 - (x1 - x0) * 0.25, y + 6]);
      return smoothOpen(pts);
    },
    arrow(w, h, o) {
      const a = [(o.x0 / 100) * w, (o.y0 / 100) * h]; const b = [(o.x1 / 100) * w, (o.y1 / 100) * h];
      const mx = (a[0] + b[0]) / 2 + (b[1] - a[1]) * (o.bend ?? 0.25); const my = (a[1] + b[1]) / 2 - (b[0] - a[0]) * (o.bend ?? 0.25);
      const ang = Math.atan2(b[1] - my, b[0] - mx); const L = 12;
      const h1 = [b[0] - L * Math.cos(ang - 0.5), b[1] - L * Math.sin(ang - 0.5)]; const h2 = [b[0] - L * Math.cos(ang + 0.5), b[1] - L * Math.sin(ang + 0.5)];
      return `M${a[0].toFixed(1)},${a[1].toFixed(1)}Q${mx.toFixed(1)},${my.toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}M${h1[0].toFixed(1)},${h1[1].toFixed(1)}L${b[0].toFixed(1)},${b[1].toFixed(1)}L${h2[0].toFixed(1)},${h2[1].toFixed(1)}`;
    },
  };
  const pen = {
    build(svg) {
      const r = svg.getBoundingClientRect(); const w = r.width || 1; const h = r.height || 1;
      svg.setAttribute('viewBox', `0 0 ${w.toFixed(1)} ${h.toFixed(1)}`);
      const spec = JSON.parse(svg.dataset.pen);
      const R = rng(Number(svg.dataset.seed || 3));
      svg.innerHTML = spec.map((s) => `<path d="${SHAPES[s.t](w, h, s, R)}"/>`).join('');
      $$('path', svg).forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len} ${len + 12}`;
        p.style.strokeDashoffset = svg.dataset.drawn || !motion ? 0 : len + 6;
        p.dataset.len = len + 6;
      });
    },
    draw(svg, o = {}) {
      svg.dataset.drawn = '1';
      const ps = $$('path', svg);
      if (!motion) { ps.forEach((p) => { p.style.strokeDashoffset = 0; }); return; }
      gsap.to(ps, { strokeDashoffset: 0, duration: o.duration || 1.1, ease: 'power2.inOut', stagger: o.stagger ?? 0.25, delay: o.delay || 0, overwrite: true });
    },
    undraw(svg) {
      delete svg.dataset.drawn;
      const ps = $$('path', svg);
      if (!motion) return;
      gsap.to(ps, { strokeDashoffset: (i, el) => el.dataset.len, duration: 0.35, ease: 'power2.in', overwrite: true });
    },
  };
  function initPens(root = document) {
    $$('svg[data-pen]', root).forEach((svg) => {
      if (svg.dataset.built) return;
      svg.dataset.built = '1';
      pen.build(svg);
      if (svg.hasAttribute('data-manual')) return;
      if (motion) ST.create({ trigger: svg.parentElement, start: svg.dataset.start || 'top 75%', once: true, onEnter: () => pen.draw(svg, { delay: Number(svg.dataset.delay || 0) }) });
      else pen.draw(svg);
    });
  }
  let rt;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => $$('svg[data-pen][data-built]').forEach((s) => pen.build(s)), 200); });

  /* ---------- Ürün kartı ---------- */
  function card(p) {
    const sizes = D.sizes(p);
    return `<article class="card" data-id="${p.id}" data-r="card">
      <a class="card__img" href="product.html?id=${p.id}" aria-label="${p.name}, ${p.color}, ${D.price(p.price)}">
        <img class="a" src="${D.img(p)}" alt="" loading="lazy" decoding="async">
        <img class="b" src="${D.lookImg(p.look, true)}" alt="" loading="lazy" decoding="async">
        <span class="card__tags mono"><span>Look 0${p.look}</span>${p.isNew ? '<span class="card__new">Yeni</span>' : ''}</span>
      </a>
      <div class="card__row"><h3 class="card__name"><a href="product.html?id=${p.id}">${p.name}</a></h3><span class="mono">${D.price(p.price)}</span></div>
      <div class="card__row">
        <span class="mono muted">${p.color}</span>
        <button type="button" class="card__add mono" data-pick>+ Ekle<svg class="pen" data-pen='[{"t":"halo","cx":50,"cy":50,"rx":62,"ry":62,"loops":1.3,"rot":-6}]' data-manual aria-hidden="true"></svg></button>
        <span class="card__sizes mono" role="group" aria-label="Beden seç">${sizes.map((s) => `<button type="button" data-size="${s}">${s === 'Tek beden' ? 'Tek' : s}</button>`).join('')}</span>
      </div>
    </article>`;
  }
  document.addEventListener('pointerenter', (e) => {
    const b = e.target.closest?.('.card__add');
    if (b && matchMedia('(hover: hover)').matches) { const s = $('svg', b); if (!s.dataset.built) { s.dataset.built = '1'; pen.build(s); } pen.draw(s, { duration: 0.6 }); }
  }, true);
  document.addEventListener('pointerleave', (e) => {
    const b = e.target.closest?.('.card__add');
    if (b && e.target === b) pen.undraw($('svg', b));
  }, true);

  /* ---------- Tıklamalar ---------- */
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); openLayer(o.dataset.open, o); return; }
    if (e.target.closest('[data-close]')) { closeLayer(); return; }
    const pk = e.target.closest('[data-pick]');
    if (pk) { const c = pk.closest('.card'); const p = D.byId(c.dataset.id); if (D.sizes(p).length === 1) bag.add(p.id, 'Tek beden'); else c.classList.add('is-picking'); return; }
    const sz = e.target.closest('.card__sizes [data-size]');
    if (sz) { const c = sz.closest('.card'); bag.add(c.dataset.id, sz.dataset.size); c.classList.remove('is-picking'); return; }
    const pr = e.target.closest('[data-proto]');
    if (pr) { e.preventDefault(); toast(pr.dataset.proto || 'Bu sayfa prototipte henüz yok.'); return; }
    const a = e.target.closest('a[href]');
    if (a && a.getAttribute('href') === '#size') { e.preventDefault(); openLayer('size', a); return; }
    if (a && a.pathname === location.pathname && a.hash.length > 1) {
      const t = document.querySelector(a.hash);
      if (t) { e.preventDefault(); closeLayer(); lenis ? lenis.scrollTo(t, { duration: 1.4 }) : t.scrollIntoView({ behavior: 'smooth' }); }
    }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeLayer(); $$('.card.is-picking').forEach((c) => c.classList.remove('is-picking')); } });
  addEventListener('pageshow', (e) => { if (e.persisted) { closeLayer(); items = load(); count(); } });

  /* ---------- Beliren öğeler ----------
     data-r="up | lines | clip | fade | card", data-speed="-0.2" parallax */
  function reveal(root = document) {
    const els = $$('[data-r]', root).filter((el) => !el.dataset.rv);
    els.forEach((el) => { el.dataset.rv = '1'; });
    if (!motion) return;
    const cards = els.filter((el) => el.dataset.r === 'card');
    if (cards.length) {
      gsap.set(cards, { autoAlpha: 0, y: 50 });
      ST.batch(cards, { start: 'top 92%', once: true, onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, clearProps: 'transform' }) });
    }
    els.filter((el) => el.dataset.r !== 'card').forEach((el) => {
      const t = el.dataset.r; const delay = Number(el.dataset.d || 0);
      const st = { trigger: el, start: el.dataset.start || 'top 86%', once: true };
      if (t === 'up') gsap.fromTo(el, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', delay, scrollTrigger: st, clearProps: 'transform' });
      else if (t === 'fade') gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.1, ease: 'power2.out', delay, scrollTrigger: st });
      else if (t === 'lines') { gsap.set(el, { autoAlpha: 1 }); gsap.fromTo($$('.ln > span', el), { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay, scrollTrigger: st }); }
      else if (t === 'clip') {
        gsap.set(el, { autoAlpha: 1 });
        const img = $('img', el);
        gsap.timeline({ scrollTrigger: st, delay })
          .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.inOut' })
          .fromTo(img, { scale: 1.3 }, { scale: 1.12, duration: 1.5, ease: 'expo.out' }, 0.1);
      }
    });
    $$('[data-speed]', root).forEach((el) => {
      if (el.dataset.sp) return; el.dataset.sp = '1';
      /* alt alta dizilen dar ekranda paralaks görselleri birbirine bindirir: sadece masaüstü */
      gsap.matchMedia().add('(min-width: 1024px)', () => {
        gsap.to(el, { yPercent: Number(el.dataset.speed) * 100, ease: 'none', scrollTrigger: { trigger: el.dataset.within ? el.closest(el.dataset.within) : el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });
  }

  // footer dev yazı
  function footWord() {
    if (!motion) return;
    gsap.fromTo('.ft__word span span', { yPercent: 105 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: '.ft__word', start: 'top 96%', once: true } });
  }

  window.APP = { D, $, $$, gsap, ST, motion, lenis, ARR, bag, card, pen, initPens, reveal, toast, openLayer, closeLayer };
  document.addEventListener('DOMContentLoaded', () => {
    initPens(); reveal(); watchThemes(); footWord();
    document.fonts?.ready.then(() => { $$('svg[data-pen][data-built]').forEach((s) => pen.build(s)); ST?.refresh(); });
  });
  addEventListener('load', () => ST?.refresh());
})();
