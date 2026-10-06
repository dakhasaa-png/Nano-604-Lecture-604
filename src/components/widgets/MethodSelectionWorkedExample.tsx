import React, { useState } from 'react';

export const MethodSelectionWorkedExample: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'A' | 'B'>('A');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [revealed, setRevealed] = useState<boolean>(false);

  const scenarios = {
    A: {
      title: 'Сценари А: SiC субстрат дээрх Эпитаксиаль Графен',
      sampleDesc: 'Цахилгаан дамжуулагч crystalline 2D нүүрстөрөгчийн сүлжээ. Дээж цахилгаан сайн дамжуулдаг бөгөөд вакуумд тэсвэртэй.',
      objective: 'Атомын түвшний цэгэн согог (vacancy, Stone-Wales) ба согогийн орчим дахь орон нутгийн электрон төлөвийн нягтын (LDOS) хэлбэлзлийг судлах.',
      options: [
        { id: 'stm_cc', label: 'STM — Тогтмол гүйдлийн горим (Constant-current STM + STS)', correct: true },
        { id: 'afm_contact', label: 'AFM — Хүрэлцэх горим (Contact mode AFM)', correct: false },
        { id: 'afm_tapping', label: 'AFM — Товших горим (Tapping mode AFM)', correct: false }
      ],
      correctExplanation: 'Графен нь дамжуулагч бөгөөд зорилтот шинж нь "электрон төлөвийн нягт (LDOS) ба атомар согог" юм. Энэ нь STM-ийн туйлын давуу тал бөгөөд туннелийн спектроскопиор (STS) электрон төлөвийг эрчим хүчний функцээр ялгаж чадна. AFM нь электрон бүтцийг ялгаж чадахгүй.'
    },
    B: {
      title: 'Сценари Б: Цахиур дээрх PMMA полимер фоторезист хальс',
      sampleDesc: 'Зөөлөн, органик тусгаарлагч полимер хальс (зузаан ~40 нм). Механик хүчдэл болон үрэлтэд амархан урагдаж зурагдана.',
      objective: 'Электрон цацрагийн литографиар гаргаж авсан нано-шугамын өргөн ба ирмэгийн барзгаржилтыг (Line edge roughness) дээжийг гэмтээхгүйгээр хэмжих.',
      options: [
        { id: 'stm_cc', label: 'STM — Тогтмол гүйдлийн горим', correct: false },
        { id: 'afm_contact', label: 'AFM — Хүрэлцэх горим (Contact mode AFM)', correct: false },
        { id: 'afm_tapping', label: 'AFM — Товших горим (Tapping mode AFM)', correct: true }
      ],
      correctExplanation: 'PMMA нь цахилгаан тусгаарлагч тул STM туннелийн гүйдэл гүйхгүй (үзүүр дээжийг мөргөж эвдэрнэ). Хүрэлцэх горимт AFM (Contact mode) нь хөндлөн үрэлтийн хүчээрээ зөөлөн полимерийг хуулж урж хаяна. Тиймээс хөндлөн үрэлт байхгүй Товших горим (Tapping mode AFM) цорын ганц зөв сонголт болно!'
    }
  };

  const curr = scenarios[activeScenario];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Аргын сонголт ба үндэслэл гаргах дадлага кейс
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            Оюутны бие даасан шийдвэр гаргалт: STM үү, AFM үү?
          </h4>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveScenario('A'); setSelectedMethod(''); setRevealed(false); }}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium border transition-colors ${
              activeScenario === 'A'
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            Сценари А (Графен)
          </button>
          <button
            onClick={() => { setActiveScenario('B'); setSelectedMethod(''); setRevealed(false); }}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium border transition-colors ${
              activeScenario === 'B'
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            Сценари Б (PMMA Полимер)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-7 space-y-3">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <h5 className="text-sm font-semibold text-amber-300 mb-1">{curr.title}</h5>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">{curr.sampleDesc}</p>
            <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[11px]">
              <strong className="text-cyan-400">Хэмжилтийн зорилго:</strong> {curr.objective}
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-slate-300 block mb-2">
              Таны санал болгох арга ба горим:
            </span>
            <div className="space-y-2">
              {curr.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedMethod(opt.id)}
                  className={`w-full py-2 px-3 text-xs rounded-lg border text-left font-medium transition-colors ${
                    selectedMethod === opt.id
                      ? 'bg-cyan-600/30 text-cyan-200 border-cyan-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
              Багшийн үнэлгээ & Тайлбар
            </span>

            {!revealed ? (
              <div className="py-6 text-center">
                <p className="text-xs text-slate-400 mb-3">
                  {selectedMethod
                    ? 'Сонголтоо баталгаажуулж тайлбарыг үзэх үү?'
                    : 'Эхлээд зүүн талаас өөрийн сонголтоо хийнэ үү.'}
                </p>
                <button
                  disabled={!selectedMethod}
                  onClick={() => setRevealed(true)}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white shadow"
                >
                  Шалгах & Тайлбарыг нээх
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {(() => {
                  const chosen = curr.options.find((o) => o.id === selectedMethod);
                  return (
                    <div
                      className={`p-3 rounded-lg border text-xs ${
                        chosen?.correct
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                          : 'bg-rose-950/40 border-rose-800 text-rose-300'
                      }`}
                    >
                      <strong className="block text-sm mb-1">
                        {chosen?.correct ? '✓ ЗӨВ СОНГОЛТ!' : '✗ БУРУУ СОНГОЛТ!'}
                      </strong>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        {curr.correctExplanation}
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {revealed && (
            <button
              onClick={() => { setRevealed(false); setSelectedMethod(''); }}
              className="mt-3 text-xs text-slate-400 hover:text-slate-200 text-center underline font-mono"
            >
              Дахин турших
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
