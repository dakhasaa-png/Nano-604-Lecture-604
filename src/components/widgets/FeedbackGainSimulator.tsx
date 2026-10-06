import React, { useState } from 'react';

export const FeedbackGainSimulator: React.FC = () => {
  const [gain, setGain] = useState<number>(35); // 0 to 100
  const [scanSpeed, setScanSpeed] = useState<number>(1.0); // 0.2 to 3.0 Hz

  // Status computation
  let statusText = '';
  let statusColor = '';
  let diagnosis = '';

  if (gain < 20 || (gain < 40 && scanSpeed > 1.8)) {
    statusText = 'МӨРДӨЛТИЙН ХОЦРОГДОЛ (Under-gain / Tracking Lag)';
    statusColor = 'text-amber-400';
    diagnosis = 'Z-пьезо гадаргуугийн өндрийг гүйцэж амжихгүй хоцорч байна. Trace ба Retrace шугамууд хоорондоо зөрж, өндөр дутуу хэмжигдэнэ.';
  } else if (gain > 75) {
    statusText = 'РЕЗОНАНСЫН ХЭЛБЭЛЗЭЛ (Over-gain Ringing)';
    statusColor = 'text-rose-400';
    diagnosis = 'Эргэх холбооны өсгөлт хэт их тул Z-пьезо өөрөө өдөөгдөх өндөр давтамжийн хэлбэлзэлд (ringing) орж, зураг даяар хиймэл үелзэл үүсгэж байна.';
  } else {
    statusText = 'ОНОВЧТОЙ ТЭНЦВЭР (Optimal Tracking)';
    statusColor = 'text-emerald-400';
    diagnosis = 'Trace ба Retrace шугамууд төгс давхцаж байна. Хэлбэлзэл байхгүй бөгөөд гадаргуугийн хурц ирмэг бүрэн бодитоор бүртгэгдэж байна.';
  }

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Эргэх холбооны өсгөлт (Gain) & Скан хурдны тэнцвэр
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            Trace vs Retrace шугамын мөрдөлтийн алдаа ба хэт өсгөлтийн резонансыг симуляци хийх
          </h4>
        </div>
        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-950 border border-slate-800 ${statusColor}`}>
          ● {statusText}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="md:col-span-5 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Интеграл өсгөлт (Integral Gain):</span>
              <span className="text-cyan-400 font-bold">{gain}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={gain}
              onChange={(e) => setGain(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>5% (Хэт сул)</span>
              <span>45% (Оновчтой)</span>
              <span>100% (Хэлбэлзэл)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Скан хийх хурд (Scan Rate):</span>
              <span className="text-amber-400 font-bold">{scanSpeed.toFixed(1)} Hz</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={scanSpeed}
              onChange={(e) => setScanSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.2 Hz (Тайван, найдвартай)</span>
              <span>1.0 Hz (Стандарт)</span>
              <span>3.0 Hz (Хэт хурдан)</span>
            </div>
          </div>

          {/* Presets */}
          <div className="flex gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => { setGain(12); setScanSpeed(2.2); }}
              className="flex-1 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
            >
              Суналт (Lag)
            </button>
            <button
              onClick={() => { setGain(45); setScanSpeed(0.8); }}
              className="flex-1 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700"
            >
              Оновчтой
            </button>
            <button
              onClick={() => { setGain(90); setScanSpeed(1.0); }}
              className="flex-1 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700"
            >
              Хэлбэлзэл (Ringing)
            </button>
          </div>

          <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs">
            <span className="text-slate-400 font-semibold block mb-1">Оношлогоо:</span>
            <p className="text-slate-300 leading-relaxed text-[11px]">{diagnosis}</p>
          </div>
        </div>

        {/* Dynamic Trace vs Retrace Waveform */}
        <div className="md:col-span-7 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
              <span>Гадаргуугийн шатлал дээрх Trace (Цэнхэр) ба Retrace (Шар)</span>
              <span className="text-slate-500">True Feature = Саарал</span>
            </div>

            <svg viewBox="0 0 340 160" className="w-full h-40 bg-slate-900 rounded border border-slate-800">
              {/* True Step feature */}
              <path
                d="M 20 130 L 100 130 L 100 60 L 220 60 L 220 130 L 320 130"
                fill="none"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="4,4"
              />

              {/* Dynamic Trace & Retrace generation */}
              {(() => {
                // If gain is low: lag -> smoothed corner, delayed fall
                // If gain is high: high-frequency oscillations on top of the step
                const isRinging = gain > 75;
                const isLagging = gain < 25 || (gain < 45 && scanSpeed > 1.5);

                let tracePath = '';
                let retracePath = '';

                if (isLagging) {
                  // Trace lags rightwards, rounded
                  tracePath = 'M 20 130 L 98 130 Q 120 120 135 70 L 218 68 Q 240 75 260 130 L 320 130';
                  // Retrace lags leftwards
                  retracePath = 'M 320 130 L 222 130 Q 200 120 185 70 L 102 68 Q 80 75 60 130 L 20 130';
                } else if (isRinging) {
                  // High frequency sine on top
                  tracePath = 'M 20 130 L 98 130 L 100 50 Q 106 72 112 52 Q 118 68 124 55 Q 130 65 136 58 L 220 58 L 222 140 Q 228 120 234 135 L 320 130';
                  retracePath = 'M 320 130 L 222 130 L 220 50 Q 214 72 208 52 Q 202 68 196 55 Q 190 65 184 58 L 100 58 L 98 140 Q 92 120 86 135 L 20 130';
                } else {
                  // Optimal: tightly follows with slight realistic physical response
                  tracePath = 'M 20 130 L 99 130 L 101 59 L 219 59 L 221 130 L 320 130';
                  retracePath = 'M 320 130 L 221 130 L 219 60 L 101 60 L 99 130 L 20 130';
                }

                return (
                  <g>
                    <path d={tracePath} fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <path d={retracePath} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2" />
                  </g>
                );
              })()}
            </svg>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-slate-400 mt-2 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span> Trace (Баруун тийш)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-0.5 bg-amber-400 border-dashed inline-block"></span> Retrace (Зүүн тийш)
            </span>
            <span className="text-slate-500">
              Хэрэв хоёр шугам нийлэхгүй бол скан хурдыг бууруулна
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
