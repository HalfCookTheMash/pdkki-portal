"use client";
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTts } from '@/context/useTts';
import { 
  Accessibility, X, Play, Pause, Square, 
  RotateCcw, Type, MousePointerClick, ChevronDown, ZoomIn, ZoomOut
} from 'lucide-react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t, isAudioEnabled, setIsAudioEnabled } = useLanguage(); 
  const { speak, stop } = useTts(); 
  
  // State Pengaturan
  const [fontSize, setFontSize] = useState(14);
  const [zoom, setZoom] = useState(1);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [isBigCursor, setIsBigCursor] = useState(false);
  const [contrast, setContrast] = useState(''); 

  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize = `${fontSize}px`;
    html.style.letterSpacing = `${letterSpacing}px`;
    // @ts-ignore
    html.style.zoom = zoom;

    html.classList.remove('high-1', 'high-2', 'high-3');
    if (contrast) html.classList.add(contrast);

    if (isDyslexic) html.classList.add('dyslexic-font');
    else html.classList.remove('dyslexic-font');

    if (isBigCursor) html.classList.add('big-cursor');
    else html.classList.remove('big-cursor');
  }, [fontSize, zoom, letterSpacing, isDyslexic, isBigCursor, contrast]);

  const resetAll = () => {
    setFontSize(14);
    setZoom(1); 
    setLetterSpacing(0);
    setIsDyslexic(false);
    setIsBigCursor(false);
    setContrast('');
    setIsAudioEnabled(false); 
    stop(); 
  };

  const handleAudio = (type: string) => {
    if (type === 'play') {
      setIsAudioEnabled(true);
      setTimeout(() => speak(t.accMenu), 100);
    } else if (type === 'stop') {
      stop();
      setIsAudioEnabled(false);
    } else if (type === 'pause') {
      stop();
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-[9999] flex flex-col items-end font-sans">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => speak(t.accMenu)}
        className="bg-[#004a87] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={32} /> : <Accessibility size={32} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] bg-white border border-gray-300 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 text-[#004077] exclude-contrast">
          
          {/* Header Widget */}
          <div className="bg-[#004077] text-white p-5 flex justify-between items-center">
            <h2 className="font-bold text-white text-2xl tracking-tight">{t.accMenu}</h2>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 rounded-full p-1 text-white">
              <X size={28} />
            </button>
          </div>

          <div className="p-5 space-y-8 overflow-y-auto max-h-[75vh] bg-white">
            
            {/* Pilihan Bahasa */}
            <div className="relative">
              <select 
                value={lang}
                onChange={(e) => setLang(e.target.value as 'id' | 'en')}
                className="w-full p-3 border-2 border-gray-200 rounded-lg appearance-none bg-white font-bold focus:outline-none focus:border-blue-500 text-[#004077]"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 pointer-events-none text-[#004077]" size={20} />
            </div>

            {/* Kontrol Audio */}
            <section>
              <h3 className="text-sm font-bold border-b-2 border-[#004077] mb-4 pb-1 uppercase tracking-widest text-[#004077]">{t.audioTitle}</h3>
              <div className="grid grid-cols-3 gap-3">
                <MenuButton 
                  active={isAudioEnabled} 
                  onClick={() => handleAudio('play')} 
                  onHover={() => speak(t.audioOptA)}
                  icon={<Play size={24} fill={isAudioEnabled ? "currentColor" : "none"}/>} 
                  label={t.audioOptA} 
                />
                <MenuButton 
                  onClick={() => handleAudio('pause')} 
                  onHover={() => speak(t.audioOptB)}
                  icon={<Pause size={24} fill="none"/>} 
                  label={t.audioOptB} 
                />
                <MenuButton 
                  active={!isAudioEnabled}
                  onClick={() => handleAudio('stop')} 
                  onHover={() => speak(t.audioOptC)}
                  icon={<Square size={24} fill={!isAudioEnabled ? "#ff4d4d" : "none"}/>} 
                  label={t.audioOptC} 
                />
              </div>
            </section>

            {/* Kontrol Font */}
            <section>
              <h3 className="text-sm font-bold border-b-2 border-[#004077] mb-4 pb-1 uppercase tracking-widest text-[#004077]">{t.fontTitle}</h3>
              <div className="grid grid-cols-3 gap-3">
                <MenuButton onClick={() => setFontSize(f => f + 2)} onHover={() => speak(t.fontOptA)} icon={<span className="text-2xl font-black">A+</span>} label={t.fontOptA} />
                <MenuButton onClick={() => setFontSize(f => Math.max(10, f - 2))} onHover={() => speak(t.fontOptB)} icon={<span className="text-2xl font-black">A-</span>} label={t.fontOptB} />
                <MenuButton onClick={() => setFontSize(14)} onHover={() => speak(t.reset)} icon={<RotateCcw size={24}/>} label={t.reset} />
              </div>
            </section>

            {/* Kontras Tinggi */}
            <section>
              <h3 className="text-sm font-bold border-b-2 border-[#004077] mb-4 pb-1 uppercase tracking-widest text-[#004077]">{t.contrastTitle}</h3>
              <div className="grid grid-cols-3 gap-3">    
                <MenuButton 
                  active={contrast === 'high-1'}
                  onClick={() => setContrast(contrast === 'high-1' ? '' : 'high-1')}
                  onHover={() => speak(`${t.contrast} 1`)}
                  icon={<div className="w-8 h-8 rounded-full border-2 border-black flex overflow-hidden"><div className="w-1/2 bg-white"></div><div className="w-1/2 bg-gray-200"></div></div>} 
                  label={`${t.contrast} 1`} 
                />
                <MenuButton 
                  active={contrast === 'high-2'}
                  onClick={() => setContrast(contrast === 'high-2' ? '' : 'high-2')}
                  onHover={() => speak(`${t.contrast} 2`)}
                  icon={<div className="w-8 h-8 rounded-full border-2 border-black flex overflow-hidden"><div className="w-1/2 bg-black"></div><div className="w-1/2 bg-white"></div></div>} 
                  label={`${t.contrast} 2`} 
                />
                <MenuButton 
                  active={contrast === 'high-3'}
                  onClick={() => setContrast(contrast === 'high-3' ? '' : 'high-3')}
                  onHover={() => speak(`${t.contrast} 3`)}
                  icon={<div className="w-8 h-8 rounded-full border-2 border-black flex overflow-hidden"><div className="w-1/2 bg-[#4a0000]"></div><div className="w-1/2 bg-[#5af978]"></div></div>} 
                  label={`${t.contrast} 3`} 
                />
              </div>
            </section>

            {/* Penyesuaian Teks */}
            <section>
              <h3 className="text-sm font-bold border-b-2 border-[#004077] mb-4 pb-1 uppercase tracking-widest text-[#004077]">{t.textTilte}</h3>
              <div className="grid grid-cols-2 gap-3">
                <MenuButton active={isDyslexic} onClick={() => setIsDyslexic(!isDyslexic)} onHover={() => speak(t.dysFont)} icon={<Type size={28}/>} label={t.dysFont} />
                <MenuButton active={isBigCursor} onClick={() => setIsBigCursor(!isBigCursor)} onHover={() => speak(t.cursor)} icon={<MousePointerClick size={28}/>} label={t.cursor} />
              </div>
            </section>

            {/* Kontrol Spasi */}
            <section>
              <h3 className="text-sm font-bold border-b-2 border-[#004077] mb-4 pb-1 uppercase tracking-widest text-[#004077]">{t.spaceTitle}</h3>
              <div className="grid grid-cols-2 gap-3">
                <MenuButton onClick={() => setLetterSpacing(s => s + 1)} onHover={() => speak(t.spaceOptA)} icon={<div className="flex flex-col items-center"><span className="text-xs font-bold leading-none">AV</span><span className="text-lg leading-none">↔</span></div>} label={t.spaceOptA} />
                <MenuButton onClick={() => setLetterSpacing(s => Math.max(0, s - 1))} onHover={() => speak(t.spaceOptB)} icon={<div className="flex flex-col items-center"><span className="text-xs font-bold leading-none">AV</span><span className="text-lg leading-none">→←</span></div>} label={t.spaceOptB} />
              </div>
            </section>
            
            {/* Kontrol Zoom */}
            <section>
              <h3 className="text-sm font-bold border-b-2 border-[#004077] mb-4 pb-1 uppercase tracking-widest text-[#004077]">{t.zoomTitle}</h3>
              <div className="grid grid-cols-3 gap-3">
                <MenuButton onClick={() => setZoom(z => z + 0.1)} onHover={() => speak("Zoom In")} icon={<ZoomIn size={24}/>} label="Zoom +" />
                <MenuButton onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} onHover={() => speak("Zoom Out")} icon={<ZoomOut size={24}/>} label="Zoom -" />
                <MenuButton onClick={() => setZoom(1)} onHover={() => speak(t.reset)} icon={<RotateCcw size={24}/>} label={t.reset} />
              </div>
            </section>

            {/* Tombol Reset Merah */}
            <button 
              onClick={resetAll} 
              onMouseEnter={() => speak(t.resetBtn)}
              className="w-full bg-[#ff4d4d] text-white py-4 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-red-600 transition-colors mt-4 shadow-md"
            >
              <div className="flex items-center gap-2">
                <RotateCcw size={20} />
                <span className="font-bold text-lg text-white">{t.resetBtn}</span>
              </div>
              <span className="text-[10px] opacity-90 text-white">{t.resetDesc}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Komponen MenuButton yang sudah diperbaiki prop-nya
function MenuButton({ 
  icon, 
  label, 
  onClick, 
  active, 
  onHover 
}: { 
  icon: React.ReactNode, 
  label: string, 
  onClick?: () => void, 
  active?: boolean,
  onHover?: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      onMouseEnter={onHover}
      className={`flex flex-col items-center justify-center aspect-square border-2 rounded-xl active:scale-95 transition-all ${
        active 
          ? 'bg-blue-100 border-[#004077] ring-2 ring-[#004077]' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
    >
      <div className="mb-1 text-[#004077] flex items-center justify-center">{icon}</div>
      <span className="text-[10px] font-extrabold text-[#004077] text-center leading-tight uppercase px-1">{label}</span>
    </button>
  );
}