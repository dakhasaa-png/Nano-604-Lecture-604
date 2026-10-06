import React, { useState } from 'react';

export const NISTSRM3461Calibration: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<'nominal' | 'thermal' | 'srm3461'>('srm3461');

  const methods = {
    nominal: {
      name: 'Үйлдвэрийн нэрлэсэн утга (Manufacturer Nominal)',
      uncertainty: '± 50% - 100%',
      color: 'text-rose-400',
      bgColor: 'bg-rose-950/40 border-rose-800',
      desc: 'Кантилеверийн хайрцаг дээрх дундаж утга. Зузааны шоо зэрэг (t³) үйлдвэрлэлийн өчүүхэн зөрүүгээс болж k нь бодит утгаасаа 2 дахин зөрж болно.',
      traceable: 'Үгүй (No SI traceability)',
      reproducibility: 'Маш муу (Лаборатори хооронд 400% хүртэл зөрдөг)'
    },
    thermal: {
      name: 'Дулааны дуу чимээний арга (Thermal Noise Tune)',
      uncertainty: '± 10% - 20%',
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40 border-amber-800',
      desc: 'Кантилеверийн броуны хөдөлгөөний спектрийг (Equipartition theorem) ашиглана. Фотодиодын оптикийн фокусын байрлал болон хазайлтын мэдрэг чанараас (nm/V) шууд хамаарна.',
      traceable: 'Шууд бус (Indirect)',
      reproducibility: 'Дунд зэрэг (Туршигчийн тохируулгаас хамаарна)'
    },
    srm3461: {
      name: 'NIST SRM 3461 Эталон кантилевер (Reference Cantilever)',
      uncertainty: '± 1.5%',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40 border-emerald-800',
      desc: 'NIST-ийн электростатик хүчний жингээр SI системийн Ньютонд шууд холбогдон баталгаажсан эталон кантилевертэй харьцуулж тохируулна.',
      traceable: 'Бүрэн SI мөшгилттэй (SI-traceable via NIST)',
      reproducibility: 'Маш өндөр (Дэлхийн аль ч лабад үр дүн яг таарна)'
    }
  };

  const active = methods[selectedMethod];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            NIST SPM Хэмжилзүйн Кейс (NIST SRM 3461 / NIST SP 260-227)
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            Яагаад өндөр давтагдах чадвар (Precision) нь үнэн бодит байдлыг (Accuracy) батлахгүй вэ?
          </h4>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-bold bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
          SI TRACEABLE CALIBRATION
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-4">
        {(Object.keys(methods) as Array<keyof typeof methods>).map((key) => {
          const item = methods[key];
          return (
            <button
              key={key}
              onClick={() => setSelectedMethod(key)}
              className={`p-3 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                selectedMethod === key
                  ? `${item.bgColor} shadow-sm`
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-xs font-semibold block mb-1 text-slate-200">
                {key === 'nominal' ? '1. Нэрлэсэн утга' : key === 'thermal' ? '2. Дулааны арга' : '3. NIST SRM 3461'}
              </span>
              <span className={`text-xs font-mono font-bold ${item.color}`}>
                Алдаа: {item.uncertainty}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail presentation */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
          <h5 className={`text-sm font-bold ${active.color}`}>
            {active.name}
          </h5>
          <div className="flex gap-2 text-xs font-mono">
            <span className="text-slate-400">Тодорхойгүй байдал:</span>
            <span className={`font-bold ${active.color}`}>{active.uncertainty}</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          {active.desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2 border-t border-slate-800/80">
          <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
            <span className="text-slate-400 block text-[10px]">SI Хэмжилзүйн мөшгилт (Traceability):</span>
            <span className="text-slate-200 font-semibold">{active.traceable}</span>
          </div>
          <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Давтагдах чадвар (Reproducibility):</span>
            <span className="text-slate-200 font-semibold">{active.reproducibility}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
