'use strict';

/* ════════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const PRAYERS = [
  { text:"اللهم ارحم الشهيد عبد الرحمن محيسن واغفر له واجعل الفردوس الأعلى داره.", cat:"أدعية قصيرة" },
  { text:"اللهم اجعل قبره نورًا وراحةً وسكينة.", cat:"أدعية قصيرة" },
  { text:"اللهم اغفر له ذنوبه، وارفع درجته بين الشهداء والصالحين.", cat:"أدعية قصيرة" },
  { text:"اللهم اجعل روحه في نعيمٍ دائم لا ينقطع.", cat:"أدعية قصيرة" },
  { text:"اللهم آنس وحشته في القبر، واجعل الجنة مأواه.", cat:"أدعية قصيرة" },
  { text:"اللهم ارزقه لذة النظر إلى وجهك الكريم.", cat:"أدعية قصيرة" },
  { text:"اللهم تقبّله قبولًا حسنًا، واجعل أعماله نورًا له يوم القيامة.", cat:"أدعية قصيرة" },
  { text:"اللهم اجعل الملائكة تستقبله بالبشرى والرحمة والسلام.", cat:"أدعية قصيرة" },
  { text:"اللهم وسّع قبره، وافتح له بابًا من أبواب الجنة.", cat:"أدعية قصيرة" },
  { text:"اللهم اجعل روحه مطمئنةً في أعلى عليين.", cat:"أدعية قصيرة" },
  { text:"اللهم اجعل قبره روضةً من رياض الجنة، ولا تجعله حفرةً من حفر النار.", cat:"أدعية قصيرة" },
  { text:"اللهم اجعل دعوات الأحبة له نورًا ورحمةً تصل إليه.", cat:"أدعية قصيرة" },
  { text:"اللهم ارزقه نعيمًا خالدًا لا تعب فيه ولا حزن.", cat:"أدعية قصيرة" },
  { text:"اللهم اجعله من الضاحكين المستبشرين بما آتاهم الله من فضله.", cat:"أدعية قصيرة" },
  { text:"اللهم ارحمه بقدر شوق من أحبّوه إليه، واجمعهم به في الجنة.", cat:"أدعية قصيرة" },
  { text:"اللهم اجعل ذكره طيبًا، وأثره باقيًا بالخير والمحبة.", cat:"أدعية قصيرة" },
  { text:"اللهم اربط على قلوب أهله وأحبابه بالصبر والسكينة والرضا.", cat:"أدعية قصيرة" },
  { text:"اللهم اجعل نوره يسعى بين يديه يوم القيامة، وآمنه من الفزع الأكبر.", cat:"أدعية قصيرة" },
  { text:"اللهم تقبّله في عبادك الصالحين، واجعل الجنة مستقره الأبدي.", cat:"أدعية قصيرة" },
  { text:"اللهم ارزقه رحمةً واسعة تشمل روحه الطاهرة إلى يوم الدين.", cat:"أدعية قصيرة" },
  { text:"اللهم ارحم الشهيد عبد الرحمن محيسن رحمةً تملأ السماوات والأرض، واجعل الجنة دار مقامه، وأكرمه بلذة النظر إلى وجهك الكريم.", cat:"أدعية طويلة" },
  { text:"اللهم اجعل له في كل لحظةٍ رحمة، وفي كل دعوةٍ نورًا، وفي كل آيةٍ سكينةً وطمأنينة.", cat:"أدعية طويلة" },
  { text:"اللهم إنّه بين يديك، فارفع مقامه، وأكرم نزله، واجعل الملائكة تؤنسه في قبره وتبشّره بالرضوان.", cat:"أدعية طويلة" },
  { text:"اللهم اجعل روحه ترفرف في جنات النعيم، مطمئنةً برحمتك، فرِحةً بما أعددته له من الخير العظيم.", cat:"أدعية طويلة" },
  { text:"اللهم أبدله عن ضيق الدنيا سعة الجنة، وعن تعب الحياة راحةً أبدية لا حزن بعدها ولا ألم.", cat:"أدعية طويلة" },
  { text:"اللهم اجعل قبره ممتلئًا بالنور، واجعل الدعاء له بابًا من الرحمة يصل إليه في كل حين.", cat:"أدعية طويلة" },
  { text:"اللهم إنّ القلوب قد اشتاقت إليه، فارزق من أحبّه الصبر، واجمعهم به في الفردوس الأعلى دون فراق.", cat:"أدعية طويلة" },
  { text:"اللهم اجعل حسناته تتضاعف بعد موته، واجعل أثره الطيب باقيًا بين الناس إلى يوم الدين.", cat:"أدعية طويلة" },
  { text:"اللهم اكتب له نعيمًا دائمًا، واجعل ابتسامته في الجنة أجمل من كل ما فقده في الدنيا.", cat:"أدعية طويلة" },
  { text:"اللهم ارزقه راحةً لا تنتهي، وسعادةً لا تزول، ورحمةً تظلّه إلى قيام الساعة.", cat:"أدعية طويلة" },
  { text:"اللهم اجعل القرآن أنيسه في قبره، ونوره في ظلمات يوم القيامة، وشفيعه عند لقائك.", cat:"أدعية طويلة" },
  { text:"اللهم إنّه رحل عن الدنيا سريعًا، فاجعل لقاءه بك مليئًا بالعفو والرحمة والمغفرة والرضوان.", cat:"أدعية طويلة" },
  { text:"اللهم اجعل الملائكة تحفّ قبره بالدعاء والسلام، واكتب له منازل الصالحين والشهداء.", cat:"أدعية طويلة" },
  { text:"اللهم اجعل كل دمعة حزنٍ عليه سببًا لرحمةٍ تنزل عليه، وكل دعاءٍ له رفعةً في درجاته.", cat:"أدعية طويلة" },
  { text:"اللهم لا تحرمه نعيم الجنة، ولا تحرم أهله أجر الصبر، واجعل النهاية لقاءً جميلًا في جناتك.", cat:"أدعية طويلة" },
  { text:"اللهم اجعل له بابًا مفتوحًا إلى الفردوس، تأتيه منه الرحمة والسكينة والرضا في كل وقت.", cat:"أدعية طويلة" },
  { text:"اللهم إنّ ذكراه باقية في القلوب، فاجعل مكانته عندك أعظم، وارزقه النعيم المقيم الذي لا يفنى.", cat:"أدعية طويلة" },
  { text:"اللهم اجعل روحه في راحةٍ دائمة، وأبدله عن وحشة القبر أُنسًا ورحمةً ونورًا من عندك.", cat:"أدعية طويلة" },
  { text:"اللهم تقبّل دعوات المحبّين له، واجعلها سببًا في زيادة رحمته وعلوّ منزلته عندك.", cat:"أدعية طويلة" },
  { text:"اللهم اختم له برضاك الكامل، واجعله من عبادك الذين لا خوفٌ عليهم ولا هم يحزنون.", cat:"أدعية طويلة" },
];

const DHIKRS = [
  "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
  "سبحان الله وبحمده، سبحان الله العظيم",
  "أستغفر الله العظيم وأتوب إليه",
  "لا حول ولا قوة إلا بالله العلي العظيم",
  "اللهم صلِّ على محمد وعلى آل محمد كما صليت على إبراهيم وعلى آل إبراهيم",
  "وَاذْكُر رَّبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً وَدُونَ الْجَهْرِ مِنَ الْقَوْلِ بِالْغُدُوِّ وَالْآصَالِ",
];

const VERSES = [
  "وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا ۖ وَسَبِّحْ بِحَمْدِ رَبِّكَ حِينَ تَقُومُ",
  "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
  "وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ",
  "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
  "وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا ۚ بَلْ أَحْيَاءٌ عِندَ رَبِّهِمْ يُرْزَقُونَ",
  "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
];

const DEFAULT_TASBEEHS = [
  { id:"dhikr_1", name:"سبحان الله",      count:0, total:0 },
  { id:"dhikr_2", name:"الحمد لله",       count:0, total:0 },
  { id:"dhikr_3", name:"الله أكبر",       count:0, total:0 },
  { id:"dhikr_4", name:"لا إله إلا الله", count:0, total:0 },
  { id:"dhikr_5", name:"لا إله إلا أنت سبحانك إني كنت من الظالمين", count:0, total:0 },
];

const DEFAULT_DEEDS = [
  { id:"deed_1", title:"قراءة الفاتحة ووهب ثوابها للشهيد",                      count:0, ts:0 },
  { id:"deed_2", title:"قراءة سورة الملك ووهب ثوابها للشهيد",                   count:0, ts:0 },
  { id:"deed_3", title:"مئة تسبيحة واستغفار بنية الأجر له",                     count:0, ts:0 },
  { id:"deed_4", title:"الصدقة المادية أو المعنوية كصدقة جارية للشهيد",         count:0, ts:0 },
  { id:"deed_5", title:"الدعاء للشهيد بالرحمة والمغفرة بظهر الغيب",             count:0, ts:0 },
  { id:"deed_6", title:"ركعتين نافلة بنية نيل رضا الله وإهداء الثواب للشهيد",  count:0, ts:0 },
];

const COMPLETION_MSGS = [
  "اللهم تقبلها عن روح الشهيد 🤍",
  "جزاك الله خيرًا، وصل ثوابك للشهيد بإذن الله ✨",
  "بارك الله فيك، نورٌ وصل إليه إن شاء الله 🌙",
  "أجرك محفوظ عند الله، والشهيد يشكرك 💜",
  "اللهم اجعل هذا العمل في ميزان حسناته 🤲",
];

const MENU_ITEMS = [
  { id:"prayers",  label:"الأدعية والأذكار",       sub:"أدعية مُهداة للشهيد",          emoji:"📖", color:"#4A90E2" },
  { id:"tasbeeh",  label:"المسبحة الإلكترونية",     sub:"ذكر الله وتسبيحه",             emoji:"📿", color:"#9013FE" },
  { id:"deeds",    label:"أعمال صالحة للأثر",       sub:"صدقة جارية لروحه",             emoji:"✅", color:"#4CAF50" },
  { id:"wird",     label:"الورد الروحي لليوم",      sub:"دعاء وذكر وآية",               emoji:"🌙", color:"#FF6B6B" },
  { id:"memorial", label:"الذكرى والسيرة",          sub:"تذكّر الشهيد",                emoji:"🕊️", color:"#E91E8C" },
  { id:"settings", label:"الإعدادات",               sub:"الخط والمظهر وإعادة التعيين",  emoji:"⚙️", color:"#607D8B" },
];

/* ════════════════════════════════════════
   STORAGE HELPERS
═══════════════════════════════════════ */
const LS = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (k, v)   => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

function loadTasbeehs()      { return LS.get('athar_tasbeehs', structuredClone(DEFAULT_TASBEEHS)); }
function saveTasbeehs(d)     { LS.set('athar_tasbeehs', d); }
function loadDeeds()         { return LS.get('athar_deeds', structuredClone(DEFAULT_DEEDS)); }
function saveDeeds(d)        { LS.set('athar_deeds', d); }
function loadCustomPrayers() { return LS.get('athar_custom_prayers', []); }
function saveCustomPrayers(d){ LS.set('athar_custom_prayers', d); }
function loadFavorites()     { return new Set(LS.get('athar_favorites', [])); }
function saveFavorites(s)    { LS.set('athar_favorites', [...s]); }
function loadSettings()      { return LS.get('athar_settings', { fontName:'Cairo', fontSize:1.0, haptic:true }); }
function saveSettings(d)     { LS.set('athar_settings', d); }
function loadHearts()        { return LS.get('athar_hearts', 0); }
function saveHearts(n)       { LS.set('athar_hearts', n); }

/* ════════════════════════════════════════
   APP STATE
═══════════════════════════════════════ */
const S = {
  page: 'home',
  hearts: loadHearts(),
  settings: loadSettings(),
  // Prayers
  pCat: 'أدعية قصيرة',
  pMode: 0,          // 0=slider 1=list
  pIdx: 0,
  customPrayers: loadCustomPrayers(),
  favorites: loadFavorites(),
  // Tasbeeh
  tasbeehs: loadTasbeehs(),
  selectedDhikr: 'dhikr_1',
  // Deeds
  deeds: loadDeeds(),
  // Wird
  wirdPrayer: rnd(PRAYERS).text,
  wirdDhikr: DHIKRS[0],
  wirdVerse: VERSES[0],
  wirdCopied: {},    // key -> bool
};

/* ════════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function svgIcon(d, size=18, extra='') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
}
const ICONS = {
  back:     '<polyline points="9 18 15 12 9 6"/>',
  copy:     '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  share:    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  heart:    '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  trash:    '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>',
  plus:     '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  refresh:  '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  check:    '<polyline points="20 6 9 17 4 12"/>',
  checkCircle:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  info:     '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  grid:     '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  list:     '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  reset:    '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.1"/>',
  type:     '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
  vibrate:  '<path d="M2 8v8"/><path d="M5 5v14"/><path d="M22 8v8"/><path d="M19 5v14"/><rect x="8" y="3" width="8" height="18" rx="2"/>',
  chevL:    '<polyline points="15 18 9 12 15 6"/>',
  chevR:    '<polyline points="9 18 15 12 9 6"/>',
};

function getFont() {
  const f = S.settings.fontName;
  return f === 'Amiri' ? "'Amiri', serif" : f === 'Tajawal' ? "'Tajawal', sans-serif" : "'Cairo', sans-serif";
}

function applyFont() {
  document.documentElement.style.setProperty('--font-main', getFont());
  document.documentElement.style.setProperty('--font-scale', S.settings.fontSize);
}

/* ════════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
let toastTimer = null;
function showToast(msg, dur=2500) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), dur);
}

/* ════════════════════════════════════════
   CLIPBOARD / SHARE
═══════════════════════════════════════ */
function copyText(text, btnEl) {
  navigator.clipboard.writeText(text).then(() => {
    if (btnEl) {
      btnEl.classList.add('done');
      const orig = btnEl.innerHTML;
      btnEl.innerHTML = svgIcon(ICONS.check, 13) + ' نُسخ';
      setTimeout(() => { btnEl.innerHTML = orig; btnEl.classList.remove('done'); }, 2000);
    } else { showToast('تم النسخ ✓'); }
  });
}
function shareText(text) {
  if (navigator.share) navigator.share({ text });
  else { navigator.clipboard.writeText(text); showToast('تم النسخ للمشاركة'); }
}

/* ════════════════════════════════════════
   MODAL
═══════════════════════════════════════ */
function showModal(html, onReady) {
  const ov = document.getElementById('overlay');
  ov.innerHTML = `<div class="modal">${html}</div>`;
  ov.classList.remove('hidden');
  ov.addEventListener('click', e => { if (e.target === ov) closeModal(); }, { once: true });
  if (onReady) onReady(ov.querySelector('.modal'));
}
function closeModal() { document.getElementById('overlay').classList.add('hidden'); }

/* ════════════════════════════════════════
   NAVIGATE
═══════════════════════════════════════ */
function navigate(page) {
  S.page = page;
  S.wirdCopied = {};
  render();
}

/* ════════════════════════════════════════
   RENDER DISPATCH
═══════════════════════════════════════ */
function render() {
  applyFont();
  const app = document.getElementById('app');
  const pages = { home:renderHome, prayers:renderPrayers, tasbeeh:renderTasbeeh, deeds:renderDeeds, wird:renderWird, memorial:renderMemorial, settings:renderSettings };
  app.innerHTML = (pages[S.page] || renderHome)();
  bindEvents();
}

/* ════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════ */
function renderHome() {
  const daily = rnd(PRAYERS);
  const heartLabel = S.hearts > 0 ? `${S.hearts} دعاء أُهدي له` : 'أهدِ دعاءك للشهيد';
  const heartActive = S.hearts > 0 ? 'active' : '';

  const grid = MENU_ITEMS.map(item => `
    <button class="menu-item" data-nav="${item.id}">
      <div class="menu-icon" style="background:${item.color}18;border:1px solid ${item.color}30;">${item.emoji}</div>
      <div>
        <div class="menu-label">${item.label}</div>
        <div class="menu-sub">${item.sub}</div>
      </div>
    </button>`).join('');

  return `<div class="page">
    <div class="home-hero">
      <div class="app-icon"><img src="./app_icon.png" alt="أثر الشهيد"/></div>
      <h1 class="home-title gold">أثر الشهيد</h1>
      <p class="home-sub">صدقة جارية لروح الشهيد عبد الرحمن محيسن</p>
      <button class="heart-btn ${heartActive}" id="heartBtn">
        ${svgIcon(ICONS.heart,16)} ${esc(heartLabel)}
      </button>
    </div>
    <div class="daily-card clay" style="margin:1rem auto;max-width:520px;width:calc(100% - 2rem);">
      <div class="daily-label">🤲 دعاء اليوم</div>
      <div class="daily-text">${esc(daily.text)}</div>
    </div>
    <div class="scroll-body" style="padding-top:0;">
      <div class="menu-grid">${grid}</div>
      <div class="home-footer">
        <p>اللهم اجعل هذا الموقع صدقة جارية لروح الشهيد عبد الرحمن محيسن</p>
        <p>آمين يا رب العالمين</p>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════
   PRAYERS PAGE
═══════════════════════════════════════ */
function getPrayersList() {
  const custom = S.customPrayers.filter(p => p.cat === S.pCat)
    .map(p => ({ ...p, isCustom:true }));
  const stat = PRAYERS.filter(p => p.cat === S.pCat)
    .map((p,i) => ({ id:`s_${i}`, text:p.text, cat:p.cat, isCustom:false }));
  return [...stat, ...custom];
}
function pCatCount(cat) {
  return PRAYERS.filter(p=>p.cat===cat).length + S.customPrayers.filter(p=>p.cat===cat).length;
}

function renderPrayers() {
  const prayers = getPrayersList();
  const idx = Math.min(S.pIdx, prayers.length - 1);
  const cur = prayers[idx] || { text:'', id:'', isCustom:false };

  const cats = [
    { label:'أدعية قصيرة', sub:`${pCatCount('أدعية قصيرة')} دعاءً تفيض بالرحمة` },
    { label:'أدعية طويلة', sub:`${pCatCount('أدعية طويلة')} مناجاة بأجر عظيم` },
  ];
  const catBtns = cats.map(c=>`
    <button class="cat-btn ${S.pCat===c.label?'active':''}" data-cat="${c.label}">
      <div class="cat-btn-label">${c.label}</div>
      <div class="cat-btn-sub">${c.sub}</div>
    </button>`).join('');

  const favKey = cur.id;
  const isFav = S.favorites.has(favKey);
  const sliderContent = prayers.length === 0
    ? `<div class="prayer-text-big">لا توجد أدعية</div>`
    : `
    <div class="slider-top">
      <div class="slider-top-right">
        ${cur.isCustom ? `<button class="delete-btn" id="delCurPrayer" title="حذف">${svgIcon(ICONS.trash,16)}</button>` : '<div style="width:32px"></div>'}
        <span class="slider-counter">${idx+1} / ${prayers.length}${cur.isCustom?` <span class="custom-badge">مخصص</span>`:''}</span>
      </div>
      <button class="fav-btn ${isFav?'active':''}" id="favBtn">
        ${svgIcon(ICONS.heart, 18, isFav ? 'style="fill:var(--purple-lt)"' : '')}
      </button>
    </div>
    <div class="prayer-text-big">${esc(cur.text)}</div>
    <div class="slider-actions">
      <button class="copy-btn" id="sliderCopy">${svgIcon(ICONS.copy,14)} نسخ</button>
      <button class="share-btn" id="sliderShare">${svgIcon(ICONS.share,14)} مشاركة</button>
    </div>`;

  const dots = prayers.slice(0,9).map((_,i)=>`<button class="dot ${i===idx?'active':''}" data-dot="${i}"></button>`).join('');

  const listItems = prayers.map((p,i) => {
    const fk = p.id;
    const isF = S.favorites.has(fk);
    return `<div class="prayer-list-item">
      <div class="clay">
        <div class="deed-row" style="flex-direction:column;gap:.5rem;padding:.85rem;">
          <p class="prayer-list-text">${esc(p.text)}</p>
          <div class="prayer-list-actions">
            <button class="fav-btn fav-list-btn ${isF?'active':''}" data-fk="${esc(fk)}" style="display:flex;align-items:center;gap:.3rem;font-size:.75rem;color:${isF?'var(--purple)':'rgba(149,117,205,.6)'};">
              ${svgIcon(ICONS.heart,14,isF?'style="fill:var(--purple-lt)"':'')} ${isF?'مفضّل':'أضف للمفضلة'}
            </button>
            <div style="display:flex;gap:.4rem;">
              ${p.isCustom ? `<button class="deed-del-btn list-del-prayer" data-cid="${p.id}">${svgIcon(ICONS.trash,14)}</button>` : ''}
              <button class="copy-btn list-copy-prayer" data-text="${esc(p.text)}">${svgIcon(ICONS.copy,14)}</button>
              <button class="share-btn list-share-prayer" data-text="${esc(p.text)}">${svgIcon(ICONS.share,14)}</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  return `<div class="page">
    <div class="hdr">
      <button class="hdr-btn" data-nav="home">${svgIcon(ICONS.back)} عودة</button>
      <span class="hdr-title">أدعية وأذكار الشهيد</span>
      <div class="hdr-side"></div>
    </div>
    <div class="scroll-body pb-24">
      <div class="cat-row">${catBtns}</div>
      <div class="mode-toggle">
        <button class="mode-btn ${S.pMode===0?'active':''}" data-mode="0">${svgIcon(ICONS.grid,16)} نظام البطاقات</button>
        <button class="mode-btn ${S.pMode===1?'active':''}" data-mode="1">${svgIcon(ICONS.list,16)} النظام التقليدي</button>
      </div>
      ${S.pMode===0 ? `
        <div class="slider-card">${sliderContent}</div>
        <div class="slider-nav">
          <button class="nav-arrow" id="prevSlide">${svgIcon(ICONS.chevR,22)}</button>
          <div class="dots">${dots}${prayers.length>9?'<span style="font-size:.7rem;color:rgba(149,117,205,.5)">…</span>':''}</div>
          <button class="nav-arrow" id="nextSlide">${svgIcon(ICONS.chevL,22)}</button>
        </div>
      ` : `<div id="listWrap">${listItems}</div>`}
    </div>
    <button class="fab" id="addPrayerFab">${svgIcon(ICONS.plus,26)}</button>
  </div>`;
}

/* ════════════════════════════════════════
   TASBEEH PAGE
═══════════════════════════════════════ */
function renderTasbeeh() {
  const active = S.tasbeehs.find(t=>t.id===S.selectedDhikr) || S.tasbeehs[0];
  const count = active ? active.count : 0;
  const total = active ? active.total : 0;
  const laps  = Math.floor(count / 100);
  const lap   = count % 100;
  const circ  = 2 * Math.PI * 90;
  const off   = circ * (1 - (count % 100) / 100);
  const milestone = [33,66,99,100].includes(count % 100) && count > 0;

  const chips = S.tasbeehs.map(t=>`
    <button class="dhikr-chip ${t.id===S.selectedDhikr?'active':''}" data-dhikr="${t.id}">
      ${t.name.length>10?t.name.slice(0,10)+'…':t.name}
    </button>`).join('');

  const rows = S.tasbeehs.map(t=>`
    <div class="dhikr-list-row clay ${t.id===S.selectedDhikr?'active':''}" data-dhikr="${t.id}">
      <span class="dhikr-list-name">${esc(t.name)}</span>
      <div class="dhikr-list-counts">
        <span class="dhikr-list-total">الكل: ${t.total}</span>
        <span class="dhikr-list-curr">${t.count}</span>
      </div>
    </div>`).join('');

  return `<div class="page">
    <div class="hdr">
      <button class="hdr-btn" data-nav="home">${svgIcon(ICONS.back)} عودة</button>
      <span class="hdr-title">المسبحة الإلكترونية</span>
      <div class="hdr-side">
        <button class="hdr-btn" id="resetTasbeehBtn">${svgIcon(ICONS.reset)}</button>
      </div>
    </div>
    <div class="scroll-body">
      <div class="dhikr-scroll">${chips}</div>
      <div class="dhikr-name-box">
        <div class="dhikr-name-text">${esc(active ? active.name : '')}</div>
        ${laps>0?`<div class="laps-badge">🔄 ${laps} دورة مكتملة</div>`:''}
        ${milestone?`<div class="milestone-badge">✨ أحسنت! ${count%100} تسبيحة</div>`:''}
      </div>
      <div class="circle-wrap">
        <button class="circle-btn" id="tasbeehBtn">
          <svg class="circle-svg" viewBox="0 0 220 220">
            <defs><linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#7E57C2"/>
              <stop offset="100%" stop-color="#FFB74D"/>
            </linearGradient></defs>
            <circle class="circle-bg" cx="110" cy="110" r="90"/>
            <circle class="circle-fg" cx="110" cy="110" r="90"
              stroke-dasharray="${circ.toFixed(1)}"
              stroke-dashoffset="${off.toFixed(1)}"/>
          </svg>
          <div class="circle-inner">
            <span class="circle-count">${count}</span>
            <span class="circle-hint">اضغط للتسبيح</span>
          </div>
        </button>
      </div>
      <div class="tasbeeh-stats">
        <div class="stat-card clay">
          <div class="stat-label">عدد الدورة</div>
          <div class="stat-val">${lap}</div>
        </div>
        <div class="stat-card clay">
          <div class="stat-label">إجمالي التسبيح</div>
          <div class="stat-val gold">${total}</div>
        </div>
      </div>
      <div class="dhikr-list-section">
        <h3>جميع الأذكار</h3>
        ${rows}
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════
   DEEDS PAGE
═══════════════════════════════════════ */
function renderDeeds() {
  const now = Date.now();
  const total = S.deeds.reduce((s,d)=>s+d.count,0);
  const today = S.deeds.filter(d=>d.ts>now-86400000&&d.count>0).length;

  const rows = S.deeds.map(d => {
    const isCustom = d.id.startsWith('custom_');
    const doneToday = d.ts > now-86400000 && d.count>0;
    const isDone = d.count > 0;
    return `<div class="deed-item">
      <div class="clay">
        <div class="deed-row">
          <button class="deed-check-btn" data-deed="${d.id}">
            ${isDone
              ? svgIcon(ICONS.checkCircle,26,'class="checked"')
              : `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="unchecked"><circle cx="12" cy="12" r="10"/></svg>`}
          </button>
          <div class="deed-content">
            <div class="deed-title">${esc(d.title)}</div>
            <div class="deed-meta">
              ${isDone?`<span class="badge badge-count">أُنجز ${d.count} ${d.count===1?'مرة':'مرات'}</span>`:''}
              ${doneToday?'<span class="badge badge-today">✓ اليوم</span>':''}
              ${isCustom?'<span class="badge badge-custom">مخصص</span>':''}
            </div>
          </div>
          ${isCustom?`<button class="deed-del-btn deed-del" data-deedid="${d.id}">${svgIcon(ICONS.trash,14)}</button>`:''}
        </div>
      </div>
    </div>`;
  }).join('');

  return `<div class="page">
    <div class="hdr">
      <button class="hdr-btn" data-nav="home">${svgIcon(ICONS.back)} عودة</button>
      <span class="hdr-title">أعمال صالحة للأثر</span>
      <span style="min-width:60px;display:flex;justify-content:flex-start;">
        <span style="background:rgba(126,87,194,.12);color:var(--purple);font-weight:700;font-size:.75rem;padding:.2rem .6rem;border-radius:99px;">${total}</span>
      </span>
    </div>
    <div id="completionOverlay" class="completion-overlay hidden"></div>
    <div class="scroll-body pb-24">
      <div class="deeds-stats">
        <div class="stat-card clay">
          <div class="stat-label">إجمالي الأعمال</div>
          <div class="stat-val">${total}</div>
        </div>
        <div class="stat-card clay">
          <div class="stat-label">أُنجز اليوم</div>
          <div class="stat-val gold">${today}</div>
        </div>
      </div>
      <div class="info-banner">
        ${svgIcon(ICONS.info,18)}
        <p>أنجز هذه الأعمال الصالحة وأهدِ ثوابها للشهيد عبد الرحمن محيسن. كل عمل تُنجزه يُضاف إلى ميزانه بإذن الله.</p>
      </div>
      ${rows}
    </div>
    <button class="fab" id="addDeedFab">${svgIcon(ICONS.plus,26)}</button>
  </div>`;
}

/* ════════════════════════════════════════
   WIRD PAGE
═══════════════════════════════════════ */
function renderWird() {
  const sections = [
    { key:'prayer', label:'دعاء اليوم',  emoji:'🤲', text:S.wirdPrayer },
    { key:'dhikr',  label:'ذكر اليوم',   emoji:'📿', text:S.wirdDhikr  },
    { key:'verse',  label:'آية اليوم',   emoji:'📖', text:S.wirdVerse  },
  ];

  const cards = sections.map(s => `
    <div class="clay wird-card">
      <div class="wird-card-header">
        <div class="wird-card-label">${s.emoji} ${s.label}</div>
        <div class="wird-actions">
          <button class="wird-copy-btn" data-wird="${s.key}" data-text="${esc(s.text)}">
            ${svgIcon(ICONS.copy,13)} نسخ
          </button>
          <button class="wird-share-btn" data-wtext="${esc(s.text)}">
            ${svgIcon(ICONS.share,13)} مشاركة
          </button>
        </div>
      </div>
      <div class="wird-text">${esc(s.text)}</div>
    </div>`).join('');

  return `<div class="page">
    <div class="hdr">
      <button class="hdr-btn" data-nav="home">${svgIcon(ICONS.back)} عودة</button>
      <span class="hdr-title">الورد الروحي لليوم</span>
      <div class="hdr-side">
        <button class="hdr-btn" id="refreshWird">${svgIcon(ICONS.refresh)}</button>
      </div>
    </div>
    <div class="scroll-body" id="wirdBody">
      ${cards}
      <div class="wird-dedication">
        <p>اللهم أهدِ ثواب هذا الورد إلى روح الشهيد عبد الرحمن محيسن</p>
      </div>
      <div class="refresh-wrap">
        <button class="refresh-btn" id="refreshWird2">
          ${svgIcon(ICONS.refresh,16)} تجديد الورد اليومي
        </button>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════
   MEMORIAL PAGE
═══════════════════════════════════════ */
function renderMemorial() {
  const sections = [
    { emoji:'🕊️', title:'من هو الشهيد؟', text:'عبد الرحمن محيسن — روح طاهرة آثرت الله على الدنيا، ورحلت إلى ربها في أوج شبابها، تاركةً وراءها أثرًا طيبًا وذكرى عطرة في قلوب من أحبّوه وعرفوه.' },
    { emoji:'💜', title:'ذكراه في قلوبنا', text:'لم تمحُ الأيام صورته من الذاكرة، ولم تُخمد الغياب جذوة الحب. لا يزال اسمه يُتلى في الأدعية، وصورته تُحيي الأشواق. كان رحمه الله قريبًا من الله، محبًّا للخير، ساعيًا في الصلاح.' },
    { emoji:'⭐', title:'سيرته العطرة', text:'كان رحمه الله مثالاً للشاب المؤمن الصادق، حريصًا على طاعة الله، محبًّا لأهله وذويه، صادق اللسان طيّب القلب. وقد آثر الله ودينه، فكانت حياته قصيرةً في عدد أيامها طويلةً في أثرها ومعناها.' },
    { emoji:'🌙', title:'هذا الموقع صدقة جارية له', text:'كل دعاء يُرفع من خلاله، وكل آية تُتلى، وكل ذكر يُقال — يُهدى ثوابه إلى روح الشهيد عبد الرحمن محيسن إن شاء الله. فاللهم تقبّل منا ومنه.' },
    { emoji:'🤲', title:'رسالة لمن أحبّه', text:'اصبروا واحتسبوا، فإن الله لا يضيع أجر المحسنين. واعلموا أن ما فعلتموه من دعاء وذكر وعمل صالح يصله بإذن الله. وستكون الجنة — إن شاء الله — محل اللقاء والاجتماع.' },
  ];

  const heartLabel = S.hearts > 0 ? `${S.hearts} دعاء أُهدي له` : 'أهدِ دعاءك له';

  return `<div class="page">
    <div class="hdr">
      <button class="hdr-btn" data-nav="home">${svgIcon(ICONS.back)} عودة</button>
      <span class="hdr-title">الذكرى والسيرة العطرة</span>
      <div class="hdr-side"></div>
    </div>
    <div class="scroll-body">
      <div class="memorial-hero">
        <div class="memorial-photo-wrap">
          <div class="memorial-photo"><img src="./memorial_photo.jpg" alt="الشهيد"/></div>
          <div class="photo-heart">${svgIcon(ICONS.heart,14)}</div>
        </div>
        <div class="memorial-name">الشهيد عبد الرحمن محيسن</div>
        <div class="memorial-name-sub">رحمه الله وأسكنه فسيح جناته</div>
        <button class="heart-btn ${S.hearts>0?'active':''}" id="memHeartBtn">
          ${svgIcon(ICONS.heart,15)} ${heartLabel}
        </button>
      </div>

      <div class="clay memorial-verse-card">
        <div class="memorial-verse-text">وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا ۚ بَلْ أَحْيَاءٌ عِندَ رَبِّهِمْ يُرْزَقُونَ</div>
        <div class="memorial-verse-ref">آل عمران: ١٦٩</div>
      </div>

      ${sections.map(s=>`
        <div class="clay memorial-section">
          <div class="memorial-section-inner">
            <span class="memorial-emoji">${s.emoji}</span>
            <div>
              <div class="memorial-section-title">${s.title}</div>
              <div class="memorial-section-text">${s.text}</div>
            </div>
          </div>
        </div>`).join('')}

      <div class="memorial-symbol">
        <img src="./martyr_symbol.png" alt="رمز الشهيد"/>
      </div>

      <div class="memorial-dua">
        <div class="memorial-dua-text">اللهم ارحم الشهيد عبد الرحمن محيسن، وأسكنه فسيح جناتك، واجعل الفردوس الأعلى داره، واجمعنا به في دار كرامتك.</div>
        <div class="memorial-dua-amen">آمين يا رب العالمين</div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════
   SETTINGS PAGE
═══════════════════════════════════════ */
function renderSettings() {
  const { fontName, fontSize, haptic } = S.settings;
  const fontSizeLabel = v => {
    if(v<=.85) return 'صغير جداً';
    if(v<=.95) return 'صغير';
    if(v<=1.05) return 'متوسط';
    if(v<=1.2)  return 'كبير';
    if(v<=1.4)  return 'كبير جداً';
    return 'ضخم';
  };
  const fonts = ['Cairo','Tajawal','Amiri'];

  return `<div class="page">
    <div class="hdr">
      <button class="hdr-btn" data-nav="home">${svgIcon(ICONS.back)} عودة</button>
      <span class="hdr-title">الإعدادات</span>
      <div class="hdr-side"></div>
    </div>
    <div class="scroll-body">
      <!-- Preview -->
      <div class="clay settings-preview">
        <div class="settings-preview-label">${svgIcon(ICONS.type,13,'')} معاينة النص</div>
        <div class="settings-preview-text" style="font-family:${getFont()};font-size:${fontSize}rem;">
          اللهم ارحم الشهيد عبد الرحمن محيسن
        </div>
      </div>

      <!-- Font Family -->
      <div class="clay settings-section">
        <div class="settings-section-title">${svgIcon(ICONS.type)} نوع الخط</div>
        <div class="font-btns">
          ${fonts.map(f=>`<button class="font-btn ${fontName===f?'active':''}" style="font-family:'${f}',sans-serif;" data-font="${f}">${f}</button>`).join('')}
        </div>
      </div>

      <!-- Font Size -->
      <div class="clay settings-section">
        <div class="settings-section-title" style="justify-content:space-between;">
          <span>${svgIcon(ICONS.type)} حجم الخط</span>
          <span class="size-badge">${fontSizeLabel(fontSize)}</span>
        </div>
        <div class="font-size-row">
          <button class="size-arrow-btn" id="fontSizeDec" ${fontSize<=0.8?'disabled':''}>${svgIcon(ICONS.chevR,20)}</button>
          <div class="size-slider-wrap">
            <input type="range" class="size-slider" id="fontSizeSlider" min="0.8" max="1.6" step="0.1" value="${fontSize}"/>
            <div class="size-labels"><span>أ</span><span style="font-size:1.1rem">أ</span><span style="font-size:1.4rem">أ</span></div>
          </div>
          <button class="size-arrow-btn" id="fontSizeInc" ${fontSize>=1.6?'disabled':''}>${svgIcon(ICONS.chevL,20)}</button>
        </div>
      </div>

      <!-- Haptic -->
      <div class="clay settings-section">
        <div class="settings-section-title">${svgIcon(ICONS.vibrate)} الاهتزاز التفاعلي</div>
        <div class="toggle-row">
          <div class="toggle-info">
            <span class="toggle-label">اهتزاز عند الضغط</span>
            <span class="toggle-sub">اهتزاز خفيف عند الضغط على المسبحة</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="hapticToggle" ${haptic?'checked':''}/>
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <!-- Reset -->
      <div class="clay reset-section">
        <div class="settings-section-title" style="color:#ef4444;">${svgIcon(ICONS.reset)} إعادة تعيين شاملة</div>
        <div class="reset-desc">تُعيد جميع الإعدادات إلى الوضع الافتراضي وتمسح عدادات المسبحة والأعمال الصالحة والأدعية المخصصة والمفضلة.</div>
        <button class="reset-btn" id="resetAllBtn">${svgIcon(ICONS.reset,15)} إعادة تعيين الكل</button>
      </div>

      <!-- App info -->
      <div class="clay settings-app-info">
        <div class="settings-app-icon"><img src="./app_icon.png" alt=""/></div>
        <div class="settings-app-name">أثر الشهيد</div>
        <div class="settings-app-desc">صدقة جارية لروح الشهيد عبد الرحمن محيسن</div>
        <div class="settings-app-ver">الإصدار 1.0.0</div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════
   EVENT BINDING
═══════════════════════════════════════ */
function bindEvents() {
  const $ = id => document.getElementById(id);
  const page = S.page;

  /* ── Universal nav ── */
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  /* ══ HOME ══ */
  if (page === 'home') {
    const hb = $('heartBtn');
    if (hb) hb.addEventListener('click', () => {
      S.hearts++;
      saveHearts(S.hearts);
      hb.classList.add('active');
      hb.innerHTML = svgIcon(ICONS.heart,16,'style="fill:var(--purple-lt)"') + ` ${S.hearts} دعاء أُهدي له`;
    });
  }

  /* ══ PRAYERS ══ */
  if (page === 'prayers') {
    /* Category buttons */
    document.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => { S.pCat = btn.dataset.cat; S.pIdx = 0; render(); });
    });
    /* Mode toggle */
    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => { S.pMode = +btn.dataset.mode; render(); });
    });

    if (S.pMode === 0) {
      const prayers = getPrayersList();
      const cur = prayers[S.pIdx];

      $('prevSlide')?.addEventListener('click', () => { S.pIdx = (S.pIdx - 1 + prayers.length) % prayers.length; render(); });
      $('nextSlide')?.addEventListener('click', () => { S.pIdx = (S.pIdx + 1) % prayers.length; render(); });
      document.querySelectorAll('[data-dot]').forEach(d => {
        d.addEventListener('click', () => { S.pIdx = +d.dataset.dot; render(); });
      });
      $('sliderCopy')?.addEventListener('click', e => copyText(cur?.text||'', e.currentTarget));
      $('sliderShare')?.addEventListener('click', () => shareText(cur?.text||''));
      $('favBtn')?.addEventListener('click', () => {
        const key = cur?.id;
        if (!key) return;
        if (S.favorites.has(key)) S.favorites.delete(key); else S.favorites.add(key);
        saveFavorites(S.favorites);
        render();
      });
      $('delCurPrayer')?.addEventListener('click', () => {
        if (!cur?.isCustom) return;
        S.customPrayers = S.customPrayers.filter(p => p.id !== cur.id);
        saveCustomPrayers(S.customPrayers);
        if (S.pIdx > 0) S.pIdx--;
        render();
      });
    } else {
      /* List mode */
      document.querySelectorAll('.list-copy-prayer').forEach(btn => {
        btn.addEventListener('click', e => copyText(btn.dataset.text, e.currentTarget));
      });
      document.querySelectorAll('.list-share-prayer').forEach(btn => {
        btn.addEventListener('click', () => shareText(btn.dataset.text));
      });
      document.querySelectorAll('.list-del-prayer').forEach(btn => {
        btn.addEventListener('click', () => {
          S.customPrayers = S.customPrayers.filter(p => p.id !== btn.dataset.cid);
          saveCustomPrayers(S.customPrayers);
          render();
        });
      });
      document.querySelectorAll('.fav-list-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const k = btn.dataset.fk;
          if (S.favorites.has(k)) S.favorites.delete(k); else S.favorites.add(k);
          saveFavorites(S.favorites);
          render();
        });
      });
    }

    /* Add prayer FAB */
    $('addPrayerFab')?.addEventListener('click', () => {
      showModal(`
        <div class="modal-title">إضافة دعاء مخصص</div>
        <div class="modal-sub">سيُضاف إلى: <strong>${S.pCat}</strong></div>
        <textarea class="modal-input" id="newPrayerText" rows="4" placeholder="اكتب دعاءك هنا..."></textarea>
        <div class="modal-btns">
          <button class="btn-primary" id="confirmAddPrayer">إضافة</button>
          <button class="btn-secondary" onclick="closeModal()">إلغاء</button>
        </div>`, modal => {
        modal.querySelector('#confirmAddPrayer').addEventListener('click', () => {
          const text = modal.querySelector('#newPrayerText').value.trim();
          if (!text) return;
          const np = { id:`c_${Date.now()}`, text, cat:S.pCat, isCustom:true };
          S.customPrayers.unshift(np);
          saveCustomPrayers(S.customPrayers);
          closeModal();
          showToast('تمت إضافة الدعاء بنجاح ✨');
          render();
        });
      });
    });
  }

  /* ══ TASBEEH ══ */
  if (page === 'tasbeeh') {
    document.querySelectorAll('[data-dhikr]').forEach(el => {
      el.addEventListener('click', () => { S.selectedDhikr = el.dataset.dhikr; render(); });
    });

    let lastClick = 0;
    $('tasbeehBtn')?.addEventListener('click', () => {
      const now = Date.now();
      if (now - lastClick < 80) return; // debounce
      lastClick = now;
      S.tasbeehs = S.tasbeehs.map(t =>
        t.id === S.selectedDhikr ? { ...t, count:t.count+1, total:t.total+1 } : t
      );
      saveTasbeehs(S.tasbeehs);
      const btn = $('tasbeehBtn');
      if (btn) { btn.classList.add('bounce'); setTimeout(()=>btn.classList.remove('bounce'),200); }
      // Partial re-render (just update numbers for performance)
      const active = S.tasbeehs.find(t=>t.id===S.selectedDhikr);
      if (!active) return;
      const count = active.count;
      const total = active.total;
      const lap   = count % 100;
      const laps  = Math.floor(count/100);
      const circ  = 2*Math.PI*90;
      const off   = circ*(1-lap/100);
      const fg = document.querySelector('.circle-fg');
      const countEl = document.querySelector('.circle-count');
      const statVals = document.querySelectorAll('.stat-val');
      if (fg) { fg.style.strokeDashoffset = off.toFixed(1); }
      if (countEl) countEl.textContent = count;
      if (statVals[0]) statVals[0].textContent = lap;
      if (statVals[1]) statVals[1].textContent = total;
      // Update list
      document.querySelectorAll('.dhikr-list-row').forEach(row => {
        const t = S.tasbeehs.find(t=>t.id===row.dataset.dhikr);
        if (t) {
          const curr = row.querySelector('.dhikr-list-curr');
          const tot  = row.querySelector('.dhikr-list-total');
          if (curr) curr.textContent = t.count;
          if (tot)  tot.textContent  = `الكل: ${t.total}`;
        }
      });
      // Show milestone
      const ms = [33,66,99,100];
      if (ms.includes(lap) && count>0) {
        const nb = document.querySelector('.dhikr-name-box');
        if (nb) {
          let milEl = nb.querySelector('.milestone-badge');
          if (!milEl) { milEl = document.createElement('div'); milEl.className='milestone-badge'; nb.appendChild(milEl); }
          milEl.textContent = `✨ أحسنت! ${lap} تسبيحة`;
        }
      }
      if (laps > 0) {
        const nb = document.querySelector('.dhikr-name-box');
        if (nb) {
          let lapEl = nb.querySelector('.laps-badge');
          if (!lapEl) { lapEl = document.createElement('div'); lapEl.className='laps-badge'; nb.insertBefore(lapEl, nb.querySelector('.milestone-badge')); }
          lapEl.textContent = `🔄 ${laps} دورة مكتملة`;
        }
      }
    });

    $('resetTasbeehBtn')?.addEventListener('click', () => {
      showModal(`
        <div class="modal-title">تأكيد إعادة تعيين العداد؟</div>
        <div class="modal-btns">
          <button class="btn-danger" id="confirmReset">نعم، إعادة</button>
          <button class="btn-secondary" onclick="closeModal()">إلغاء</button>
        </div>`, modal => {
        modal.querySelector('#confirmReset').addEventListener('click', () => {
          S.tasbeehs = S.tasbeehs.map(t => t.id===S.selectedDhikr ? {...t,count:0} : t);
          saveTasbeehs(S.tasbeehs);
          closeModal();
          render();
        });
      });
    });
  }

  /* ══ DEEDS ══ */
  if (page === 'deeds') {
    document.querySelectorAll('[data-deed]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.deed;
        S.deeds = S.deeds.map(d => d.id!==id ? d : {...d, count:d.count+1, ts:Date.now()});
        saveDeeds(S.deeds);
        const msg = rnd(COMPLETION_MSGS);
        const overlay = $('completionOverlay');
        if (overlay) {
          overlay.innerHTML = `<div class="completion-msg">${msg}</div>`;
          overlay.classList.remove('hidden');
          setTimeout(()=>overlay.classList.add('hidden'), 3000);
        }
        render();
      });
    });

    document.querySelectorAll('.deed-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.deedid;
        showModal(`
          <div class="modal-title">حذف هذا العمل؟</div>
          <div class="modal-btns">
            <button class="btn-danger" id="confirmDeedDel">حذف</button>
            <button class="btn-secondary" onclick="closeModal()">إلغاء</button>
          </div>`, modal => {
          modal.querySelector('#confirmDeedDel').addEventListener('click', () => {
            S.deeds = S.deeds.filter(d=>d.id!==id);
            saveDeeds(S.deeds);
            closeModal();
            render();
          });
        });
      });
    });

    $('addDeedFab')?.addEventListener('click', () => {
      showModal(`
        <div class="modal-title">إضافة عمل صالح</div>
        <input type="text" class="modal-input" id="newDeedTitle" placeholder="مثال: قراءة سورة يس للشهيد" style="padding:.75rem;"/>
        <div class="modal-btns">
          <button class="btn-primary" id="confirmAddDeed">إضافة</button>
          <button class="btn-secondary" onclick="closeModal()">إلغاء</button>
        </div>`, modal => {
        const inp = modal.querySelector('#newDeedTitle');
        inp.addEventListener('keydown', e => { if(e.key==='Enter') modal.querySelector('#confirmAddDeed').click(); });
        modal.querySelector('#confirmAddDeed').addEventListener('click', () => {
          const title = inp.value.trim();
          if (!title) return;
          S.deeds.push({ id:`custom_${Date.now()}`, title, count:0, ts:0 });
          saveDeeds(S.deeds);
          closeModal();
          render();
        });
      });
    });
  }

  /* ══ WIRD ══ */
  if (page === 'wird') {
    function refreshWird() {
      S.wirdPrayer = rnd(PRAYERS).text;
      S.wirdDhikr  = rnd(DHIKRS);
      S.wirdVerse  = rnd(VERSES);
      const body = $('wirdBody');
      if (body) { body.style.opacity='.3'; setTimeout(()=>{ body.style.opacity=''; render(); },350); }
    }
    $('refreshWird')?.addEventListener('click', refreshWird);
    $('refreshWird2')?.addEventListener('click', refreshWird);

    document.querySelectorAll('[data-wird]').forEach(btn => {
      btn.addEventListener('click', e => copyText(btn.dataset.text, e.currentTarget));
    });
    document.querySelectorAll('[data-wtext]').forEach(btn => {
      btn.addEventListener('click', () => shareText(btn.dataset.wtext));
    });
  }

  /* ══ MEMORIAL ══ */
  if (page === 'memorial') {
    $('memHeartBtn')?.addEventListener('click', () => {
      S.hearts++;
      saveHearts(S.hearts);
      const btn = $('memHeartBtn');
      if (btn) {
        btn.classList.add('active');
        btn.innerHTML = svgIcon(ICONS.heart,15,'style="fill:var(--purple-lt)"') + ` ${S.hearts} دعاء أُهدي له`;
      }
    });
  }

  /* ══ SETTINGS ══ */
  if (page === 'settings') {
    document.querySelectorAll('[data-font]').forEach(btn => {
      btn.addEventListener('click', () => {
        S.settings.fontName = btn.dataset.font;
        saveSettings(S.settings);
        render();
      });
    });

    const slider = $('fontSizeSlider');
    const updateSize = v => {
      S.settings.fontSize = parseFloat(v);
      saveSettings(S.settings);
      applyFont();
      // Live preview update
      const prev = document.querySelector('.settings-preview-text');
      if (prev) { prev.style.fontSize = S.settings.fontSize+'rem'; }
    };
    slider?.addEventListener('input', e => updateSize(e.target.value));

    $('fontSizeDec')?.addEventListener('click', () => {
      const v = Math.max(.8, parseFloat((S.settings.fontSize-.1).toFixed(1)));
      slider.value = v; updateSize(v); render();
    });
    $('fontSizeInc')?.addEventListener('click', () => {
      const v = Math.min(1.6, parseFloat((S.settings.fontSize+.1).toFixed(1)));
      slider.value = v; updateSize(v); render();
    });

    $('hapticToggle')?.addEventListener('change', e => {
      S.settings.haptic = e.target.checked;
      saveSettings(S.settings);
    });

    $('resetAllBtn')?.addEventListener('click', () => {
      showModal(`
        <div class="modal-title">⚠️ إعادة تعيين كاملة</div>
        <div class="modal-warning">سيتم مسح جميع عدادات المسبحة والأعمال الصالحة والأدعية المخصصة والمفضلة. لا يمكن التراجع.</div>
        <div class="modal-btns">
          <button class="btn-danger" id="confirmResetAll">تأكيد الإعادة</button>
          <button class="btn-secondary" onclick="closeModal()">إلغاء</button>
        </div>`, modal => {
        modal.querySelector('#confirmResetAll').addEventListener('click', () => {
          S.settings = { fontName:'Cairo', fontSize:1.0, haptic:true };
          S.tasbeehs = structuredClone(DEFAULT_TASBEEHS);
          S.deeds    = structuredClone(DEFAULT_DEEDS);
          S.customPrayers = [];
          S.favorites = new Set();
          S.hearts = 0;
          saveSettings(S.settings); saveTasbeehs(S.tasbeehs);
          saveDeeds(S.deeds); saveCustomPrayers(S.customPrayers);
          saveFavorites(S.favorites); saveHearts(0);
          closeModal();
          showToast('تمت إعادة تعيين جميع الإعدادات ✅', 3000);
          render();
        });
      });
    });
  }
}

/* ════════════════════════════════════════
   SERVICE WORKER REGISTRATION
═══════════════════════════════════════ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  });
}

/* ════════════════════════════════════════
   BOOT
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyFont();
  render();
});
