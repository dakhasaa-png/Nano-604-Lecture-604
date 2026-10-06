import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { allSlides, CATEGORIES } from './data/allSlides';
import { SlideCategory } from './types/slide';
import { TopBar } from './components/TopBar';
import { SlideViewer } from './components/SlideViewer';
import { PresenterNotes } from './components/PresenterNotes';
import { DeckOverview } from './components/DeckOverview';
import { PrintHandout } from './components/PrintHandout';
import { StandalonePrintView } from './components/StandalonePrintView';

export default function App() {
  // Check if opened as dedicated top-level print view via URL query parameter
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const isStandalonePrint = searchParams.get('print') === '1' || searchParams.get('print') === 'true';
  const standaloneNotes = searchParams.get('notes') === '1' || searchParams.get('notes') === 'true';

  if (isStandalonePrint) {
    return <StandalonePrintView slides={allSlides} initialIncludeNotes={standaloneNotes} />;
  }

  const [currentSlideNumber, setCurrentSlideNumber] = useState<number>(1);
  const [isPresenterMode, setIsPresenterMode] = useState<boolean>(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);

  const totalSlides = allSlides.length;
  const currentSlide = allSlides[currentSlideNumber - 1];
  const nextSlide = currentSlideNumber < totalSlides ? allSlides[currentSlideNumber] : undefined;

  const goToSlide = useCallback((num: number) => {
    if (num >= 1 && num <= totalSlides) {
      setCurrentSlideNumber(num);
    }
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    if (currentSlideNumber < totalSlides) {
      setCurrentSlideNumber((prev) => prev + 1);
    }
  }, [currentSlideNumber, totalSlides]);

  const handlePrev = useCallback(() => {
    if (currentSlideNumber > 1) {
      setCurrentSlideNumber((prev) => prev - 1);
    }
  }, [currentSlideNumber]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if focus is inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      // Handle Ctrl+P / Cmd+P: open print handout view
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        setIsPrintOpen(true);
        return; // Allow native print event or dialog
      }

      // Do not intercept other modifier key combinations
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          handlePrev();
          break;
        case 'p':
        case 'P':
        case 'n':
        case 'N':
          e.preventDefault();
          setIsPresenterMode((prev) => !prev);
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          setIsOverviewOpen((prev) => !prev);
          break;
        case 'Escape':
          setIsOverviewOpen(false);
          setIsPrintOpen(false);
          break;
        case 'f':
        case 'F':
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Navigate to first slide of selected category
  const handleSelectCategory = (cat: SlideCategory) => {
    const target = allSlides.find((s) => s.category === cat);
    if (target) {
      goToSlide(target.slideNumber);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 select-none">
      {/* Universal Top Bar */}
      <TopBar
        currentSlideNumber={currentSlideNumber}
        totalSlides={totalSlides}
        isPresenterMode={isPresenterMode}
        onTogglePresenterMode={() => setIsPresenterMode(!isPresenterMode)}
        onOpenOverview={() => setIsOverviewOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Presentation Stage & Console */}
      <main className={`flex-1 flex overflow-hidden ${isPrintOpen ? 'no-print' : ''}`}>
        {/* Slide Viewer (Main 16:9 Stage) */}
        <div
          className={`h-full flex flex-col transition-all duration-300 ${
            isPresenterMode ? 'w-full lg:w-8/12 xl:w-9/12' : 'w-full'
          }`}
        >
          <div className="flex-1 p-2 sm:p-4 overflow-hidden flex items-center justify-center">
            {/* 16:9 Presentation Canvas Container */}
            <div className="w-full h-full max-w-[1720px] bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex flex-col">
              <SlideViewer
                slide={currentSlide}
                isPresenterMode={isPresenterMode}
              />
            </div>
          </div>

          {/* Presentation Bottom Navigation Ribbon */}
          <footer className="no-print h-14 bg-white border-t border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
            {/* Left: Previous Button & Slide Indicator */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={currentSlideNumber === 1}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-800 transition-colors flex items-center gap-1.5"
                title="Өмнөх слайд (Зүүн сум / Left Arrow)"
              >
                <span>←</span>
                <span className="hidden sm:inline">Өмнөх</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentSlideNumber === totalSlides}
                className="px-4 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-sm"
                title="Дараагийн слайд (Баруун сум эсвэл Space)"
              >
                <span>Дараах</span>
                <span>→</span>
              </button>
            </div>

            {/* Middle: Interactive Slide Jump Menu & Progress Bar */}
            <div className="flex-1 max-w-md mx-2 sm:mx-6 flex flex-col justify-center">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                <span className="truncate max-w-[200px]">{currentSlide.title}</span>
                <span className="font-bold text-slate-700">
                  {currentSlideNumber} / {totalSlides}
                </span>
              </div>
              {/* Progress track */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-600 h-full transition-all duration-200"
                  style={{ width: `${(currentSlideNumber / totalSlides) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Right: Quick Tools */}
            <div className="flex items-center gap-2">
              <select
                value={currentSlideNumber}
                onChange={(e) => goToSlide(parseInt(e.target.value))}
                className="bg-slate-100 border border-slate-300 text-xs font-mono font-medium rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-cyan-600"
              >
                {allSlides.map((s) => (
                  <option key={s.id} value={s.slideNumber}>
                    {s.slideNumber.toString().padStart(2, '0')}. {s.title.substring(0, 24)}...
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                  } else {
                    document.exitFullscreen().catch(() => {});
                  }
                }}
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                title="Бүтэн дэлгэц (Keyboard: F)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </footer>
        </div>

        {/* Presenter Notes Split Console (When isPresenterMode is active) */}
        {isPresenterMode && (
          <aside className="w-full lg:w-4/12 xl:w-3/12 h-full shadow-2xl z-30 transition-all">
            <PresenterNotes
              currentSlide={currentSlide}
              nextSlide={nextSlide}
              onNavigate={goToSlide}
            />
          </aside>
        )}
      </main>

      {/* 30-Slide Deck Overview Modal */}
      {isOverviewOpen && (
        <DeckOverview
          slides={allSlides}
          currentSlideNumber={currentSlideNumber}
          onSelectSlide={goToSlide}
          onClose={() => setIsOverviewOpen(false)}
        />
      )}

      {/* Printable Handout Modal */}
      {isPrintOpen && (
        <PrintHandout
          slides={allSlides}
          onClose={() => setIsPrintOpen(false)}
        />
      )}
    </div>
  );
}
