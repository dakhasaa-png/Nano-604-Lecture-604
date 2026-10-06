import React, { useState } from 'react';

export const STMCurrentCalculator: React.FC = () => {
  const [gapZ, setGapZ] = useState<number>(0.5); // nm
  const [workFunc, setWorkFunc] = useState<number>(4.5); // eV
  const [vBias, setVBias] = useState<number>(0.2); // V

  // κ = sqrt(2 * m * Phi) / ħ ≈ 0.512 * sqrt(Phi in eV) in Å⁻¹ => 5.12 * sqrt(Phi) in nm⁻¹
  const kappa = 5.12 * Math.sqrt(workFunc); // nm⁻¹
  const i0 = 100.0; // arbitrary reference current in nA at z = 0.2 nm
  // I = i0 * exp(-2 * kappa * (z - 0.2))
  const currentNA = i0 * Math.exp(-2 * kappa * (gapZ - 0.2));
  
  // Calculate relative change for Δz = 0.1 nm:
  const factorFor01nm = Math.exp(2 * kappa * 0.1);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold tracking-wide text-cyan-400 uppercase font-mono">
            Квант туннелийн гүйдлийн экспоненциал симулятор
          </h4>
          <p className="text-xs text-slate-400">
            Зай $z$ ба Ажлын функц $\Phi$-ийн нөлөөгөөр гүйдэл хэрхэн огцом унахыг шууд ажиглах
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono">Уналтын тогтмол $\kappa$:</span>
          <span className="ml-2 font-mono text-cyan-300 font-bold">{kappa.toFixed(2)} nm⁻¹</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Үзүүр-дээжийн зай (z gap):</span>
              <span className="text-cyan-400 font-bold text-sm">{gapZ.toFixed(3)} nm ({(gapZ * 10).toFixed(1)} Å)</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.01"
              value={gapZ}
              onChange={(e) => setGapZ(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.2 nm (Маш ойр)</span>
              <span>0.6 nm</span>
              <span>1.0 nm (Хол)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Дээжийн ажлын функц ($\Phi$):</span>
              <span className="text-amber-400 font-bold">{workFunc.toFixed(1)} eV</span>
            </div>
            <input
              type="range"
              min="3.0"
              max="5.5"
              step="0.1"
              value={workFunc}
              onChange={(e) => setWorkFunc(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>3.0 eV (Бага саад)</span>
              <span>4.5 eV (Au/Pt)</span>
              <span>5.5 eV (Өндөр)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Шилжилтийн хүчдэл (V_bias):</span>
              <span className="text-emerald-400 font-bold">{(vBias * 1000).toFixed(0)} mV</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.5"
              step="0.05"
              value={vBias}
              onChange={(e) => setVBias(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Quick jump presets */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Шуурхай алхамт туршилт:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setGapZ(0.3)}
                className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                z = 0.3 nm
              </button>
              <button
                onClick={() => setGapZ(0.4)}
                className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
              >
                +0.1 nm нэмэх
              </button>
              <button
                onClick={() => setGapZ(0.5)}
                className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                z = 0.5 nm
              </button>
            </div>
          </div>
        </div>

        {/* Live Calculation Display & Visual Curve */}
        <div className="flex flex-col justify-between bg-slate-950/70 rounded-lg p-4 border border-slate-800">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-mono block mb-1">
              Тооцоологдсон туннелийн гүйдэл I:
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-cyan-400 tracking-tight">
                {currentNA > 1
                  ? currentNA.toFixed(2)
                  : currentNA > 0.001
                  ? currentNA.toFixed(4)
                  : currentNA.toExponential(2)}
              </span>
              <span className="text-sm font-mono text-slate-400">nA</span>
              <span className="text-xs text-slate-500 font-mono ml-2">
                ({(currentNA * 1000).toFixed(1)} pA)
              </span>
            </div>

            <div className="mt-4 p-3 bg-cyan-950/40 border border-cyan-800/50 rounded-lg text-xs space-y-1.5">
              <div className="text-cyan-300 font-semibold flex items-center gap-1.5">
                <span>⚡ Экспоненциал мэдрэг чанарын дүгнэлт:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Энэхүү $\Phi = {workFunc}$ eV төлөвт зай z-г ердөө <strong className="text-cyan-300">0.1 нм (1 Å)</strong> холдуулахад гүйдэл <strong className="text-amber-300">{factorFor01nm.toFixed(1)} дахин</strong> буурна!
              </p>
              <p className="text-slate-400 text-[11px]">
                Ийм учраас STM үзүүрийн хамгийн захын 1 атом нь бусад атомоос ердөө 0.1 нм цухуйж байхад л туннелийн нийт гүйдлийн 90%-ийг дангаараа дамжуулдаг.
              </p>
            </div>
          </div>

          {/* Mini SVG Curve Visualization */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-1">
              <span>Экспоненциал муруй дээрх идэвхтэй цэг:</span>
              <span className="text-cyan-400">I ∝ exp(-{ (2 * kappa).toFixed(1) } z)</span>
            </div>
            <svg viewBox="0 0 200 60" className="w-full h-14 bg-slate-900/90 rounded border border-slate-800">
              {/* Curve path */}
              <path
                d="M 10 8 Q 40 12, 70 30 T 190 55"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
              />
              {/* Active Marker */}
              {(() => {
                // map gapZ (0.2..1.0) to x (15..185)
                const t = (gapZ - 0.2) / 0.8;
                const x = 15 + t * 170;
                // exp decay for y (8..54)
                const y = 8 + (1 - Math.exp(-3 * t)) * 46;
                return (
                  <g>
                    <line x1={x} y1="0" x2={x} y2="60" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx={x} cy={y} r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
