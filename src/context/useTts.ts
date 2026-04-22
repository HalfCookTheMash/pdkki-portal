"use client";
import { useLanguage } from '@/context/LanguageContext';

export const useTts = () => {
  const { lang, isAudioEnabled } = useLanguage();

  const speak = (text: string) => {
    if (!isAudioEnabled) return;

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Hentikan suara sebelumnya

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
      utterance.rate = 1.0;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stop = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return { speak, stop };
};