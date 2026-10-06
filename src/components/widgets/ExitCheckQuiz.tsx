import React, { useState } from 'react';

export const ExitCheckQuiz: React.FC = () => {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      q: '1. STM-ийн тогтмол гүйдлийн горимоор авсан өндрийн дүрслэл (z-signal) яагаад цэвэр геометрийн гадаргатай дангаараа шууд давхцдаггүй вэ?',
      a: 'Учир нь туннелийн гүйдэл I(V,z) нь зөвхөн үзүүр-дээжийн z зайнаас бус, тухайн bias хүчдэл дэх дээжийн Орон нутгийн электрон төлөвийн нягтаас (LDOS) шууд хамаардаг. Тогтмол гүйдлийн горимд Z-пьезо нь z = const байрлалыг биш, харин гүйдэл тогтмол байх изо-гүйдлийн гадаргууг (iso-current contour) мөрддөг. Тиймээс цахим болон геометрийн хувь нэмэр холилдож бүртгэгдэнэ.'
    },
    {
      id: 2,
      q: '2. AFM-ээр нано бөөм болон ДНХ утаслагийн хэмжээг тодорхойлоход яагаад хөндлөн өргөн нь үзүүрийн геометрээр заавал өргөсөж хязгаарлагддаг вэ?',
      a: 'Үзүүрийн орой хязгааргүй шовх биш, муруйлтын радиус R_tip бүхий бөмбөрцөг хэлбэртэй байдаг. Үзүүрийн хажуугийн бөөр бөөмийн оройд төвөөс нь хол зайд түрүүлж шүргэлцдэг тул дүрсийг Минковскийн нийлбэрээр тэлж W_apparent ≈ 4√(R·r) болгон хөндлөн хэмжээсийг бүдүүрүүлдэг (Tip convolution). Харин босоо өндрийн орой дээр үзүүрийн орой яг таардаг тул өндөр H бодитоор хадгалагддаг.'
    },
    {
      id: 3,
      q: '3. Шинээр ажиглагдсан нано бүтцийг "багажийн хийсвэр дүр биш, бодит физик бүтэц мөн" гэж дүгнэхээс өмнө хийх хамгийн найдвартай нэг валидацийн алхам юу вэ?',
      a: 'Скан хийх өнцгийг 90 градус эргүүлж (Rotate scan angle by 90°) давтан хэмжих. Хэрэв тухайн бүтэц дээжтэй хамт 90° эргэж байвал энэ нь гадаргуугийн бодит бүтэц мөн. Харин тухайн зураас, давхардал дэлгэцийн скан хийх чиглэлд хэвээр үлдвэл энэ нь үзүүрийн согог (давхар үзүүр) эсвэл эргэх холбооны хэлбэлзэл гэдгийг шууд нотолдог.'
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-700/80 shadow-inner">
      <div className="border-b border-slate-800 pb-3 mb-4 flex justify-between items-center">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Лекцийн гаралтын шалгуур (Exit Ticket Check)
          </span>
          <h4 className="text-sm font-semibold text-slate-200">
            3 Цөм асуулт — Өөрийн мэдлэгийг шалгаж хариултыг нээх
          </h4>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
          LLO-1 - LLO-5 SYNTHESIS
        </span>
      </div>

      <div className="space-y-3">
        {questions.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden"
          >
            <button
              onClick={() => setOpenCard(openCard === item.id ? null : item.id)}
              className="w-full p-3.5 text-left flex justify-between items-start gap-3 hover:bg-slate-900/50 transition-colors"
            >
              <span className="text-xs font-semibold text-slate-200 leading-snug">
                {item.q}
              </span>
              <span className="text-xs font-mono text-cyan-400 shrink-0 font-bold">
                {openCard === item.id ? '▲ Хаах' : '▼ Хариуг нээх'}
              </span>
            </button>

            {openCard === item.id && (
              <div className="p-3.5 bg-slate-900/80 border-t border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1.5">
                <span className="text-emerald-400 font-mono font-bold block text-[11px]">
                  ✓ Албан ёсны шинжлэх ухааны хариулт:
                </span>
                <p>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
