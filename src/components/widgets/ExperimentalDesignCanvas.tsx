import React, { useState } from 'react';

export const ExperimentalDesignCanvas: React.FC = () => {
  const [method, setMethod] = useState<'afm' | 'stm' | ''>('');
  const [mode, setMode] = useState<string>('');
  const [probe, setProbe] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Оюутны бие даасан даалгавар (LLO-6 Interactive Canvas)
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            Даалгавар: SiO2 субстрат дээрх MoS2 моно-давхарга ба ДНХ нано-утасны хэмжилтийн төлөвлөгөө
          </h4>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-amber-300">
          ● SEMINAR PREPARATORY TASK
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Form selection */}
        <div className="md:col-span-7 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-xs font-mono text-slate-300 block mb-1">
                1. Үндсэн арга (Method):
              </span>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full bg-slate-800 text-xs px-2.5 py-2 rounded-lg border border-slate-700 text-slate-200 font-mono"
              >
                <option value="">-- Сонгох --</option>
                <option value="afm">AFM (Атом хүчний микроскопи)</option>
                <option value="stm">STM (Сканнинг туннелийн микроскопи)</option>
              </select>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-300 block mb-1">
                2. Хэмжилтийн горим (Mode):
              </span>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full bg-slate-800 text-xs px-2.5 py-2 rounded-lg border border-slate-700 text-slate-200 font-mono"
              >
                <option value="">-- Сонгох --</option>
                <option value="tapping">Товших горим (Tapping Mode)</option>
                <option value="contact">Хүрэлцэх горим (Contact Mode)</option>
                <option value="constant_i">Тогтмол гүйдэл (Constant-current STM)</option>
              </select>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-slate-300 block mb-1">
              3. Үзүүр / Зондын үзүүлэлт (Probe):
            </span>
            <select
              value={probe}
              onChange={(e) => setProbe(e.target.value)}
              className="w-full bg-slate-800 text-xs px-2.5 py-2 rounded-lg border border-slate-700 text-slate-200 font-mono"
            >
              <option value="">-- Сонгох --</option>
              <option value="sharp_si">Хэт хурц Si үзүүр (R &lt; 2-5 nm, k ≈ 20-40 N/m, f₀ ≈ 300 kHz)</option>
              <option value="soft_si3n4">Зөөлөн Si3N4 кантилевер (k ≈ 0.06 N/m)</option>
              <option value="ptir_wire">Тасалсан Pt/Ir металл утас</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setSubmitted(true)}
              disabled={!method || !mode || !probe}
              className="w-full py-2.5 px-4 text-xs font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-white transition-colors shadow"
            >
              Төлөвлөгөөг баталгаажуулах & Багшийн шалгууртай нийцүүлэх
            </button>
          </div>
        </div>

        {/* Feedback / Solution Area */}
        <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
              Багшийн үнэлгээний рубрик (LLO-6):
            </span>

            {!submitted ? (
              <div className="text-center py-6 text-slate-500 text-xs">
                Оюутнууд параметрүүдийг сонгож төлөвлөгөөг илгээсний дараа физик үндэслэлийн үнэлгээ гарч ирнэ.
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                {method === 'afm' && mode === 'tapping' && probe === 'sharp_si' ? (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-lg text-emerald-300">
                    <strong className="block text-sm mb-1">✓ ТӨГС ДИЗАЙН!</strong>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      1) Субстрат SiO2 нь тусгаарлагч тул заавал AFM сонгоно.<br/>
                      2) ДНХ сул наалдсан тул хөндлөн үрэлтээс сэргийлж Tapping горим шаардлагатай.<br/>
                      3) ДНХ-ийн ~2 нм өргөнийг tip convolution-оор хэт бүдүүрэхээс сэргийлж R &lt; 2-5 нм хэт хурц үзүүр оновчтой!
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-lg text-rose-300">
                    <strong className="block text-sm mb-1">⚠️ ЗАСВАР ШААРДЛАГАТАЙ:</strong>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {method === 'stm' && '• Дор нь байгаа 300 нм SiO2 оксид нь тусгаарлагч тул STM ажиллахгүй үзүүр мөргөнө! '}
                      {mode === 'contact' && '• Contact mode нь ДНХ-ийн нарийн молекулыг гадаргуугаас хуулан шүүрдэж чирнэ! '}
                      {probe !== 'sharp_si' && '• ДНХ-ийн өргөн дээрх tip convolution-ийг бууруулахын тулд хамгийн хурц (R < 2-5 nm) Si зонд шаардлагатай.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {submitted && (
            <button
              onClick={() => setSubmitted(false)}
              className="mt-3 text-xs text-slate-400 hover:text-slate-200 text-center underline font-mono"
            >
              Дахин эхлүүлэх
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
