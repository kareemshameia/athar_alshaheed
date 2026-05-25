import { useState } from "react";
import { Heart } from "lucide-react";
import { getRandomPrayer } from "../data/prayers";

interface Props {
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: "prayers",  label: "الأدعية والأذكار",       sub: "أدعية مُهداة للشهيد",     icon: "📖", color: "#4A90E2" },
  { id: "tasbeeh",  label: "المسبحة الإلكترونية",     sub: "ذكر الله وتسبيحه",        icon: "📿", color: "#9013FE" },
  { id: "deeds",    label: "أعمال صالحة للأثر",       sub: "صدقة جارية لروحه",        icon: "✅", color: "#4CAF50" },
  { id: "wird",     label: "الورد الروحي لليوم",      sub: "دعاء وذكر وآية",          icon: "🌙", color: "#FF6B6B" },
  { id: "memorial", label: "الذكرى والسيرة",          sub: "تذكّر الشهيد",            icon: "🕊️", color: "#E91E8C" },
  { id: "settings", label: "الإعدادات",               sub: "الخط والمظهر وإعادة التعيين", icon: "⚙️", color: "#607D8B" },
];

export default function HomePage({ onNavigate }: Props) {
  const [dailyPrayer] = useState(getRandomPrayer);
  const [hearts, setHearts] = useState(0);

  return (
    <div className="min-h-screen pb-6"
      style={{ background: "linear-gradient(160deg, #EDE7F6 0%, #F3E5F5 50%, #E8EAF6 100%)" }}>

      {/* Header */}
      <div className="relative overflow-hidden px-4 pt-8 pb-6 text-center"
        style={{ background: "linear-gradient(135deg, rgba(126,87,194,0.15) 0%, rgba(179,157,219,0.1) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(126,87,194,0.08) 0%, transparent 60%)" }} />

        <div className="relative inline-block mb-3">
          <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto shadow-xl border-2 border-purple-200"
            style={{ boxShadow: "0 8px 24px rgba(126,87,194,0.25)" }}>
            <img src="/app_icon.png" alt="أثر الشهيد" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold gold-text mb-1">أثر الشهيد</h1>
        <p className="text-purple-500 text-sm font-medium">صدقة جارية لروح الشهيد عبد الرحمن محيسن</p>

        <button onClick={() => setHearts(h => h + 1)}
          className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-90"
          style={{ background: "rgba(126,87,194,0.12)", color: "#7E57C2" }}>
          <Heart size={15} className={hearts > 0 ? "fill-purple-400 text-purple-400" : ""} />
          {hearts > 0 ? `${hearts} دعاء أُهدي له` : "أهدِ دعاءك للشهيد"}
        </button>
      </div>

      {/* Daily prayer */}
      <div className="mx-4 mt-4">
        <div className="clay-card p-4"
          style={{ background: "linear-gradient(135deg, rgba(126,87,194,0.12), rgba(81,45,168,0.08))" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🤲</span>
            <span className="text-xs font-semibold text-purple-500">دعاء اليوم</span>
          </div>
          <p className="arabic-verse text-purple-800 text-sm leading-8">{dailyPrayer.text}</p>
        </div>
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-4">
        {menuItems.map((item, i) => (
          <button key={item.id} onClick={() => onNavigate(item.id)}
            className="clay-card p-4 text-right flex flex-col gap-2 active:scale-95 transition-all fade-in-up"
            style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-purple-800 text-sm leading-tight">{item.label}</p>
                <p className="text-purple-400 text-xs mt-0.5 leading-tight">{item.sub}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-6 px-4">
        <p className="text-xs text-purple-300">اللهم اجعل هذا الموقع صدقة جارية لروح الشهيد عبد الرحمن محيسن</p>
        <p className="text-xs text-purple-200 mt-1">آمين يا رب العالمين</p>
      </div>
    </div>
  );
}
