import React from 'react';

interface ScientificDiagramProps {
  slideNumber: number;
}

export const ScientificDiagram: React.FC<ScientificDiagramProps> = ({ slideNumber }) => {
  switch (slideNumber) {
    case 1:
      // Slide 1: Clean nanoscale probe & atomic lattice schematic
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          <defs>
            <linearGradient id="probeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <radialGradient id="atomGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Atomic Surface */}
          <line x1="20" y1="180" x2="380" y2="180" stroke="#334155" strokeWidth="2" />
          {Array.from({ length: 15 }).map((_, i) => (
            <g key={i}>
              <circle cx={40 + i * 23} cy="180" r="9" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx={40 + i * 23} cy="180" r="18" fill="url(#atomGlow)" />
            </g>
          ))}
          {/* Probe Tip */}
          <polygon points="200,162 170,40 230,40" fill="url(#probeGrad)" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="200" cy="162" r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
          {/* Tunneling/Force interaction field */}
          <path d="M 185 168 Q 200 174, 215 168" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
          {/* Annotations */}
          <text x="215" y="60" fill="#94a3b8" fontSize="11" fontFamily="monospace">Шовх үзүүр (Tip apex)</text>
          <text x="220" y="155" fill="#f59e0b" fontSize="10" fontFamily="monospace">Локал харилцан үйлчлэл</text>
          <text x="35" y="210" fill="#64748b" fontSize="10" fontFamily="monospace">Атомын торон гадарга (Atomic Lattice)</text>
        </svg>
      );

    case 2:
      // Slide 2: Diffraction limit vs Local probe
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          {/* Left: Far-field optical diffraction */}
          <rect x="15" y="15" width="175" height="190" fill="#0f172a" rx="8" stroke="#334155" />
          <text x="25" y="35" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">Оптик микроскоп</text>
          <path d="M 40 50 L 102 120 L 164 50" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          {/* Airy Disk blur */}
          <circle cx="102" cy="130" r="32" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />
          <circle cx="95" cy="130" r="3" fill="#ffffff" />
          <circle cx="109" cy="130" r="3" fill="#ffffff" />
          <text x="25" y="180" fill="#f87171" fontSize="10" fontFamily="monospace">d ≈ λ / (2 NA) ≈ 250 nm</text>
          <text x="25" y="195" fill="#64748b" fontSize="9">Хоёр нано бөөм сарниж нийлнэ</text>

          {/* Right: Local probe scanning */}
          <rect x="210" y="15" width="175" height="190" fill="#0f172a" rx="8" stroke="#0284c7" />
          <text x="220" y="35" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">SPM Локал проб</text>
          {/* Local probe scanning */}
          <polygon points="298,125 285,60 311,60" fill="#38bdf8" fillOpacity="0.6" stroke="#38bdf8" />
          <circle cx="270" cy="140" r="6" fill="#10b981" />
          <circle cx="325" cy="140" r="6" fill="#10b981" />
          <line x1="225" y1="146" x2="370" y2="146" stroke="#475569" strokeWidth="1.5" />
          <text x="220" y="180" fill="#34d399" fontSize="10" fontFamily="monospace">Δx &lt; 0.1 nm (Атомар ялгалт)</text>
          <text x="220" y="195" fill="#64748b" fontSize="9">Цэг бүрийг тусгайлан мэдэрнэ</text>
        </svg>
      );

    case 3:
      // Slide 3: SPM Family Tree
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          {/* Root SPM */}
          <rect x="130" y="15" width="140" height="35" fill="#0369a1" rx="6" stroke="#38bdf8" />
          <text x="200" y="37" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Сканнинг проб микроскопи (SPM)</text>

          {/* Branches */}
          <path d="M 200 50 L 200 70 L 100 70 L 100 95" fill="none" stroke="#64748b" strokeWidth="2" />
          <path d="M 200 70 L 300 70 L 300 95" fill="none" stroke="#64748b" strokeWidth="2" />

          {/* STM Node */}
          <rect x="25" y="95" width="150" height="105" fill="#0f172a" rx="8" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="100" y="118" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">STM (Туннелийн)</text>
          <text x="35" y="138" fill="#94a3b8" fontSize="9" fontFamily="monospace">• Дохио: Туннелийн гүйдэл (I)</text>
          <text x="35" y="153" fill="#94a3b8" fontSize="9" fontFamily="monospace">• Дээж: Зөвхөн дамжуулагч</text>
          <text x="35" y="168" fill="#94a3b8" fontSize="9" fontFamily="monospace">• Хэмжээс: LDOS + Өндөр</text>
          <text x="35" y="188" fill="#38bdf8" fontSize="9" fontFamily="monospace">Өргөтгөл: STS, Атом удирдлага</text>

          {/* AFM Node */}
          <rect x="225" y="95" width="150" height="105" fill="#0f172a" rx="8" stroke="#10b981" strokeWidth="1.5" />
          <text x="300" y="118" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">AFM (Атом хүчний)</text>
          <text x="235" y="138" fill="#94a3b8" fontSize="9" fontFamily="monospace">• Дохио: Кантилевер хүч (F)</text>
          <text x="235" y="153" fill="#94a3b8" fontSize="9" fontFamily="monospace">• Дээж: Дамжуулагч + Тусгаарлагч</text>
          <text x="235" y="168" fill="#94a3b8" fontSize="9" fontFamily="monospace">• Хэмжээс: 3D Топографи + Хүч</text>
          <text x="235" y="188" fill="#38bdf8" fontSize="9" fontFamily="monospace">Өргөтгөл: MFM, KPFM, Үрэлт</text>
        </svg>
      );

    case 4:
      // Slide 4: Common SPM architecture loop
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          <text x="200" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            Хаалттай эргэх холбооны хэлхээ (Closed Feedback Loop)
          </text>
          {/* 1. Interaction */}
          <rect x="20" y="55" width="105" height="45" fill="#1e293b" rx="6" stroke="#f59e0b" />
          <text x="72" y="75" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">Үзүүр-Дээжийн</text>
          <text x="72" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">Харилцан үйлчлэл</text>

          {/* Arrow */}
          <line x1="125" y1="77" x2="155" y2="77" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* 2. Detector */}
          <rect x="155" y="55" width="95" height="45" fill="#1e293b" rx="6" stroke="#38bdf8" />
          <text x="202" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Детектор</text>
          <text x="202" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">Preamp / Фотодиод</text>

          {/* Arrow */}
          <line x1="250" y1="77" x2="280" y2="77" stroke="#64748b" strokeWidth="2" />

          {/* 3. Controller */}
          <rect x="280" y="55" width="105" height="45" fill="#1e293b" rx="6" stroke="#10b981" />
          <text x="332" y="75" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">PI Хянагч</text>
          <text x="332" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">Алдаа = I - I_set</text>

          {/* Feedback arrow downwards */}
          <path d="M 332 100 L 332 145 L 255 145" fill="none" stroke="#64748b" strokeWidth="2" />

          {/* 4. Piezo Scanner */}
          <rect x="150" y="125" width="105" height="45" fill="#1e293b" rx="6" stroke="#a855f7" />
          <text x="202" y="145" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">Z-Пьезо сканер</text>
          <text x="202" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">Пикометр өндөр засах</text>

          {/* Arrow back to probe */}
          <path d="M 150 145 L 72 145 L 72 100" fill="none" stroke="#64748b" strokeWidth="2" />

          {/* Output block */}
          <rect x="20" y="175" width="360" height="30" fill="#0f172a" rx="4" stroke="#334155" />
          <text x="200" y="195" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">
            Тоон өгөгдөл: X, Y байрлал дахь Z хүчдэл = 3D Топографи дүрс
          </text>
        </svg>
      );

    case 5:
      // Slide 5: STM tunneling junction
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          <text x="200" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            Квант туннелийн залгаас (Tunneling Junction)
          </text>
          {/* Energy Band / Barrier Diagram */}
          <rect x="40" y="50" width="120" height="120" fill="#1e293b" stroke="#38bdf8" rx="4" />
          <text x="100" y="70" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Үзүүр (Tip)</text>
          <line x1="40" y1="120" x2="160" y2="120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
          <text x="100" y="115" fill="#fbbf24" fontSize="9" textAnchor="middle">E_F (Tip)</text>

          {/* Barrier */}
          <rect x="160" y="60" width="80" height="110" fill="#0f172a" stroke="#64748b" strokeDasharray="2,2" />
          <text x="200" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle">Вакуум саад</text>
          <text x="200" y="95" fill="#cbd5e1" fontSize="9" textAnchor="middle">Φ ≈ 4.5 eV</text>
          {/* Tunneling arrow */}
          <path d="M 145 130 C 170 120, 190 145, 235 140" fill="none" stroke="#ef4444" strokeWidth="2.5" />
          <text x="200" y="165" fill="#f87171" fontSize="9" textAnchor="middle">I ∝ exp(-2κz)</text>

          {/* Sample */}
          <rect x="240" y="50" width="120" height="120" fill="#1e293b" stroke="#10b981" rx="4" />
          <text x="300" y="70" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">Дээж (Sample)</text>
          <line x1="240" y1="140" x2="360" y2="140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
          <text x="300" y="135" fill="#fbbf24" fontSize="9" textAnchor="middle">E_F (Sample)</text>

          {/* Bias difference */}
          <line x1="365" y1="120" x2="365" y2="140" stroke="#ef4444" strokeWidth="2" />
          <text x="385" y="133" fill="#f87171" fontSize="9" fontFamily="monospace">eV_bias</text>
        </svg>
      );

    case 7:
      // Slide 7: STM Electronic circuitry
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          <text x="200" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            STM Тогтмол гүйдлийн дохионы хэлхээ
          </text>
          {/* Junction */}
          <rect x="20" y="70" width="80" height="60" fill="#1e293b" rx="6" stroke="#f59e0b" />
          <text x="60" y="95" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">Үзүүр-Дээж</text>
          <text x="60" y="112" fill="#94a3b8" fontSize="9" textAnchor="middle">pA - nA гүйдэл</text>

          {/* Preamp */}
          <polygon points="130,70 190,100 130,130" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <text x="150" y="103" fill="#38bdf8" fontSize="9" fontWeight="bold">10⁸ V/A</text>
          <line x1="100" y1="100" x2="130" y2="100" stroke="#38bdf8" strokeWidth="2" />

          {/* Output of preamp to comparator */}
          <line x1="190" y1="100" x2="225" y2="100" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="235" cy="100" r="10" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="235" y="103" fill="#ffffff" fontSize="10" textAnchor="middle">-</text>

          {/* Setpoint in */}
          <line x1="235" y1="50" x2="235" y2="90" stroke="#10b981" strokeWidth="1.5" />
          <text x="235" y="45" fill="#34d399" fontSize="9" textAnchor="middle" fontFamily="monospace">I_setpoint</text>

          {/* PI controller */}
          <rect x="265" y="80" width="60" height="40" fill="#1e293b" rx="4" stroke="#a855f7" />
          <text x="295" y="104" fill="#c084fc" fontSize="10" textAnchor="middle" fontWeight="bold">PI Хянагч</text>
          <line x1="245" y1="100" x2="265" y2="100" stroke="#cbd5e1" strokeWidth="2" />

          {/* High voltage amp to Z piezo */}
          <line x1="325" y1="100" x2="350" y2="100" stroke="#a855f7" strokeWidth="2" />
          <rect x="350" y="80" width="35" height="40" fill="#0284c7" rx="3" stroke="#38bdf8" />
          <text x="367" y="104" fill="#ffffff" fontSize="9" textAnchor="middle">Z-Piezo</text>

          {/* Feedback return */}
          <path d="M 367 120 L 367 170 L 60 170 L 60 130" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="200" y="185" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
            Z хүчдэлийн хэмжээ нь дээжийн өндрийн өөрчлөлтийг илэрхийлнэ
          </text>
        </svg>
      );

    case 8:
      // Slide 8: Constant current vs constant height modes
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          {/* Left: Constant Current */}
          <rect x="15" y="15" width="175" height="190" fill="#0f172a" rx="8" stroke="#38bdf8" />
          <text x="102" y="35" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Тогтмол гүйдлийн горим</text>
          {/* Surface */}
          <path d="M 25 150 Q 60 120 100 150 T 175 140" fill="none" stroke="#475569" strokeWidth="2" />
          {/* Tip path following contour */}
          <path d="M 25 110 Q 60 80 100 110 T 175 100" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,2" />
          <text x="102" y="60" fill="#94a3b8" fontSize="9" textAnchor="middle">Үзүүр гадаргууг дагаж хөдөлнө</text>
          <text x="102" y="175" fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold">I = const | Бүртгэх: Z(x,y)</text>
          <text x="102" y="190" fill="#64748b" fontSize="8" textAnchor="middle">Аюулгүй, барзгарт тохиромжтой</text>

          {/* Right: Constant Height */}
          <rect x="210" y="15" width="175" height="190" fill="#0f172a" rx="8" stroke="#f59e0b" />
          <text x="298" y="35" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Тогтмол өндрийн горим</text>
          {/* Surface */}
          <path d="M 220 150 Q 255 120 295 150 T 370 140" fill="none" stroke="#475569" strokeWidth="2" />
          {/* Tip path perfectly flat */}
          <line x1="220" y1="95" x2="375" y2="95" stroke="#f59e0b" strokeWidth="2" />
          <text x="298" y="60" fill="#94a3b8" fontSize="9" textAnchor="middle">Үзүүр тогтмол Z хавтгайд сканнердана</text>
          <text x="298" y="175" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="bold">Z = const | Бүртгэх: I(x,y)</text>
          <text x="298" y="190" fill="#64748b" fontSize="8" textAnchor="middle">Асар хурдан, үзүүр мөргөх эрсдэлтэй</text>
        </svg>
      );

    case 14:
      // Slide 14: Laser beam deflection 4-quadrant layout
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          <text x="200" y="22" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            Лазер оптик хөшүүрэг ба 4-Квадрант фотодиод
          </text>
          {/* Cantilever */}
          <polygon points="60,110 180,125 180,135 60,120" fill="#64748b" stroke="#94a3b8" />
          <polygon points="175,135 185,135 180,150" fill="#f59e0b" />
          <line x1="40" y1="110" x2="60" y2="110" stroke="#94a3b8" strokeWidth="4" />
          {/* Laser diode */}
          <rect x="80" y="40" width="30" height="20" fill="#ef4444" rx="2" />
          <text x="95" y="32" fill="#ef4444" fontSize="9" textAnchor="middle">Laser</text>
          {/* Laser beams */}
          <line x1="105" y1="50" x2="178" y2="125" stroke="#ef4444" strokeWidth="1.5" />
          <line x1="178" y1="125" x2="295" y2="70" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />

          {/* 4 Quadrant detector */}
          <g transform="translate(295, 40)">
            <rect x="0" y="0" width="60" height="60" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="30" y1="0" x2="30" y2="60" stroke="#475569" strokeWidth="1" />
            <line x1="0" y1="30" x2="60" y2="30" stroke="#475569" strokeWidth="1" />
            <text x="15" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle">A</text>
            <text x="45" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle">B</text>
            <text x="15" y="50" fill="#94a3b8" fontSize="9" textAnchor="middle">C</text>
            <text x="45" y="50" fill="#94a3b8" fontSize="9" textAnchor="middle">D</text>
            {/* Laser spot */}
            <circle cx="30" cy="30" r="8" fill="#ef4444" fillOpacity="0.7" />
          </g>

          {/* Formulas */}
          <rect x="40" y="165" width="320" height="42" fill="#0f172a" rx="4" stroke="#334155" />
          <text x="200" y="182" fill="#38bdf8" fontSize="10" textAnchor="middle" fontFamily="monospace">
            Босоо хазайлт = [(A + B) - (C + D)] / Нийт гэрэл
          </text>
          <text x="200" y="198" fill="#fbbf24" fontSize="10" textAnchor="middle" fontFamily="monospace">
            Хэвтээ мушгиралт (Үрэлт) = [(A + C) - (B + D)] / Нийт гэрэл
          </text>
        </svg>
      );

    case 16:
      // Slide 16: AFM Contact vs Non-contact vs Tapping
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          {/* Contact */}
          <rect x="15" y="15" width="115" height="190" fill="#0f172a" rx="6" stroke="#f43f5e" />
          <text x="72" y="35" fill="#fb7185" fontSize="10" fontWeight="bold" textAnchor="middle">1. Хүрэлцэх (Contact)</text>
          <line x1="30" y1="120" x2="110" y2="120" stroke="#475569" strokeWidth="2" />
          <polygon points="50,85 100,105 95,120" fill="#64748b" stroke="#f43f5e" />
          <text x="72" y="145" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Статик хазайлт</text>
          <text x="72" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Түлхэх бүс (F &gt; 0)</text>
          <text x="72" y="185" fill="#f87171" fontSize="8" textAnchor="middle" fontWeight="bold">Үрэлт их (Дээж урж болно)</text>

          {/* Non-Contact */}
          <rect x="142" y="15" width="115" height="190" fill="#0f172a" rx="6" stroke="#0284c7" />
          <text x="199" y="35" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">2. Хүрэлцэхгүй</text>
          <line x1="157" y1="120" x2="237" y2="120" stroke="#475569" strokeWidth="2" />
          <polygon points="177,75 227,95 222,110" fill="#64748b" stroke="#38bdf8" />
          <path d="M 222 105 Q 222 112 222 115" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1,1" />
          <text x="199" y="145" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Бага далайц (&lt;1 nm)</text>
          <text x="199" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Татах бүс (F &lt; 0)</text>
          <text x="199" y="185" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">UHV-д өндөр нарийвчлал</text>

          {/* Tapping */}
          <rect x="270" y="15" width="115" height="190" fill="#0f172a" rx="6" stroke="#10b981" />
          <text x="327" y="35" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Товших (Tapping)</text>
          <line x1="285" y1="120" x2="365" y2="120" stroke="#475569" strokeWidth="2" />
          <polygon points="305,65 355,85 350,118" fill="#64748b" stroke="#10b981" />
          {/* Oscillation arrows */}
          <path d="M 360 85 L 360 115" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="327" y="145" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Их далайц (20-100 nm)</text>
          <text x="327" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Үрэлт БАЙХГҮЙ</text>
          <text x="327" y="185" fill="#34d399" fontSize="8" textAnchor="middle" fontWeight="bold">Зөөлөн ба био дээжид шилдэг</text>
        </svg>
      );

    case 20:
      // Slide 20: Other artifacts gallery
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          <text x="200" y="22" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            AFM Нийтлэг хийсвэр дүрүүд (Artifacts)
          </text>
          {/* Artifact 1: Double tip */}
          <rect x="15" y="40" width="115" height="165" fill="#0f172a" rx="6" stroke="#334155" />
          <text x="72" y="60" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">Давхар үзүүр</text>
          <circle cx="55" cy="100" r="10" fill="#38bdf8" />
          <circle cx="85" cy="100" r="10" fill="#38bdf8" fillOpacity="0.5" stroke="#f59e0b" strokeDasharray="2,2" />
          <circle cx="55" cy="140" r="8" fill="#38bdf8" />
          <circle cx="85" cy="140" r="8" fill="#38bdf8" fillOpacity="0.5" stroke="#f59e0b" strokeDasharray="2,2" />
          <text x="72" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">Бүх объект ижил сүүдэртэй</text>

          {/* Artifact 2: Feedback oscillation */}
          <rect x="142" y="40" width="115" height="165" fill="#0f172a" rx="6" stroke="#334155" />
          <text x="199" y="60" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">Өсгөлтийн үелзэл</text>
          <path d="M 152 100 Q 157 85 162 100 T 172 100 T 182 100 T 192 100 T 202 100 T 212 100 T 222 100 T 232 100 T 242 100" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          <path d="M 152 130 Q 157 115 162 130 T 172 130 T 182 130 T 192 130 T 202 130 T 212 130 T 222 130 T 232 130 T 242 130" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          <text x="199" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">Зураг даяар жигд долгион</text>

          {/* Artifact 3: Thermal drift */}
          <rect x="270" y="40" width="115" height="165" fill="#0f172a" rx="6" stroke="#334155" />
          <text x="327" y="60" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">Дулааны дрейф</text>
          {/* Stretched circle into ellipse */}
          <ellipse cx="327" cy="115" rx="25" ry="10" fill="#a855f7" fillOpacity="0.4" stroke="#a855f7" strokeWidth="1.5" />
          <text x="327" y="150" fill="#c084fc" fontSize="8" textAnchor="middle">Дугуй бөөм зууван болно</text>
          <text x="327" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">Температур тэнцвэржүүлэх</text>
        </svg>
      );

    case 24:
      // Slide 24: Metrology Pyramid
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          <text x="200" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            Хэмжилзүйн ялгаа: Resolution vs Precision vs Accuracy
          </text>
          {/* Target 1: High Precision, Low Accuracy */}
          <g transform="translate(60, 90)">
            <circle cx="0" cy="0" r="35" fill="none" stroke="#475569" strokeWidth="1" />
            <circle cx="0" cy="0" r="22" fill="none" stroke="#475569" strokeWidth="1" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            {/* Clustered hits far from center */}
            <circle cx="20" cy="-20" r="2.5" fill="#f59e0b" />
            <circle cx="22" cy="-18" r="2.5" fill="#f59e0b" />
            <circle cx="19" cy="-21" r="2.5" fill="#f59e0b" />
            <text x="0" y="52" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">Өндөр Precision</text>
            <text x="0" y="65" fill="#94a3b8" fontSize="8" textAnchor="middle">Гэвч буруу (Калибровкгүй)</text>
          </g>

          {/* Target 2: High Precision AND High Accuracy (NIST Calibrated) */}
          <g transform="translate(200, 90)">
            <circle cx="0" cy="0" r="35" fill="none" stroke="#475569" strokeWidth="1" />
            <circle cx="0" cy="0" r="22" fill="none" stroke="#475569" strokeWidth="1" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="#10b981" strokeWidth="1.5" />
            {/* Clustered hits right in the center */}
            <circle cx="0" cy="0" r="2.5" fill="#10b981" />
            <circle cx="2" cy="1" r="2.5" fill="#10b981" />
            <circle cx="-1" cy="2" r="2.5" fill="#10b981" />
            <text x="0" y="52" fill="#34d399" fontSize="9" textAnchor="middle" fontWeight="bold">Өндөр Accuracy & Precision</text>
            <text x="0" y="65" fill="#34d399" fontSize="8" textAnchor="middle">NIST Стандартаар тохируулсан</text>
          </g>

          {/* Target 3: Low Precision, Low Accuracy */}
          <g transform="translate(340, 90)">
            <circle cx="0" cy="0" r="35" fill="none" stroke="#475569" strokeWidth="1" />
            <circle cx="0" cy="0" r="22" fill="none" stroke="#475569" strokeWidth="1" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="#475569" strokeWidth="1" />
            <circle cx="-20" cy="15" r="2.5" fill="#94a3b8" />
            <circle cx="15" cy="-22" r="2.5" fill="#94a3b8" />
            <circle cx="25" cy="20" r="2.5" fill="#94a3b8" />
            <text x="0" y="52" fill="#94a3b8" fontSize="9" textAnchor="middle">Сарнисан (Муу дуу чимээ)</text>
            <text x="0" y="65" fill="#64748b" fontSize="8" textAnchor="middle">Тогтворгүй хэмжилт</text>
          </g>
        </svg>
      );

    case 28:
      // Slide 28: 11-step Experimental Design Pipeline
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-2 border border-slate-800">
          <text x="200" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            Нано-туршилтын 11 Алхамт Системчилсэн Дараалал
          </text>
          {/* 11 steps shown as connected circular nodes */}
          {[
            { n: 1, label: 'Зорилго' },
            { n: 2, label: 'Дээж' },
            { n: 3, label: 'Шинж' },
            { n: 4, label: 'Арга' },
            { n: 5, label: 'Горим' },
            { n: 6, label: 'Үзүүр' },
            { n: 7, label: 'Орчин' },
            { n: 8, label: 'Параметр' },
            { n: 9, label: 'Калибровк' },
            { n: 10, label: 'Алдаа' },
            { n: 11, label: 'Валидаци' }
          ].map((item, idx) => {
            const isRow1 = idx < 6;
            const x = isRow1 ? 40 + idx * 60 : 340 - (idx - 6) * 65;
            const y = isRow1 ? 65 : 145;
            return (
              <g key={item.n}>
                <circle cx={x} cy={y} r="18" fill="#1e293b" stroke={idx === 10 ? '#10b981' : '#0284c7'} strokeWidth="2" />
                <text x={x} y={y + 4} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  {item.n}
                </text>
                <text x={x} y={y + 30} fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
                  {item.label}
                </text>
              </g>
            );
          })}
          {/* Arrows connecting rows */}
          <line x1="60" y1="65" x2="320" y2="65" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
          <path d="M 340 85 L 340 125" fill="none" stroke="#334155" strokeWidth="2" />
          <line x1="320" y1="145" x2="80" y2="145" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
        </svg>
      );

    default:
      // Generic high-contrast scientific vector fallback
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full bg-slate-950 rounded-xl p-3 border border-slate-800">
          <rect x="20" y="20" width="360" height="180" fill="#0f172a" rx="8" stroke="#334155" />
          <circle cx="200" cy="100" r="40" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
          <polygon points="200,90 190,40 210,40" fill="#38bdf8" />
          <line x1="120" y1="150" x2="280" y2="150" stroke="#64748b" strokeWidth="2" />
          <text x="200" y="180" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
            NANO604 SPM Шинжлэх ухааны диаграмм
          </text>
        </svg>
      );
  }
};
