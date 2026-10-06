import React, { useState } from 'react';

export const STMHOPGInspector: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // 1 to 6 (Contract steps)
  const [cursorX, setCursorX] = useState<number>(2.5); // nm along the 5 nm cut

  // Periodicity a = 0.246 nm (between beta atoms)
  // Corrugation amplitude approx 0.08 nm (0.8 Å)
  const calculateHeight = (x: number) => {
    const period = 0.246;
    const phase = (x / period) * 2 * Math.PI;
    return 0.05 + 0.04 * Math.cos(phase);
  };

  const currentHeight = calculateHeight(cursorX);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Бодит STM туршилтын өгөгдөл шинжлэгч (S-13 University of Utah Lecture 6, p. 24)
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            Өндөр баримжаалагдсан пиролитик бал чулуу (HOPG) ба β-сайтын LDOS тодрол
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono">
            ● AUTHENTIC DATASET
          </span>
          <span className="text-xs font-mono text-slate-400">5 × 5 nm | I = 1.0 nA</span>
        </div>
      </div>

      {/* Contract Step Bar */}
      <div className="flex items-center justify-between gap-1 mb-4 p-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
        {[
          { id: 1, label: '1. Ажиглалт' },
          { id: 2, label: '2. Дохио' },
          { id: 3, label: '3. Физик үүсэл' },
          { id: 4, label: '4. Алтернатив' },
          { id: 5, label: '5. Хязгаарлалт' },
          { id: 6, label: '6. Дүгнэлт' }
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(s.id)}
            className={`flex-1 py-1.5 px-2 rounded font-medium transition-colors text-center truncate ${
              activeStep === s.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Interactive Simulated/Authentic Image Representation & Line Profile */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative bg-black rounded-lg border border-slate-800 p-3 overflow-hidden">
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>HOPG Гадаргуу (5 × 5 нм)</span>
              <span className="text-cyan-400">Шар шугам: Профиль зүсэлт</span>
            </div>

            {/* Visual SVG Lattice with only Beta atoms bright */}
            <svg viewBox="0 0 300 200" className="w-full h-44 bg-slate-950 rounded">
              <defs>
                <radialGradient id="betaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
                  <stop offset="40%" stopColor="#d97706" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="alphaDark" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid of atoms */}
              {Array.from({ length: 9 }).map((_, row) =>
                Array.from({ length: 12 }).map((_, col) => {
                  const x = 20 + col * 24 + (row % 2) * 12;
                  const y = 15 + row * 20;
                  const isBeta = (row + col) % 2 === 0;
                  return (
                    <g key={`${row}-${col}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isBeta ? 11 : 5}
                        fill={isBeta ? 'url(#betaGlow)' : 'url(#alphaDark)'}
                      />
                    </g>
                  );
                })
              )}

              {/* Cut line */}
              <line x1="15" y1="105" x2="285" y2="105" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
              {/* Cursor on line */}
              <circle
                cx={15 + (cursorX / 5) * 270}
                cy={105}
                r="6"
                fill="#06b6d4"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <text x="20" y="190" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                Хэмжээс: 5 nm × 5 nm | Цагираг бүрээс зөвхөн 3 бета-атом тодорч харагдана
              </text>
            </svg>

            {/* Slider for interactive line profile */}
            <div className="mt-3">
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Профиль дагуух байрлал x:</span>
                <span className="text-cyan-400 font-bold">{cursorX.toFixed(2)} nm / 5.00 nm</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.05"
                value={cursorX}
                onChange={(e) => setCursorX(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          {/* Line profile plot */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1">
              <span>Зүсэлтийн шугам (Line profile): Z өндөр vs Зай x</span>
              <span className="text-emerald-400 font-bold">
                Үеийн давтамж a = 0.246 nm
              </span>
            </div>
            <svg viewBox="0 0 300 70" className="w-full h-16 bg-slate-900 rounded">
              <path
                d="M 10 35 Q 25 10, 40 35 T 70 35 T 100 35 T 130 35 T 160 35 T 190 35 T 220 35 T 250 35 T 280 35"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
              {/* Highlight active point */}
              <circle
                cx={10 + (cursorX / 5) * 270}
                cy={35 - (currentHeight - 0.05) * 400}
                r="4"
                fill="#06b6d4"
                stroke="#fff"
                strokeWidth="1.5"
              />
            </svg>
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
              <span>0 nm</span>
              <span className="text-cyan-300">
                Идэвхтэй өндөр: {(currentHeight * 10).toFixed(2)} Å ({currentHeight.toFixed(3)} nm)
              </span>
              <span>5 nm</span>
            </div>
          </div>
        </div>

        {/* Right: Scientific Interpretation Contract explanation for current step */}
        <div className="lg:col-span-5 bg-slate-950/70 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-mono text-cyan-400 tracking-wider">
              Шинжлэх ухааны дүгнэлтийн гэрээ
            </span>

            {activeStep === 1 && (
              <div className="mt-2 space-y-2 text-xs">
                <h5 className="font-semibold text-amber-300 text-sm">1. АЖИГЛАЛТ (Observation)</h5>
                <p className="text-slate-300 leading-relaxed">
                  5×5 нм талбайд зургаан өнцөгт биш, <strong>гурвалжин хэлбэртэй торон тод цэгүүд</strong> харагдана.
                </p>
                <p className="text-slate-400">
                  Хөрш тод цэгүүдийн хоорондох зай <strong>0.246 нм</strong> хэмжигдэж байгаа нь бал чулууны нүүрстөрөгчийн бодит холбоосын урт болох <strong>0.142 нм-ээс даруй 1.7 дахин их</strong> байна!
                </p>
              </div>
            )}

            {activeStep === 2 && (
              <div className="mt-2 space-y-2 text-xs">
                <h5 className="font-semibold text-amber-300 text-sm">2. ХЭМЖСЭН ДОХИО (Measured Signal)</h5>
                <p className="text-slate-300 leading-relaxed">
                  Тогтмол гүйдлийн горим дахь Z-пьезогийн шилжилт (I_set = 1.0 nA, V_bias = +200 mV).
                </p>
                <p className="text-slate-400">
                  Босоо хэлбэлзлийн далайц ердөө <strong>Δz ≈ 0.08 нм (0.8 Å)</strong> бөгөөд 0.246 нм үетэй синусоид дохио бүртгэгдсэн.
                </p>
              </div>
            )}

            {activeStep === 3 && (
              <div className="mt-2 space-y-2 text-xs">
                <h5 className="font-semibold text-cyan-300 text-sm">3. ФИЗИК ГАРАЛ ҮҮСЭЛ (Physical Origin)</h5>
                <p className="text-slate-300 leading-relaxed">
                  Бал чулуу нь <strong>ABAB...</strong> давхаргаар байрладаг (Bernal stacking).
                </p>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[11px] space-y-1">
                  <p><strong className="text-amber-400">• Бета (β) сайт:</strong> Доод 2-р давхаргын хоосон зайн дээр байрладаг тул 2p_z электрон нь чөлөөтэй, Фермийн түвшин дэх төлөвийн нягт (LDOS) ИХ байдаг → <strong>ТОД ГЭРЭЛТЭНЭ</strong>.</p>
                  <p><strong className="text-slate-400">• Альфа (α) сайт:</strong> Доод давхаргын яг нэг атомын дээр байрладаг тул 2p_z электрон нь доод атомтай холбогдож Фермийн түвшний LDOS БАГАСДАГ → <strong>БАРААН ХАРАГДАНА</strong>.</p>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="mt-2 space-y-2 text-xs">
                <h5 className="font-semibold text-amber-300 text-sm">4. АЛТЕРНАТИВ ТАЙЛБАР (Alternative)</h5>
                <p className="text-slate-300 leading-relaxed">
                  Энэ нь дутуу атомууд унасан эсвэл давхар үзүүрийн алдаа байж болох уу?
                </p>
                <p className="text-slate-400">
                  <strong>Шалгалт:</strong> Скан хийх өнцгийг эргүүлэхэд торлог дээжтэй цуг эргэдэг, мөн дээжийн бүх хэсэгт 3-хан атом үлдэх системчилсэн давтагдал ажиглагддаг тул санамсаргүй согог биш.
                </p>
              </div>
            )}

            {activeStep === 5 && (
              <div className="mt-2 space-y-2 text-xs">
                <h5 className="font-semibold text-rose-300 text-sm">5. ХЯЗГААРЛАЛТ (Model Limitation)</h5>
                <p className="text-slate-300 leading-relaxed">
                  Энэ зургаас графитын нүүрстөрөгчийн атом хоорондын зай 0.246 нм гэж дүгнэвэл <strong>бүдүүлэг алдаа</strong> болно!
                </p>
                <p className="text-slate-400">
                  Учир нь зураг дээр нэг алгассан β атомууд л харагдаж байгаа бөгөөд тэдгээрийн хоорондох зай a = √3 · d(C-C) = 1.732 × 0.142 ≈ 0.246 нм байдаг.
                </p>
              </div>
            )}

            {activeStep === 6 && (
              <div className="mt-2 space-y-2 text-xs">
                <h5 className="font-semibold text-emerald-300 text-sm">6. ДҮГНЭЛТ (Scientific Conclusion)</h5>
                <p className="text-slate-300 leading-relaxed">
                  STM нь атомын геометрийг биш, <strong>Фермийн түвшин дэх орон нутгийн электрон төлөвийн нягтыг (LDOS)</strong> харуулдгийн сонгодог баталгаа юм.
                </p>
                <p className="text-emerald-400 font-semibold">
                  Тайлал: Зөвхөн β атомууд тодордог нь квант механикийн давхарга хоорондын холбоосын үр дүн.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <button
              onClick={() => setActiveStep((p) => Math.max(1, p - 1))}
              disabled={activeStep === 1}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300"
            >
              ← Өмнөх алхам
            </button>
            <span className="font-mono text-slate-500">Алхам {activeStep} / 6</span>
            <button
              onClick={() => setActiveStep((p) => Math.min(6, p + 1))}
              disabled={activeStep === 6}
              className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-medium"
            >
              Дараах алхам →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
