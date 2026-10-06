import React from 'react';
import { SlideData } from '../types/slide';
import { ScientificDiagram } from './diagrams/ScientificDiagram';
import { STMCurrentCalculator } from './widgets/STMCurrentCalculator';
import { STMHOPGInspector } from './widgets/STMHOPGInspector';
import { AFMCantileverTransducer } from './widgets/AFMCantileverTransducer';
import { AFMPotentialModes } from './widgets/AFMPotentialModes';
import { AFMModeSelector } from './widgets/AFMModeSelector';
import { TipConvolutionSimulator } from './widgets/TipConvolutionSimulator';
import { FeedbackGainSimulator } from './widgets/FeedbackGainSimulator';
import { ForceDistanceCurveExplorer } from './widgets/ForceDistanceCurveExplorer';
import { AFMMITDataInspector } from './widgets/AFMMITDataInspector';
import { NISTSRM3461Calibration } from './widgets/NISTSRM3461Calibration';
import { MethodSelectionWorkedExample } from './widgets/MethodSelectionWorkedExample';
import { ExperimentalDesignCanvas } from './widgets/ExperimentalDesignCanvas';
import { ExitCheckQuiz } from './widgets/ExitCheckQuiz';

interface SlideViewerProps {
  slide: SlideData;
  isPresenterMode?: boolean;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({ slide, isPresenterMode = false }) => {
  // Render specific interactive widget or fallback to SVG diagram
  const renderVisualStage = () => {
    switch (slide.interactiveWidget?.type) {
      case 'stm_tunneling_calc':
        return <STMCurrentCalculator />;
      case 'stm_hopg_inspector':
        return <STMHOPGInspector />;
      case 'afm_cantilever_transducer':
        return <AFMCantileverTransducer />;
      case 'afm_potential_modes':
        return <AFMPotentialModes />;
      case 'afm_mode_selector':
        return <AFMModeSelector />;
      case 'tip_convolution_sim':
        return <TipConvolutionSimulator />;
      case 'feedback_gain_sim':
        return <FeedbackGainSimulator />;
      case 'force_distance_curve_explorer':
        return <ForceDistanceCurveExplorer />;
      case 'afm_mit_data_inspector':
        return <AFMMITDataInspector />;
      case 'nist_srm3461_calibration':
        return <NISTSRM3461Calibration />;
      case 'method_selection_worked_example':
        return <MethodSelectionWorkedExample />;
      case 'experimental_design_canvas':
        return <ExperimentalDesignCanvas />;
      case 'exit_check_quiz':
        return <ExitCheckQuiz />;
      default:
        return <ScientificDiagram slideNumber={slide.slideNumber} />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-white text-slate-900 select-text">
      {/* Slide Top Metadata Bar */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="font-semibold text-slate-800 uppercase tracking-wide">
              {slide.category}
            </span>
            <span aria-hidden="true" className="text-slate-300">/</span>
            <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-bold border border-sky-200/60">
              {slide.targetLLO}
            </span>
            <span aria-hidden="true" className="text-slate-300">/</span>
            <span>NANO604-L01</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
              {slide.slideNumber.toString().padStart(2, '0')} / 30
            </span>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-sm sm:text-base font-medium text-slate-600 mt-1">
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Main Slide Split Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 my-2 items-stretch min-h-0 overflow-y-auto">
        {/* Left Column: Bullets, Equations, Comparisons, Contracts */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4 pr-1">
          {/* Bullets List */}
          <div className="space-y-3">
            {slide.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-2 shrink-0"></span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          {/* Equation Box if present */}
          {slide.equation && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <div className="flex items-baseline justify-between border-b border-slate-200 pb-1.5">
                <span className="font-mono text-cyan-800 font-bold text-sm tracking-wide">
                  {slide.equation.formula}
                </span>
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  Сургалтын тэгшитгэл
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 font-mono">
                {slide.equation.symbols.map((sym, sIdx) => (
                  <div key={sIdx}>
                    <strong className="text-slate-800">{sym.symbol}:</strong> {sym.meaning}
                  </div>
                ))}
              </div>
              <p className="text-slate-700 text-xs italic pt-1 border-t border-slate-200">
                {slide.equation.physicalMeaning}
              </p>
              {slide.equation.limitation && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200">
                  <strong>Загварын хязгаарлалт:</strong> {slide.equation.limitation}
                </p>
              )}
            </div>
          )}

          {/* Comparison Matrix Table if present */}
          {slide.comparisonRows && (
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-mono">
                    <th className="p-2 border-b border-slate-200">Үзүүлэлт</th>
                    <th className="p-2 border-b border-slate-200 text-cyan-900">STM</th>
                    <th className="p-2 border-b border-slate-200 text-emerald-900">AFM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {slide.comparisonRows.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="p-2 font-medium text-slate-800">{row.parameter}</td>
                      <td className="p-2 text-slate-600 font-mono text-[11px]">{row.stm}</td>
                      <td className="p-2 text-slate-600 font-mono text-[11px]">{row.afm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Key Message callout */}
          <div className="p-3 bg-sky-50/60 border border-sky-100 rounded-xl text-xs text-sky-950">
            <span className="font-bold uppercase tracking-wider text-[10px] text-sky-700 block mb-0.5">
              Гол мессеж (Key Message):
            </span>
            <p className="leading-snug">{slide.keyMessage}</p>
          </div>
        </div>

        {/* Right Column: Visual Stage (Interactive or Diagram) */}
        <div className="lg:col-span-6 flex flex-col justify-center items-stretch h-full">
          <div className="w-full h-full flex flex-col justify-center">
            {renderVisualStage()}
          </div>
        </div>
      </div>

      {/* Slide Bottom Provenance Footer */}
      <div className="border-t border-slate-200/80 pt-2 mt-2 flex flex-wrap justify-between items-center text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Эх сурвалж:</span>
          <span className="text-slate-700 font-semibold">{slide.sourceSupport}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Зургийн эх:</span>
          <span className="text-slate-600">{slide.figureProvenance}</span>
        </div>
      </div>
    </div>
  );
};
