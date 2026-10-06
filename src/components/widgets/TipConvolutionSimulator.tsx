import React, { useState } from 'react';

export const TipConvolutionSimulator: React.FC = () => {
  const [tipRadius, setTipRadius] = useState<number>(15); // nm (5 to 40)
  const [particleRadius, setParticleRadius] = useState<number>(5); // nm (2 to 15)

  // Real physical dimensions
  const realWidth = particleRadius * 2; // nm
  const realHeight = particleRadius * 2; // nm

  // Apparent width due to spherical convolution:
  // For a sphere of radius r scanned by tip of radius R:
  // W_apparent = 4 * sqrt(R * r)
  const apparentWidth = 4 * Math.sqrt(tipRadius * particleRadius);
  const apparentHeight = realHeight; // Height is preserved at peak contact!
  const broadeningFactor = apparentWidth / realWidth;

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Үзүүрийн конволюцийн симулятор (Tip Convolution & Dilation)
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            $W_{'{apparent}'} \approx 4\sqrt{'{R \\cdot r}'}$ томьёогоор нано бөөмийн өргөн тэлэгдэх үзэгдэл
          </h4>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono">Өргөсөх харьцаа:</span>
          <span className="ml-2 font-mono text-rose-400 font-bold">{broadeningFactor.toFixed(1)}× дахин том</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="md:col-span-5 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Үзүүрийн радиус (R_tip):</span>
              <span className="text-cyan-400 font-bold">{tipRadius} nm</span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              step="1"
              value={tipRadius}
              onChange={(e) => setTipRadius(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>2 nm (Super-sharp)</span>
              <span>15 nm (Ердийн)</span>
              <span>40 nm (Мохсон)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Бөөмийн бодит радиус (r):</span>
              <span className="text-amber-400 font-bold">{particleRadius} nm</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="1"
              value={particleRadius}
              onChange={(e) => setParticleRadius(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>2 nm (4 nm диаметр)</span>
              <span>8 nm</span>
              <span>15 nm (30 nm диаметр)</span>
            </div>
          </div>

          {/* Quick Probe Presets */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Үзүүрийн бэлэн загварууд:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setTipRadius(2)}
                className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700"
              >
                Хэт хурц (2 nm)
              </button>
              <button
                onClick={() => setTipRadius(10)}
                className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
              >
                Шинэ Si (10 nm)
              </button>
              <button
                onClick={() => setTipRadius(35)}
                className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700"
              >
                Мохсон (35 nm)
              </button>
            </div>
          </div>

          {/* Metric Comparison */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-300">
              <span>Бодит диаметр (2r):</span>
              <span className="text-amber-400 font-bold">{realWidth.toFixed(1)} nm</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Харагдах өргөн (W_app):</span>
              <span className="text-rose-400 font-bold">{apparentWidth.toFixed(1)} nm</span>
            </div>
            <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-1.5">
              <span>Хэмжигдэх өндөр (H_meas):</span>
              <span className="text-emerald-400 font-bold">{apparentHeight.toFixed(1)} nm (Зөв хадгалагдана!)</span>
            </div>
          </div>
        </div>

        {/* Visual Simulated Profile */}
        <div className="md:col-span-7 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
              <span>Хөндлөн геометрийн харьцуулалт</span>
              <span className="text-cyan-400">Шар = Бодит бөөм | Улаан = AFM-д харагдах</span>
            </div>

            <svg viewBox="0 0 320 160" className="w-full h-40 bg-slate-900 rounded border border-slate-800">
              {/* Substrate */}
              <line x1="10" y1="130" x2="310" y2="130" stroke="#475569" strokeWidth="2" />
              <text x="15" y="145" fill="#64748b" fontSize="9" fontFamily="monospace">Субстратын гадарга</text>

              {/* Real particle (circle on substrate) */}
              {(() => {
                const cx = 160;
                const scale = 2.5;
                const rScaled = particleRadius * scale;
                const cy = 130 - rScaled;
                const wAppScaled = (apparentWidth / 2) * scale;

                return (
                  <g>
                    {/* Apparent Convoluted AFM Profile (Broad bell curve) */}
                    <path
                      d={`M ${cx - wAppScaled} 130 Q ${cx - wAppScaled * 0.4} ${130 - 2 * rScaled}, ${cx} ${130 - 2 * rScaled} Q ${cx + wAppScaled * 0.4} ${130 - 2 * rScaled}, ${cx + wAppScaled} 130 Z`}
                      fill="#f43f5e"
                      fillOpacity="0.25"
                      stroke="#f43f5e"
                      strokeWidth="2"
                    />

                    {/* Real spherical nanoparticle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={rScaled}
                      fill="#f59e0b"
                      fillOpacity="0.8"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />

                    {/* Moving Tip apex indicator at the edge */}
                    <g transform={`translate(${cx + wAppScaled * 0.7}, ${130 - rScaled})`}>
                      <circle cx="0" cy="0" r={tipRadius * scale * 0.6} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2,2" />
                      <line x1="0" y1="0" x2="15" y2="-20" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="0" y1="0" x2="-15" y2="-20" stroke="#38bdf8" strokeWidth="1.5" />
                    </g>
                  </g>
                );
              })()}
            </svg>
          </div>

          <div className="mt-3 p-2.5 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-300">
            <strong className="text-cyan-300">Шинжлэх ухааны дүгнэлт:</strong> Нано бөөмийн хэмжээг тодорхойлохдоо хэвтээ өргөнийг хэзээ ч шууд ашиглаж болохгүй! Зөвхөн <strong>босоо өндрийн утга (H = {realHeight} nm)</strong> л бодит хэмжээг яг үнэн илэрхийлдэг.
          </div>
        </div>
      </div>
    </div>
  );
};
