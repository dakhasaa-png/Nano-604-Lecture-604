import React, { useState } from 'react';

export const AFMPotentialModes: React.FC = () => {
  const [distanceZ, setDistanceZ] = useState<number>(0.35); // nm

  // Lennard-Jones parameters (scaled for illustration)
  // sigma ≈ 0.3 nm, epsilon ≈ 1.0 (arbitrary energy unit)
  // V(z) = 4 * eps * [ (sigma/z)^12 - (sigma/z)^6 ]
  // F(z) = - dV/dz = 24 * eps / sigma * [ 2*(sigma/z)^13 - (sigma/z)^7 ]
  const sigma = 0.3;
  const sOverZ = sigma / Math.max(0.24, distanceZ);
  const potentialV = 4 * (Math.pow(sOverZ, 12) - Math.pow(sOverZ, 6));
  const forceF = 24 * (2 * Math.pow(sOverZ, 13) - Math.pow(sOverZ, 7));

  // Determine regime
  let regime = '';
  let modeName = '';
  let regimeColor = '';

  if (distanceZ < 0.3) {
    regime = 'ТҮЛХЭЛЦЭХ МУЖ (Repulsive, F > 0)';
    modeName = 'Хүрэлцэх горим (Contact Mode)';
    regimeColor = 'text-rose-400';
  } else if (distanceZ >= 0.3 && distanceZ < 0.45) {
    regime = 'ШИЛЖИЛТИЙН МУЖ / ТОГТВОРГҮЙ (Transition / Snap-in)';
    modeName = 'Товших горим (Tapping / Intermittent Contact)';
    regimeColor = 'text-amber-400';
  } else {
    regime = 'ТАТАХ МУЖ (Attractive Van der Waals, F < 0)';
    modeName = 'Хүрэлцэхгүй горим (Non-Contact Mode)';
    regimeColor = 'text-cyan-400';
  }

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Леннард-Жонсын потенциал ба AFM-ийн горимууд
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            Үзүүр-дээжийн зай z-ээс хамаарсан таталцах/түлхэлцэх хүч ба горимын хуваарилалт
          </h4>
        </div>
        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-950 border border-slate-800 ${regimeColor}`}>
          ● {regime}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Interactive slider & dynamic explanations */}
        <div className="md:col-span-5 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Үзүүр-дээжийн зай (z):</span>
              <span className="text-cyan-400 font-bold text-sm">{distanceZ.toFixed(2)} nm ({(distanceZ * 10).toFixed(1)} Å)</span>
            </div>
            <input
              type="range"
              min="0.25"
              max="0.80"
              step="0.01"
              value={distanceZ}
              onChange={(e) => setDistanceZ(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.25 nm (Хүрэлцэл)</span>
              <span>0.3 nm (z₀)</span>
              <span>0.8 nm (Хол)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono">Харгалзах AFM горим:</span>
              <h5 className={`text-sm font-semibold ${regimeColor}`}>{modeName}</h5>
            </div>
            <div className="flex justify-between font-mono text-[11px] text-slate-300 border-t border-slate-800 pt-2">
              <span>Харилцан үйлчлэлийн хүч F:</span>
              <span className={forceF > 0 ? 'text-rose-400' : 'text-cyan-400'}>
                {forceF > 0 ? `+${forceF.toFixed(1)} (Түлхэх)` : `${forceF.toFixed(1)} (Татах)`}
              </span>
            </div>
            <div className="flex justify-between font-mono text-[11px] text-slate-300">
              <span>Потенциал энерги V:</span>
              <span className="text-slate-300">{potentialV.toFixed(2)} a.u.</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setDistanceZ(0.27)}
              className="flex-1 py-1.5 text-xs rounded bg-rose-950/40 text-rose-300 border border-rose-800 hover:bg-rose-900/40"
            >
              Contact (0.27 nm)
            </button>
            <button
              onClick={() => setDistanceZ(0.38)}
              className="flex-1 py-1.5 text-xs rounded bg-amber-950/40 text-amber-300 border border-amber-800 hover:bg-amber-900/40"
            >
              Tapping (0.38 nm)
            </button>
            <button
              onClick={() => setDistanceZ(0.60)}
              className="flex-1 py-1.5 text-xs rounded bg-cyan-950/40 text-cyan-300 border border-cyan-800 hover:bg-cyan-900/40"
            >
              Non-contact (0.60 nm)
            </button>
          </div>
        </div>

        {/* Right: Lennard-Jones Curve SVG with dynamic marker and mode zones */}
        <div className="md:col-span-7 bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
            <span>V(z) Потенциалын муруй & Ажлын бүсүүд</span>
            <span className="text-slate-500">z₀ ≈ 0.3 nm (V хамгийн бага)</span>
          </div>

          <svg viewBox="0 0 340 180" className="w-full h-44 bg-slate-900/90 rounded border border-slate-800">
            {/* Background Zone Shading */}
            <rect x="20" y="10" width="70" height="160" fill="#f43f5e" fillOpacity="0.10" />
            <text x="25" y="24" fill="#fb7185" fontSize="9" fontFamily="monospace">Хүрэлцэх (Contact)</text>

            <rect x="90" y="10" width="70" height="160" fill="#f59e0b" fillOpacity="0.10" />
            <text x="95" y="24" fill="#fbbf24" fontSize="9" fontFamily="monospace">Товших (Tapping)</text>

            <rect x="160" y="10" width="160" height="160" fill="#06b6d4" fillOpacity="0.10" />
            <text x="175" y="24" fill="#38bdf8" fontSize="9" fontFamily="monospace">Хүрэлцэхгүй (Non-Contact)</text>

            {/* Axes */}
            <line x1="20" y1="90" x2="320" y2="90" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
            <text x="310" y="85" fill="#64748b" fontSize="9" fontFamily="monospace">z</text>
            <line x1="90" y1="10" x2="90" y2="170" stroke="#475569" strokeWidth="1" />
            <text x="75" y="18" fill="#64748b" fontSize="9" fontFamily="monospace">V=0</text>

            {/* Lennard-Jones Curve */}
            <path
              d="M 35 15 Q 40 45, 60 115 Q 75 145, 95 145 Q 140 135, 200 102 Q 260 93, 310 91"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />

            {/* Dynamic marker calculation */}
            {(() => {
              // map distanceZ (0.25..0.80) to x (35..310)
              const t = (distanceZ - 0.25) / 0.55;
              const cx = 35 + t * 275;
              // approximate y from LJ
              let cy = 90;
              if (distanceZ < 0.3) {
                cy = 15 + (1 - (0.3 - distanceZ) / 0.05) * 125;
              } else if (distanceZ < 0.34) {
                cy = 140 + Math.sin((distanceZ - 0.3) * 20) * 8;
              } else {
                cy = 145 - (1 - Math.exp(-4 * (distanceZ - 0.34))) * 53;
              }

              return (
                <g>
                  <line x1={cx} y1="10" x2={cx} y2="170" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />
                  <circle cx={cx} cy={cy} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              );
            })()}
          </svg>

          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
            <span>Паулийн түлхэлцэл: F &gt; 0</span>
            <span>Тэнцвэрийн цэг: F = 0</span>
            <span>Ван дер Ваальсийн таталцал: F &lt; 0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
