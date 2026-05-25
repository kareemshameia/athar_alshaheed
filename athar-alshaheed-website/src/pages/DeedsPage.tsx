import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Circle, Info, Plus, Trash2, X } from "lucide-react";
import { loadDeeds, saveDeeds, DeedState } from "../data/deeds";

interface Props { onBack: () => void; }

const completionMessages = [
  "اللهم تقبلها عن روح الشهيد 🤍",
  "جزاك الله خيرًا، وصل ثوابك للشهيد بإذن الله ✨",
  "بارك الله فيك، نورٌ وصل إليه إن شاء الله 🌙",
  "أجرك محفوظ عند الله، والشهيد يشكرك 💜",
  "اللهم اجعل هذا العمل في ميزان حسناته 🤲",
];

export default function DeedsPage({ onBack }: Props) {
  const [deeds, setDeeds] = useState<DeedState[]>(loadDeeds);
  const [completedMsg, setCompletedMsg] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => { saveDeeds(deeds); }, [deeds]);

  function completeDeed(id: string) {
    setDeeds(prev => prev.map(d => d.id !== id ? d : {
      ...d,
      completedCount: d.completedCount + 1,
      lastCompletedTimestamp: Date.now()
    }));
    const msg = completionMessages[Math.floor(Math.random() * completionMessages.length)];
    setCompletedMsg(msg);
    setTimeout(() => setCompletedMsg(null), 3000);
  }

  function addDeed() {
    if (!newTitle.trim()) return;
    const nd: DeedState = {
      id: `custom_${Date.now()}`,
      title: newTitle.trim(),
      completedCount: 0,
      lastCompletedTimestamp: 0,
    };
    setDeeds(prev => [...prev, nd]);
    setNewTitle("");
    setShowAddDialog(false);
  }

  function deleteDeed(id: string) {
    setDeeds(prev => prev.filter(d => d.id !== id));
    setConfirmDelete(null);
  }

  const totalCompleted = deeds.reduce((s, d) => s + d.completedCount, 0);
  const completedToday = deeds.filter(d => {
    const now = Date.now();
    return d.lastCompletedTimestamp > now - 86400000;
  }).length;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #EDE7F6 0%, #F3E5F5 50%, #E8EAF6 100%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(237,231,246,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(179,157,219,0.3)" }}>
        <button onClick={onBack} className="flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 transition-colors">
          <ArrowRight size={18} /> عودة
        </button>
        <h1 className="text-lg font-bold gold-text">أعمال صالحة للأثر</h1>
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">{totalCompleted}</span>
      </div>

      {/* Completion overlay */}
      {completedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-6">
          <div className="px-6 py-4 text-center rounded-2xl shadow-2xl"
            style={{ background: "linear-gradient(135deg, rgba(126,87,194,0.97), rgba(81,45,168,0.97))" }}>
            <p className="text-white font-bold text-base">{completedMsg}</p>
          </div>
        </div>
      )}

      {/* Add Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setShowAddDialog(false)}>
          <div className="clay-card p-5 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-purple-800">إضافة عمل صالح</h3>
              <button onClick={() => setShowAddDialog(false)} className="text-purple-400"><X size={18} /></button>
            </div>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="مثال: قراءة سورة يس للشهيد"
              className="w-full rounded-xl border border-purple-200 bg-purple-50 p-3 text-purple-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              onKeyDown={e => e.key === "Enter" && addDeed()}
            />
            <div className="flex gap-2 mt-3">
              <button onClick={addDeed} disabled={!newTitle.trim()}
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

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setConfirmDelete(null)}>
          <div className="clay-card p-5 w-full max-w-xs text-center" onClick={e => e.stopPropagation()}>
            <p className="text-purple-800 font-bold mb-4">حذف هذا العمل؟</p>
            <div className="flex gap-2">
              <button onClick={() => deleteDeed(confirmDelete)}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm active:scale-95">حذف</button>
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 clay-card py-2.5 rounded-xl text-purple-600 font-bold text-sm active:scale-95">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 py-4 space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="clay-card p-3 text-center">
            <p className="text-xs text-purple-400 mb-1">إجمالي الأعمال</p>
            <p className="text-2xl font-bold text-purple-700">{totalCompleted}</p>
          </div>
          <div className="clay-card p-3 text-center">
            <p className="text-xs text-purple-400 mb-1">أُنجز اليوم</p>
            <p className="text-2xl font-bold text-amber-500">{completedToday}</p>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-2xl p-4 flex gap-3"
          style={{ background: "rgba(126,87,194,0.08)", border: "1px solid rgba(126,87,194,0.18)" }}>
          <Info size={18} className="text-purple-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-purple-700 leading-7">
            أنجز هذه الأعمال الصالحة وأهدِ ثوابها للشهيد عبد الرحمن محيسن. كل عمل تُنجزه يُضاف إلى ميزانه بإذن الله.
          </p>
        </div>

        {/* Deeds list */}
        {deeds.map((deed, i) => {
          const isCustom = deed.id.startsWith("custom_");
          const doneToday = deed.lastCompletedTimestamp > Date.now() - 86400000 && deed.completedCount > 0;
          return (
            <div key={deed.id} className="clay-card p-4 fade-in-up" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-start gap-3">
                <button onClick={() => completeDeed(deed.id)}
                  className="flex-shrink-0 mt-0.5 active:scale-90 transition-transform">
                  {deed.completedCount > 0
                    ? <CheckCircle2 size={26} className="text-purple-600 fill-purple-100" />
                    : <Circle size={26} className="text-purple-300" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-purple-800 font-medium leading-7">{deed.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {deed.completedCount > 0 && (
                      <span className="text-xs text-purple-400">
                        أُنجز {deed.completedCount} {deed.completedCount === 1 ? "مرة" : "مرات"}
                      </span>
                    )}
                    {doneToday && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">✓ اليوم</span>
                    )}
                    {isCustom && (
                      <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-semibold">مخصص</span>
                    )}
                  </div>
                </div>
                {isCustom && (
                  <button onClick={() => setConfirmDelete(deed.id)}
                    className="flex-shrink-0 p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-all active:scale-90">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div className="pb-20" />
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
