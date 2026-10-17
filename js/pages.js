/* İç sayfalar: iletişim formu, hikâye sayfası animasyonları, 404 */
(() => {
  const { $, $$, gsap, ST, motion, pen } = window.APP;

  /* ---------- İletişim formu (yardım) ---------- */
  const form = $('[data-contact]');
  if (form) {
    const rules = {
      'c-name': (v) => v.length > 1 || 'Adını yaz.',
      'c-mail': (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Geçerli bir e-posta adresi gir.',
      'c-msg': (v) => v.length > 9 || 'Mesajın en az 10 karakter olsun.',
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let first = null;
      Object.entries(rules).forEach(([id, fn]) => {
        const el = $(`#${id}`); const r = fn(el.value.trim()); const msg = r === true ? '' : r;
        $(`[data-err="${id}"]`).textContent = msg; el.setAttribute('aria-invalid', String(!!msg));
        if (msg && !first) first = el;
      });
      const out = $('[data-contact-msg]');
      if (first) { first.focus(); out.textContent = ''; return; }
      out.textContent = 'Mesajın alındı. Hafta içi aynı gün dönüyoruz. (Prototip: mesaj bir yere gönderilmedi.)';
      form.reset();
    });
  }

  if (!motion) return;

  /* ---------- Hikâye: büyük metin kelime kelime koyulaşır ---------- */
  $$('.story-text .big').forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
    gsap.to($$('.w', el), { color: '#141413', stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true } });
  });
  $$('.story-hero__img img, .story-pair img').forEach((img) => {
    gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  if ($('.story-hero')) {
    gsap.fromTo('.story-hero .ln > span', { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: 0.1 });
    gsap.fromTo('.story-hero__img', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut', delay: 0.3 });
  }

  /* ---------- 404 ---------- */
  if ($('.nf')) {
    gsap.fromTo('.nf__num', { yPercent: 20, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.2, ease: 'expo.out' });
    const s = $('.nf .pen');
    if (s) setTimeout(() => pen.draw(s, { duration: 1.2 }), 500);
  }
})();
