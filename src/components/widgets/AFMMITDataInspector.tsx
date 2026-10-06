import React, { useState } from 'react';

export const AFMMITDataInspector: React.FC = () => {
  const [cursorPosUm, setCursorPosUm] = useState<number>(4.8); // 0 to 10 um

  // Pitch = 3.0 um, Step Height = 102.4 nm
  // Calculate simulated height at cursorPosUm:
  const getStepHeight = (x: number) => {
    // 3 um period
    const rem = x % 3.0;
    // Step is high between 0.75 and 2.25 um
    if (rem > 0.85 && rem < 2.15) {
      return 102.4;
    } else if (rem >= 0.70 && rem <= 0.85) {
      // Sloped edge due to tip cone angle
      return ((rem - 0.70) / 0.15) * 102.4;
    } else if (rem >= 2.15 && rem <= 2.30) {
      return (1 - (rem - 2.15) / 0.15) * 102.4;
    } else {
      return 0.0;
    }
  };

  const currentHeightNm = getStepHeight(cursorPosUm);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Бодит AFM хэмжилтийн өгөгдөл (S-03 MIT 20.309 Module 2, pp. 14–15)
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            Калибровкын торлогийн топографи ба Зүсэлтийн шугам (Cross-Section Line Profile)
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono">
            ● MIT 20.309 DATASET
          </span>
          <span className="text-xs font-mono text-slate-400">10 × 10 μm | Pitch 3.0 μm</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: 10x10 um simulated AFM Topography visual */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative bg-black rounded-lg border border-slate-800 p-3 overflow-hidden">
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span>AFM Топографи газрын зураг (10 × 10 μm)</span>
              <span className="text-cyan-400">Шар шугам = Сорьцын зүсэлт</span>
            </div>

            <svg viewBox="0 0 300 200" className="w-full h-44 bg-slate-950 rounded">
              {/* Grating grid boxes */}
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3].map((col) => {
                  const x = 20 + col * 70;
                  const y = 20 + row * 45;
                  return (
                    <g key={`${row}-${col}`}>
                      <rect
                        x={x}
                        y={y}
                        width="40"
                        height="30"
                        fill="#0284c7"
                        fillOpacity="0.4"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        rx="2"
                      />
                      <rect
                        x={x + 3}
                        y={y + 2}
                        width="34"
                        height="26"
                        fill="#38bdf8"
                        fillOpacity="0.6"
                        rx="1"
                      />
                    </g>
                  );
                })
              )}

              {/* Cross-section Line */}
              <line x1="15" y1="100" x2="285" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
              {/* Active Cursor Circle */}
              <circle
                cx={15 + (cursorPosUm / 10) * 270}
                cy={100}
                r="6"
                fill="#06b6d4"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </svg>

            {/* Slider to move cursor */}
            <div className="mt-3">
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Хөндлөн байрлал (x axis):</span>
                <span className="text-cyan-400 font-bold">{cursorPosUm.toFixed(2)} μm / 10.00 μm</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.05"
                value={cursorPosUm}
                onChange={(e) => setCursorPosUm(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Right: Line profile graph & Dimensional quantification */}
        <div className="md:col-span-6 space-y-4">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1">
              <span>Өндрийн профиль: Z (нм) vs Зай x (мкм)</span>
              <span className="text-emerald-400 font-bold">h = 102.4 ± 1.2 nm</span>
            </div>

            <svg viewBox="0 0 300 90" className="w-full h-24 bg-slate-900 rounded">
              {/* Flat base */}
              <line x1="10" y1="75" x2="290" y2="75" stroke="#475569" strokeWidth="1" />

              {/* Periodic step plateau curve with sloped sides */}
              <path
                d="M 10 75 L 30 75 L 42 25 L 75 25 L 87 75 L 120 75 L 132 25 L 165 25 L 177 75 L 210 75 L 222 25 L 255 25 L 267 75 L 290 75"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />

              {/* Active Marker on profile */}
              <circle
                cx={10 + (cursorPosUm / 10) * 280}
                cy={75 - (currentHeightNm / 102.4) * 50}
                r="4.5"
                fill="#06b6d4"
                stroke="#fff"
                strokeWidth="1.5"
              />
            </svg>

            <div className="flex justify-between text-xs font-mono text-slate-400 mt-2">
              <span>0 μm</span>
              <span className="text-cyan-300 font-bold">
                Идэвхтэй Z өндөр: {currentHeightNm.toFixed(1)} nm
              </span>
              <span>10 μm</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-xs">
            <span className="text-amber-300 font-semibold block">
              Шинжлэх ухааны үнэлгээ (MIT 20.309 протокол):
            </span>
            <div className="flex justify-between text-slate-300 font-mono text-[11px]">
              <span>Хэмжигдсэн үе (Pitch):</span>
              <span className="text-emerald-400 font-bold">3.00 ± 0.02 μm (100% нийцэл)</span>
            </div>
            <div className="flex justify-between text-slate-300 font-mono text-[11px]">
              <span>Шатлалын өндөр (Step height):</span>
              <span className="text-emerald-400 font-bold">102.4 ± 1.2 nm (1% тодорхойгүй)</span>
            </div>
            <div className="flex justify-between text-slate-300 font-mono text-[11px]">
              <span>Хажуугийн налуу (Sidewall angle):</span>
              <span className="text-rose-400 font-bold">~72° (Бодит 90° биш, үзүүрийн конусын хязгаар)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
