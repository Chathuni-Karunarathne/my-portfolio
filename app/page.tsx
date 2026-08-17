import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0F0B23] bg-gradient-radial from-[#2A214C] to-transparent to-70% overflow-hidden">
      
      {/* 1. THE BIG BOLD 3D NAME (Balanced Size) */}
<div className="absolute inset-0 flex flex-col items-center justify-center z-0">

  {/* Line 2 - Balanced at 14vw */}
  <h6 className="text-[14vw] font-black text-white uppercase select-none tracking-[-0.05em] opacity-70 -translate-y-60
    [text-shadow:_1px_1px_0_#ccc,_2px_2px_0_#c5c5c5,_3px_3px_0_#bbb,_4px_4px_0_#b0b0b0,_5px_5px_0_#aaa,_6px_6px_0_#999,_7px_7px_0_#888,_8px_8px_20px_rgba(0,0,0,0.5)]
    leading-[0.8]">
    CHATHUNI
  </h6>
</div>

      {/* 2. THE LIGHT GLOW (Set to z-1, appearing over the text) */}
      <div className="absolute z-[1] aspect-square w-[50vw] rounded-full bg-[#3B2D7C] opacity-40 blur-[100px] pointer-events-none"></div>

      {/* 3. THE WAVING AVATAR (Set to z-10, making it the top-most layer) */}
      {/* 4. THE WAVING AVATAR (Shifted down) */}
<div className="relative z-10 h-[100vh] flex items-center justify-center translate-y-0"> 
  <video 
    src="/avatar.webm" 
    autoPlay 
    loop 
    muted 
    playsInline
    className="h-[100vh] w-auto object-contain"
  />
</div>

    </main>
  );
}