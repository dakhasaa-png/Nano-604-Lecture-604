import React, { useState } from 'react';
import { SlideData, LLO, SlideCategory } from '../types/slide';
import { CATEGORIES, LLOS } from '../data/allSlides';

interface DeckOverviewProps {
  slides: SlideData[];
  currentSlideNumber: number;
  onSelectSlide: (slideNumber: number) => void;
  onClose: () => void;
}

export const DeckOverview: React.FC<DeckOverviewProps> = ({
  slides,
  currentSlideNumber,
  onSelectSlide,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLLO, setSelectedLLO] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSlides = slides.filter((slide) => {
    if (selectedCategory !== 'all' && slide.category !== selectedCategory) return false;
    if (selectedLLO !== 'all' && slide.targetLLO !== selectedLLO) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = slide.title.toLowerCase().includes(q);
      const matchSubtitle = slide.subtitle?.toLowerCase().includes(q) || false;
      const matchMessage = slide.keyMessage.toLowerCase().includes(q);
      const matchBullets = slide.bullets.some(b => b.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchMessage || matchBullets;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col p-4 sm:p-8 text-slate-100">
      {/* Top Header */}
      <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            NANO604 Лекцийн индекс (30 Слайд бүрэн танилцуулга)
          </span>
          <h2 className="text-xl font-bold text-white">
            Сканнинг проб микроскопи (SPM) — Хичээлийн бүтцийн тойм
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Слайд хайх (нэр, сэдэв, түлхүүр үг)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-200 border border-slate-700"
          >
            Хаах (Esc)
          </button>
        </div>
      </div>

      {/* Filter Ribbons */}
      <div className="max-w-7xl w-full mx-auto space-y-2 mb-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] font-mono mr-1">Бүлэг:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Бүгд (30)
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LLO Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] font-mono mr-1">Үр дүн:</span>
          <button
            onClick={() => setSelectedLLO('all')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium transition-colors ${
              selectedLLO === 'all'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Бүх LLO
          </button>
          {LLOS.map((llo) => (
            <button
              key={llo.id}
              onClick={() => setSelectedLLO(llo.id)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium transition-colors ${
                selectedLLO === llo.id
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {llo.id}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 30 Slide Cards */}
      <div className="max-w-7xl w-full mx-auto flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-6">
          {filteredSlides.map((slide) => {
            const isCurrent = slide.slideNumber === currentSlideNumber;
            const hasWidget = slide.interactiveWidget && slide.interactiveWidget.type !== 'none';

            return (
              <div
                key={slide.id}
                onClick={() => {
                  onSelectSlide(slide.slideNumber);
                  onClose();
                }}
                className={`group p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-cyan-950/60 border-cyan-500 shadow-md ring-1 ring-cyan-500/50'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  {/* Top card bar */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <span className="font-bold text-slate-300">
                      #{slide.slideNumber.toString().padStart(2, '0')}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-sky-300 border border-slate-700">
                      {slide.targetLLO}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {slide.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {slide.keyMessage}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="truncate max-w-[140px]">{slide.category}</span>
                  {hasWidget && (
                    <span className="text-cyan-400 font-bold shrink-0">⚡ Интерактив</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
