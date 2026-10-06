import React from 'react';
import { SlideCategory } from '../types/slide';

interface TopBarProps {
  currentSlideNumber: number;
  totalSlides: number;
  isPresenterMode: boolean;
  onTogglePresenterMode: () => void;
  onOpenOverview: () => void;
  onOpenPrint: () => void;
  onSelectCategory: (category: SlideCategory) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentSlideNumber,
  totalSlides,
  isPresenterMode,
  onTogglePresenterMode,
  onOpenOverview,
  onOpenPrint,
  onSelectCategory
}) => {
  return (
    <header className="no-print h-14 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4 z-40 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenOverview}
          className="text-base font-extrabold tracking-tight text-slate-900 hover:text-cyan-700 transition-colors whitespace-nowrap"
        >
          NANO604 SPM Master
        </button>
        <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
          Слайд {currentSlideNumber}/{totalSlides}
        </span>
      </div>

      {/* Zone 2: Clean single-line module nav links */}
      <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600 shrink-0">
        <button
          onClick={() => onSelectCategory('Удиртгал ба SPM гэр бүл')}
          className="hover:text-cyan-700 transition-colors whitespace-nowrap"
        >
          Ерөнхий SPM
        </button>
        <button
          onClick={() => onSelectCategory('STM: Туннелийн микроскопи')}
          className="hover:text-cyan-700 transition-colors whitespace-nowrap"
        >
          STM Туннель
        </button>
        <button
          onClick={() => onSelectCategory('AFM: Кантилевер ба хүчний мэдрэгч')}
          className="hover:text-cyan-700 transition-colors whitespace-nowrap"
        >
          AFM Хүч (F=kδ)
        </button>
        <button
          onClick={() => onSelectCategory('Нарийвчлал, конволюци ба хийсвэр дүр')}
          className="hover:text-cyan-700 transition-colors whitespace-nowrap"
        >
          Конволюци & Алдаа
        </button>
        <button
          onClick={() => onSelectCategory('Хүч-зайн муруй ба Шалгалт тохируулга')}
          className="hover:text-cyan-700 transition-colors whitespace-nowrap"
        >
          Хүч-зай & NIST
        </button>
        <button
          onClick={() => onSelectCategory('Аргын сонголт ба Туршилтын дизайн')}
          className="hover:text-cyan-700 transition-colors whitespace-nowrap"
        >
          Туршилтын дизайн
        </button>
      </nav>

      {/* Zone 3: Primary Action Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onTogglePresenterMode}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap border ${
            isPresenterMode
              ? 'bg-cyan-900/10 text-cyan-800 border-cyan-300 font-bold'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
          title="Багшийн заавар, тэмдэглэл, таймер дэлгэцийг нээх (Keyboard: P эсвэл N)"
        >
          {isPresenterMode ? 'Оюутны горимд шилжих' : 'Багшийн горим'}
        </button>

        <button
          onClick={onOpenOverview}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors whitespace-nowrap shadow-sm"
          title="30 слайдын каталогийг нээх (Keyboard: O)"
        >
          Бүх 30 слайд
        </button>

        <button
          onClick={onOpenPrint}
          className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap border border-slate-300 flex items-center gap-1.5 cursor-pointer shadow-xs"
          title="30 слайдыг бүрэн хэвлэх / PDF болгох цонх нээх"
        >
          <span>🖨️</span>
          <span className="hidden sm:inline">Хэвлэх / PDF</span>
        </button>
      </div>
    </header>
  );
};
