import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SlideData } from '../types/slide';
import { ScientificDiagram } from './diagrams/ScientificDiagram';
import { buildPrintableHTML } from '../utils/printDocumentGenerator';

interface PrintHandoutProps {
  slides: SlideData[];
  onClose: () => void;
}

export const PrintHandout: React.FC<PrintHandoutProps> = ({ slides, onClose }) => {
  const [includeNotes, setIncludeNotes] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [printWindowOpened, setPrintWindowOpened] = useState<boolean>(false);
  const [printDiagnostic, setPrintDiagnostic] = useState<string>('');
  const [popupBlocked, setPopupBlocked] = useState<boolean>(false);

  const isEmbedded = typeof window !== 'undefined' && window.self !== window.top;

  const standaloneUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?print=1${includeNotes ? '&notes=1' : ''}` 
    : '';

  // Build the complete standalone HTML document for all 30 slides
  const standaloneHTML = useMemo(() => {
    return buildPrintableHTML(slides, includeNotes);
  }, [slides, includeNotes]);

  // Create an object URL for direct opening in new tab
  const blobUrl = useMemo(() => {
    try {
      const blob = new Blob([standaloneHTML], { type: 'text/html;charset=utf-8' });
      return URL.createObjectURL(blob);
    } catch (e) {
      return '';
    }
  }, [standaloneHTML]);

  // Sync instructor notes class with document.body whenever checkbox or print event fires
  useEffect(() => {
    document.body.classList.toggle('print-with-instructor-notes', includeNotes);

    const handleBeforePrint = () => {
      document.body.classList.toggle('print-with-instructor-notes', includeNotes);
      document.body.classList.add('printing-active');
    };

    const handleAfterPrint = () => {
      document.body.classList.remove('printing-active');
      document.body.classList.toggle('print-with-instructor-notes', includeNotes);
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      document.body.classList.remove('print-with-instructor-notes');
      document.body.classList.remove('printing-active');
    };
  }, [includeNotes]);

  // Direct In-Window Print Helper
  const triggerInWindowPrint = useCallback(() => {
    try {
      document.body.classList.add('printing-active');
      window.focus();
      window.print();
      setPrintDiagnostic('PRINT_EXECUTED = IN_WINDOW_PRINT');
      setStatusMessage('Браузерын хэвлэх цонх дуудагдлаа.');
    } catch (err) {
      console.warn('[NANO604 Print] Direct window.print error:', err);
      setStatusMessage('Хэвлэх үйлдэл амжилтгүй боллоо. Дээрх "Шинэ цонхонд нээх" товчийг ашиглана уу.');
    }
  }, []);

  // Primary Print Action: Top-Level Print Window with Automatic Fallback
  const handlePrint = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log('[NANO604 Print] Click event received on "Хэвлэх / PDF татах"');
    setPrintDiagnostic('PRINT_EVENT_RECEIVED = YES');
    setPopupBlocked(false);

    // If already in top-level window, trigger native window.print() directly
    if (!isEmbedded) {
      console.log('[NANO604 Print] Running in top-level context, triggering window.print() directly');
      triggerInWindowPrint();
      return;
    }

    // In iframe preview context: attempt to open dedicated top-level printable window
    console.log('[NANO604 Print] Running in iframe sandbox. Opening dedicated top-level document:', standaloneUrl);
    setStatusMessage('30 слайд бүхий бие даасан хэвлэх цонх бэлтгэж байна...');

    let printWindow: Window | null = null;
    try {
      printWindow = window.open(standaloneUrl, '_blank');
    } catch (err) {
      console.warn('[NANO604 Print] window.open exception:', err);
    }

    if (!printWindow || printWindow.closed || typeof printWindow.closed === 'undefined') {
      // Popup blocked by sandbox or browser settings
      console.warn('[NANO604 Print] window.open blocked, trying fallback in-frame print');
      setPopupBlocked(true);
      setPrintWindowOpened(false);
      setPrintDiagnostic('POPUP_BLOCKED = YES (Iframe Sandbox)');
      setStatusMessage('Шинэ цонх хориглогдсон тул одоогийн цонхонд шууд хэвлэхийг оролдож байна...');
      triggerInWindowPrint();
      return;
    }

    // Top-level print window opened successfully
    console.log('[NANO604 Print] Dedicated print window successfully opened.');
    setPrintWindowOpened(true);
    setPopupBlocked(false);
    setPrintDiagnostic('TOP_LEVEL_PRINT_WINDOW_OPENED = SUCCESS');
    setStatusMessage('Шинэ бие даасан цонх нээгдлээ. 30 слайд ачаалагдан хэвлэх цонх гарч ирнэ.');

    try {
      printWindow.focus();
    } catch (e) {}
  }, [isEmbedded, standaloneUrl, triggerInWindowPrint]);

  return (
    <div className="print-modal fixed inset-0 z-50 bg-white text-slate-900 overflow-y-auto p-4 sm:p-8">
      {/* Control bar (strictly hidden during print) */}
      <div className="no-print print-controls max-w-5xl mx-auto flex flex-col gap-3 border-b border-slate-200 pb-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                NANO604: Сканнинг проб микроскопи (SPM) — Хэвлэх & PDF Экспорт
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {isEmbedded ? 'ОРЧИН: IFRAME PREVIEW' : 'ОРЧИН: TOP-LEVEL'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              30 слайд бүхий бүрэн мастер лекцийн сургалтын гарын авлага (All 30 Slides)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Instructor Notes Toggle */}
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer text-slate-700 select-none mr-2">
              <input
                type="checkbox"
                id="instructor-notes-toggle"
                checked={includeNotes}
                onChange={(e) => setIncludeNotes(e.target.checked)}
                className="rounded accent-cyan-600 cursor-pointer w-4 h-4"
              />
              <span>Багшийн заавар, тэмдэглэлийг багтаах</span>
            </label>

            {/* Primary Action Button: Triggers Native Print Flow */}
            <button
              type="button"
              id="print-action-btn"
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <span>🖨️</span>
              <span>Хэвлэх / PDF татах</span>
            </button>

            {/* In-Frame Direct Print Button */}
            <button
              type="button"
              id="inframe-print-btn"
              onClick={triggerInWindowPrint}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-300 cursor-pointer transition-colors flex items-center gap-1"
              title="Одоогийн цонхноос window.print() шууд дуудах"
            >
              <span>📄</span>
              <span>Шууд хэвлэх</span>
            </button>

            {/* Secondary Direct Link Fallback: Opens in new tab outside iframe */}
            <a
              href={standaloneUrl || blobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-semibold shadow cursor-pointer transition-colors flex items-center gap-1.5 no-underline"
              title="Шинэ бие даасан цонхонд нээж Ctrl+P дарж хэвлэх"
            >
              <span>↗</span>
              <span>Шинэ цонхонд нээх</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-300 cursor-pointer transition-colors"
            >
              Хаах
            </button>
          </div>
        </div>

        {/* Diagnostic Status Indicator */}
        {(printDiagnostic || statusMessage) && (
          <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono space-y-1">
            <div className="flex items-center justify-between text-slate-800 font-semibold">
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${popupBlocked ? 'bg-amber-500' : 'bg-cyan-500'} animate-pulse`}></span>
                <span>{printDiagnostic || 'PRINT_EVENT_RECEIVED = YES'}</span>
              </span>
              <span className="text-[11px] text-slate-500">
                {isEmbedded ? 'RUNTIME: IFRAME (Sandbox)' : 'RUNTIME: TOP_LEVEL'}
              </span>
            </div>
            {statusMessage && (
              <div className="text-slate-600 pl-4 border-l-2 border-slate-300">
                {statusMessage}
              </div>
            )}
            {popupBlocked && (
              <div className="text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200 mt-2 space-y-2">
                <div>
                  <strong>Анхаар:</strong> Браузерын popup хаагдсан эсвэл AI Studio iframe sandbox орчинд <code>window.print()</code> шууд дуудахыг хориглосон байна.
                </div>
                <div>
                  <a
                    href={standaloneUrl || blobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-md text-xs shadow-sm no-underline cursor-pointer"
                  >
                    <span>↗ Шинэ бие даасан цонхонд нээж хэвлэх</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Printable Lecture Content (On Screen & In-Frame Print) */}
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Cover Header (Visible on screen preview, strictly hidden in printed PDF) */}
        <div className="no-print border-b-2 border-slate-900 pb-4 mb-4 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-1">
            NANO604 — АХИСАН ТҮВШНИЙ НАНОТЕХНОЛОГИ (ADVANCED NANOTECHNOLOGY)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Сканнинг проб микроскопи (SPM)
          </h1>
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
              <h2 className={`${includeNotes ? 'text-base font-bold' : 'text-lg font-bold'} text-slate-900 leading-tight`}>
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className={`${includeNotes ? 'text-[11px]' : 'text-xs'} font-medium text-slate-600 mt-0.5`}>
                  {slide.subtitle}
                </p>
              )}
            </div>

            {/* Main Slide Content: 2-Column Split Layout */}
            <div className={`grid grid-cols-1 md:grid-cols-12 gap-3 items-start flex-1 ${includeNotes ? 'my-1' : 'my-2'}`}>
              {/* Left Column: Bullets, Equation, Key message */}
              <div className="md:col-span-7 space-y-1.5">
                <ul className={`space-y-1 ${includeNotes ? 'text-[10.5px] leading-tight' : 'text-xs leading-relaxed'} text-slate-700 list-disc list-inside`}>
                  {slide.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>

                {/* Equation if present */}
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

                {/* Key Message */}
                <div className={`bg-sky-50 border border-sky-200 rounded-lg ${includeNotes ? 'p-1.5 text-[10.5px]' : 'p-2 text-xs'} text-sky-950`}>
                  <strong className="text-sky-800">Гол мессеж:</strong> {slide.keyMessage}
                </div>
              </div>

              {/* Right Column: High-Quality Vector Scientific Diagram */}
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
