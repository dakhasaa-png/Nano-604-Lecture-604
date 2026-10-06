import React, { useState } from 'react';

export const AFMModeSelector: React.FC = () => {
  const [sampleSoftness, setSampleSoftness] = useState<'soft' | 'hard'>('soft');
  const [attachment, setAttachment] = useState<'weak' | 'strong'>('weak');
  const [roughness, setRoughness] = useState<'low' | 'high'>('low');
  const [liquid, setLiquid] = useState<boolean>(false);

  // Recommendation logic
  let recommendedMode = '';
  let rationale = '';
  let probeType = '';
  let riskNote = '';

  if (sampleSoftness === 'soft' || attachment === 'weak') {
    recommendedMode = 'Товших горим (Tapping / Intermittent Contact)';
    rationale = 'Зөөлөн дээжийг зүсэж урахаас, эсвэл сул бэхлэгдсэн нано бүтцийг хөндлөн үрэлтийн (lateral shear force) хүчээр чирч зайлуулахаас бүрэн хамгаална.';
    probeType = 'Цахиур (Si) кантилевер, f₀ ≈ 150–300 kHz, k ≈ 20–40 N/m, R < 10 nm';
    riskNote = 'Хүрэлцэх горим (Contact mode) сонгож болохгүй! Зөөлөн гадаргуу дээр суваг үүсэж гэмтэнэ.';
  } else if (liquid) {
    recommendedMode = 'Шингэн дэх Товших горим (Liquid Tapping)';
    rationale = 'Капилляр усны хүчийг арилгаж, биологийн дээжийг физиологийн уусмал дотор байгалийн төлөвөөр нь дүрсэлнэ.';
    probeType = 'Зөөлөн Si3N4 кантилевер, k ≈ 0.05–0.5 N/m, f₀_liquid ≈ 10–30 kHz';
    riskNote = 'Шингэнд лазерын хугарал үүсдэг тул оптикийн дахин тохируулга хийнэ.';
  } else if (sampleSoftness === 'hard' && attachment === 'strong' && roughness === 'low') {
    recommendedMode = 'Хүрэлцэх горим (Contact Mode) эсвэл Товших горим';
    rationale = 'Хатуу талст, керамик, цахиурын субстрат дээр өндөр хурдтай скан хийх эсвэл атомын шатлалыг шууд хэмжихэд тохиромжтой.';
    probeType = 'Si3N4 кантилевер, бага хөшүүн чанартай k ≈ 0.1–0.5 N/m';
    riskNote = 'Үзүүр мохох (tip wear) эрсдэл их тул өндөр даралтаар удаан скан хийхгүй байх.';
  } else {
    recommendedMode = 'Товших горим (Tapping Mode)';
    rationale = 'Ихэнх тодорхойгүй эсвэл холимог фазтай материалуудад хамгийн найдвартай стандарт сонголт.';
    probeType = 'Стандарт Tapping probe, k ≈ 40 N/m';
    riskNote = 'Setpoint-ийг хэт хүчтэй дарж болохгүй (phase inversion).';
  }

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="border-b border-slate-800 pb-3 mb-4">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
          AFM Горим сонгох шийдвэрийн мод (Decision Matrix)
        </span>
        <h4 className="text-sm font-semibold text-slate-200">
          Дээжийн шинж чанарыг оруулан оновчтой горим, тохирох үзүүрийг сонгох
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Parameters */}
        <div className="md:col-span-6 space-y-3">
          <div>
            <span className="text-xs font-mono text-slate-300 block mb-1.5">
              1. Дээжийн механик хатуулаг:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSampleSoftness('soft')}
                className={`py-2 px-3 text-xs rounded-lg border text-left font-medium transition-colors ${
                  sampleSoftness === 'soft'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>Зөөлөн (Полимер, гель, био)</span>
              </button>
              <button
                onClick={() => setSampleSoftness('hard')}
                className={`py-2 px-3 text-xs rounded-lg border text-left font-medium transition-colors ${
                  sampleSoftness === 'hard'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>Хатуу (Цахиур, металл, оксид)</span>
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-slate-300 block mb-1.5">
              2. Субстраттай холбогдсон бат бэх:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setAttachment('weak')}
                className={`py-2 px-3 text-xs rounded-lg border text-left font-medium transition-colors ${
                  attachment === 'weak'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>Сул (ДНХ, нано бөөм, сорбц)</span>
              </button>
              <button
                onClick={() => setAttachment('strong')}
                className={`py-2 px-3 text-xs rounded-lg border text-left font-medium transition-colors ${
                  attachment === 'strong'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>Бат бөх (Эпитаксиаль, монокристалл)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <span className="text-xs font-mono text-slate-300 block mb-1">
                3. Барзгаржилт:
              </span>
              <select
                value={roughness}
                onChange={(e) => setRoughness(e.target.value as any)}
                className="w-full bg-slate-800 text-xs px-2.5 py-2 rounded-lg border border-slate-700 text-slate-200"
              >
                <option value="low">Бага (Rq &lt; 5 нм, тэгш)</option>
                <option value="high">Их (Rq &gt; 50 нм, барзгар)</option>
              </select>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-300 block mb-1">
                4. Шингэн орчин:
              </span>
              <button
                onClick={() => setLiquid(!liquid)}
                className={`w-full py-2 px-2.5 text-xs rounded-lg border font-medium transition-colors ${
                  liquid
                    ? 'bg-cyan-600/30 text-cyan-200 border-cyan-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                {liquid ? '💧 Тийм (Шингэн эс)' : '☁️ Үгүй (Агаарт)'}
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Result Card */}
        <div className="md:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Зөвлөмж болгох хэмжилтийн горим:
              </span>
              <h5 className="text-base font-bold text-emerald-400 mt-1">
                {recommendedMode}
              </h5>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Физик үндэслэл:</span>
                <p className="text-slate-200 leading-relaxed mt-0.5">{rationale}</p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-semibold block">Тохирох зонд (Probe):</span>
                <p className="text-cyan-300 font-mono text-[11px] mt-0.5">{probeType}</p>
              </div>
            </div>

            <div className="p-2.5 bg-rose-950/30 border border-rose-900/40 rounded-lg text-xs">
              <span className="text-rose-300 font-semibold block">⚠️ Эрсдэлийн анхааруулга:</span>
              <p className="text-slate-300 text-[11px] mt-0.5">{riskNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
