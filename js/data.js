/* AYAZ — Drop 02 / Kış 26
   Ürün görselleri: img/pXX.webp (ürün), img/look-0N.webp (kombin figürü).
   Gerçek ürün fotoğrafları gelince sadece bu yolları değiştirmen yeterli. */
window.AYAZ = (() => {
  const cats = [
    { slug: 'orgu', name: 'Örgü' },
    { slug: 'pantolon', name: 'Pantolon' },
    { slug: 'dis', name: 'Dış giyim' },
    { slug: 'aksesuar', name: 'Aksesuar' },
  ];

  const products = [
    { id: 'p01', box: [.04, .12, .96, .46], name: 'Ribanalı Örgü Kazak', color: 'Duman', cat: 'orgu', price: 2890, look: 1, isNew: true,
      desc: 'İnce ribanalı, bisiklet yaka. Omuzdan hafif düşer, belde düz biter; gömlek ya da tişört üstüne.',
      specs: ['%70 merinos yün', '%30 poliamid', '12 numara örgü', 'Rahat kalıp'], note: 'en çok satan' },
    { id: 'p02', box: [.1, .43, .9, 1], name: 'Pileli Geniş Pantolon', color: 'Kahve', cat: 'pantolon', price: 2490, look: 1,
      desc: 'Çift pileli, yüksek bel, yere değmeyen geniş paça. Yün karışımı kumaş, ütü izi kalıcı.',
      specs: ['%60 yün', '%40 polyester', 'Yüksek bel', 'Paça 26 cm'], note: 'çift pile' },
    { id: 'p03', box: [.02, .11, .98, .48], name: 'Bukle Gömlek Ceket', color: 'Kül', cat: 'dis', price: 3890, look: 2, isNew: true,
      desc: 'Kuzu yünü hissi veren bukle kumaştan, çıtçıtlı gömlek ceket. İki göğüs cebi, düşük omuz.',
      specs: ['%80 bukle', '%20 yün', 'Çıtçıt kapama', 'Rahat kalıp'], note: 'kuzu yünü hissi' },
    { id: 'p04', box: [.1, .43, .9, 1], name: 'Geniş Paça Pantolon', color: 'Antrasit', cat: 'pantolon', price: 2390, look: 2,
      desc: 'Lastikli bel, tek pile, geniş paça. Sneaker ile de kundura ile de aynı rahatlıkta.',
      specs: ['%65 polyester', '%35 viskon', 'Lastikli bel', 'Paça 28 cm'], note: 'lastikli bel' },
    { id: 'p05', box: [.04, .12, .96, .46], name: 'Tüylü Örgü Kazak', color: 'Tarçın', cat: 'orgu', price: 2690, look: 3,
      desc: 'Alpaka karışımlı, tüylü dokulu kazak. Ekose atkıyla aynı tonlarda düşünüldü.',
      specs: ['%40 alpaka', '%40 yün', '%20 poliamid', 'Rahat kalıp'], note: 'alpaka' },
    { id: 'p06', box: [.24, .12, .76, .56], name: 'Ekose Atkı', color: 'Kahve', cat: 'aksesuar', price: 1290, look: 3,
      desc: 'Uzun, püsküllü, iri kareli ekose atkı. Boyuna iki tur dolanır, yine de uçları diz hizasına iner.',
      specs: ['%100 kuzu yünü', '190 × 35 cm', 'Püsküllü uç', 'Tek beden'], note: '190 cm' },
    { id: 'p07', box: [.1, .43, .9, 1], name: 'Pileli Pantolon', color: 'Kum', cat: 'pantolon', price: 2490, look: 3,
      desc: 'Kum renginde, çift pileli geniş pantolon. Kahve ve tarçın tonlarının yanında en iyi hâlinde.',
      specs: ['%60 yün', '%40 polyester', 'Yüksek bel', 'Paça 26 cm'], note: 'kum' },
    { id: 'p08', box: [0, .1, 1, .86], name: 'Uzun Yün Palto', color: 'Haki', cat: 'dis', price: 7490, look: 4, isNew: true,
      desc: 'Diz altı boy, tek sıra gizli düğme, kalın yün. Kalın bir kazağın üstüne bile rahat girer.',
      specs: ['%80 yün', '%20 poliamid', 'Diz altı boy', 'Tam astarlı'], note: 'diz altı' },
    { id: 'p09', box: [.04, .12, .96, .47], name: 'Mohair Kazak', color: 'Sis', cat: 'orgu', price: 3190, look: 5,
      desc: 'Mohair karışımı; hafif ama sıcak. Düşük omuz, kalın manşet, hafif oversize.',
      specs: ['%45 mohair', '%35 yün', '%20 poliamid', 'Oversize'], note: 'hafif, sıcak' },
    { id: 'p10', box: [.28, 0, .72, .1], name: 'Beyzbol Şapka', color: 'Krem', cat: 'aksesuar', price: 690, look: 5,
      desc: 'Yıkanmış pamuk, altı panel, arkadan ayarlanır. Siperi hafif kıvrık gelir.',
      specs: ['%100 pamuk', 'Altı panel', 'Ayarlanabilir', 'Tek beden'], note: 'yıkanmış pamuk' },
    { id: 'p11', box: [.04, .12, .96, .44], name: 'Kalın Örgü Kazak', color: 'Ekru', cat: 'orgu', price: 3290, look: 6,
      desc: 'Balıkçı örgü dokulu kalın kazak. Kısa boy, geniş kol; yüksek bel pantolonla orantılı durur.',
      specs: ['%60 yün', '%40 akrilik', 'Kısa boy', 'Oversize'], note: 'kalın ribana' },
    { id: 'p12', box: [.28, 0, .72, .1], name: 'Balıkçı Bere', color: 'Zeytin', cat: 'aksesuar', price: 590, look: 6,
      desc: 'Kısa kesim balıkçı bere. Kulak üstünde durur, katlanmış kenarı çift kat.',
      specs: ['%100 merinos', 'Çift kat kenar', 'Kısa kesim', 'Tek beden'], note: 'kulak üstü' },
    { id: 'p13', box: [0, .1, 1, .88], name: 'Oversize Yün Palto', color: 'Siyah', cat: 'dis', price: 8990, look: 7, isNew: true,
      desc: 'Bileğe yakın boy, geniş yaka, düşük omuz. Drop 02’nin ana parçası.',
      specs: ['%80 yün', '%20 kaşmir', 'Uzun boy', 'Oversize'], note: 'ana parça' },
    { id: 'p14', box: [.3, .1, .7, .42], name: 'Yarım Fermuarlı Triko', color: 'Kırık beyaz', cat: 'orgu', price: 2790, look: 7,
      desc: 'Kalın ribanalı, yarım fermuarlı triko. Paltonun altında da tek başına da.',
      specs: ['%70 yün', '%30 poliamid', 'Metal fermuar', 'Rahat kalıp'], note: 'metal fermuar' },
  ];

  const looks = [
    { n: 1, name: 'Duman & Kahve', items: ['p01', 'p02'] },
    { n: 2, name: 'Kül', items: ['p03', 'p04'] },
    { n: 3, name: 'Tarçın', items: ['p05', 'p06', 'p07'] },
    { n: 4, name: 'Haki', items: ['p08'] },
    { n: 5, name: 'Sis', items: ['p09', 'p10'] },
    { n: 6, name: 'Ekru', items: ['p11', 'p12'] },
    { n: 7, name: 'Gece', items: ['p13', 'p14'] },
  ];

  const DETAIL = { 1: 'd-pile', 2: 'd-bukle', 3: 'd-tuylu', 4: 'd-yun', 5: 'd-mohair', 6: 'd-ribana', 7: 'd-gece' };
  const SIZES = ['S', 'M', 'L', 'XL'];
  const ONE = ['p06', 'p10', 'p12'];
  const FREE = 3000;
  const byId = (id) => products.find((p) => p.id === id);
  const lookOf = (n) => looks.find((l) => l.n === n);
  const price = (n) => `₺${n.toLocaleString('tr-TR')}`;
  const img = (p) => `img/${p.id}.webp`;
  const lookImg = (n, sm) => `img/look-0${n}${sm ? '-sm' : ''}.webp`;
  const catName = (s) => cats.find((c) => c.slug === s)?.name || '';
  const detail = (p) => `img/${DETAIL[p.look]}.webp`;
  const sizes = (p) => (ONE.includes(p.id) ? ['Tek beden'] : SIZES);

  return { cats, products, looks, byId, lookOf, price, img, lookImg, catName, sizes, detail, FREE };
})();
