"use client"

import { useRef, useState, useEffect } from "react";
import { OrganizationVisualization } from "../organization-visualization";

// Client component voor de voice-over tekst display
function VoiceOver({ locale }: { locale: string }) {
  const [voiceOverText, setVoiceOverText] = useState<string>('');
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Functie om voice-over tekst woord voor woord weer te geven
  useEffect(() => {
    if (voiceOverText) {
      // Wis eventuele lopende typing timer
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      
      // Reset states en verdeel tekst in woorden
      setDisplayedWords([]);
      setIsTyping(true);
      const words = voiceOverText.split(' ');
      
      // Functie om woorden één voor één weer te geven
      const showNextWord = (index: number) => {
        if (index < words.length) {
          // Voeg volgende woord toe aan de weergegeven woorden
          setDisplayedWords(prev => [...prev, words[index]]);
          
          // Bereken vertraging voor het volgende woord
          // Normale woorden: 300ms, woorden met leesteken: 600ms, korte woorden: 250ms
          let delay = 300; // Normale snelheid (spreektempo)
          
          // Pauze voor leestekens
          if (words[index].match(/[,.?!:;]$/)) {
            delay = 600; // Langere pauze na leestekens
          } else if (words[index].length <= 3) {
            delay = 250; // Kortere pauze voor korte woorden
          }
          
          // Plan het volgende woord in
          typingTimerRef.current = setTimeout(() => showNextWord(index + 1), delay);
        } else {
          // Alle woorden zijn weergegeven
          setIsTyping(false);
        }
      };
      
      // Start het weergeven van woorden
      typingTimerRef.current = setTimeout(() => showNextWord(0), 300);
    }
    
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [voiceOverText]);
  
  // Luister naar aangepaste events van de OrganizationVisualization component
  useEffect(() => {
    const handleVoiceOverUpdate = (event: CustomEvent) => {
      setVoiceOverText(event.detail.text);
    };
    
    // Voeg event listener toe
    window.addEventListener('voiceOverUpdate' as any, handleVoiceOverUpdate);
    
    // Cleanup
    return () => {
      window.removeEventListener('voiceOverUpdate' as any, handleVoiceOverUpdate);
    };
  }, []);
  
  return (
    <div className="mt-8 voice-over">
      {voiceOverText && (
        <div className="text-center text-xl font-medium text-gray-800 px-4">
          <div className="bg-white/90 backdrop-blur-sm py-6 px-10 rounded-lg inline-block max-w-3xl shadow-md">
            <div className="min-h-[64px] text-container">
              {displayedWords.map((word, index) => (
                <span key={index}>{word} </span>
              ))}
              {isTyping && <span className="ml-1 animate-pulse text-blue-500">|</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Client wrapper voor de pagina-inhoud
export function AIVisualizationClient({ locale, title, description }: { locale: string, title: string, description: string }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>
      <p className="text-center text-gray-600 mb-10">{description}</p>
      
      <div className="flex flex-col items-center gap-8">
        <div className="w-full max-w-4xl aspect-[4/3] bg-gray-50 rounded-xl shadow-md p-6 border border-gray-200">
          <OrganizationVisualization locale={locale} />
        </div>
        <VoiceOver locale={locale} />
      </div>
    </div>
  );
} 