import React from 'react';

export const MinimalBeanRouteArt: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`bg-gradient-to-b from-[#FAF6F0] via-[#F6F0E7] to-[#EFE7DC] border border-[#E3DAD1] rounded-sm p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center shadow-xs relative overflow-hidden ${className}`}>
      
      {/* Subtle vintage map coordinates stamp */}
      <div className="absolute top-4 right-5 text-[11px] font-mono text-[#6E5D53]/60 tracking-widest select-none pointer-events-none">
        53°54′N · 27°34′E
      </div>

      {/* Decorative vintage corner frame marks */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C35B34]/40 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C35B34]/40 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#C35B34]/40 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#C35B34]/40 pointer-events-none" />

      <svg
        viewBox="0 0 380 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[580px] drop-shadow-xs"
        aria-label="Схема морского пути кофе: плантации, корабль через океан, Минск"
      >
        <defs>
          {/* Paper gradient & nautical glow */}
          <radialGradient id="compassGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C35B34" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C35B34" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ================= 0. ВИНТАЖНАЯ КАРТОГРАФИЧЕСКАЯ СЕТКА ================= */}
        {/* Subtle latitude parallels */}
        <g stroke="#D8CEC4" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6">
          <line x1="20" y1="90" x2="360" y2="90" />
          <line x1="20" y1="230" x2="360" y2="230" />
          <line x1="20" y1="370" x2="370" y2="370" />
          {/* Longitude meridian arc */}
          <path d="M 190 20 Q 220 240 190 460" />
        </g>
        <text x="24" y="86" fill="#8C7A70" fontSize="8" fontFamily="monospace" opacity="0.7">50° N</text>
        <text x="24" y="226" fill="#8C7A70" fontSize="8" fontFamily="monospace" opacity="0.7">20° N</text>
        <text x="24" y="366" fill="#8C7A70" fontSize="8" fontFamily="monospace" opacity="0.7">0° EQUATOR</text>

        {/* Vintage Compass Rose (Windrose) in top-left */}
        <g transform="translate(60, 60)" opacity="0.85">
          <circle cx="0" cy="0" r="22" stroke="#D8CEC4" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="0" cy="0" r="22" fill="url(#compassGlow)" />
          {/* North needle */}
          <polygon points="0,-22 4,-5 0,0" fill="#C35B34" />
          <polygon points="0,-22 -4,-5 0,0" fill="#3D2E26" />
          {/* South needle */}
          <polygon points="0,22 4,5 0,0" fill="#8C7A70" />
          <polygon points="0,22 -4,5 0,0" fill="#D8CEC4" />
          {/* East needle */}
          <polygon points="22,0 5,4 0,0" fill="#8C7A70" />
          <polygon points="22,0 5,-4 0,0" fill="#D8CEC4" />
          {/* West needle */}
          <polygon points="-22,0 -5,4 0,0" fill="#8C7A70" />
          <polygon points="-22,0 -5,-4 0,0" fill="#D8CEC4" />
          <circle cx="0" cy="0" r="2" fill="#FAF7F2" stroke="#261C18" strokeWidth="1" />
          <text x="0" y="-25" textAnchor="middle" fill="#C35B34" fontSize="9" fontFamily="monospace" fontWeight="bold">N</text>
        </g>

        {/* ================= 1. ВЕРХ: МАТЕРИК И МИНСК ================= */}
        <g id="minsk-destination">
          {/* Mainland coastline contours */}
          <path
            d="M 130 35 Q 210 15 310 40 Q 360 70 330 120 Q 280 145 200 130 Q 140 115 130 35 Z"
            fill="#EFE8DE"
            stroke="#3D2E26"
            strokeWidth="2"
          />
          {/* Internal relief topography */}
          <path
            d="M 160 50 Q 220 32 290 55 Q 315 80 295 110"
            stroke="#D8CEC4"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Minsk Pin with delicate glowing pulses */}
          <circle cx="235" cy="80" r="20" fill="#C35B34" fillOpacity="0.12" />
          <circle cx="235" cy="80" r="10" fill="#C35B34" fillOpacity="0.25" />
          <circle cx="235" cy="80" r="6" fill="#C35B34" stroke="#261C18" strokeWidth="1.5" />
          <circle cx="235" cy="80" r="2" fill="#FAF7F2" />

          {/* Steaming Ceramic Cup on Roastery Roof */}
          <g transform="translate(260, 68)">
            <path d="M 0 6 L 3 19 C 3.5 21 5.5 22 8 22 H 16 C 18.5 22 20.5 21 21 19 L 24 6 Z" fill="#FAF7F2" stroke="#261C18" strokeWidth="1.5" />
            <path d="M 23 9 C 28 10 28 17 22 18" stroke="#261C18" strokeWidth="1.5" fill="none" />
            {/* Swirling coffee steam */}
            <path d="M 8 3 Q 10 -2 8 -6" stroke="#C35B34" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M 15 3 Q 17 -3 15 -7" stroke="#6E5D53" strokeWidth="1.4" strokeLinecap="round" />
          </g>

          {/* Minsk title */}
          <text x="235" y="112" textAnchor="middle" fill="#261C18" fontSize="13" fontFamily="serif" fontWeight="bold" letterSpacing="0.5">
            Минск
          </text>
          <text x="235" y="125" textAnchor="middle" fill="#6E5D53" fontSize="9" fontFamily="monospace">
            ул. Короля, 9
          </text>
        </g>

        {/* ================= 2. МОРСКОЙ ПУТЬ (НАВИГАЦИОННАЯ ЛИНИЯ) ================= */}
        {/* S-shaped maritime passage across ocean */}
        <path
          d="M 125 385 C 95 320 85 260 160 235 C 240 210 255 145 235 94"
          stroke="#C35B34"
          strokeWidth="2.2"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* Navigation direction arrows along route */}
        <polygon points="113,310 108,298 119,304" fill="#C35B34" />
        <polygon points="228,155 235,144 238,157" fill="#C35B34" />

        {/* Decorative Ocean Waves & Depth Lines */}
        <g stroke="#6E5D53" strokeWidth="1.2" strokeLinecap="round" opacity="0.45">
          <path d="M 35 170 Q 50 164 65 170 T 95 170" />
          <path d="M 250 270 Q 265 264 280 270 T 310 270" />
          <path d="M 50 260 Q 65 254 80 260 T 110 260" />
          <path d="M 230 330 Q 245 324 260 330 T 290 330" />
          <path d="M 70 340 Q 85 334 100 340" />
        </g>

        {/* Flying Sea Gulls over ocean */}
        <g stroke="#3D2E26" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.65">
          <path d="M 280 185 Q 284 180 288 185 Q 292 180 296 185" />
          <path d="M 292 195 Q 295 191 298 195 Q 301 191 304 195" />
          <path d="M 65 220 Q 68 216 71 220 Q 74 216 77 220" />
        </g>

        {/* ================= 3. ЦЕНТР: КОРАБЛИК ================= */}
        <g transform="translate(145, 215)">
          {/* Ship Wake / Foam ripples behind ship */}
          <path d="M -30 24 Q -16 27 -2 24" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -26 28 Q -12 31 0 28" stroke="#D8CEC4" strokeWidth="1.5" strokeLinecap="round" />

          {/* Waves directly under hull */}
          <path d="M -20 23 Q -6 16 9 22 Q 24 28 42 21 Q 54 16 68 22" stroke="#3D2E26" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M -8 29 Q 7 24 24 28 Q 40 32 54 27" stroke="#6E5D53" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

          {/* Cargo Ship Hull */}
          <path
            d="M -12 10 L -1 22 H 44 L 57 10 Z"
            fill="#3D2E26"
            stroke="#261C18"
            strokeWidth="1.8"
          />
          {/* Hull water line accent */}
          <line x1="-6" y1="16" x2="51" y2="16" stroke="#FAF7F2" strokeWidth="1.2" />

          {/* Ship Bridge / Cabin */}
          <rect x="27" y="-3" width="18" height="14" fill="#FAF7F2" stroke="#3D2E26" strokeWidth="1.5" />
          <rect x="31" y="1" width="4" height="4" fill="#C35B34" />
          <rect x="38" y="1" width="3" height="4" fill="#3D2E26" />

          {/* Smokestack / Chimney */}
          <rect x="36" y="-12" width="6" height="10" fill="#C35B34" stroke="#261C18" strokeWidth="1.2" />
          {/* Plumes of steam floating from smokestack */}
          <circle cx="39" cy="-18" r="3" fill="#FAF7F2" stroke="#6E5D53" strokeWidth="0.8" />
          <circle cx="43" cy="-25" r="4" fill="#FAF7F2" stroke="#6E5D53" strokeWidth="0.8" />
          <circle cx="48" cy="-33" r="5" fill="#FAF7F2" stroke="#6E5D53" strokeWidth="0.8" />

          {/* Jute coffee sacks & cargo containers */}
          <rect x="3" y="2" width="11" height="9" rx="1.5" fill="#C35B34" stroke="#261C18" strokeWidth="1.2" />
          <rect x="15" y="2" width="11" height="9" rx="1.5" fill="#8B5A2B" stroke="#261C18" strokeWidth="1.2" />
          <rect x="9" y="-6" width="10" height="8" rx="1.5" fill="#FAF7F2" stroke="#261C18" strokeWidth="1.2" />
          {/* Grain stamp on sack */}
          <line x1="12" y1="-3" x2="16" y2="-1" stroke="#C35B34" strokeWidth="1" />
        </g>

        {/* ================= 4. НИЗ: МАТЕРИК И ПЛАНТАЦИИ ================= */}
        <g id="plantation-origin">
          {/* High-altitude tropical landmass outline */}
          <path
            d="M 30 410 Q 60 355 125 370 Q 180 380 215 425 Q 190 465 95 465 Q 40 455 30 410 Z"
            fill="#EFE8DE"
            stroke="#3D2E26"
            strokeWidth="2"
          />
          {/* Topo lines */}
          <path
            d="M 55 415 Q 95 375 160 395"
            stroke="#D8CEC4"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Mountain Peaks (Volcanic coffee terroirs) */}
          <polygon points="50,425 80,370 110,425" fill="#D9CFC3" stroke="#3D2E26" strokeWidth="1.5" />
          <polygon points="90,425 120,380 150,425" fill="#E4DDD3" stroke="#3D2E26" strokeWidth="1.5" />
          {/* Mountain shadow facets */}
          <polygon points="80,370 110,425 80,425" fill="#C4B9AD" opacity="0.6" />

          {/* Tropical Sun rising over terroirs */}
          <circle cx="160" cy="360" r="12" fill="#FAF7F2" stroke="#C35B34" strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Botanical Coffee Tree with Ripe Red Cherries */}
          <path d="M 72,425 V 400" stroke="#3D2E26" strokeWidth="2.2" />
          <circle cx="72" cy="396" r="8" fill="#4A5843" stroke="#261C18" strokeWidth="1.2" />
          <circle cx="70" cy="395" r="2" fill="#C35B34" />
          <circle cx="75" cy="397" r="2" fill="#C35B34" />
          <circle cx="72" cy="392" r="1.8" fill="#C35B34" />

          {/* Small coffee bean sprig */}
          <g transform="translate(170, 415)" stroke="#3D2E26" strokeWidth="1.2">
            <ellipse cx="6" cy="4" rx="4" ry="2.5" transform="rotate(-30 6 4)" fill="#C35B34" />
            <line x1="4" y1="2" x2="8" y2="6" stroke="#FAF7F2" strokeWidth="0.8" />
          </g>

          {/* Origin title */}
          <text x="110" y="445" textAnchor="middle" fill="#261C18" fontSize="13" fontFamily="serif" fontWeight="bold" letterSpacing="0.5">
            Плантации
          </text>
        </g>
      </svg>

    </div>
  );
};
