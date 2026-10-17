/* Ana sayfa: kolaj açılışı, bant, soğuk bölüm, kombinler, doku, mağaza önizleme */
(() => {
  const { D, $, $$, gsap, ST, motion, card, pen, bag, toast } = window.APP;

  /* ---------- Kombin kartları ---------- */
  const row = $('[data-looks]');
  row.insertAdjacentHTML('beforeend', D.looks.map((l) => {
    const ps = l.items.map(D.byId);
    const sum = ps.reduce((a, p) => a + p.price, 0);
    return `<article class="look" aria-label="Look 0${l.n}: ${l.name}">
      <div class="look__stage">
        <span class="look__num d-mega outline-text" aria-hidden="true">0${l.n}</span>
        <img src="${D.lookImg(l.n, true)}" alt="Look 0${l.n}: ${ps.map((p) => `${p.color.toLocaleLowerCase('tr')} ${p.name.toLocaleLowerCase('tr')}`).join(', ')}" loading="lazy">
      </div>
      <div class="look__info">
        <p class="d3">${l.name}</p>
        <ul class="look__items">${ps.map((p) => `<li><a href="product.html?id=${p.id}">${p.name} — ${p.color}</a><span class="mono">${D.price(p.price)}</span></li>`).join('')}</ul>
        <button type="button" class="btn btn--line" data-look="${l.n}">Kombini ekle — ${D.price(sum)}</button>
      </div>
    </article>`;
  }).join(''));
  row.addEventListener('click', (e) => {
    const b = e.target.closest('[data-look]');
    if (!b) return;
    const l = D.lookOf(Number(b.dataset.look));
    l.items.forEach((id) => bag.add(id, D.sizes(D.byId(id))[0] === 'Tek beden' ? 'Tek beden' : 'M', true));
    toast(`Look 0${l.n} çantada (M beden). Bedeni çantadan değiştirebilirsin.`);
  });
  const lookCount = $('[data-looks-count]');
  const bar = $('.looks__bar i');
  const setLook = (p) => {
    lookCount.textContent = `0${Math.min(7, Math.max(1, Math.round(p * 6) + 1))} / 07`;
    bar.style.setProperty('--p', Math.max(0.05, p));
  };
  row.addEventListener('scroll', () => { const m = row.scrollWidth - row.clientWidth; if (m > 0) setLook(row.scrollLeft / m); }, { passive: true });

  /* ---------- Mağaza önizleme ---------- */
  $('[data-teaser]').innerHTML = ['p13', 'p03', 'p01', 'p08', 'p11', 'p09', 'p02', 'p06'].map((id) => card(D.byId(id))).join('');

  /* ---------- Bülten ---------- */
  $('[data-news]').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.currentTarget; const i = $('input', f); const m = $('.news__msg', f);
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(i.value.trim());
    m.classList.toggle('err', !ok);
    m.textContent = ok ? 'Kaydın alındı. Drop 03 açıldığında ilk sen duyacaksın.' : 'Geçerli bir e-posta adresi gir: ad@eposta.com';
    if (ok) i.value = ''; else i.focus();
  });

  if (!motion) return;

  /* ---------- Hero açılışı ---------- */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => { gsap.set('.hero__fig', { xPercent: -50, x: 0 }); gsap.set('.cold__fig', { xPercent: -50, yPercent: -50, x: 0, y: 0 }); });
  gsap.timeline({ delay: 0.1 })
    .fromTo('.hero__word > span > span', { yPercent: 105 }, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.08 })
    .fromTo('.hero__fig', { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: 1.4, ease: 'expo.out' }, 0.25)
    .fromTo('.hero__stack figure', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut', stagger: 0.12 }, 0.5)
    .fromTo('.hero__stack p, .hero__intro > *, .hero__strike', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05 }, 0.9)
    .fromTo('.hero__strip', { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, duration: 1, ease: 'expo.out' }, 1)
    .fromTo('.hero__notes .hand', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.25 }, 1.7);

  const heroST = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.hero__word', { yPercent: 30, ease: 'none', scrollTrigger: heroST });
  gsap.to('.hero__fig img', { scale: 1.06, yPercent: -4, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: heroST });
  gsap.to('.hero__stack', { yPercent: -18, ease: 'none', scrollTrigger: heroST });

  /* ---------- Kayan bant: scroll hızıyla hızlanır ---------- */
  const loop = gsap.to('.band__track', { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
  ST.create({
    trigger: '.band', start: 'top bottom', end: 'bottom top',
    onUpdate: (s) => { const v = Math.min(5, 1 + Math.abs(s.getVelocity()) / 400); gsap.to(loop, { timeScale: s.direction * v, duration: 0.3, overwrite: true }); gsap.to(loop, { timeScale: s.direction, duration: 1.2, delay: 0.3 }); },
  });

  /* ---------- Soğuk bölüm (masaüstünde sabit sahne) ---------- */
  mm.add('(min-width: 1024px)', () => {
    gsap.timeline({ scrollTrigger: { trigger: '.cold', pin: '.cold__pin', start: 'top top', end: '+=160%', scrub: 0.6 } })
      .fromTo('.cold__top > span', { xPercent: -14, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, stagger: 0.12, duration: 0.5, ease: 'power3.out' }, 0)
      .fromTo('.cold__aside', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.1)
      .fromTo('.cold__fig', { scale: 0.78, yPercent: -40, rotation: -4, autoAlpha: 0.2 }, { scale: 1, yPercent: -50, rotation: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, 0)
      .fromTo('.cold__list li', { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, stagger: 0.06, duration: 0.2 }, 0.35)
      .fromTo('.cold__tag', { autoAlpha: 0, scale: 1.4, filter: 'blur(14px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0.3px)', duration: 0.3 }, 0.55)
      .fromTo('.cold__buy', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.5)
      .to('.cold__buy polygon', { rotation: 72, transformOrigin: '50% 50%', duration: 0.8, ease: 'none' }, 0.5)
      .fromTo('.cold__bottom > span', { xPercent: 14, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, stagger: 0.12, duration: 0.5, ease: 'power3.out' }, 0.55)
      .fromTo('.cold__meta', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.8)
      .to({}, { duration: 0.4 });
  });
  mm.add('(max-width: 1023px)', () => {
    gsap.fromTo('.cold__top > span', { xPercent: -12, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.cold', start: 'top 70%' } });
    gsap.fromTo('.cold__fig', { scale: 0.86, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.cold__fig', start: 'top 80%' } });
    gsap.fromTo('.cold__bottom > span', { xPercent: 12, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.cold__bottom', start: 'top 85%' } });
  });

  /* ---------- Kombinler (masaüstünde yatay akış) ---------- */
  mm.add('(min-width: 1024px)', () => {
    const dist = () => Math.max(0, row.scrollWidth - innerWidth);
    const tween = gsap.to(row, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '.looks', pin: '.looks__pin', start: 'top top', end: () => `+=${dist()}`, scrub: 0.7, invalidateOnRefresh: true, onUpdate: (s) => setLook(s.progress) },
    });
    $$('.look').forEach((lk) => {
      gsap.fromTo($('img', lk), { yPercent: 8, scale: 0.94 }, { yPercent: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: lk, containerAnimation: tween, start: 'left right', end: 'center center', scrub: true } });
      gsap.fromTo($('.look__num', lk), { xPercent: 30 }, { xPercent: -20, ease: 'none', scrollTrigger: { trigger: lk, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
    });
    return () => setLook(0);
  });

  /* ---------- Doku başlığı harf harf ---------- */
  gsap.fromTo('.doku__item .frame', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut', stagger: 0.15, scrollTrigger: { trigger: '.doku', start: 'top 60%' } });
  gsap.fromTo('.doku__item .hand', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.3, scrollTrigger: { trigger: '.doku', start: 'top 35%' } });
})();
