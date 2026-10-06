import React, { useState } from 'react';

export const ForceDistanceCurveExplorer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(3); // 1 to 5
  const [stiffness, setStiffness] = useState<'hard' | 'soft'>('hard');

  const stages = [
    {
      id: 1,
      title: '1. Ойртолт (Approach)',
      desc: 'Үзүүр гадаргуугаас хол байна. Харилцан үйлчлэлийн хүч байхгүй тул кантилевер шулуун (F = 0, δ = 0).'
    },
    {
      id: 2,
      title: '2. Наалдан үсрэх (Snap-in)',
      desc: 'Гадаргуугийн татах хүчний градиент (dF/dz) кантилеверийн уян хөшүүн чанар k-аас давж гарах үед үзүүр гадаргуу руу гэнэт үсрэн наалдана (F < 0).'
    },
    {
      id: 3,
      title: '3. Контакт ба Даралт (Contact / Indentation)',
      desc: 'Үзүүр гадаргууг дарна (F > 0). Шугамын налуу нь дээжийн хатуулаг буюу уян харимхайн модулийг илэрхийлнэ.'
    },
    {
      id: 4,
      title: '4. Татан холдуулах (Retraction)',
      desc: 'Пьезо дээш татагдах үед капилляр ба химийн наалдацын улмаас кантилевер хүчтэй доош тахийж гадаргуутай наалдсан хэвээр сунана.'
    },
    {
      id: 5,
      title: '5. Тасрах агшин (Pull-off / Adhesion)',
      desc: 'Кантилеверийн буцах уян хүч наалдацын хүчийг дийлэх үед үзүүр мултарна. Энэхүү үсрэлтийн гүн F_adhesion нь наалдамхай хүчийг тодорхойлно.'
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            AFM Хүч-зайн муруйн интерактив задаргаа (S-01 MIT 3.052 Lecture 4)
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            Ойртолт, Шүргэлт, Контакт, Татах ажиллагаа ба Наалдамхай хүч (F_adhesion)
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Дээжийн хатуулаг:</span>
          <button
            onClick={() => setStiffness(stiffness === 'hard' ? 'soft' : 'hard')}
            className={`px-2.5 py-1 text-xs rounded border font-mono font-bold ${
              stiffness === 'hard'
                ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                : 'bg-amber-950 text-amber-300 border-amber-700'
            }`}
          >
            {stiffness === 'hard' ? 'Хатуу (Эгц налуу)' : 'Зөөлөн (Хэвтээ налуу)'}
          </button>
        </div>
      </div>

      {/* Stage Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mb-4">
        {stages.map((st) => (
          <button
            key={st.id}
            onClick={() => setActiveStage(st.id)}
            className={`py-2 px-2 text-xs rounded-lg border text-center transition-colors font-medium truncate ${
              activeStage === st.id
                ? 'bg-cyan-600/30 text-cyan-200 border-cyan-500 shadow-sm'
                : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {st.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: SVG Force-Distance Curve */}
        <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Хүч F (Y тэнхлэг) vs Пьезо z шилжилт (X тэнхлэг)</span>
            <span className="text-cyan-400">Цэнхэр = Ойртох | Улаан = Буцах</span>
          </div>

          <svg viewBox="0 0 340 190" className="w-full h-48 bg-slate-900 rounded border border-slate-800">
            {/* Zero Force Baseline */}
            <line x1="20" y1="95" x2="320" y2="95" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
            <text x="25" y="90" fill="#64748b" fontSize="9" fontFamily="monospace">F = 0 (Хазайлтгүй)</text>
            <text x="25" y="40" fill="#10b981" fontSize="9" fontFamily="monospace">+F (Түлхэлт)</text>
            <text x="25" y="150" fill="#f43f5e" fontSize="9" fontFamily="monospace">-F (Таталцал / Наалдац)</text>

            {/* Approach Path (Blue) */}
            <path
              d={
                stiffness === 'hard'
                  ? 'M 310 95 L 180 95 L 180 115 L 100 25'
                  : 'M 310 95 L 180 95 L 180 115 L 70 50'
              }
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />

            {/* Retract Path (Red/Orange with Adhesion well) */}
            <path
              d={
                stiffness === 'hard'
                  ? 'M 100 25 L 180 115 L 210 160 L 210 95 L 310 95'
                  : 'M 70 50 L 180 115 L 225 170 L 225 95 L 310 95'
              }
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="4,2"
            />

            {/* Stage Indicators */}
            {/* Stage 1: Approach line */}
            {activeStage === 1 && (
              <circle cx="250" cy="95" r="5" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
            )}
            {/* Stage 2: Snap-in */}
            {activeStage === 2 && (
              <g>
                <circle cx="180" cy="115" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                <line x1="180" y1="95" x2="180" y2="115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="185" y="112" fill="#fbbf24" fontSize="10" fontFamily="monospace">Snap-in</text>
              </g>
            )}
            {/* Stage 3: Contact slope */}
            {activeStage === 3 && (
              <g>
                <circle cx={stiffness === 'hard' ? 140 : 125} cy={stiffness === 'hard' ? 70 : 82} r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                <text x="70" y="30" fill="#34d399" fontSize="10" fontFamily="monospace">
                  Налуу: k_contact = {stiffness === 'hard' ? '1.0 (Хатуу)' : '0.4 (Уян)'}
                </text>
              </g>
            )}
            {/* Stage 4: Retraction pull */}
            {activeStage === 4 && (
              <circle cx="195" cy="138" r="5" fill="#f43f5e" stroke="#fff" strokeWidth="2" />
            )}
            {/* Stage 5: Pull-off */}
            {activeStage === 5 && (
              <g>
                <circle cx={stiffness === 'hard' ? 210 : 225} cy={stiffness === 'hard' ? 160 : 170} r="5" fill="#e11d48" stroke="#fff" strokeWidth="2" />
                <line x1={stiffness === 'hard' ? 210 : 225} y1="95" x2={stiffness === 'hard' ? 210 : 225} y2={stiffness === 'hard' ? 160 : 170} stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2,2" />
                <text x="215" y="165" fill="#fda4af" fontSize="10" fontFamily="monospace">F_adhesion (Pull-off)</text>
              </g>
            )}
          </svg>
        </div>

        {/* Right: Stage Detail & Cantilever Sketch */}
        <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 block">
                Сонгогдсон үе шат:
              </span>
              <h5 className="text-sm font-bold text-amber-300 mt-0.5">
                {stages[activeStage - 1].title}
              </h5>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
              {stages[activeStage - 1].desc}
            </p>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1.5 font-mono">
              <div className="text-slate-400">
                Капилляр усны нөлөө:
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Агаарт хэмжилт хийхэд усны мениск татах хүчийг 10-100 дахин ихэсгэж Pull-off хүчийг нэмэгдүүлдэг. Шингэн дотор энэ үсрэлт бараг алга болдог.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-slate-800">
            <button
              onClick={() => setActiveStage(Math.max(1, activeStage - 1))}
              disabled={activeStage === 1}
              className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300"
            >
              ← Өмнөх үе
            </button>
            <span className="text-xs font-mono text-slate-500">{activeStage} / 5</span>
            <button
              onClick={() => setActiveStage(Math.min(5, activeStage + 1))}
              disabled={activeStage === 5}
              className="px-2.5 py-1 text-xs rounded bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-medium"
            >
              Дараах үе →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
