import React, { useState, useEffect } from 'react';
import { SlideData } from '../types/slide';
import { ScientificDiagram } from './diagrams/ScientificDiagram';

interface StandalonePrintViewProps {
  slides: SlideData[];
  initialIncludeNotes?: boolean;
}

export const StandalonePrintView: React.FC<StandalonePrintViewProps> = ({
  slides,
  initialIncludeNotes = false
}) => {
  const [includeNotes, setIncludeNotes] = useState<boolean>(initialIncludeNotes);

  const handlePrint = () => {
    window.focus();
    window.print();
  };

  // Sync instructor notes print class with body
  useEffect(() => {
    document.body.classList.toggle('print-with-instructor-notes', includeNotes);
    return () => {
      document.body.classList.remove('print-with-instructor-notes');
    };
  }, [includeNotes]);

  // When loaded standalone in a top-level tab, auto-prompt print once fonts and document are ready
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const readyAndPrint = async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
      } catch (e) {}

      timer = setTimeout(() => {
        try {
          window.focus();
          window.print();
        } catch (e) {
          console.warn('Auto print notice:', e);
        }
      }, 400);
    };

    readyAndPrint();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Top Print Toolbar (Hidden during @media print) */}
      <div className="no-print sticky top-0 z-50 bg-slate-900 text-white px-6 py-3 border-b border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
            NANO604 SPM Master Lecture (Top-Level Print View)
          </span>
          <h1 className="text-sm font-bold text-white">
            30 Слайд бүрэн гарын авлага (Stand-Alone Printable View)
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-mono cursor-pointer text-slate-200 select-none mr-2">
            <input
              type="checkbox"
              checked={includeNotes}
              onChange={(e) => setIncludeNotes(e.target.checked)}
              className="rounded accent-cyan-500 cursor-pointer w-4 h-4"
            />
            <span>Багшийн заавар, тэмдэглэлийг багтаах</span>
          </label>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold shadow cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <span>🖨️</span>
            <span>Хэвлэх / Save as PDF (Ctrl+P)</span>
          </button>

          <button
            type="button"
            onClick={() => window.close()}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 cursor-pointer transition-colors"
          >
            Цонх хаах
          </button>
        </div>
      </div>

      {/* Main 30 Slides Container */}
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Cover Header (Visible on screen preview, strictly hidden in printed PDF) */}
        <div className="no-print border-b-2 border-slate-900 pb-4 mb-4 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-1">
            NANO604 — АХИСАН ТҮВШНИЙ НАНОТЕХНОЛОГИ (ADVANCED NANOTECHNOLOGY)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Сканнинг проб микроскопи (SPM)
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            STM ба AFM-ийн хэмжилтийн физик, өгөгдөл тайлбарлалт, туршилтын дизайн
          </p>
          <div className="flex justify-center gap-4 text-xs font-mono text-slate-500 mt-2">
            <span>Түвшин: Магистр / Доктор</span>
            <span>·</span>
            <span>Нийт 30 слайд бүрэн</span>
            <span>·</span>
            <span>QA-A Pass Master</span>
          </div>
        </div>

        {/* 30 Slides Sequentially - Strictly 1 Page per Slide */}
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`slide slide-page print-page border border-slate-200 rounded-xl bg-white flex flex-col justify-between ${
              includeNotes ? 'p-3 space-y-1.5' : 'p-5 space-y-3'
            }`}
          >
            {/* Header: Slide Number, Category, LLO */}
            <div className="flex justify-between items-baseline border-b border-slate-200 pb-1 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                  Слайд {slide.slideNumber.toString().padStart(2, '0')} / 30
                </span>
                <span className="text-xs font-mono text-cyan-800 font-bold px-1.5 py-0.5 rounded bg-cyan-50 border border-cyan-200">
                  {slide.targetLLO}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {slide.category}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {slide.sourceSupport}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="shrink-0">
              <h3 className={`${includeNotes ? 'text-base font-bold' : 'text-lg font-bold'} text-slate-900 leading-tight`}>
                {slide.title}
              </h3>
              {slide.subtitle && (
                <p className={`${includeNotes ? 'text-[11px]' : 'text-xs'} font-medium text-slate-600 mt-0.5`}>
                  {slide.subtitle}
                </p>
              )}
            </div>

            {/* Main Content: 2-Column Split */}
            <div className={`grid grid-cols-1 md:grid-cols-12 gap-3 items-start flex-1 ${includeNotes ? 'my-1' : 'my-2'}`}>
              <div className="md:col-span-7 space-y-1.5">
                <ul className={`space-y-1 ${includeNotes ? 'text-[10.5px] leading-tight' : 'text-xs leading-relaxed'} text-slate-700 list-disc list-inside`}>
                  {slide.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>

                {slide.equation && (
                  <div className={`bg-slate-50 border border-slate-200 rounded-lg ${includeNotes ? 'p-1.5 text-[10.5px]' : 'p-2.5 text-xs'} space-y-0.5`}>
                    <span className="font-mono font-bold text-slate-900 block">
                      {slide.equation.formula}
                    </span>
                    <p className="text-slate-600 text-[10px] italic">
                      {slide.equation.physicalMeaning}
                    </p>
                  </div>
                )}

                <div className={`bg-sky-50 border border-sky-200 rounded-lg ${includeNotes ? 'p-1.5 text-[10.5px]' : 'p-2 text-xs'} text-sky-950`}>
                  <strong className="text-sky-800">Гол мессеж:</strong> {slide.keyMessage}
                </div>
              </div>

              <div className="md:col-span-5 flex items-center justify-center">
                <div className={`w-full overflow-hidden rounded-lg border border-slate-200/80 bg-slate-950 ${
                  includeNotes ? 'max-h-36 sm:max-h-40' : 'max-h-52'
                }`}>
                  <ScientificDiagram slideNumber={slide.slideNumber} />
                </div>
              </div>
            </div>

            {/* Provenance Footer */}
            <div className="border-t border-slate-100 pt-1 text-[9.5px] font-mono text-slate-400 flex flex-wrap justify-between shrink-0">
              <span>Эх сурвалж: {slide.sourceSupport}</span>
              <span>Зургийн эх: {slide.figureProvenance}</span>
            </div>

            {/* Mode B: Instructor Notes Panel (Strictly contained on same page, 9 explicit fields) */}
            {includeNotes && (
              <div className="instructor-notes-panel mt-1 p-2 bg-amber-50/80 rounded-lg border border-amber-200 text-slate-800 shrink-0">
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-0.5 mb-1">
                  <span className="font-mono text-amber-900 font-bold text-[9.5px] tracking-wider uppercase">
                    [Багшийн заавар, тэмдэглэл / Instructor Notes & Guidance — Слайд {slide.slideNumber.toString().padStart(2, '0')}]
                  </span>
                  <span className="font-mono text-amber-800/80 text-[8.5px]">
                    LLO: {slide.targetLLO} · {slide.category}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[9px] leading-snug">
                  {/* Column 1: Core Pedagogy */}
                  <div className="space-y-1">
                    <div>
                      <span className="font-mono font-bold text-amber-950 uppercase text-[8.5px] block">1. TEACHING_INTENT:</span>
                      <p className="text-slate-700">{slide.notes.teachingIntent}</p>
                    </div>
                    <div>
                      <span className="font-mono font-bold text-amber-950 uppercase text-[8.5px] block">2. WHAT_TO_EXPLAIN:</span>
                      <p className="text-slate-700">{slide.notes.whatToExplain}</p>
                    </div>
                    <div>
                      <span className="font-mono font-bold text-amber-950 uppercase text-[8.5px] block">3. PHYSICAL_INTERPRETATION:</span>
                      <p className="text-slate-700">{slide.notes.physicalInterpretation}</p>
                    </div>
                  </div>

                  {/* Column 2: Assessment & Misconceptions */}
                  <div className="space-y-1">
                    <div>
                      <span className="font-mono font-bold text-amber-950 uppercase text-[8.5px] block">4. COMMON_MISCONCEPTION:</span>
                      <p className="text-slate-700">{slide.notes.commonMisconception}</p>
                    </div>
                    <div>
                      <span className="font-mono font-bold text-amber-950 uppercase text-[8.5px] block">5. EXPECTED_STUDENT_RESPONSE:</span>
                      <p className="text-slate-700">{slide.notes.expectedStudentResponse}</p>
                    </div>
                    <div>
                      <span className="font-mono font-bold text-amber-950 uppercase text-[8.5px] block">6. ARTIFACT_WARNING:</span>
                      <p className="text-slate-700">{slide.notes.artifactWarning}</p>
                    </div>
                  </div>

                  {/* Column 3: Provenance & Transition */}
                  <div className="space-y-1">
                    <div>
                      <span className="font-mono font-bold text-amber-950 uppercase text-[8.5px] block">7. SOURCE_TRACE:</span>
                      <p className="text-slate-700">{slide.notes.sourceTrace}</p>
                    </div>
                    <div>
                      <span className="font-mono font-bold text-amber-950 uppercase text-[8.5px] block">8. FIGURE_PROVENANCE:</span>
                      <p className="text-slate-700">{slide.notes.figureProvenance}</p>
                    </div>
                    <div>
                      <span className="font-mono font-bold text-amber-950 uppercase text-[8.5px] block">9. TRANSITION:</span>
                      <p className="text-slate-700">{slide.notes.transition}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
