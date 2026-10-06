import { SlideData } from '../types/slide';

function getSlideSVG(slideNumber: number): string {
  switch (slideNumber) {
    case 1:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <line x1="20" y1="180" x2="380" y2="180" stroke="#334155" stroke-width="2" />
        ${Array.from({ length: 14 }).map((_, i) => `<circle cx="${45 + i * 24}" cy="180" r="9" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />`).join('')}
        <polygon points="200,162 170,40 230,40" fill="#38bdf8" stroke="#0284c7" stroke-width="2" />
        <circle cx="200" cy="162" r="3.5" fill="#f59e0b" stroke="#ffffff" stroke-width="1" />
        <path d="M 185 168 Q 200 174, 215 168" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,2" />
        <text x="215" y="60" fill="#94a3b8" font-size="11" font-family="monospace">Шовх үзүүр (Tip apex)</text>
        <text x="220" y="155" fill="#f59e0b" font-size="10" font-family="monospace">Локал харилцан үйлчлэл</text>
        <text x="35" y="210" fill="#64748b" font-size="10" font-family="monospace">Атомын торон гадарга (Atomic Lattice)</text>
      </svg>`;

    case 2:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <rect x="15" y="15" width="175" height="190" fill="#0f172a" rx="8" stroke="#334155" />
        <text x="25" y="35" fill="#94a3b8" font-size="11" font-weight="bold" font-family="monospace">Оптик микроскоп</text>
        <path d="M 40 50 L 102 120 L 164 50" fill="none" stroke="#ef4444" stroke-width="1.5" />
        <circle cx="102" cy="130" r="30" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,2" />
        <circle cx="95" cy="130" r="3" fill="#ffffff" />
        <circle cx="109" cy="130" r="3" fill="#ffffff" />
        <text x="25" y="180" fill="#f87171" font-size="10" font-family="monospace">d ≈ λ / (2 NA) ≈ 250 nm</text>
        <rect x="210" y="15" width="175" height="190" fill="#0f172a" rx="8" stroke="#0284c7" />
        <text x="220" y="35" fill="#38bdf8" font-size="11" font-weight="bold" font-family="monospace">SPM Локал проб</text>
        <polygon points="298,125 285,60 311,60" fill="#38bdf8" fill-opacity="0.6" stroke="#38bdf8" />
        <circle cx="270" cy="140" r="6" fill="#10b981" />
        <circle cx="325" cy="140" r="6" fill="#10b981" />
        <line x1="225" y1="146" x2="370" y2="146" stroke="#475569" stroke-width="1.5" />
        <text x="220" y="180" fill="#34d399" font-size="10" font-family="monospace">Δx &lt; 0.1 nm (Атомар ялгалт)</text>
      </svg>`;

    case 3:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <rect x="130" y="15" width="140" height="35" fill="#0369a1" rx="6" stroke="#38bdf8" />
        <text x="200" y="37" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">SPM Гэр бүлийн ангилал</text>
        <path d="M 200 50 L 200 70 L 100 70 L 100 95" fill="none" stroke="#64748b" stroke-width="2" />
        <path d="M 200 70 L 300 70 L 300 95" fill="none" stroke="#64748b" stroke-width="2" />
        <rect x="25" y="95" width="150" height="105" fill="#0f172a" rx="8" stroke="#f59e0b" stroke-width="1.5" />
        <text x="100" y="118" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">STM (Туннелийн)</text>
        <text x="35" y="140" fill="#94a3b8" font-size="9" font-family="monospace">• Дохио: Туннелийн гүйдэл</text>
        <text x="35" y="158" fill="#94a3b8" font-size="9" font-family="monospace">• Дээж: Дамжуулагч</text>
        <rect x="225" y="95" width="150" height="105" fill="#0f172a" rx="8" stroke="#10b981" stroke-width="1.5" />
        <text x="300" y="118" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">AFM (Атом хүчний)</text>
        <text x="235" y="140" fill="#94a3b8" font-size="9" font-family="monospace">• Дохио: Кантилевер хүч F</text>
        <text x="235" y="158" fill="#94a3b8" font-size="9" font-family="monospace">• Дээж: Бүх төрлийн дээж</text>
      </svg>`;

    case 4:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <text x="200" y="25" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">SPM Хаалттай эргэх холбоо</text>
        <rect x="20" y="55" width="105" height="45" fill="#1e293b" rx="6" stroke="#f59e0b" />
        <text x="72" y="75" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Харилцан үйлчлэл</text>
        <line x1="125" y1="77" x2="155" y2="77" stroke="#64748b" stroke-width="2" />
        <rect x="155" y="55" width="95" height="45" fill="#1e293b" rx="6" stroke="#38bdf8" />
        <text x="202" y="75" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Детектор</text>
        <line x1="250" y1="77" x2="280" y2="77" stroke="#64748b" stroke-width="2" />
        <rect x="280" y="55" width="105" height="45" fill="#1e293b" rx="6" stroke="#10b981" />
        <text x="332" y="75" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">PI Хянагч</text>
        <path d="M 332 100 L 332 145 L 255 145" fill="none" stroke="#64748b" stroke-width="2" />
        <rect x="150" y="125" width="105" height="45" fill="#1e293b" rx="6" stroke="#a855f7" />
        <text x="202" y="152" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle">Z-Пьезо сканер</text>
      </svg>`;

    case 6:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <text x="200" y="25" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">I ∝ exp(-2κz) Экспоненциал уналт</text>
        <line x1="40" y1="180" x2="360" y2="180" stroke="#475569" stroke-width="1.5" />
        <line x1="40" y1="40" x2="40" y2="180" stroke="#475569" stroke-width="1.5" />
        <path d="M 45 45 Q 80 55, 120 120 T 350 178" fill="none" stroke="#06b6d4" stroke-width="3" />
        <circle cx="120" cy="120" r="5" fill="#f59e0b" />
        <text x="135" y="115" fill="#fbbf24" font-size="10" font-family="monospace">Δz = 0.1 nm → I 10 дахин буурна</text>
        <text x="200" y="200" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="monospace">Үзүүр-дээжийн зай z (nm)</text>
      </svg>`;

    case 10:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <text x="200" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">HOPG Бодит өгөгдөл: a = 0.246 nm</text>
        <rect x="30" y="35" width="340" height="110" fill="#0f172a" rx="6" stroke="#334155" />
        ${Array.from({ length: 6 }).map((_, r) => Array.from({ length: 12 }).map((_, c) => {
          const isBeta = (r + c) % 2 === 0;
          return `<circle cx="${50 + c * 26 + (r % 2) * 13}" cy="${48 + r * 16}" r="${isBeta ? 7 : 3}" fill="${isBeta ? '#f59e0b' : '#334155'}" />`;
        }).join('')).join('')}
        <path d="M 40 185 Q 65 160, 90 185 T 140 185 T 190 185 T 240 185 T 290 185 T 340 185" fill="none" stroke="#10b981" stroke-width="2" />
        <text x="200" y="210" fill="#34d399" font-size="10" text-anchor="middle" font-family="monospace">Зүсэлтийн шугам (Line profile): Зөвхөн β атомууд тод харагдана</text>
      </svg>`;

    case 13:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <text x="200" y="25" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">Кантилевер хүч хувиргагч: F = kδ</text>
        <line x1="40" y1="100" x2="60" y2="100" stroke="#94a3b8" stroke-width="6" />
        <polygon points="60,95 240,110 240,120 60,105" fill="#64748b" stroke="#94a3b8" />
        <polygon points="230,120 245,120 238,140" fill="#f59e0b" />
        <line x1="280" y1="95" x2="280" y2="120" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2" />
        <text x="290" y="112" fill="#f87171" font-size="11" font-family="monospace">δ (Хазайлт)</text>
        <line x1="160" y1="160" x2="320" y2="160" stroke="#475569" stroke-width="3" />
        <text x="200" y="195" fill="#38bdf8" font-size="10" text-anchor="middle" font-family="monospace">F = k · δ (δ ≠ пьезогийн z шилжилт)</text>
      </svg>`;

    case 19:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <text x="200" y="22" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">Үзүүрийн конволюци: W_app ≈ 4√(R · r)</text>
        <line x1="20" y1="170" x2="380" y2="170" stroke="#475569" stroke-width="2" />
        <circle cx="200" cy="145" r="25" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5" />
        <path d="M 120 170 Q 160 120, 200 120 Q 240 120, 280 170 Z" fill="#f43f5e" fill-opacity="0.25" stroke="#f43f5e" stroke-width="2" />
        <text x="200" y="105" fill="#fb7185" font-size="10" text-anchor="middle" font-family="monospace">Харагдах өргөн тэлэгдэнэ (W_app &gt; W_real)</text>
        <text x="200" y="200" fill="#34d399" font-size="10" text-anchor="middle" font-family="monospace">Өндөр H_app ≈ H_real (Зөв хадгалагдана)</text>
      </svg>`;

    case 22:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <text x="200" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">AFM Хүч-зайн муруй (S-01 MIT 3.052)</text>
        <line x1="30" y1="110" x2="370" y2="110" stroke="#475569" stroke-width="1" stroke-dasharray="3,3" />
        <text x="40" y="105" fill="#64748b" font-size="9" font-family="monospace">F = 0</text>
        <path d="M 360 110 L 220 110 L 220 130 L 120 40" fill="none" stroke="#38bdf8" stroke-width="2" />
        <path d="M 120 40 L 220 130 L 250 175 L 250 110 L 360 110" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,2" />
        <text x="260" y="180" fill="#fda4af" font-size="10" font-family="monospace">F_adhesion (Pull-off)</text>
        <text x="230" y="125" fill="#fbbf24" font-size="9" font-family="monospace">Snap-in</text>
      </svg>`;

    case 25:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <text x="200" y="25" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">NIST SRM 3461 Хэмжилзүйн Кейс</text>
        <rect x="40" y="55" width="95" height="110" fill="#0f172a" rx="6" stroke="#f43f5e" />
        <text x="87" y="80" fill="#fb7185" font-size="10" font-weight="bold" text-anchor="middle">Нэрлэсэн k</text>
        <text x="87" y="110" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">±100%</text>
        <rect x="152" y="55" width="95" height="110" fill="#0f172a" rx="6" stroke="#f59e0b" />
        <text x="200" y="80" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Дулааны арга</text>
        <text x="200" y="110" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">±15%</text>
        <rect x="265" y="55" width="95" height="110" fill="#0f172a" rx="6" stroke="#10b981" />
        <text x="312" y="80" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">NIST SRM 3461</text>
        <text x="312" y="110" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">±1.5%</text>
        <text x="200" y="195" fill="#38bdf8" font-size="10" text-anchor="middle" font-family="monospace">SI-Traceable Reference Cantilever</text>
      </svg>`;

    default:
      return `<svg viewBox="0 0 400 220" style="width:100%;height:100%;background:#020617;border-radius:8px;padding:12px;box-sizing:border-box;">
        <rect x="20" y="20" width="360" height="180" fill="#0f172a" rx="8" stroke="#334155" />
        <circle cx="200" cy="100" r="40" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1.5" />
        <polygon points="200,90 190,40 210,40" fill="#38bdf8" />
        <line x1="120" y1="150" x2="280" y2="150" stroke="#64748b" stroke-width="2" />
        <text x="200" y="180" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="monospace">NANO604 SPM Шинжлэх ухааны диаграмм (Slide ${slideNumber})</text>
      </svg>`;
  }
}

export function buildPrintableHTML(slides: SlideData[], includeNotes: boolean): string {
  const slidesHTML = slides.map((slide) => {
    const bulletsList = slide.bullets.map(b => `<li style="margin-bottom:6px;line-height:1.5;color:#334155;">${escapeHTML(b)}</li>`).join('');
    
    let equationHTML = '';
    if (slide.equation) {
      equationHTML = `
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:10px;margin-top:8px;">
          <div style="font-family:monospace;font-weight:bold;color:#0f172a;font-size:12px;">${escapeHTML(slide.equation.formula)}</div>
          <div style="font-size:11px;font-style:italic;color:#475569;margin-top:4px;">${escapeHTML(slide.equation.physicalMeaning)}</div>
        </div>
      `;
    }

    let notesHTML = '';
    if (includeNotes) {
      notesHTML = `
        <div style="margin-top:6px;padding:8px;background:#fffbeb;border:1px solid #fef3c7;border-radius:6px;font-size:9px;color:#0f172a;flex-shrink:0;">
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #fde68a;padding-bottom:3px;margin-bottom:4px;">
            <strong style="font-family:monospace;color:#92400e;text-transform:uppercase;font-size:9.5px;">[Багшийн заавар, тэмдэглэл / Instructor Notes & Guidance — Слайд ${slide.slideNumber.toString().padStart(2, '0')}]</strong>
            <span style="font-family:monospace;color:#b45309;font-size:8.5px;">LLO: ${slide.targetLLO} · ${escapeHTML(slide.category)}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;line-height:1.35;">
            <div>
              <div style="margin-bottom:3px;"><strong style="color:#78350f;font-family:monospace;font-size:8.5px;display:block;">1. TEACHING_INTENT:</strong>${escapeHTML(slide.notes.teachingIntent)}</div>
              <div style="margin-bottom:3px;"><strong style="color:#78350f;font-family:monospace;font-size:8.5px;display:block;">2. WHAT_TO_EXPLAIN:</strong>${escapeHTML(slide.notes.whatToExplain)}</div>
              <div><strong style="color:#78350f;font-family:monospace;font-size:8.5px;display:block;">3. PHYSICAL_INTERPRETATION:</strong>${escapeHTML(slide.notes.physicalInterpretation)}</div>
            </div>
            <div>
              <div style="margin-bottom:3px;"><strong style="color:#78350f;font-family:monospace;font-size:8.5px;display:block;">4. COMMON_MISCONCEPTION:</strong>${escapeHTML(slide.notes.commonMisconception)}</div>
              <div style="margin-bottom:3px;"><strong style="color:#78350f;font-family:monospace;font-size:8.5px;display:block;">5. EXPECTED_STUDENT_RESPONSE:</strong>${escapeHTML(slide.notes.expectedStudentResponse)}</div>
              <div><strong style="color:#78350f;font-family:monospace;font-size:8.5px;display:block;">6. ARTIFACT_WARNING:</strong>${escapeHTML(slide.notes.artifactWarning)}</div>
            </div>
            <div>
              <div style="margin-bottom:3px;"><strong style="color:#78350f;font-family:monospace;font-size:8.5px;display:block;">7. SOURCE_TRACE:</strong>${escapeHTML(slide.notes.sourceTrace)}</div>
              <div style="margin-bottom:3px;"><strong style="color:#78350f;font-family:monospace;font-size:8.5px;display:block;">8. FIGURE_PROVENANCE:</strong>${escapeHTML(slide.notes.figureProvenance)}</div>
              <div><strong style="color:#78350f;font-family:monospace;font-size:8.5px;display:block;">9. TRANSITION:</strong>${escapeHTML(slide.notes.transition)}</div>
            </div>
          </div>
        </div>
      `;
    }

    const svgVisual = getSlideSVG(slide.slideNumber);

    return `
      <section class="slide-card" id="slide-${slide.slideNumber}">
        <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:6px;flex-shrink:0;">
          <div>
            <span style="font-family:monospace;font-weight:bold;background:#f1f5f9;padding:2px 8px;border-radius:4px;font-size:11px;color:#1e293b;">
              Слайд ${slide.slideNumber.toString().padStart(2, '0')} / 30
            </span>
            <span style="font-family:monospace;font-weight:bold;color:#0369a1;background:#f0f9ff;border:1px solid #bae6fd;padding:2px 6px;border-radius:4px;font-size:11px;margin-left:6px;">
              ${slide.targetLLO}
            </span>
            <span style="font-family:monospace;color:#64748b;font-size:11px;margin-left:6px;">
              ${escapeHTML(slide.category)}
            </span>
          </div>
          <div style="font-family:monospace;font-size:10px;color:#94a3b8;">
            ${escapeHTML(slide.sourceSupport)}
          </div>
        </div>

        <div style="flex-shrink:0;">
          <h2 style="font-size:${includeNotes ? '15px' : '17px'};font-weight:bold;color:#0f172a;margin:2px 0;line-height:1.2;">
            ${escapeHTML(slide.title)}
          </h2>
          ${slide.subtitle ? `<div style="font-size:${includeNotes ? '10.5px' : '12px'};font-weight:500;color:#64748b;margin-bottom:4px;">${escapeHTML(slide.subtitle)}</div>` : ''}
        </div>

        <div style="display:grid;grid-template-columns:1.2fr 0.8fr;gap:12px;align-items:start;flex:1;margin:4px 0;">
          <div>
            <ul style="margin:0;padding-left:18px;font-size:${includeNotes ? '10.5px' : '12px'};line-height:${includeNotes ? '1.35' : '1.45'};color:#334155;">
              ${bulletsList}
            </ul>
            ${equationHTML}
            <div style="background:#f0f9ff;border:1px solid #e0f2fe;border-radius:6px;padding:6px;margin-top:6px;font-size:${includeNotes ? '10px' : '11px'};color:#0369a1;">
              <strong>Гол мессеж:</strong> ${escapeHTML(slide.keyMessage)}
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:center;max-height:${includeNotes ? '150px' : '220px'};overflow:hidden;border-radius:8px;">
            ${svgVisual}
          </div>
        </div>

        <div style="border-top:1px solid #f1f5f9;padding-top:4px;font-family:monospace;font-size:9.5px;color:#94a3b8;display:flex;justify-content:space-between;flex-shrink:0;">
          <span>Эх сурвалж: ${escapeHTML(slide.sourceSupport)}</span>
          <span>Зургийн эх: ${escapeHTML(slide.figureProvenance)}</span>
        </div>

        ${notesHTML}
      </section>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NANO604: Сканнинг проб микроскопи (SPM) — Master Lecture Handout</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 8mm;
    }
    * {
      box-sizing: border-box;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .print-toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #334155;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .print-btn {
      background: #0284c7;
      color: #ffffff;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: bold;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s;
    }
    .print-btn:hover {
      background: #0369a1;
    }
    .close-btn {
      background: #334155;
      color: #e2e8f0;
      border: none;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
    }
    .close-btn:hover {
      background: #475569;
    }
    .handout-container {
      max-width: 100%;
      margin: 0 auto;
      padding: 0;
    }
    .slide-card {
      width: 100%;
      height: 190mm;
      max-height: 190mm;
      min-height: 190mm;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 5mm 7mm;
      margin: 0 0 16px 0;
      break-before: page !important;
      page-break-before: always !important;
      break-after: page !important;
      page-break-after: always !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .slide-card:first-child {
      break-before: auto !important;
      page-break-before: auto !important;
    }
    .slide-card:last-child {
      break-after: auto !important;
      page-break-after: auto !important;
      margin-bottom: 0;
    }
    @media print {
      .print-toolbar,
      .no-print {
        display: none !important;
      }
      .handout-container {
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .slide-card {
        margin: 0 !important;
        border: 1px solid #cbd5e1 !important;
      }
    }
  </style>
</head>
<body>
  <div class="print-toolbar no-print">
    <div>
      <span style="font-family:monospace;font-size:11px;color:#38bdf8;text-transform:uppercase;letter-spacing:1px;display:block;">
        NANO604 SPM Master Lecture (Print View)
      </span>
      <h3 style="margin:0;font-size:14px;font-weight:bold;">
        Нийт 30 слайд бүрэн гарын авлага ${includeNotes ? '(Багшийн тэмдэглэлтэй)' : '(Оюутны хувилбар)'}
      </h3>
    </div>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" class="print-btn" onclick="window.focus(); window.print();">
        <span>🖨️</span>
        <span>Хэвлэх / Save as PDF (Ctrl+P)</span>
      </button>
      <button type="button" class="close-btn" onclick="window.close();">
        Цонх хаах
      </button>
    </div>
  </div>

  <div class="handout-container">
    <div class="no-print" style="border-bottom:2px solid #0f172a;padding-bottom:12px;margin-bottom:20px;text-align:center;">
      <span style="font-family:monospace;font-size:11px;letter-spacing:1.5px;color:#64748b;text-transform:uppercase;">
        NANO604 — АХИСАН ТҮВШНИЙ НАНОТЕХНОЛОГИ (ADVANCED NANOTECHNOLOGY)
      </span>
      <h1 style="font-size:24px;font-weight:800;color:#0f172a;margin:6px 0 2px 0;">
        Сканнинг проб микроскопи (SPM)
      </h1>
      <p style="font-size:13px;color:#475569;margin:0;font-weight:500;">
        STM ба AFM-ийн хэмжилтийн физик, өгөгдөл тайлбарлалт, туршилтын дизайн
      </p>
      <div style="font-family:monospace;font-size:11px;color:#64748b;margin-top:6px;">
        Түвшин: Магистр / Доктор · Нийт 30 слайд · QA-A Pass Master
      </div>
    </div>

    ${slidesHTML}
  </div>

  <script>
    window.addEventListener('DOMContentLoaded', async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
      } catch (e) {}

      // Automatically trigger print dialog once document is ready
      setTimeout(() => {
        try {
          window.focus();
          window.print();
        } catch (err) {
          console.warn('Auto print trigger notice:', err);
        }
      }, 350);
    });
  </script>
</body>
</html>`;
}

function escapeHTML(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
