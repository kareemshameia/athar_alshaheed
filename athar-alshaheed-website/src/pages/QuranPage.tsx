import { useState } from "react";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { surahsList } from "../data/surah";

interface Props {
  onBack: () => void;
}

export default function QuranPage({ onBack }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const surah = surahsList[selectedIndex];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #EDE7F6 0%, #F3E5F5 50%, #E8EAF6 100%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(237,231,246,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(179,157,219,0.3)" }}>
        <button onClick={onBack} className="flex items-center gap-1 text-purple-600 font-semibold text-sm hover:text-purple-800 transition-colors">
          <ArrowRight size={18} />
          عودة
        </button>
        <h1 className="text-lg font-bold gold-text">القرآن والتلاوة</h1>
        <BookOpen size={20} className="text-purple-400" />
      </div>

      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        {/* Surah selector */}
        <div className="clay-card p-3">
          <p className="text-xs text-purple-400 mb-2 font-medium">اختر السورة</p>
          <div className="flex flex-wrap gap-2">
            {surahsList.map((s, i) => (
              <button key={i} onClick={() => setSelectedIndex(i)}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${selectedIndex === i ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-600 hover:bg-purple-100"}`}>
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Surah header */}
        <div className="clay-card p-5 text-center fade-in-up">
          <div className="text-4xl mb-2">📖</div>
          <h2 className="text-xl font-bold text-purple-800 mb-1">{surah.name}</h2>
          <div className="flex items-center justify-center gap-3 text-sm text-purple-400">
            <span>{surah.type}</span>
            <span>•</span>
            <span>{surah.verses.length} آيات</span>
          </div>
        </div>

        {/* Dedication */}
        <div className="rounded-xl px-4 py-3 text-center text-sm text-purple-600 font-medium"
          style={{ background: "rgba(126,87,194,0.08)", border: "1px solid rgba(126,87,194,0.15)" }}>
          اللهم أهدِ ثواب هذه القراءة إلى روح الشهيد عبد الرحمن محيسن
        </div>

        {/* Verses */}
        <div className="space-y-3">
          {surah.verses.map((verse, i) => (
            <div key={i} className="clay-card p-4 flex gap-3 items-start fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="arabic-verse text-purple-800 text-base leading-9">{verse}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between py-2">
          <button
            onClick={() => setSelectedIndex(i => Math.max(0, i - 1))}
            disabled={selectedIndex === 0}
            className={`clay-card p-3 flex items-center gap-1 text-sm font-medium transition-all ${selectedIndex === 0 ? "opacity-40" : "text-purple-600 hover:text-purple-800 active:scale-95"}`}>
            <ChevronRight size={18} />
            السابقة
          </button>
          <span className="text-xs text-purple-400">{selectedIndex + 1} / {surahsList.length}</span>
          <button
            onClick={() => setSelectedIndex(i => Math.min(surahsList.length - 1, i + 1))}
            disabled={selectedIndex === surahsList.length - 1}
            className={`clay-card p-3 flex items-center gap-1 text-sm font-medium transition-all ${selectedIndex === surahsList.length - 1 ? "opacity-40" : "text-purple-600 hover:text-purple-800 active:scale-95"}`}>
            التالية
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
