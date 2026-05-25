import { useState, useEffect } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { loadTasbeehs, saveTasbeehs, TasbeehItem } from "../data/tasbeeh";

interface Props { onBack: () => void; }

export default function TasbeehPage({ onBack }: Props) {
  const [tasbeehs, setTasbeehs] = useState<TasbeehItem[]>(loadTasbeehs);
  const [selectedId, setSelectedId] = useState("dhikr_1");
  const [bouncing, setBouncing] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => { saveTasbeehs(tasbeehs); }, [tasbeehs]);

  const active = tasbeehs.find(t => t.id === selectedId) ?? tasbeehs[0];

  function increment() {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 180);
    setTasbeehs(prev => prev.map(t =>
      t.id === selectedId ? { ...t, count: t.count + 1, totalCount: t.totalCount + 1 } : t
    ));
  }

  function resetCurrent() {
    setTasbeehs(prev => prev.map(t => t.id === selectedId ? { ...t, count: 0 } : t));
    setShowResetConfirm(false);
  }

  const progress = active ? (active.count % 100) / 100 : 0;
  const laps = active ? Math.floor(active.count / 100) : 0;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference * (1 - progress);

  const milestones = [33, 66, 99, 100];
  const nearMilestone = milestones.find(m => active && active.count % 100 === m);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #EDE7F6 0%, #F3E5F5 50%, #E8EAF6 100%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(237,231,246,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(179,157,219,0.3)" }}>
        <button onClick={onBack} className="flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 transition-colors">
          <ArrowRight size={18} /> عودة
        </button>
        <h1 className="text-lg font-bold gold-text">المسبحة الإلكترونية</h1>
        <button onClick={() => setShowResetConfirm(true)} className="text-purple-400 hover:text-purple-600 transition-colors">
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Reset confirm */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setShowResetConfirm(false)}>
          <div className="clay-card p-5 w-full max-w-xs text-center" onClick={e => e.stopPropagation()}>
            <p className="text-purple-800 font-bold mb-4">تأكيد إعادة تعيين العداد الحالي؟</p>
            <div className="flex gap-2">
              <button onClick={resetCurrent} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm active:scale-95 transition-all">نعم، إعادة</button>
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 clay-card py-2.5 rounded-xl text-purple-600 font-bold text-sm active:scale-95 transition-all">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-sm mx-auto px-4 py-4 space-y-4">
        {/* Dhikr selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {tasbeehs.map(t => (
            <button key={t.id} onClick={() => setSelectedId(t.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${selectedId === t.id ? "bg-purple-600 text-white shadow-md" : "clay-card text-purple-600"}`}>
              {t.name.length > 10 ? t.name.slice(0, 10) + "…" : t.name}
            </button>
          ))}
        </div>

        {/* Active dhikr name */}
        <div className="text-center">
          <p className="arabic-verse text-purple-800 text-lg font-bold leading-9">{active?.name}</p>
          {laps > 0 && (
            <p className="text-amber-500 text-sm mt-1 font-semibold">🔄 {laps} دورة مكتملة</p>
          )}
          {nearMilestone && (
            <p className="text-green-500 text-sm mt-1 font-bold animate-bounce">✨ أحسنت! {nearMilestone} تسبيحة</p>
          )}
        </div>

        {/* Circular counter */}
        <div className="flex justify-center">
          <button onClick={increment}
            className={`relative flex items-center justify-center rounded-full select-none transition-transform active:scale-95 ${bouncing ? "scale-105" : ""}`}
            style={{ width: 220, height: 220 }}>
            <svg width="220" height="220" className="absolute inset-0 -rotate-90">
              <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(179,157,219,0.3)" strokeWidth="12" />
              <circle cx="110" cy="110" r="90" fill="none"
                stroke="url(#grad)" strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.25s ease" }} />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7E57C2" />
                  <stop offset="100%" stopColor="#FFB74D" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(237,231,246,0.85))",
              borderRadius: "50%", width: 185, height: 185,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: "6px 6px 16px rgba(149,117,205,0.22), -4px -4px 12px rgba(255,255,255,0.9)"
            }}>
              <span className="text-6xl font-extrabold text-purple-700" style={{ fontFamily: "Cairo, sans-serif" }}>
                {active?.count ?? 0}
              </span>
              <span className="text-xs text-purple-400 mt-1">اضغط للتسبيح</span>
            </div>
          </button>
        </div>

        {/* Total + current lap */}
        <div className="grid grid-cols-2 gap-3">
          <div className="clay-card p-4 text-center">
            <p className="text-xs text-purple-400 mb-1">عدد الدورة</p>
            <p className="text-2xl font-bold text-purple-700">{active ? active.count % 100 : 0}</p>
          </div>
          <div className="clay-card p-4 text-center">
            <p className="text-xs text-purple-400 mb-1">إجمالي التسبيح</p>
            <p className="text-2xl font-bold text-purple-700">{active?.totalCount ?? 0}</p>
          </div>
        </div>

        {/* All dhikrs list */}
        <div>
          <h3 className="font-bold text-purple-700 text-sm mb-2">جميع الأذكار</h3>
          <div className="space-y-2">
            {tasbeehs.map(t => (
              <div key={t.id} onClick={() => setSelectedId(t.id)}
                className={`clay-card p-3 flex items-center justify-between cursor-pointer transition-all active:scale-98 ${selectedId === t.id ? "ring-2 ring-purple-400" : ""}`}>
                <span className="text-sm text-purple-700 font-medium arabic-verse">{t.name}</span>
                <div className="flex gap-3 items-center">
                  <span className="text-xs text-purple-400">الكل: {t.totalCount}</span>
                  <span className="text-purple-600 font-bold text-lg min-w-8 text-center">{t.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
