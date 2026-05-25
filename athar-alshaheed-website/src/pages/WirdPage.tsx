import { useState } from "react";
import { ArrowRight, RefreshCw, Copy, Share2, Check } from "lucide-react";
import { getRandomPrayer, Prayer } from "../data/prayers";

interface Props { onBack: () => void; }

const dhikrs = [
  "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
  "سبحان الله وبحمده، سبحان الله العظيم",
  "أستغفر الله العظيم وأتوب إليه",
  "لا حول ولا قوة إلا بالله العلي العظيم",
  "اللهم صلِّ على محمد وعلى آل محمد كما صليت على إبراهيم وعلى آل إبراهيم",
  "وَاذْكُر رَّبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً وَدُونَ الْجَهْرِ مِنَ الْقَوْلِ بِالْغُدُوِّ وَالْآصَالِ",
];

const verses = [
  "وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا ۖ وَسَبِّحْ بِحَمْدِ رَبِّكَ حِينَ تَقُومُ",
  "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
  "وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ",
  "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
  "وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا ۚ بَلْ أَحْيَاءٌ عِندَ رَبِّهِمْ يُرْزَقُونَ",
  "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
];

export default function WirdPage({ onBack }: Props) {
  const [prayer, setPrayer] = useState<Prayer>(getRandomPrayer);
  const [dhikr, setDhikr] = useState(dhikrs[0]);
  const [verse, setVerse] = useState(verses[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  function refresh() {
    setRefreshing(true);
    setTimeout(() => {
      setPrayer(getRandomPrayer());
      setDhikr(dhikrs[Math.floor(Math.random() * dhikrs.length)]);
      setVerse(verses[Math.floor(Math.random() * verses.length)]);
      setRefreshing(false);
    }, 350);
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }
  function share(text: string) {
    if (navigator.share) navigator.share({ text }); else navigator.clipboard.writeText(text);
  }

  const sections = [
    {
      key: "prayer",
      label: "دعاء اليوم",
      icon: "🤲",
      text: prayer.text,
      gradient: "linear-gradient(135deg, rgba(126,87,194,0.1), rgba(81,45,168,0.07))",
      border: "rgba(126,87,194,0.2)",
    },
    {
      key: "dhikr",
      label: "ذكر اليوم",
      icon: "📿",
      text: dhikr,
      gradient: "linear-gradient(135deg, rgba(81,45,168,0.1), rgba(126,87,194,0.07))",
      border: "rgba(81,45,168,0.2)",
    },
    {
      key: "verse",
      label: "آية اليوم",
      icon: "📖",
      text: verse,
      gradient: "linear-gradient(135deg, rgba(255,183,77,0.12), rgba(245,124,0,0.07))",
      border: "rgba(255,183,77,0.3)",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #EDE7F6 0%, #F3E5F5 50%, #E8EAF6 100%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(237,231,246,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(179,157,219,0.3)" }}>
        <button onClick={onBack} className="flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 transition-colors">
          <ArrowRight size={18} /> عودة
        </button>
        <h1 className="text-lg font-bold gold-text">الورد الروحي لليوم</h1>
        <button onClick={refresh}
          className={`text-purple-400 hover:text-purple-600 transition-all ${refreshing ? "animate-spin" : ""}`}>
          <RefreshCw size={18} />
        </button>
      </div>

      <div className={`max-w-xl mx-auto px-4 py-4 space-y-4 transition-opacity duration-300 ${refreshing ? "opacity-30" : "opacity-100"}`}>
        {sections.map(s => (
          <div key={s.key} className="clay-card p-5 fade-in-up"
            style={{ background: s.gradient, border: `1px solid ${s.border}` }}>
            {/* Section label */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{s.icon}</span>
                <span className="font-bold text-purple-700 text-base">{s.label}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => copy(s.text, s.key)}
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all active:scale-90 ${copiedKey === s.key ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-500 hover:bg-purple-200"}`}>
                  {copiedKey === s.key ? <><Check size={12} /> نُسخ</> : <><Copy size={12} /> نسخ</>}
                </button>
                <button onClick={() => share(s.text)}
                  className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-100 text-purple-500 hover:bg-purple-200 transition-all active:scale-90">
                  <Share2 size={12} /> مشاركة
                </button>
              </div>
            </div>
            {/* Text */}
            <p className="arabic-verse text-purple-800 text-base leading-10">{s.text}</p>
          </div>
        ))}

        {/* Dedication note */}
        <div className="rounded-2xl p-4 text-center"
          style={{ background: "rgba(126,87,194,0.07)", border: "1px dashed rgba(126,87,194,0.25)" }}>
          <p className="text-sm text-purple-600 font-medium leading-7">
            اللهم أهدِ ثواب هذا الورد إلى روح الشهيد عبد الرحمن محيسن
          </p>
        </div>

        {/* Refresh button */}
        <div className="text-center pb-4">
          <button onClick={refresh}
            className="clay-card px-6 py-3 text-purple-700 font-semibold inline-flex items-center gap-2 hover:text-purple-900 active:scale-95 transition-all">
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            تجديد الورد اليومي
          </button>
        </div>
      </div>
    </div>
  );
}
