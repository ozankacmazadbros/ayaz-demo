/* Ödeme: iletişim, adres, kargo, onay. Gerçek ödeme alınmaz;
   ödeme altyapısı (iyzico, PayTR vb.) bağlanınca "Siparişi onayla" oraya yönlenir. */
(() => {
  const { D, $, $$, gsap, motion, ARR, bag, pen, initPens } = window.APP;
  const box = $('[data-co]');
  const SHIP = [
    { id: 'std', name: 'Standart kargo', note: '1–3 iş günü', price: (sub) => (sub >= D.FREE ? 0 : 89) },
    { id: 'fast', name: 'Ertesi gün teslimat', note: 'Yalnızca İstanbul, 15:00’e kadar verilen siparişler', price: () => 149 },
    { id: 'store', name: 'Atölyeden teslim al', note: 'Karaköy, ertesi gün 12:00’den sonra', price: () => 0 },
  ];
  const DEMO_CODE = 'AYAZ10';
  let ship = 'std';
  let discount = 0;

  function totals() {
    const sub = bag.total();
    const s = SHIP.find((x) => x.id === ship).price(sub);
    const disc = Math.round(sub * discount);
    return { sub, ship: s, disc, total: sub - disc + s };
  }

  function summaryHTML() {
    const t = totals();
    return `
      <ul class="co-items">${bag.items().map((i) => {
        const p = D.byId(i.id);
        return `<li><span class="co-items__img"><img src="${D.img(p)}" alt=""><b class="mono">${i.qty}</b></span>
          <span><span class="d4">${p.name}</span><span class="mono muted">${p.color} · ${i.size}</span></span>
          <span class="mono">${D.price(p.price * i.qty)}</span></li>`;
      }).join('')}</ul>
      <div class="co-code">
        <label class="sr-only" for="code">İndirim kodu</label>
        <input id="code" class="co-input" placeholder="İndirim kodu" autocomplete="off" value="${discount ? DEMO_CODE : ''}">
        <button type="button" class="btn btn--line" data-code>Uygula</button>
      </div>
      <p class="mono co-code__msg" data-code-msg aria-live="polite">${discount ? 'AYAZ10 uygulandı: %10 indirim.' : ''}</p>
      <dl class="co-sum mono">
        <div><dt>Ara toplam</dt><dd>${D.price(t.sub)}</dd></div>
        ${t.disc ? `<div><dt>İndirim</dt><dd>−${D.price(t.disc)}</dd></div>` : ''}
        <div><dt>Kargo</dt><dd>${t.ship ? D.price(t.ship) : 'Ücretsiz'}</dd></div>
        <div class="co-sum__total"><dt>Toplam</dt><dd>${D.price(t.total)}</dd></div>
      </dl>
      <p class="mono muted">Fiyatlara KDV dahildir. Peşin fiyatına 3 taksit.</p>`;
  }

  function field(id, label, attrs = '', full = false) {
    return `<div class="co-fld${full ? ' co-fld--full' : ''}"><label class="mono" for="${id}">${label}</label><input id="${id}" name="${id}" class="co-input" ${attrs}><p class="co-err mono" data-err="${id}"></p></div>`;
  }

  function render() {
    if (!bag.items().length) {
      box.innerHTML = `<div class="co-empty"><p class="d2">Çantan boş.</p><p class="lede">Ödemeye geçmeden önce bir kat ekle.</p><a class="btn" href="shop.html">Mağazaya gir ${ARR}</a></div>`;
      return;
    }
    box.innerHTML = `
      <div class="co-grid">
        <form class="co-form" novalidate data-form>
          <fieldset><legend class="d4">1 — İletişim</legend>
            <div class="co-row">
              ${field('email', 'E-posta', 'type="email" autocomplete="email" inputmode="email" placeholder="ad@eposta.com"')}
              ${field('phone', 'Telefon', 'type="tel" autocomplete="tel" inputmode="tel" placeholder="05xx xxx xx xx"')}
            </div>
          </fieldset>
          <fieldset><legend class="d4">2 — Teslimat adresi</legend>
            <div class="co-row">
              ${field('name', 'Ad', 'autocomplete="given-name"')}
              ${field('surname', 'Soyad', 'autocomplete="family-name"')}
              ${field('address', 'Adres', 'autocomplete="street-address" placeholder="Mahalle, sokak, bina ve daire no"', true)}
              ${field('city', 'İl', 'autocomplete="address-level1" placeholder="İstanbul"')}
              ${field('district', 'İlçe', 'autocomplete="address-level2" placeholder="Beyoğlu"')}
              ${field('zip', 'Posta kodu', 'autocomplete="postal-code" inputmode="numeric" maxlength="5" placeholder="34425"')}
            </div>
          </fieldset>
          <fieldset><legend class="d4">3 — Teslimat yöntemi</legend>
            <div class="co-ship" role="radiogroup" aria-label="Teslimat yöntemi">
              ${SHIP.map((s) => `<label class="co-opt"><input type="radio" name="ship" value="${s.id}"${s.id === ship ? ' checked' : ''}><span><b>${s.name}</b><span class="mono muted">${s.note}</span></span><span class="mono" data-ship-price="${s.id}"></span></label>`).join('')}
            </div>
          </fieldset>
          <fieldset><legend class="d4">4 — Ödeme</legend>
            <div class="co-pay">
              <p><b>Kartla güvenli ödeme</b></p>
              <p class="muted">Siparişi onayladığında ödeme sağlayıcının güvenli sayfasında kart bilgilerini gireceksin; kart bilgilerin AYAZ’a gelmez.</p>
              <p class="mono muted">Bu prototipte gerçek ödeme alınmaz.</p>
            </div>
            <label class="co-check"><input type="checkbox" id="terms"><span><a href="yasal.html#mesafeli">Mesafeli satış sözleşmesini</a> ve <a href="yasal.html#onbilgi">ön bilgilendirme formunu</a> okudum, onaylıyorum.</span></label>
            <p class="co-err mono" data-err="terms"></p>
          </fieldset>
          <div class="buy co-buy">
            <button type="submit" class="oct" aria-label="Siparişi onayla">
              <svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,2 78.2,11.2 95.7,35.2 95.7,64.8 78.2,88.8 50,98 21.8,88.8 4.3,64.8 4.3,35.2 21.8,11.2"/></svg>
              <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9"/></svg>
            </button>
            <div class="buy__txt"><span class="mono">Siparişi onayla</span><b data-total></b></div>
          </div>
        </form>
        <aside class="co-side" aria-label="Sipariş özeti">
          <details class="co-sumbox" open>
            <summary class="mono"><span>Sipariş özeti</span><span data-total-sm></span></summary>
            <div data-summary>${summaryHTML()}</div>
          </details>
        </aside>
      </div>`;
    updatePrices();
    // masaüstünde özet hep açık, mobilde kapalı başlar
    const mq = matchMedia('(min-width: 900px)');
    const sync = () => { const sb = $('.co-sumbox'); if (sb) sb.open = mq.matches; };
    sync();
    mq.addEventListener('change', sync);
  }

  function updatePrices() {
    const t = totals();
    $('[data-total]').textContent = D.price(t.total);
    $('[data-total-sm]').textContent = D.price(t.total);
    SHIP.forEach((s) => { const p = s.price(t.sub); $(`[data-ship-price="${s.id}"]`).textContent = p ? D.price(p) : 'Ücretsiz'; });
    $('[data-summary]').innerHTML = summaryHTML();
  }

  const RULES = {
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Geçerli bir e-posta adresi gir.',
    phone: (v) => /^0?5\d{9}$/.test(v.replace(/\D/g, '').replace(/^90/, '')) || 'Telefonu 05xx xxx xx xx biçiminde yaz.',
    name: (v) => v.length > 1 || 'Adını yaz.',
    surname: (v) => v.length > 1 || 'Soyadını yaz.',
    address: (v) => v.length > 9 || 'Adresi mahalle, sokak ve numarayla yaz.',
    city: (v) => v.length > 1 || 'İli yaz.',
    district: (v) => v.length > 1 || 'İlçeyi yaz.',
    zip: (v) => /^\d{5}$/.test(v) || 'Posta kodu 5 rakam olmalı.',
  };
  function check(id) {
    const el = $(`#${id}`); const r = RULES[id](el.value.trim());
    const msg = r === true ? '' : r;
    $(`[data-err="${id}"]`).textContent = msg;
    el.setAttribute('aria-invalid', String(!!msg));
    return !msg;
  }

  box.addEventListener('change', (e) => {
    if (e.target.name === 'ship') { ship = e.target.value; updatePrices(); }
  });
  box.addEventListener('focusout', (e) => { if (RULES[e.target.id] && e.target.value) check(e.target.id); });
  box.addEventListener('click', (e) => {
    if (!e.target.closest('[data-code]')) return;
    const v = $('#code').value.trim().toUpperCase();
    discount = v === DEMO_CODE ? 0.1 : 0;
    updatePrices();
    if (!discount) $('[data-code-msg]').textContent = v ? 'Bu kod geçerli değil.' : 'Bir kod yaz.';
  });
  box.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = Object.keys(RULES).filter((id) => !check(id));
    const terms = $('#terms').checked;
    $('[data-err="terms"]').textContent = terms ? '' : 'Devam etmek için sözleşmeyi onayla.';
    if (bad.length || !terms) { (bad.length ? $(`#${bad[0]}`) : $('#terms')).focus(); return; }
    done();
  });

  function done() {
    const t = totals();
    const no = `AYZ-${Date.now().toString().slice(-6)}`;
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const method = SHIP.find((x) => x.id === ship).name.toLocaleLowerCase('tr');
    bag.clear();
    box.innerHTML = `
      <div class="co-done">
        <div class="co-done__mark">
          <p class="d1"><span class="ln"><span>Teşekkürler,</span></span><span class="ln"><span>${name}.</span></span></p>
          <svg class="pen" data-pen='[{"t":"under","x0":2,"x1":70,"y":98}]' data-manual data-seed="6" aria-hidden="true"></svg>
        </div>
        <p class="lede">Siparişin alındı. Onay e-postası <b>${email}</b> adresine gidecek; kargo takip numarası da ayrıca gelecek.</p>
        <dl class="co-sum mono" style="max-width:420px">
          <div><dt>Sipariş no</dt><dd>${no}</dd></div>
          <div><dt>Teslimat</dt><dd>${method}</dd></div>
          <div class="co-sum__total"><dt>Toplam</dt><dd>${D.price(t.total)}</dd></div>
        </dl>
        <p class="mono muted">Bu bir prototip: ödeme alınmadı, sipariş kaydedilmedi.</p>
        <a class="btn" href="shop.html">Alışverişe dön ${ARR}</a>
      </div>`;
    initPens(box);
    const s = $('.co-done .pen');
    if (motion) {
      gsap.fromTo('.co-done .ln > span', { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 });
      setTimeout(() => pen.draw(s, { duration: 0.9 }), 600);
    } else pen.draw(s);
    window.scrollTo({ top: 0 });
  }

  render();
  if (motion) gsap.fromTo('.co-head .ln > span', { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', delay: 0.1 });
})();
