import React, { useState } from 'react';

export const AFMCantileverTransducer: React.FC = () => {
  const [springK, setSpringK] = useState<number>(0.2); // N/m
  const [deflectionNm, setDeflectionNm] = useState<number>(5.0); // nm
  const [laserPathCm, setLaserPathCm] = useState<number>(8.0); // cm
  const [cantileverLengthUm, setCantileverLengthUm] = useState<number>(125.0); // um

  // F = k * delta
  // k in N/m, delta in nm => F = k * delta * 1e-9 N = k * delta nN
  const forceNN = springK * deflectionNm; // in nN
  const forcePN = forceNN * 1000; // in pN

  // Optical magnification:
  // theta ≈ delta / L_cant
  // reflected angle = 2 * theta
  // displacement on photodiode Δx = 2 * L_path * theta = 2 * L_path * (delta / L_cant)
  // L_path in cm -> um: * 10,000
  const optGain = (2 * (laserPathCm * 10000)) / cantileverLengthUm;
  const photodiodeSpotShiftUm = (deflectionNm / 1000) * optGain; // in um

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            AFM Хүч хувиргагч & Оптик хөшүүрэг симулятор (F = kδ)
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            Кантилеверийн хазайлт δ-оос Ньютон хүч F болон Фотодиод дээрх оптик өсгөлтийг тооцоолох
          </h4>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono">Оптик өсгөлт:</span>
          <span className="ml-2 font-mono text-cyan-300 font-bold">~{Math.round(optGain)}× дахин</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Кантилеверийн хөшүүн чанар (k):</span>
              <span className="text-amber-400 font-bold">{springK.toFixed(2)} N/m</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="2.0"
              step="0.02"
              value={springK}
              onChange={(e) => setSpringK(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.02 N/m (Маш зөөлөн био)</span>
              <span>0.2 N/m (Contact)</span>
              <span>2.0 N/m (Хатуу)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Механик хазайлт (δ):</span>
              <span className="text-cyan-400 font-bold">{deflectionNm.toFixed(2)} nm</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="20.0"
              step="0.1"
              value={deflectionNm}
              onChange={(e) => setDeflectionNm(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.1 nm (Өчүүхэн)</span>
              <span>10 nm</span>
              <span>20 nm (Хүчтэй түлхэлт)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Кантилеверийн урт (L_c):</span>
              <input
                type="number"
                min="50"
                max="300"
                value={cantileverLengthUm}
                onChange={(e) => setCantileverLengthUm(Math.max(50, parseFloat(e.target.value) || 100))}
                className="w-full bg-slate-800 text-xs px-2.5 py-1.5 rounded border border-slate-700 font-mono text-cyan-300"
              />
              <span className="text-[10px] text-slate-500">μm (микрометр)</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Оптик зам (L_path):</span>
              <input
                type="number"
                min="2"
                max="20"
                value={laserPathCm}
                onChange={(e) => setLaserPathCm(Math.max(2, parseFloat(e.target.value) || 8))}
                className="w-full bg-slate-800 text-xs px-2.5 py-1.5 rounded border border-slate-700 font-mono text-amber-300"
              />
              <span className="text-[10px] text-slate-500">cm (сантиметр)</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase font-mono text-slate-400 block">
                Тооцоологдсон механик хүч (F = kδ):
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold font-mono text-emerald-400">
                  {forceNN < 1 ? forcePN.toFixed(1) : forceNN.toFixed(2)}
                </span>
                <span className="text-sm font-mono text-slate-300">
                  {forceNN < 1 ? 'pN' : 'nN'}
                </span>
                <span className="text-xs font-mono text-slate-500 ml-2">
                  ({forceNN.toFixed(3)} × 10⁻⁹ N)
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Оптик өсгөлт ($2 L_{'{path}'} / L_{'{cant}'}$):</span>
                <span className="font-mono text-cyan-300 font-bold">~{Math.round(optGain)}×</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Фотодиод дээрх лазерын шилжилт:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {photodiodeSpotShiftUm.toFixed(2)} μm ({Math.round(photodiodeSpotShiftUm * 1000)} nm)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1 leading-relaxed border-t border-slate-800">
                Кантилеверийн <strong>{deflectionNm} нм</strong> механик хазайлт нь 4-квадрант фотодиод дээр <strong>{photodiodeSpotShiftUm.toFixed(1)} мкм</strong> болж 1280 дахин өсгөгдөж маш өндөр нарийвчлалтай бүртгэгдэнэ.
              </p>
            </div>
          </div>

          {/* Graphic Visual Representation of the Beam Deflection */}
          <div className="mt-3 pt-2 border-t border-slate-800">
            <svg viewBox="0 0 280 60" className="w-full h-14 bg-slate-900 rounded border border-slate-800">
              {/* Sample */}
              <rect x="180" y="45" width="80" height="10" fill="#334155" />
              {/* Cantilever */}
              <line x1="100" y1="20" x2="200" y2="40" stroke="#94a3b8" strokeWidth="3" />
              {/* Tip */}
              <polygon points="198,39 204,41 200,45" fill="#f59e0b" />
              {/* Laser Beam in */}
              <line x1="140" y1="5" x2="195" y2="38" stroke="#ef4444" strokeWidth="1.5" />
              {/* Reflected Laser Beam out */}
              <line x1="195" y1="38" x2="260" y2="8" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />
              {/* Photodiode */}
              <rect x="258" y="4" width="8" height="16" fill="#0284c7" rx="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
