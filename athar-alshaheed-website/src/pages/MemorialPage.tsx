import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";

interface Props { onBack: () => void; }

export default function MemorialPage({ onBack }: Props) {
  const [heartCount, setHeartCount] = useState(0);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #EDE7F6 0%, #F3E5F5 50%, #E8EAF6 100%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(237,231,246,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(179,157,219,0.3)" }}>
        <button onClick={onBack} className="flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 transition-colors">
          <ArrowRight size={18} /> عودة
        </button>
        <h1 className="text-lg font-bold gold-text">الذكرى والسيرة العطرة</h1>
        <div className="w-16" />
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-5">
        {/* Hero */}
        <div className="flex flex-col items-center gap-3 fade-in-up">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200"
              style={{ boxShadow: "0 0 32px rgba(126,87,194,0.35)" }}>
              <img src="/memorial_photo.jpg" alt="الشهيد" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 rounded-full p-1.5 shadow-lg">
              <Heart size={14} className="text-white fill-white" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-900">الشهيد عبد الرحمن محيسن</h2>
            <p className="text-purple-500 text-sm mt-1">رحمه الله وأسكنه فسيح جناته</p>
          </div>

          {/* Heart button */}
          <button onClick={() => setHeartCount(h => h + 1)}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all active:scale-90"
            style={{ background: "rgba(126,87,194,0.1)", color: "#7E57C2" }}>
            <Heart size={15} className={heartCount > 0 ? "fill-purple-400 text-purple-400" : ""} />
            {heartCount > 0 ? `${heartCount} دعاء أُهدي له` : "أهدِ دعاءك له"}
          </button>
        </div>

        {/* Quranic verse */}
        <div className="clay-card p-5 text-center fade-in-up" style={{ animationDelay: "0.08s" }}>
          <p className="arabic-verse text-purple-800 text-lg font-medium leading-10">
            وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا ۚ بَلْ أَحْيَاءٌ عِندَ رَبِّهِمْ يُرْزَقُونَ
          </p>
          <p className="text-xs text-purple-400 mt-2">آل عمران: ١٦٩</p>
        </div>

        {/* Info sections */}
        {[
          {
            title: "من هو الشهيد؟",
            content: "عبد الرحمن محيسن — روح طاهرة آثرت الله على الدنيا، ورحلت إلى ربها في أوج شبابها، تاركةً وراءها أثرًا طيبًا وذكرى عطرة في قلوب من أحبّوه وعرفوه.",
            icon: "🕊️",
          },
          {
            title: "ذكراه في قلوبنا",
            content: "لم تمحُ الأيام صورته من الذاكرة، ولم تُخمد الغياب جذوة الحب. لا يزال اسمه يُتلى في الأدعية، وصورته تُحيي الأشواق. كان رحمه الله قريبًا من الله، محبًّا للخير، ساعيًا في الصلاح.",
            icon: "💜",
          },
          {
            title: "سيرته العطرة",
            content: "كان رحمه الله مثالاً للشاب المؤمن الصادق، حريصًا على طاعة الله، محبًّا لأهله وذويه، صادق اللسان طيّب القلب. وقد آثر الله ودينه، فكانت حياته قصيرةً في عدد أيامها طويلةً في أثرها ومعناها.",
            icon: "⭐",
          },
          {
            title: "هذا الموقع صدقة جارية له",
            content: "كل دعاء يُرفع من خلاله، وكل آية تُتلى، وكل ذكر يُقال — يُهدى ثوابه إلى روح الشهيد عبد الرحمن محيسن إن شاء الله. فاللهم تقبّل منا ومنه.",
            icon: "🌙",
          },
          {
            title: "رسالة لمن أحبّه",
            content: "اصبروا واحتسبوا، فإن الله لا يضيع أجر المحسنين. واعلموا أن ما فعلتموه من دعاء وذكر وعمل صالح يصله بإذن الله. وستكون الجنة — إن شاء الله — محل اللقاء والاجتماع.",
            icon: "🤲",
          },
        ].map((section, i) => (
          <div key={i} className="clay-card p-5 fade-in-up" style={{ animationDelay: `${0.1 * (i + 2)}s` }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0 mt-0.5">{section.icon}</span>
              <div>
                <h3 className="font-bold text-purple-800 mb-2">{section.title}</h3>
                <p className="text-purple-700 text-sm leading-8">{section.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Symbol image */}
        <div className="flex justify-center py-2">
          <img src="/martyr_symbol.png" alt="رمز الشهيد" className="w-24 h-24 object-contain opacity-80" />
        </div>

        {/* Final dua */}
        <div className="rounded-2xl p-5 text-center fade-in-up"
          style={{ background: "linear-gradient(135deg, rgba(126,87,194,0.1), rgba(255,183,77,0.08))", border: "1px solid rgba(126,87,194,0.2)" }}>
          <p className="arabic-verse text-purple-800 leading-10 text-base">
            اللهم ارحم الشهيد عبد الرحمن محيسن، وأسكنه فسيح جناتك، واجعل الفردوس الأعلى داره، واجمعنا به في دار كرامتك.
          </p>
          <p className="text-purple-400 text-xs mt-3">آمين يا رب العالمين</p>
        </div>
      </div>
    </div>
  );
}
