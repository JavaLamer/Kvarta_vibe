import React from 'react';

export const CoffeeBeanArt: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-[#C35B34]' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <ellipse cx="12" cy="12" rx="9" ry="7" transform="rotate(-30 12 12)" stroke="currentColor" fill="none" />
    <path d="M7.5 16.5C8.5 13.5 10 11 12 12C14 13 15.5 10.5 16.5 7.5" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

export const RoasterDrumArt: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Иллюстрация барабана обжарочного аппарата Кварта">
    {/* Base plate */}
    <rect x="30" y="220" width="300" height="12" rx="2" fill="#3D2E26" />
    <rect x="50" y="232" width="260" height="6" fill="#261C18" />
    
    {/* Roaster Body / Drum */}
    <rect x="70" y="50" width="220" height="140" rx="12" fill="#F4EFEA" stroke="#3D2E26" strokeWidth="2.5" />
    <circle cx="180" cy="120" r="54" stroke="#C35B34" strokeWidth="2" strokeDasharray="4 3" />
    <circle cx="180" cy="120" r="42" fill="#EAE2D8" stroke="#3D2E26" strokeWidth="1.5" />
    
    {/* Drum inspection sight glass */}
    <circle cx="180" cy="120" r="18" fill="#3D2E26" />
    <circle cx="180" cy="120" r="6" fill="#C35B34" />
    
    {/* Cooling tray below */}
    <ellipse cx="180" cy="195" rx="100" ry="22" fill="#FAF7F2" stroke="#3D2E26" strokeWidth="2.5" />
    {/* Agitator arm */}
    <line x1="120" y1="195" x2="240" y2="195" stroke="#C35B34" strokeWidth="2" strokeLinecap="round" />
    <circle cx="180" cy="195" r="5" fill="#3D2E26" />

    {/* Batch badge */}
    <text x="180" y="80" textAnchor="middle" fill="#6E5D53" fontSize="11" fontFamily="sans-serif" letterSpacing="2">5 KG BATCH CRAFT</text>
    
    {/* Hopper funnel on top */}
    <path d="M140 24L220 24L200 50L160 50Z" fill="#FAF7F2" stroke="#3D2E26" strokeWidth="2" />
    <line x1="150" y1="20" x2="210" y2="20" stroke="#3D2E26" strokeWidth="2.5" />

    {/* Coffee bean specks in cooling tray */}
    <ellipse cx="150" cy="196" rx="4" ry="2.5" fill="#5A4336" transform="rotate(-15 150 196)" />
    <ellipse cx="168" cy="192" rx="4" ry="2.5" fill="#C35B34" transform="rotate(25 168 192)" />
    <ellipse cx="195" cy="198" rx="4" ry="2.5" fill="#3D2E26" transform="rotate(-30 195 198)" />
    <ellipse cx="215" cy="193" rx="4" ry="2.5" fill="#5A4336" transform="rotate(10 215 193)" />
  </svg>
);

export const PourOverArt: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Воронка для заваривания кофе V60">
    {/* Server jug */}
    <path d="M90 150L75 240C74 246 78 250 85 250H195C202 250 206 246 205 240L190 150Z" fill="#FAF7F2" stroke="#3D2E26" strokeWidth="2" />
    <path d="M75 200C90 200 110 204 140 204C170 204 190 200 205 200" stroke="#C35B34" strokeWidth="1.5" strokeDasharray="3 3" />
    <text x="140" y="235" textAnchor="middle" fill="#6E5D53" fontSize="10" letterSpacing="1">KVARTA MINSK</text>

    {/* Handle */}
    <path d="M195 170C215 175 220 220 195 230" stroke="#3D2E26" strokeWidth="2.5" fill="none" strokeLinecap="round" />

    {/* Dripper Cone */}
    <path d="M80 80L140 148L200 80Z" fill="#F4EFEA" stroke="#3D2E26" strokeWidth="2" />
    {/* Dripper Ring Collar */}
    <line x1="70" y1="80" x2="210" y2="80" stroke="#3D2E26" strokeWidth="3" strokeLinecap="round" />
    {/* Internal Spiral Ribs */}
    <path d="M100 88Q125 115 138 140" stroke="#C35B34" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M180 88Q155 115 142 140" stroke="#C35B34" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M140 85V135" stroke="#C35B34" strokeWidth="1.5" strokeLinecap="round" />

    {/* Paper filter rim */}
    <path d="M85 75L140 135L195 75Z" stroke="#EAE2D8" strokeWidth="1" strokeDasharray="2 2" />

    {/* Fragrant steam waves */}
    <path d="M130 50C132 40 128 35 130 25" stroke="#6E5D53" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M142 55C144 42 140 34 143 20" stroke="#C35B34" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M154 52C156 44 152 38 155 28" stroke="#6E5D53" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const DripPacketArt: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Дрип-пакет кофе для чашки">
    {/* Cup base */}
    <path d="M80 120L95 210C96 215 100 220 106 220H174C180 220 184 215 185 210L200 120" stroke="#3D2E26" strokeWidth="2.5" fill="#FAF7F2" />
    <line x1="75" y1="120" x2="205" y2="120" stroke="#3D2E26" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Cup handle */}
    <path d="M192 140C212 145 216 185 188 195" stroke="#3D2E26" strokeWidth="2.5" fill="none" />

    {/* Drip bag hanging on cup */}
    <rect x="105" y="80" width="70" height="70" rx="2" fill="#FFFFFF" stroke="#3D2E26" strokeWidth="2" />
    
    {/* Drip bag paper ears */}
    <path d="M105 95H78V125H88" stroke="#C35B34" strokeWidth="2" fill="#F4EFEA" strokeLinejoin="round" />
    <path d="M175 95H202V125H192" stroke="#C35B34" strokeWidth="2" fill="#F4EFEA" strokeLinejoin="round" />
    
    {/* Coffee grounds surface */}
    <ellipse cx="140" cy="115" rx="24" ry="10" fill="#3D2E26" />
    <line x1="120" y1="90" x2="160" y2="90" stroke="#C35B34" strokeWidth="1" strokeDasharray="2 2" />
    <text x="140" y="103" textAnchor="middle" fill="#6E5D53" fontSize="8" letterSpacing="1">OPEN HERE</text>

    {/* Drops */}
    <circle cx="140" cy="170" r="3" fill="#3D2E26" />
    <circle cx="140" cy="186" r="2" fill="#C35B34" />
  </svg>
);

export const CoffeeBagMockup: React.FC<{
  variety: string;
  notes: string;
  price: string;
  weight: string;
  accentColor?: string;
  className?: string;
}> = ({ variety, notes, price, weight, accentColor = '#C35B34', className = 'w-full aspect-[4/5]' }) => (
  <div className={`relative flex flex-col justify-between p-6 bg-[#F8F5F0] border border-[#E3DAD1] rounded-sm shadow-xs ${className}`}>
    {/* Kraft bag top seal crimp */}
    <div className="absolute top-0 left-0 right-0 h-4 border-b border-[#D8CEC4] bg-[#EFE9DF] flex items-center justify-around opacity-75">
      <div className="w-1.5 h-1.5 rounded-full bg-[#B8ABA0]" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#B8ABA0]" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#B8ABA0]" />
    </div>

    {/* Brand label top */}
    <div className="mt-3 flex items-center justify-between border-b border-[#E3DAD1] pb-3">
      <span className="font-serif text-sm font-bold tracking-widest text-[#261C18]">КВАРТА</span>
      <span className="text-[11px] font-mono text-[#6E5D53]">МИНСК</span>
    </div>

    {/* Main product block */}
    <div className="my-auto py-4">
      <div className="inline-block px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider mb-2" style={{ color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
        Свежая обжарка
      </div>
      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#261C18] leading-tight mb-2">
        {variety}
      </h4>
      <p className="text-xs text-[#6E5D53] font-medium leading-relaxed">
        {notes}
      </p>
    </div>

    {/* Bottom specifications */}
    <div className="pt-4 border-t border-[#E3DAD1] flex items-center justify-between">
      <div className="text-xs font-mono text-[#6E5D53]">
        {weight}
      </div>
      <div className="text-base font-serif font-bold text-[#261C18]">
        {price}
      </div>
    </div>
  </div>
);
