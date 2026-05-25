import { useState } from "react";
import { ArrowRight, Type, RotateCcw, Sun, Vibrate, ChevronLeft, ChevronRight } from "lucide-react";

interface Settings {
  fontName: "Cairo" | "Tajawal" | "Amiri";
  fontSize: number; // 0.8 - 1.6
  haptic: boolean;
}

function loadSettings(): Settings {
  try { const s = localStorage.getItem("athar_settings"); if (s) return JSON.parse(s); } catch {}
  return { fontName: "Cairo", fontSize: 1.0, haptic: true };
}
function saveSettings(s: Settings) { localStorage.setItem("athar_settings", JSON.stringify(s)); }

interface Props { onBack: () => void; }

export default function SettingsPage({ onBack }: Props) {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function update(patch: Partial<Settings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveSettings(next);
  }

  function resetAll() {
    const def: Settings = { fontName: "Cairo", fontSize: 1.0, haptic: true };
    setSettings(def);
    saveSettings(def);
    localStorage.removeItem("athar_deeds");
    localStorage.removeItem("athar_tasbeehs");
    localStorage.removeItem("athar_custom_prayers");
    localStorage.removeItem("athar_favorites");
    setShowResetConfirm(false);
    showToast("تمت إعادة تعيين جميع الإعدادات والعدادات بنجاح ✅");
  }

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000); }

  const fontSizeLabel = (v: number) => {
    if (v <= 0.85) return "صغير جداً";
    if (v <= 0.95) return "صغير";
    if (v <= 1.05) return "متوسط";
    if (v <= 1.2) return "كبير";
    if (v <= 1.4) return "كبير جداً";
    return "ضخم";
  };

  const fonts: Array<Settings["fontName"]> = ["Cairo", "Tajawal", "Amiri"];

  const sampleText = "اللهم ارحم الشهيد عبد الرحمن محيسن";

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #EDE7F6 0%, #F3E5F5 50%, #E8EAF6 100%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(237,231,246,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(179,157,219,0.3)" }}>
        <button onClick={onBack} className="flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 transition-colors">
          <ArrowRight size={18} /> عودة
        </button>
        <h1 className="text-lg font-bold gold-text">الإعدادات</h1>
        <div className="w-14" />
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl text-white text-sm font-semibold shadow-xl"
          style={{ background: "linear-gradient(135deg,#7E57C2,#512DA8)" }}>
          {toast}
        </div>
      )}

      {/* Reset confirm */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setShowResetConfirm(false)}>
          <div className="clay-card p-5 w-full max-w-xs" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-purple-800 mb-2 text-center">⚠️ إعادة تعيين كاملة</h3>
            <p className="text-sm text-purple-600 text-center mb-4 leading-6">
              سيتم مسح جميع عدادات المسبحة والأعمال الصالحة والأدعية المخصصة والمفضلة. لا يمكن التراجع.
            </p>
            <div className="flex gap-2">
              <button onClick={resetAll}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm active:scale-95">
                تأكيد الإعادة
              </button>
              <button onClick={() => setShowResetConfirm(false)}
                className="flex-1 clay-card py-2.5 rounded-xl text-purple-600 font-bold text-sm active:scale-95">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        {/* Font preview */}
        <div className="clay-card p-4">
          <p className="text-xs text-purple-400 mb-2 font-medium flex items-center gap-1.5">
            <Type size={13} /> معاينة النص
          </p>
          <p className="text-purple-800 text-center leading-9"
            style={{ fontFamily: `${settings.fontName}, sans-serif`, fontSize: `${settings.fontSize}rem` }}>
            {sampleText}
          </p>
        </div>

        {/* Font family */}
        <div className="clay-card p-4 space-y-3">
          <p className="font-bold text-purple-700 text-sm flex items-center gap-2">
            <Type size={16} /> نوع الخط
          </p>
          <div className="flex gap-2">
            {fonts.map(f => (
              <button key={f} onClick={() => update({ fontName: f })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${settings.fontName === f ? "bg-purple-600 text-white shadow-md" : "clay-card text-purple-600"}`}
                style={{ fontFamily: `${f}, sans-serif` }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Font size */}
        <div className="clay-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-bold text-purple-700 text-sm">حجم الخط</p>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-semibold">
              {fontSizeLabel(settings.fontSize)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => update({ fontSize: Math.max(0.8, parseFloat((settings.fontSize - 0.1).toFixed(1))) })}
              className="clay-card p-2 text-purple-600 active:scale-90 transition-all disabled:opacity-40"
              disabled={settings.fontSize <= 0.8}>
              <ChevronRight size={20} />
            </button>
            <div className="flex-1">
              <input type="range" min={0.8} max={1.6} step={0.1}
                value={settings.fontSize}
                onChange={e => update({ fontSize: parseFloat(e.target.value) })}
                className="w-full accent-purple-600"
              />
              <div className="flex justify-between text-xs text-purple-300 mt-1">
                <span>أ</span>
                <span style={{ fontSize: "1.1rem" }}>أ</span>
                <span style={{ fontSize: "1.4rem" }}>أ</span>
              </div>
            </div>
            <button onClick={() => update({ fontSize: Math.min(1.6, parseFloat((settings.fontSize + 0.1).toFixed(1))) })}
              className="clay-card p-2 text-purple-600 active:scale-90 transition-all disabled:opacity-40"
              disabled={settings.fontSize >= 1.6}>
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        {/* Haptic */}
        <div className="clay-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Vibrate size={18} className="text-purple-500" />
              <div>
                <p className="font-bold text-purple-700 text-sm">الاهتزاز التفاعلي</p>
                <p className="text-xs text-purple-400 mt-0.5">اهتزاز خفيف عند الضغط</p>
              </div>
            </div>
            <button onClick={() => update({ haptic: !settings.haptic })}
              className={`relative w-12 h-6 rounded-full transition-all ${settings.haptic ? "bg-purple-600" : "bg-purple-200"}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${settings.haptic ? "left-7" : "left-1"}`} />
            </button>
          </div>
        </div>

        {/* Reset all */}
        <div className="clay-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw size={16} className="text-red-400" />
            <p className="font-bold text-purple-700 text-sm">إعادة تعيين شاملة</p>
          </div>
          <p className="text-xs text-purple-400 leading-6 mb-3">
            تُعيد جميع الإعدادات إلى الوضع الافتراضي وتمسح عدادات المسبحة والأعمال الصالحة والأدعية المخصصة.
          </p>
          <button onClick={() => setShowResetConfirm(true)}
            className="w-full py-2.5 rounded-xl bg-red-50 text-red-500 font-bold text-sm border border-red-200 hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center gap-2">
            <RotateCcw size={15} />
            إعادة تعيين الكل
          </button>
        </div>

        {/* App info */}
        <div className="clay-card p-4 text-center space-y-1">
          <img src="/app_icon.png" alt="" className="w-12 h-12 rounded-xl mx-auto mb-2 shadow" />
          <p className="font-bold text-purple-700">أثر الشهيد</p>
          <p className="text-xs text-purple-400">صدقة جارية لروح الشهيد عبد الرحمن محيسن</p>
          <p className="text-xs text-purple-300">الإصدار 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
