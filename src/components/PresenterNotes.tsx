import React, { useState, useEffect } from 'react';
import { SlideData } from '../types/slide';

interface PresenterNotesProps {
  currentSlide: SlideData;
  nextSlide?: SlideData;
  onNavigate: (slideNumber: number) => void;
}

export const PresenterNotes: React.FC<PresenterNotesProps> = ({
  currentSlide,
  nextSlide,
  onNavigate
}) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const notes = currentSlide.notes;

  return (
    <div className="h-full bg-slate-900 text-slate-100 flex flex-col border-l border-slate-800 text-xs font-sans">
      {/* Presenter Header Ribbon */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
            Багшийн заавар ба тэмдэглэл (Instructor Console)
          </span>
          <h3 className="text-sm font-bold text-slate-200 truncate">
            {currentSlide.slideCode}: {currentSlide.title}
          </h3>
        </div>

        {/* Stopwatch & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-bold text-sm">{formatTime(seconds)}</span>
          </div>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-slate-300"
          >
            {timerRunning ? 'Зогсоох' : 'Үргэлжлүүлэх'}
          </button>
          <button
            onClick={() => setSeconds(0)}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-slate-400"
          >
            Тэглэх
          </button>
        </div>
      </div>

      {/* Structured Speaker Notes Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Next Slide Preview Box */}
        {nextSlide && (
          <div
            onClick={() => onNavigate(nextSlide.slideNumber)}
            className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl hover:border-cyan-800/60 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-1">
              <span>ДАРААГИЙН СЛАЙД (Next Slide):</span>
              <span className="text-cyan-400">Слайд {nextSlide.slideNumber} / 30 →</span>
            </div>
            <h4 className="font-semibold text-slate-300 text-xs truncate">
              {nextSlide.title}
            </h4>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {nextSlide.keyMessage}
            </p>
          </div>
        )}

        {/* 1. TEACHING INTENT */}
        <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            🎯 СУРГАЛТЫН ЗОРИЛГО (TEACHING_INTENT):
          </span>
          <p className="text-slate-300 leading-relaxed text-xs">
            {notes.teachingIntent}
          </p>
        </div>

        {/* 2. WHAT TO EXPLAIN */}
        <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
            🗣️ ТАНХИМД ЮУГ ОНЦОЛЖ ТАЙЛБАРЛАХ ВЭ (WHAT_TO_EXPLAIN):
          </span>
          <p className="text-slate-300 leading-relaxed text-xs">
            {notes.whatToExplain}
          </p>
        </div>

        {/* 3. PHYSICAL INTERPRETATION */}
        <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
            ⚛️ ФИЗИК ТАЙЛБАР БА СУУРЬ ЗАРЧИМ (PHYSICAL_INTERPRETATION):
          </span>
          <p className="text-slate-300 leading-relaxed text-xs">
            {notes.physicalInterpretation}
          </p>
        </div>

        {/* 4. COMMON MISCONCEPTION */}
        {notes.commonMisconception !== 'N/A' && (
          <div className="p-3 bg-rose-950/30 rounded-xl border border-rose-900/40 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
              ⚠️ ОЮУТНЫ ТҮГЭЭМЭЛ ТАШАА ОЙЛГОЛТ (COMMON_MISCONCEPTION):
            </span>
            <p className="text-slate-300 leading-relaxed text-xs">
              {notes.commonMisconception}
            </p>
          </div>
        )}

        {/* 5. EXPECTED STUDENT RESPONSE */}
        {notes.expectedStudentResponse !== 'N/A' && (
          <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
              💡 ХҮЛЭЭГДЭЖ БУЙ ОЮУТНЫ ХАРИУ ҮЙЛДЭЛ (EXPECTED_STUDENT_RESPONSE):
            </span>
            <p className="text-slate-300 leading-relaxed text-xs">
              {notes.expectedStudentResponse}
            </p>
          </div>
        )}

        {/* 6. ARTIFACT WARNING */}
        {notes.artifactWarning !== 'N/A' && (
          <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-900/40 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block">
              🔍 ХИЙСВЭР ДҮРИЙН СЭРЭМЖЛҮҮЛЭГ (ARTIFACT_WARNING):
            </span>
            <p className="text-slate-300 leading-relaxed text-xs">
              {notes.artifactWarning}
            </p>
          </div>
        )}

        {/* 7. TRANSITION */}
        {notes.transition !== 'N/A' && (
          <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
              ⏭️ ДАРААГИЙН СЭДЭВ РҮҮ ШИЛЖИХ ХОЛБООС (TRANSITION):
            </span>
            <p className="text-slate-300 leading-relaxed text-xs">
              {notes.transition}
            </p>
          </div>
        )}

        {/* 8. SOURCE TRACE & FIGURE PROVENANCE */}
        <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-500 space-y-1">
          <div>
            <strong className="text-slate-400">SOURCE_TRACE:</strong> {notes.sourceTrace}
          </div>
          <div>
            <strong className="text-slate-400">FIGURE_PROVENANCE:</strong> {notes.figureProvenance}
          </div>
        </div>
      </div>
    </div>
  );
};
