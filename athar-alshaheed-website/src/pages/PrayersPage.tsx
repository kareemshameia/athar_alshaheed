import { useState, useEffect } from "react";
import { ArrowRight, Copy, Share2, ChevronLeft, ChevronRight, List, LayoutGrid, Plus, Trash2, Heart } from "lucide-react";
import { prayersList, getPrayersByCategory } from "../data/prayers";

interface CustomPrayer {
  id: number;
  text: string;
  category: string;
  timestamp: number;
}

interface DisplayPrayer {
  id?: number;
  text: string;
  category: string;
  isCustom: boolean;
}

function loadCustomPrayers(): CustomPrayer[] {
  try { const s = localStorage.getItem("athar_custom_prayers"); if (s) return JSON.parse(s); } catch {}
  return [];
}
function saveCustomPrayers(items: CustomPrayer[]) {
  localStorage.setItem("athar_custom_prayers", JSON.stringify(items));
}

interface Props { onBack: () => void; }

export default function PrayersPage({ onBack }: Props) {
  const [category, setCategory] = useState("أدعية قصيرة");
  const [displayMode, setDisplayMode] = useState<0 | 1>(0); // 0=slider, 1=list
  const [sliderIndex, setSliderIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try { const s = localStorage.getItem("athar_favorites"); return s ? new Set(JSON.parse(s)) : new Set(); } catch { return new Set(); }
  });
  const [customPrayers, setCustomPrayers] = useState<CustomPrayer[]>(loadCustomPrayers);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newPrayerText, setNewPrayerText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { saveCustomPrayers(customPrayers); }, [customPrayers]);
  useEffect(() => {
    localStorage.setItem("athar_favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  // Merge static + custom prayers
  const staticPrayers: DisplayPrayer[] = getPrayersByCategory(category).map((p, i) => ({
    id: i,
    text: p.text,
    category: p.category,
    isCustom: false,
  }));
  const customFiltered: DisplayPrayer[] = customPrayers
    .filter(p => p.category === category)
    .map(p => ({ id: p.id, text: p.text, category: p.category, isCustom: true }));
  const prayers: DisplayPrayer[] = [...staticPrayers, ...customFiltered];

  const shortCount = prayersList.filter(p => p.category === "أدعية قصيرة").length
    + customPrayers.filter(p => p.category === "أدعية قصيرة").length;
  const longCount = prayersList.filter(p => p.category === "أدعية طويلة").length
    + customPrayers.filter(p => p.category === "أدعية طويلة").length;

  const current = prayers[sliderIndex] ?? prayers[0];

  function changeCategory(cat: string) { setCategory(cat); setSliderIndex(0); }

  function copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  function shareText(text: string) {
    if (navigator.share) navigator.share({ text }); else copyText(text);
  }
  function toggleFav(key: string) {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }
  function addCustomPrayer() {
    if (!newPrayerText.trim()) return;
    const np: CustomPrayer = { id: Date.now(), text: newPrayerText.trim(), category, timestamp: Date.now() };
    setCustomPrayers(prev => [np, ...prev]);
    setNewPrayerText("");
    setShowAddDialog(false);
    showToast("تمت إضافة الدعاء بنجاح ✨");
  }
  function deleteCustomPrayer(id: number) {
    setCustomPrayers(prev => prev.filter(p => p.id !== id));
    if (sliderIndex > 0) setSliderIndex(s => s - 1);
    showToast("تم حذف الدعاء");
  }
  function showToast(msg: string) {
    setToast(msg); setTimeout(() => setToast(null), 2500);
  }

  const favKey = (p: DisplayPrayer) => `${p.isCustom ? "c" : "s"}_${p.id}`;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #EDE7F6 0%, #F3E5F5 50%, #E8EAF6 100%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(237,231,246,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(179,157,219,0.3)" }}>
        <button onClick={onBack} className="flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 transition-colors">
          <ArrowRight size={18} /> عودة
        </button>
        <h1 className="text-lg font-bold gold-text">أدعية وأذكار الشهيد</h1>
        <div className="w-16" />
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 z-50 -translate-x-1/2 px-5 py-2.5 rounded-2xl text-white text-sm font-semibold shadow-xl"
          style={{ background: "linear-gradient(135deg,#7E57C2,#512DA8)" }}>
          {toast}
        </div>
      )}

      {/* Add Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setShowAddDialog(false)}>
          <div className="clay-card p-5 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-purple-800 mb-3 text-center">إضافة دعاء مخصص</h3>
            <p className="text-xs text-purple-500 mb-2 text-center">سيُضاف إلى: <strong>{category}</strong></p>
            <textarea
              value={newPrayerText}
              onChange={e => setNewPrayerText(e.target.value)}
              placeholder="اكتب دعاءك هنا..."
              rows={4}
              className="w-full rounded-xl border border-purple-200 bg-purple-50 p-3 text-purple-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 arabic-verse leading-8"
            />
            <div className="flex gap-2 mt-3">
              <button onClick={addCustomPrayer} disabled={!newPrayerText.trim()}
                className="flex-1 bg-purple-600 text-white py-2.5 rounded-xl font-bold text-sm disabled:opacity-40 active:scale-95 transition-all">
                إضافة
              </button>
              <button onClick={() => setShowAddDialog(false)}
                className="flex-1 clay-card py-2.5 rounded-xl text-purple-600 font-bold text-sm active:scale-95 transition-all">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 py-3 space-y-3">
        {/* Category cards */}
        <div className="flex gap-3">
          {[
            { label: "أدعية قصيرة", sub: `${shortCount} دعاءً تفيض بالرحمة` },
            { label: "أدعية طويلة", sub: `${longCount} مناجاة بأجر عظيم` },
          ].map(cat => (
            <button key={cat.label} onClick={() => changeCategory(cat.label)}
              className={`flex-1 py-4 px-3 rounded-2xl transition-all text-center ${category === cat.label
                ? "shadow-md"
                : ""}`}
              style={{
                background: category === cat.label
                  ? "linear-gradient(135deg, rgba(126,87,194,0.2), rgba(81,45,168,0.15))"
                  : "rgba(255,255,255,0.5)",
                border: `2px solid ${category === cat.label ? "rgba(126,87,194,0.5)" : "rgba(179,157,219,0.2)"}`,
                boxShadow: category === cat.label ? "0 4px 14px rgba(126,87,194,0.2)" : "none",
              }}>
              <p className={`font-bold text-base ${category === cat.label ? "text-purple-800" : "text-purple-500"}`}>
                {cat.label}
              </p>
              <p className={`text-xs mt-1 ${category === cat.label ? "text-amber-500 font-semibold" : "text-purple-400"}`}>
                {cat.sub}
              </p>
            </button>
          ))}
        </div>

        {/* Display mode toggle */}
        <div className="flex rounded-2xl overflow-hidden border border-purple-200"
          style={{ background: "rgba(255,255,255,0.5)" }}>
          {[{ val: 0 as const, icon: <LayoutGrid size={16} />, label: "نظام البطاقات" },
            { val: 1 as const, icon: <List size={16} />, label: "النظام التقليدي" }].map(btn => (
            <button key={btn.val} onClick={() => setDisplayMode(btn.val)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all ${displayMode === btn.val
                ? "bg-purple-600 text-white"
                : "text-purple-500 hover:bg-purple-50"}`}>
              {btn.icon} {btn.label}
            </button>
          ))}
        </div>

        {prayers.length === 0 ? (
          <div className="clay-card p-8 text-center text-purple-400">لا توجد أدعية متاحة</div>
        ) : displayMode === 0 ? (
          /* ── SLIDER MODE ── */
          <div className="space-y-3 fade-in-up">
            <div className="clay-card overflow-hidden"
              style={{ minHeight: 380, background: "white", borderRadius: "2rem" }}>
              <div className="p-6 flex flex-col h-full" style={{ minHeight: 380 }}>
                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                  {current?.isCustom ? (
                    <button onClick={() => deleteCustomPrayer(current.id!)}
                      className="p-1.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition-all active:scale-90">
                      <Trash2 size={16} />
                    </button>
                  ) : <div className="w-8" />}
                  <span className="text-xs text-purple-300 font-medium">
                    {sliderIndex + 1} / {prayers.length}
                    {current?.isCustom && <span className="mr-1 text-amber-400">(مخصص)</span>}
                  </span>
                  <button onClick={() => toggleFav(favKey(current))}
                    className="p-1.5 rounded-xl transition-all active:scale-90"
                    style={{ background: favorites.has(favKey(current)) ? "rgba(126,87,194,0.1)" : "transparent" }}>
                    <Heart size={18}
                      className={favorites.has(favKey(current)) ? "fill-purple-500 text-purple-500" : "text-purple-300"} />
                  </button>
                </div>

                {/* Prayer text */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="arabic-verse text-purple-800 text-lg leading-10 text-center">
                    {current?.text}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button onClick={() => copyText(current?.text ?? "")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${copied ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600 hover:bg-purple-200"}`}>
                    <Copy size={14} /> {copied ? "تم النسخ!" : "نسخ"}
                  </button>
                  <button onClick={() => shareText(current?.text ?? "")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200 text-sm font-semibold transition-all active:scale-95">
                    <Share2 size={14} /> مشاركة
                  </button>
                </div>
              </div>
            </div>

            {/* Nav arrows + dots */}
            <div className="flex items-center justify-between">
              <button onClick={() => setSliderIndex(i => (i - 1 + prayers.length) % prayers.length)}
                className="clay-card p-3 text-purple-600 active:scale-90 transition-all">
                <ChevronRight size={22} />
              </button>
              <div className="flex gap-1.5 flex-wrap justify-center max-w-40">
                {prayers.slice(0, 9).map((_, i) => (
                  <button key={i} onClick={() => setSliderIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === sliderIndex ? "bg-purple-600 w-5" : "bg-purple-200 w-2"}`} />
                ))}
                {prayers.length > 9 && <span className="text-xs text-purple-300">…</span>}
              </div>
              <button onClick={() => setSliderIndex(i => (i + 1) % prayers.length)}
                className="clay-card p-3 text-purple-600 active:scale-90 transition-all">
                <ChevronLeft size={22} />
              </button>
            </div>
          </div>
        ) : (
          /* ── LIST MODE ── */
          <div className="space-y-3 fade-in-up">
            {prayers.map((prayer, i) => (
              <div key={`${prayer.isCustom}_${prayer.id}_${i}`} className="clay-card p-4">
                {prayer.isCustom && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-semibold">مخصص</span>
                  </div>
                )}
                <p className="arabic-verse text-purple-800 text-base leading-9">{prayer.text}</p>
                <div className="flex items-center justify-between mt-3">
                  <button onClick={() => toggleFav(favKey(prayer))}
                    className="flex items-center gap-1 text-xs transition-all active:scale-90"
                    style={{ color: favorites.has(favKey(prayer)) ? "#7E57C2" : "#B39DDB" }}>
                    <Heart size={14} className={favorites.has(favKey(prayer)) ? "fill-purple-500" : ""} />
                    {favorites.has(favKey(prayer)) ? "مفضّل" : "أضف للمفضلة"}
                  </button>
                  <div className="flex gap-2">
                    {prayer.isCustom && (
                      <button onClick={() => deleteCustomPrayer(prayer.id!)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-all active:scale-90">
                        <Trash2 size={14} />
                      </button>
                    )}
                    <button onClick={() => copyText(prayer.text)}
                      className="p-1.5 rounded-lg bg-purple-100 text-purple-500 hover:bg-purple-200 transition-all">
                      <Copy size={14} />
                    </button>
                    <button onClick={() => shareText(prayer.text)}
                      className="p-1.5 rounded-lg bg-purple-100 text-purple-500 hover:bg-purple-200 transition-all">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button onClick={() => setShowAddDialog(true)}
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-purple-600 text-white shadow-2xl flex items-center justify-center active:scale-90 transition-all hover:bg-purple-700 z-30"
        style={{ boxShadow: "0 8px 24px rgba(126,87,194,0.4)" }}>
        <Plus size={26} />
      </button>
    </div>
  );
}
