"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { motion } from "framer-motion";

type OrganizationElement = {
  id: string;
  icon: React.ReactNode;
  color: string;
};

type Assistant = {
  id: string;
  initialPosition: { top?: string; bottom?: string; left?: string; right?: string };
  circlePosition?: { x: number; y: number }; // Positie op de cirkel
  color: string;
  size: string;
};

type OrganizationVisualizationProps = {
  locale: string;
};

// Helper component voor kennisdeeltjes
const KnowledgeParticle = ({ startX, startY, endX, endY, color, delay }: { 
  startX: number, 
  startY: number, 
  endX: number, 
  endY: number, 
  color: string,
  delay: number
}) => {
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full ${color} z-15`}
      initial={{ 
        x: startX, 
        y: startY, 
        opacity: 0,
        scale: 0 
      }}
      animate={{ 
        x: endX, 
        y: endY, 
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0]
      }}
      transition={{
        duration: 1.5,
        ease: "easeOut",
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 5
      }}
    />
  );
};

// Helper component voor communicatiedeeltjes langs de cirkel
const CircularParticle = ({ 
  startAngle, 
  endAngle, 
  radius, 
  color, 
  delay, 
  clockwise 
}: { 
  startAngle: number,
  endAngle: number,
  radius: number,
  color: string,
  delay: number,
  clockwise: boolean
}) => {
  // Bereken vier punten langs het pad, om een soepele boogbeweging te creëren
  const angleDistance = (endAngle - startAngle + (clockwise ? 0 : 2 * Math.PI)) % (2 * Math.PI);
  const step1 = startAngle + (angleDistance * 0.33);
  const step2 = startAngle + (angleDistance * 0.66);

  return (
    <motion.div
      className={`absolute w-3.5 h-3.5 rounded-full ${color} z-15 shadow-glow`}
      style={{
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
      }}
      initial={{ 
        opacity: 0,
        scale: 0,
        top: `calc(50% + ${Math.sin(startAngle) * radius}px)`,
        left: `calc(50% + ${Math.cos(startAngle) * radius}px)`,
      }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1.3, 1.3, 0],
        top: [
          `calc(50% + ${Math.sin(startAngle) * radius}px)`,
          `calc(50% + ${Math.sin(step1) * radius}px)`,
          `calc(50% + ${Math.sin(step2) * radius}px)`,
          `calc(50% + ${Math.sin(endAngle) * radius}px)`
        ],
        left: [
          `calc(50% + ${Math.cos(startAngle) * radius}px)`,
          `calc(50% + ${Math.cos(step1) * radius}px)`,
          `calc(50% + ${Math.cos(step2) * radius}px)`,
          `calc(50% + ${Math.cos(endAngle) * radius}px)`
        ]
      }}
      transition={{
        duration: 2.5,
        ease: "linear",
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 1.5 + 2
      }}
    />
  );
};

export function OrganizationVisualization({ locale }: OrganizationVisualizationProps) {
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // Standaard op false (was al zo)
  const [hasStarted, setHasStarted] = useState(false); // Nieuwe state om bij te houden of animatie ooit is gestart
  const [step, setStep] = useState(1);
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'compact' | 'assistants' | 'circle'>('initial');
  const [animationStage, setAnimationStage] = useState<'organisatie' | 'groei' | 'assistenten' | 'kennis' | 'communicatie' | 'alles' | 'groei-succes' | null>(null); // Voeg null toe als mogelijke waarde
  const [stageText, setStageText] = useState<string>('');
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const [visibleAssistants, setVisibleAssistants] = useState<string[]>([]);
  const [knowledgeFlowing, setKnowledgeFlowing] = useState(false);
  const [knowledgePaused, setKnowledgePaused] = useState(false);
  const [assistantsCommunicating, setAssistantsCommunicating] = useState(false);
  const [growthAttempt, setGrowthAttempt] = useState(false);
  const [growthSuccess, setGrowthSuccess] = useState(false);
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [voiceOverText, setVoiceOverText] = useState<string>('');
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [currentAudioStage, setCurrentAudioStage] = useState<string | null>(null);
  const [audioTransitioning, setAudioTransitioning] = useState<boolean>(false);
  const [lastAudioTimestamp, setLastAudioTimestamp] = useState<number>(0);
  
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const compactTimerRef = useRef<NodeJS.Timeout | null>(null);
  const growthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const assistantsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const circleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const communicationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const knowledgePauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const knowledgeResumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stageTimerRef = useRef<NodeJS.Timeout | null>(null);
  const finalGrowthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elementTimersRef = useRef<NodeJS.Timeout[]>([]);
  const assistantTimersRef = useRef<NodeJS.Timeout[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Maak een div-referentie voor plaatsing van de voice-over tekst in de DOM
  const voiceOverRef = useRef<HTMLDivElement>(null);
  
  // Audio referentie
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Voeg een ref toe om de laatste fase bij te houden die audio heeft afgespeeld
  const lastPlayedPhaseRef = useRef<string | null>(null);
  
  // Hardcoded vertalingen
  const translations = {
    nl: {
      steps: { 
        1: ''
      },
      stages: {
        organization: 'Jouw organisatie is uniek',
        growth: 'Je wilt groeien, maar wordt geremd',
        assistants: 'Stel je voor dat je hulp krijgt',
        knowledge: 'Weet precies hoe jullie werken',
        communication: 'Ze werken samen',
        all: 'Droom groot, begin klein',
        growth_success: 'Vandaag beginnen, morgen winnen'
      },
      barriers: {
        growth: 'Groei geblokkeerd'
      },
      success: {
        growth: 'Succesvolle groei dankzij AI assistenten!'
      },
      voiceover: {
        organisation: 'Dit is jouw organisatie. Met je eigen mensen, je eigen structuur, je eigen processen en je eigen unieke geschiedenis en identiteit.',
        growth_blocked: 'Het gaat best goed... Maar je loopt tegen grenzen aan, terwijl je verder wil of misschien wel móet groeien in kwaliteit, omzet, klanten of medewerkers.',
        assistants: 'Stel je voor... Dat je hulp krijgt van slimme, digitale AI-assistenten, 24/7 inzetbaar die steeds slimmer worden en steeds meer kunnen.',
        knowledge: 'Assistenten die werken met jullie mensen, data en werkwijzen. Helemaal op maat, voor jouw organisatie.',
        communication: 'Ze stemmen af met jullie en elkaar, delen kennis en werken soepel samen.',
        all: 'Begin met één en breid uit naar meerdere assistenten — stem af op jullie behoefte en tempo.',
        growth_success: 'Zo krijgt je team superkrachten. En kan je organisatie wél verder en sneller groeien — richting jullie ambities. Morgen winnen, betekent vandaag beginnen!'
      },
      organization: { 
        title: 'Jouw organisatie',
        elements: {
          identity: 'Identiteit',
          people: 'Mensen',
          processes: 'Processen',
          data: 'Data'
        }
      },
      orgTypes: { 
        healthcare: 'Zorginstelling' 
      },
      controls: { 
        play: 'Afspelen', 
        pause: 'Pauzeren', 
        restart: 'Opnieuw' 
      },
      assistants: {
        title: 'Digitale assistenten'
      }
    },
    en: {
      steps: { 
        1: ''
      },
      stages: {
        organization: 'Your organization is unique',
        growth: 'You want to grow, but face barriers',
        assistants: 'Imagine getting help',
        knowledge: 'Knows exactly how you work',
        communication: 'They work together',
        all: 'Dream big, start small',
        growth_success: 'Start today, win tomorrow'
      },
      barriers: {
        growth: 'Growth blocked'
      },
      success: {
        growth: 'Successful growth thanks to AI assistants!'
      },
      voiceover: {
        organisation: 'This is your organization. With your own people, your own structure, your own processes and your own unique history and identity.',
        growth_blocked: 'Things are going well... But you\'re hitting limits, while you want to or maybe even need to grow in quality, revenue, customers or employees.',
        assistants: 'Imagine... Getting help from smart, digital AI assistants, available 24/7, constantly getting smarter and more capable.',
        knowledge: 'Assistants that work with your people, data and methods. Completely tailored to your organization.',
        communication: 'They align with you and each other, share knowledge and work together seamlessly.',
        all: 'Start with one and expand to multiple assistants — aligned with your needs and pace.',
        growth_success: 'This gives your team superpowers. And your organization can grow further and faster — towards your ambitions. Winning tomorrow means starting today!'
      },
      organization: { 
        title: 'Your organization',
        elements: {
          identity: 'Identity',
          people: 'People',
          processes: 'Processes',
          data: 'Data'
        }
      },
      orgTypes: { 
        healthcare: 'Healthcare institution' 
      },
      controls: { 
        play: 'Play', 
        pause: 'Pause', 
        restart: 'Restart' 
      },
      assistants: {
        title: 'Digital assistants'
      }
    }
  };
  
  // Gebruik de juiste taal of fallback naar Engels
  const t = translations[locale as 'nl' | 'en'] || translations.en;

  // Elementen verschijnen volgorde
  const elementOrder = ["identity", "people", "processes", "data"];
  
  // Assistenten volgorde
  const assistantOrder = ["assistant1", "assistant2", "assistant3", "assistant4", "assistant5", "assistant6"];

  // Update de functie om voice-over tekst bij te werken
  const updateVoiceOver = (text: string) => {
    setVoiceOverText(text);
  };

  // Bereken de geschatte tijd (in ms) die nodig is om een tekst uit te spreken
  const calculateSpeechDuration = (text: string): number => {
    if (!text) return 3000; // Standaard 3 seconden
    
    // Gemiddelde leessnelheid is ongeveer 200 woorden per minuut, of ongeveer 3,33 woorden per seconde
    // Dit is ongeveer 300ms per woord
    const words = text.split(' ').length;
    
    // Houd rekening met pauzes bij leestekens
    const sentencesCount = (text.match(/[.!?]+/g) || []).length;
    const commasCount = (text.match(/[,;:]/g) || []).length;
    
    // Basis tijd voor woorden
    let duration = words * 300;
    
    // Extra tijd voor zinseinden (ongeveer 600ms per zin)
    duration += sentencesCount * 600;
    
    // Extra tijd voor komma's en andere pauzes (ongeveer 300ms per komma)
    duration += commasCount * 300;
    
    // Extra buffer om ervoor te zorgen dat tekst volledig wordt weergegeven
    duration += 1000;
    
    return duration;
  };

  // Functie om voice-over tekst woord voor woord weer te geven
  useEffect(() => {
    if (voiceOverText) {
      console.log(`Begin voice-over voor fase: ${animationStage}`, voiceOverText);
      
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
          let delay = 250; // Verkort van 300ms naar 250ms voor snellere weergave
          
          // Pauze voor leestekens
          if (words[index].match(/[,.?!:;]$/)) {
            delay = 500; // Verkort van 600ms naar 500ms
          } else if (words[index].length <= 3) {
            delay = 200; // Verkort van 250ms naar 200ms
          }
          
          // Plan het volgende woord in
          typingTimerRef.current = setTimeout(() => showNextWord(index + 1), delay);
        } else {
          // Alle woorden zijn weergegeven
          setIsTyping(false);
          console.log(`Voice-over voltooid voor fase: ${animationStage} - Alle ${words.length} woorden zijn weergegeven`);
          
          // Voeg extra vertraging toe nadat alle woorden zijn uitgesproken
          // Dit zorgt ervoor dat de gebruiker de gehele tekst kan lezen voordat de volgende fase start
          // We gebruiken dit nu voor ALLE fases om een betere gebruikerservaring te garanderen
          
          // Extra leestijd per fase aanpassen aan de hoeveelheid tekst
          let extraReadingTime = Math.max(800, Math.min(2000, words.length * 150)); // Verkort naar 800-2000ms, verminderde tijd per woord
          
          // Specifieke aanpassingen per fase
          if (animationStage === 'groei-succes') {
            // De laatste fase heeft een veel langere tekst en bevat de branding
            extraReadingTime = Math.max(3000, words.length * 200); // Verhoogd naar 3000ms en meer tijd per woord voor de nieuwe tekst
          } else if (animationStage === 'groei') {
            // De 'groei geblokkeerd' fase is belangrijk en heeft wat complexere informatie
            extraReadingTime = Math.max(1500, words.length * 170); // Verkort naar minimaal 1.5 seconden
          }
          
          console.log(`Extra leestijd voor fase ${animationStage}: ${extraReadingTime}ms`);
          
          setTimeout(() => {
            // Dit is een trigger om aan te geven dat de tekst echt klaar is (inclusief leestijd)
            console.log(`Fase '${animationStage}' volledig uitgesproken en gelezen`);
            // Stuur een aangepast event om de stateUpdate te triggeren voor ALLE fases
            const event = new CustomEvent('voiceOverFullyComplete', { detail: { stage: animationStage } });
            window.dispatchEvent(event);
          }, extraReadingTime);
        }
      };
      
      // Start het weergeven van woorden met een korte vertraging
      typingTimerRef.current = setTimeout(() => showNextWord(0), 300); // Verkort van 500ms naar 300ms
    }
    
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [voiceOverText, animationStage]);
  
  // Kaart fase namen naar bestandsnamen
  const stageToFileName: {[key: string]: string} = {
    'organisatie': 'Organisation',
    'groei': 'growth_blocked',
    'assistenten': 'assistants',
    'kennis': 'knowledge',
    'communicatie': 'communication',
    'alles': 'all',
    'groei-succes': 'growth_success'
  };

  // Log beschikbare audiobestanden voor debug
  useEffect(() => {
    if (isClient) {
      console.log("Stage to filename mapping:", stageToFileName);
      console.log("Controleren welke audiobestanden bestaan...");
      
      Object.entries(stageToFileName).forEach(([stage, fileName]) => {
        const audioPath = `/audio/nl/${fileName}-nl.mp3`;
        fetch(audioPath, { method: 'HEAD' })
          .then(response => {
            console.log(`Audiobestand ${audioPath} bestaat: ${response.ok ? 'Ja' : 'Nee'}`);
          })
          .catch(error => {
            console.error(`Fout bij controleren van audiobestand ${audioPath}:`, error);
          });
      });
    }
  }, [isClient]);

  // Luister naar het voiceOverFullyComplete event om de timing van de overgangen te verbeteren
  useEffect(() => {
    const handleVoiceOverFullyComplete = (event: CustomEvent) => {
      const stage = event.detail.stage;
      console.log(`Voice-over volledig afgerond voor fase: ${stage}`);
      
      // Controleer welke fase is afgerond en voer de juiste actie uit
      switch(stage) {
        case 'organisatie':
          if (visibleElements.length === elementOrder.length && compactTimerRef.current === null) {
            console.log("Organisatie fase volledig afgerond - start compacte fase");
            compactTimerRef.current = setTimeout(() => {
              // Eerst worden de elementen naar de compacte fase verplaatst
              setAnimationPhase('compact');
              
              // Wacht een tijdje voordat we naar de groeifase gaan, om de kijker tijd te geven de compacte fase te zien
              growthTimerRef.current = setTimeout(() => {
                console.log("*** START GROEI FASE - zou audio moeten triggeren ***");
                setAnimationStage('groei');
                setStageText(t.stages.growth);
                setGrowthAttempt(true);
                // Update voice-over tekst voor de groei-fase
                updateVoiceOver(t.voiceover.growth_blocked);
                
                // Extra debug - controleer direct of het audiobestand beschikbaar is
                const audioPath = `/audio/nl/growth_blocked-nl.mp3`;
                console.log(`Direct controleren of audiobestand ${audioPath} beschikbaar is...`);
                fetch(audioPath, { method: 'HEAD' })
                  .then(response => {
                    console.log(`GROEI fase: Audiobestand ${audioPath} bestaat: ${response.ok ? 'Ja' : 'Nee'}`);
                    if (response.ok) {
                      console.log("Bestand gevonden, maar wordt niet afgespeeld via useEffect. Controleer eventuele blokkades.");
                    }
                  })
                  .catch(error => {
                    console.error(`GROEI fase: Fout bij controleren van audiobestand ${audioPath}:`, error);
                  });
                
                // De audio wordt nu automatisch afgespeeld door het useEffect wanneer animationStage verandert
                
              }, 1200); // Verkort van 2500ms naar 1200ms
            }, 800); // Verkort van 1500ms naar 800ms
          }
          break;
          
        case 'groei':
          if (assistantsTimerRef.current === null) {
            console.log("Groei fase volledig afgerond - start assistenten fase");
            // Nu gaan we pas door naar de assistenten fase
            assistantsTimerRef.current = setTimeout(() => {
              setGrowthAttempt(false);
              setAnimationStage('assistenten');
              setStageText(t.stages.assistants);
              updateVoiceOver(t.voiceover.assistants);
              
              // Laat assistenten één voor één verschijnen
              assistantOrder.forEach((assistantId, index) => {
                const timer = setTimeout(() => {
                  setVisibleAssistants(prev => [...prev, assistantId]);
                }, index * 300); // Verkort van 400ms naar 300ms
                
                assistantTimersRef.current.push(timer);
              });
            }, 600); // Verkort van 1000ms naar 600ms
          }
          break;
          
        case 'assistenten':
          if (circleTimerRef.current === null && visibleAssistants.length === assistantOrder.length) {
            console.log("Assistenten fase volledig afgerond - start cirkel fase");
            // Start de cirkel fase nu de assistenten-tekst is uitgesproken en alle assistenten zichtbaar zijn
            circleTimerRef.current = setTimeout(() => {
              setAnimationPhase('circle');
              
              // Start kennisstroming na een langere pauze in de cirkelfase
              setTimeout(() => {
                setAnimationStage('kennis');
                setStageText(t.stages.knowledge);
                setKnowledgeFlowing(true);
                updateVoiceOver(t.voiceover.knowledge);
              }, 1000); // Verkort van 2000ms naar 1000ms
            }, 800); // Verkort van 1500ms naar 800ms
          }
          break;
          
        case 'kennis':
          if (communicationTimerRef.current === null) {
            console.log("Kennis fase volledig afgerond - start communicatie fase");
            // Start de communicatie fase nu de kennis-tekst is uitgesproken
            communicationTimerRef.current = setTimeout(() => {
              setAnimationStage('communicatie');
              setStageText(t.stages.communication);
              setAssistantsCommunicating(true);
              setKnowledgePaused(true);
              updateVoiceOver(t.voiceover.communication);
            }, 800); // Verkort van 1500ms naar 800ms
          }
          break;
          
        case 'communicatie':
          if (knowledgeResumeTimerRef.current === null) {
            console.log("Communicatie fase volledig afgerond - start alles fase");
            // Laat kennisstroming weer beginnen nu de communicatie-tekst is uitgesproken
            knowledgeResumeTimerRef.current = setTimeout(() => {
              setAnimationStage('alles');
              setStageText(t.stages.all);
              setKnowledgePaused(false);
              updateVoiceOver(t.voiceover.all);
            }, 800); // Verkort van 1500ms naar 800ms
          }
          break;
          
        case 'alles':
          if (finalGrowthTimerRef.current === null) {
            console.log("Alles fase volledig afgerond - start groei-succes fase");
            // Start de groei-succes fase nu de alles-tekst is uitgesproken
            finalGrowthTimerRef.current = setTimeout(() => {
              setAnimationStage('groei-succes');
              setStageText(t.stages.growth_success);
              setGrowthSuccess(true);
              updateVoiceOver(t.voiceover.growth_success);
            }, 800); // Verkort van 1500ms naar 800ms
          }
          break;
          
        case 'groei-succes':
          console.log("Groei-succes fase volledig afgerond - animatie compleet");
          // Hier kunnen we eventueel nog een actie uitvoeren als de laatste fase is voltooid
          break;
      }
    };
    
    // Voeg event listener toe
    window.addEventListener('voiceOverFullyComplete' as any, handleVoiceOverFullyComplete);
    
    // Cleanup
    return () => {
      window.removeEventListener('voiceOverFullyComplete' as any, handleVoiceOverFullyComplete);
    };
  }, [visibleElements.length, visibleAssistants.length]);

  // Dit is onze enige directe audio functie - alle andere audio useEffects worden uitgeschakeld
  // Voeg een hook toe om direct audio af te spelen wanneer de fase verandert
  useEffect(() => {
    if (!isClient || !animationStage || !userInteracted || !audioEnabled) {
      // Als gebruiker nog niet heeft geïnteracteerd, toon een hint
      if (isClient && animationStage && !userInteracted && audioEnabled) {
        console.log("Wachtend op gebruikersinteractie om audio af te spelen...");
      }
      return;
    }
    
    // Controleer of we deze fase al eerder hebben afgespeeld
    // Gebruik de ref in plaats van state om race conditions te voorkomen
    if (lastPlayedPhaseRef.current === animationStage) {
      console.log(`Audio voor fase ${animationStage} is al eerder afgespeeld, overslaan`);
      return;
    }
    
    // Map van fase naar audiobestandsnaam
    const audioFiles: Record<string, string> = {
      'organisatie': 'Organisation-nl.mp3',
      'groei': 'growth_blocked-nl.mp3',
      'assistenten': 'assistants-nl.mp3',
      'kennis': 'knowledge-nl.mp3',
      'communicatie': 'communication-nl.mp3',
      'alles': 'all-nl.mp3',
      'groei-succes': 'growth_success-nl.mp3'
    };
    
    const audioFileName = audioFiles[animationStage];
    
    if (!audioFileName) {
      console.error(`Geen audiobestand gevonden voor fase: ${animationStage}`);
      return;
    }
    
    console.log(`AUDIO MANAGER: Nieuwe fase gedetecteerd: ${animationStage}, audio afspelen...`);
    
    // Stop huidige audio als die bestaat
    if (currentAudio) {
      console.log('Huidige audio stoppen...');
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    
    // Markeer deze fase als afgespeeld
    console.log(`Fase ${animationStage} markeren als afgespeeld`);
    lastPlayedPhaseRef.current = animationStage;
    
    // Volledige URL samenstellen
    const audioPath = `/audio/nl/${audioFileName}`;
    console.log(`Probeer audio te laden van: ${audioPath}`);
    
    // Geen vertraging voor de groei-succes fase of reguliere vertraging voor andere fases
    const playAudioForPhase = () => {
      // Controleer nogmaals of de gebruiker heeft geïnteracteerd
      if (!userInteracted) {
        console.log("Kan audio niet afspelen: geen gebruikersinteractie gedetecteerd");
        return;
      }
      
      try {
        // Nieuwe audio maken
        const audio = new Audio(audioPath);
        
        // Event listeners toevoegen
        audio.addEventListener('canplaythrough', () => {
          // Extra controle om te voorkomen dat audio start als we inmiddels naar een andere fase zijn gegaan
          if (lastPlayedPhaseRef.current !== animationStage) {
            console.log(`Fase is inmiddels veranderd van ${animationStage} naar ${lastPlayedPhaseRef.current}, audio niet afspelen`);
            return;
          }
          
          console.log(`Audio voor fase ${animationStage} is geladen, proberen af te spelen...`);
          
          // Extra controle op gebruikersinteractie voor het afspelen
          if (!userInteracted) {
            console.log("Audio kan niet worden afgespeeld omdat de gebruiker nog niet met de pagina heeft geïnteracteerd");
            return;
          }
          
          audio.play()
            .then(() => {
              console.log(`Audio voor fase ${animationStage} speelt nu!`);
              setCurrentAudio(audio);
              
              // Event listener toevoegen voor wanneer de audio stopt
              audio.addEventListener('ended', () => {
                console.log(`Audio voor fase ${animationStage} is klaar met afspelen`);
                setCurrentAudio(null);
              });
            })
            .catch(err => {
              console.error(`Fout bij afspelen audio voor fase ${animationStage}:`, err);
              console.log("Tip: Klik ergens op de visualisatie om audio in te schakelen");
              
              // Reset de audioEnabled state als afspelen mislukt door gebrek aan interactie
              if (err.name === "NotAllowedError") {
                console.log("Audio afspelen niet toegestaan. Wachtend op gebruikersinteractie...");
                // Laat audioEnabled aan, maar wacht op interactie
              }
            });
        });
        
        // Error handler
        audio.addEventListener('error', (e) => {
          console.error(`Fout bij laden audio voor fase ${animationStage}:`, e);
        });
        
        // Begin met laden
        audio.load();
      } catch (error) {
        console.error(`Fout bij maken audio-object voor fase ${animationStage}:`, error);
      }
    };
    
    // Voor groei-succes fase direct afspelen, voor andere fases kleine vertraging
    if (animationStage === 'groei-succes') {
      console.log("Laatste fase - direct audio afspelen zonder vertraging");
      playAudioForPhase();
    } else {
      // Wacht een moment tussen fases om te voorkomen dat audio overlapt
      setTimeout(playAudioForPhase, 200);
    }
    
  }, [animationStage, isClient, userInteracted, audioEnabled]);

  // Reset lastPlayedPhaseRef aan het begin van de animatie
  useEffect(() => {
    if (!animationStage) {
      lastPlayedPhaseRef.current = null;
    }
  }, [animationStage]);

  // Schakel alle andere audio effecten uit door ze leeg te maken
  useEffect(() => {
    // Eerste audio effect - uitgeschakeld
  }, []);

  useEffect(() => {
    // Tweede audio effect - uitgeschakeld
  }, []);

  // Functie om gebruikersinteractie te verwerken en audio in te schakelen
  const handleUserInteraction = () => {
    if (!userInteracted) {
      console.log("Gebruikersinteractie gedetecteerd, audio wordt ingeschakeld");
      // Markeer dat de gebruiker heeft geïnteracteerd met de pagina
      setUserInteracted(true);
      
      // Schakel audio in als dit nog niet is gebeurd
      if (!audioEnabled) {
        setAudioEnabled(true);
        console.log("Audio enabled due to user interaction");
      }
      
      // Als er al een audio element is, maar nog niet wordt afgespeeld, probeer het nu af te spelen
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Still could not play audio:", e));
      }
      
      // Als we in een animatiefase zijn en lastPlayedPhaseRef is nog niet gezet op de huidige fase,
      // probeer audio voor de huidige fase af te spelen
      if (animationStage && lastPlayedPhaseRef.current !== animationStage) {
        console.log(`Probeer audio voor huidige fase ${animationStage} opnieuw af te spelen na gebruikersinteractie`);
        const audioTimerRef = setTimeout(() => {
          // Dit zal de useEffect voor audio afspelen opnieuw triggeren
          const tempStage = animationStage;
          setAnimationStage(null);
          setTimeout(() => setAnimationStage(tempStage), 50);
        }, 200);
        
        return () => clearTimeout(audioTimerRef);
      }
    }
  };
  
  // Start de animatie en stel timers in
  const startAnimation = () => {
    console.log("startAnimation aangeroepen");
    
    // Wis bestaande timers
    clearAllTimers();

    // Reset sessie storage voor afgespeelde audio
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('audioPlayed_') || key.startsWith('audio_')) {
        sessionStorage.removeItem(key);
      }
    });

    // Reset de lastPlayedPhaseRef
    lastPlayedPhaseRef.current = null;

    // Reset state
    setVisibleElements([]);
    setVisibleAssistants([]);
    setAnimationPhase('initial');
    setAudioTransitioning(false); // Reset de audio transitioning state
    setCurrentAudioStage(null); // Reset de audio stage
    setIsAnimating(true);
    setKnowledgeFlowing(false);
    setKnowledgePaused(false);
    setAssistantsCommunicating(false);
    setGrowthAttempt(false);
    setGrowthSuccess(false);
    
    // Zet direct de user interaction en audio enabled states
    setUserInteracted(true);
    setAudioEnabled(true);
    
    console.log("Animatie gestart - organisatiefase");
    
    // Begin met een korte pauze voor de eerste voice-over tekst
    setTimeout(() => {
      // Eerste voice-over tekst
      updateVoiceOver(t.voiceover.organisation);
      
      // Nu stellen we de animatiefase in, wat de audio zal triggeren
      setAnimationStage('organisatie');
      setStageText(t.stages.organization);
      
      // Laat elementen één voor één verschijnen met vertraging
      elementOrder.forEach((elementId, index) => {
        const timer = setTimeout(() => {
          setVisibleElements(prev => [...prev, elementId]);
          console.log(`Element verschenen: ${elementId}`);
        }, 800 + (index * 700));
        
        elementTimersRef.current.push(timer);
      });
    }, 500);
  };

  // Effect om displayedWords naar het externe voice-over-target element te schrijven
  useEffect(() => {
    if (isClient) {
      const voiceOverTarget = document.getElementById('voice-over-target');
      if (voiceOverTarget) {
        voiceOverTarget.innerHTML = displayedWords.join(' ') + (isTyping ? '<span class="ml-1 animate-pulse text-blue-500">|</span>' : '');
      }
    }
  }, [displayedWords, isTyping, isClient]);

  // Wis alle timers
  const clearAllTimers = () => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    if (compactTimerRef.current) {
      clearTimeout(compactTimerRef.current);
      compactTimerRef.current = null;
    }
    if (growthTimerRef.current) {
      clearTimeout(growthTimerRef.current);
      growthTimerRef.current = null;
    }
    if (assistantsTimerRef.current) {
      clearTimeout(assistantsTimerRef.current);
      assistantsTimerRef.current = null;
    }
    if (circleTimerRef.current) {
      clearTimeout(circleTimerRef.current);
      circleTimerRef.current = null;
    }
    if (communicationTimerRef.current) {
      clearTimeout(communicationTimerRef.current);
      communicationTimerRef.current = null;
    }
    if (knowledgePauseTimerRef.current) {
      clearTimeout(knowledgePauseTimerRef.current);
      knowledgePauseTimerRef.current = null;
    }
    if (knowledgeResumeTimerRef.current) {
      clearTimeout(knowledgeResumeTimerRef.current);
      knowledgeResumeTimerRef.current = null;
    }
    if (stageTimerRef.current) {
      clearTimeout(stageTimerRef.current);
      stageTimerRef.current = null;
    }
    if (finalGrowthTimerRef.current) {
      clearTimeout(finalGrowthTimerRef.current);
      finalGrowthTimerRef.current = null;
    }
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    elementTimersRef.current.forEach(timer => clearTimeout(timer));
    elementTimersRef.current = [];
    assistantTimersRef.current.forEach(timer => clearTimeout(timer));
    assistantTimersRef.current = [];
    
    // Stop huidige audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setCurrentAudio(null);
    audioRef.current = null;
  };

  // Gebruik useEffect om client-side rendering te detecteren
  useEffect(() => {
    setIsClient(true);
    
    // Verwijder automatische start - we willen nu wachten op het startknopje
    // De clean-up functie behouden we wel
    return () => {
      clearAllTimers();
    };
  }, []); // Lege dependency array zodat dit alleen bij eerste render gebeurt

  // Organisatie elementen
  const elements: OrganizationElement[] = [
    {
      id: "identity",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
        </svg>
      ),
      color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      id: "people",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
      color: "bg-green-100 text-green-700 border-green-200"
    },
    {
      id: "processes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
        </svg>
      ),
      color: "bg-purple-100 text-purple-700 border-purple-200"
    },
    {
      id: "data",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      ),
      color: "bg-amber-100 text-amber-700 border-amber-200"
    }
  ];
  
  // Posities voor de elementen rond de centrale organisatie
  const initialPositions = [
    { top: "15%", left: "15%" },     // Linksboven
    { top: "15%", right: "15%" },    // Rechtsboven
    { bottom: "15%", left: "15%" },  // Linksonder
    { bottom: "15%", right: "15%" }  // Rechtsonder
  ];
  
  // Hoeken op de cirkel (in graden) voor elementen in de compacte fase
  const circleAngles = [45, 135, 225, 315]; // linksboven, rechtsboven, linksonder, rechtsonder
  
  // Element op de cirkel positioneren
  const getCirclePosition = (angle: number) => {
    const radius = 70; // Radius van de organisatiecirkel
    // Converteer graden naar radialen
    const radians = (angle * Math.PI) / 180;
    // Bereken x en y positie op de cirkel
    return {
      left: `calc(50% + ${Math.cos(radians) * radius}px)`,
      top: `calc(50% + ${Math.sin(radians) * radius}px)`,
      transform: 'translate(-50%, -50%)' // Centreer het element op het punt
    };
  };
  
  // Bereken posities voor assistenten op de cirkel
  const calculateCirclePositions = (numAssistants: number, radius: number = 170) => {
    const positions = [];
    for (let i = 0; i < numAssistants; i++) {
      // Bereken hoekpositie langs de cirkel (in radialen)
      const angle = (i * 2 * Math.PI / numAssistants);
      // Converteer naar x,y coordinaten
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      positions.push({ x, y });
    }
    return positions;
  };
  
  // Bereken cirkelposities voor het aantal assistenten
  const circlePositions = calculateCirclePositions(6);
  
  // Digitale assistenten
  const assistants: Assistant[] = [
    { 
      id: "assistant1", 
      initialPosition: { top: "10%", left: "45%" }, 
      circlePosition: circlePositions[0],
      color: "bg-gradient-to-r from-indigo-500 to-purple-500", 
      size: "w-10 h-10" 
    },
    { 
      id: "assistant2", 
      initialPosition: { top: "20%", right: "10%" }, 
      circlePosition: circlePositions[1],
      color: "bg-gradient-to-r from-blue-500 to-cyan-500", 
      size: "w-8 h-8" 
    },
    { 
      id: "assistant3", 
      initialPosition: { top: "60%", right: "15%" }, 
      circlePosition: circlePositions[2],
      color: "bg-gradient-to-r from-green-500 to-teal-500", 
      size: "w-12 h-12" 
    },
    { 
      id: "assistant4", 
      initialPosition: { bottom: "20%", right: "45%" }, 
      circlePosition: circlePositions[3],
      color: "bg-gradient-to-r from-amber-500 to-orange-500", 
      size: "w-9 h-9" 
    },
    { 
      id: "assistant5", 
      initialPosition: { bottom: "30%", left: "10%" }, 
      circlePosition: circlePositions[4],
      color: "bg-gradient-to-r from-pink-500 to-rose-500", 
      size: "w-11 h-11" 
    },
    { 
      id: "assistant6", 
      initialPosition: { top: "40%", left: "8%" }, 
      circlePosition: circlePositions[5],
      color: "bg-gradient-to-r from-violet-500 to-fuchsia-500", 
      size: "w-7 h-7" 
    }
  ];
  
  // Compactere posities rond de centrale organisatie met ruimte om volledig zichtbaar te blijven
  const compactPositions = [
    { top: "35%", left: "35%" },     // Linksboven - heel dicht bij de cirkel
    { top: "35%", right: "35%" },    // Rechtsboven - heel dicht bij de cirkel
    { bottom: "35%", left: "35%" },  // Linksonder - heel dicht bij de cirkel
    { bottom: "35%", right: "35%" }  // Rechtsonder - heel dicht bij de cirkel
  ];

  // Framer Motion varianten voor animaties
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5
      }
    }
  };

  const organizationVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        duration: 0.7
      }
    }
  };
  
  // Assistent pulse animatie variants
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Genereer particle posities
  const generateParticles = () => {
    if (!knowledgeFlowing || animationPhase !== 'circle' || knowledgePaused) return null;
    
    const particles: React.ReactNode[] = [];
    const centerX = 0;
    const centerY = 0;
    
    // Maak 4 sets particles, 1 van elk organisatie-element naar elke assistent
    const colors = [
      "bg-blue-400", // Identiteit
      "bg-green-400", // Mensen
      "bg-purple-400", // Processen
      "bg-amber-400"  // Data
    ];
    
    // Voor elke assistent, maak meerdere particles die ernaar toe gaan
    assistants.forEach((assistant, assistantIndex) => {
      if (!assistant.circlePosition) return;
      
      // Voor elk element, maak particles die naar deze assistent gaan
      elements.forEach((element, elementIndex) => {
        // Maak 3 particles per element per assistent met verschillende vertragingen
        for (let i = 0; i < 3; i++) {
          const delay = Math.random() * 2 + (assistantIndex * 0.3) + (elementIndex * 0.2);
          
          // Bereken de hoek en startpositie van het element op de cirkel
          const elementRadians = (circleAngles[elementIndex] * Math.PI) / 180;
          const startX = Math.cos(elementRadians) * 70; // Zelfde radius als element positie
          const startY = Math.sin(elementRadians) * 70; 
          
          // Voeg wat randomness toe aan de startpositie
          const offsetX = (Math.random() * 10 - 5);
          const offsetY = (Math.random() * 10 - 5);
          
          // Eindpunt is de positie van de assistent
          const endX = assistant.circlePosition?.x || 0;
          const endY = assistant.circlePosition?.y || 0;
          
          particles.push(
            <KnowledgeParticle
              key={`particle-${assistantIndex}-${elementIndex}-${i}`}
              startX={startX + offsetX}
              startY={startY + offsetY}
              endX={endX}
              endY={endY}
              color={colors[elementIndex]}
              delay={delay}
            />
          );
        }
      });
    });
    
    return particles;
  };
  
  // Genereer communicatielijnen tussen assistenten
  const generateAssistantConnections = () => {
    if (animationPhase !== 'circle' || !assistantsCommunicating) return null;
    
    const particles: React.ReactNode[] = [];
    const connectionColors = [
      'bg-indigo-500',
      'bg-purple-500',
      'bg-blue-500',
      'bg-cyan-500',
      'bg-violet-600',
      'bg-pink-500'
    ];
    
    // Verminderd aantal verbindingen tussen assistenten
    const connections = [
      [0, 1], // assistant1 -> assistant2
      [1, 2], // assistant2 -> assistant3
      [2, 3], // assistant3 -> assistant4
      [3, 4], // assistant4 -> assistant5
      [4, 5], // assistant5 -> assistant6
      [5, 0], // assistant6 -> assistant1
      [0, 3], // assistant1 -> assistant4 (kruisverbinding)
      [2, 5]  // assistant3 -> assistant6 (kruisverbinding)
    ];
    
    // Voor elke verbinding, maak 1 particle die in één richting beweegt
    connections.forEach(([fromIdx, toIdx], connIdx) => {
      // Haal posities op van de assistenten
      const fromAssistant = assistants[fromIdx];
      const toAssistant = assistants[toIdx];
      
      if (!fromAssistant.circlePosition || !toAssistant.circlePosition) return;
      
      // Bereken de begin- en eindhoek op de cirkel
      const startAngle = Math.atan2(fromAssistant.circlePosition.y, fromAssistant.circlePosition.x);
      const endAngle = Math.atan2(toAssistant.circlePosition.y, toAssistant.circlePosition.x);
      
      // Bepaal of met of tegen de klok in, afwisselend per verbinding
      const isClockwise = connIdx % 2 === 0;
      const color = connectionColors[connIdx % connectionColors.length];
      const delay = connIdx * 0.5 + Math.random() * 0.5;
      
      particles.push(
        <CircularParticle
          key={`connection-${fromIdx}-${toIdx}`}
          startAngle={startAngle}
          endAngle={endAngle}
          radius={170} // Zelfde radius als de cirkel
          color={color}
          delay={delay}
          clockwise={isClockwise}
        />
      );
    });
    
    return particles;
  };

  // Groei-indicator component voor mislukte groei-poging
  const GrowthIndicator = ({ angle, distance }: { angle: number, distance: number }) => {
    return (
      <motion.div
        className="absolute flex items-center justify-center"
        style={{
          left: `calc(50% + ${Math.cos(angle) * distance}px)`,
          top: `calc(50% + ${Math.sin(angle) * distance}px)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0, 1.2, 1.2, 0],
          x: [0, Math.cos(angle) * 30, Math.cos(angle) * 20, 0],  // Beweeg naar het centrum toe en terug
          y: [0, Math.sin(angle) * 30, Math.sin(angle) * 20, 0],  // Beweeg naar het centrum toe en terug
        }}
        transition={{
          duration: 3.5, // Langere duur voor meer zichtbaarheid
          ease: "easeOut",
          times: [0, 0.3, 0.7, 1],
          repeat: Infinity, // Blijf herhalen zolang deze fase actief is
          repeatDelay: 1.0 // Langere pauze tussen herhalingen
        }}
      >
        <div className="text-2xl font-bold text-green-500">+</div>
      </motion.div>
    );
  };

  // Groei barrière component
  const GrowthBarrier = () => {
    return (
      <>
        {/* Rode barrière-ring rond de organisatie */}
        <motion.div 
          className="absolute rounded-full border-4 border-red-600 z-5"
          style={{ 
            width: '144px', 
            height: '144px',
            boxShadow: '0 0 0 0 rgba(255, 0, 0, 0)' 
          }}
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              '0 0 0 0 rgba(255, 0, 0, 0.3)',
              '0 0 20px 4px rgba(255, 0, 0, 0.8)',
              '0 0 0 0 rgba(255, 0, 0, 0.3)'
            ],
          }}
          transition={{
            duration: 3, // Langere duur voor beter zichtbaar effect
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.5, 1]
          }}
        />
        
        {/* Pulserend rood effect wanneer groeiers de barrière raken */}
        <motion.div 
          className="absolute rounded-full bg-red-600 z-4"
          style={{ 
            width: '148px', 
            height: '148px',
            opacity: 0
          }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0.95, 1, 0.95]
          }}
          transition={{
            duration: 3, // Langere duur voor beter zichtbaar effect
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.5, 1]
          }}
        />
        
        {/* Waarschuwingstekst */}
        <motion.div
          className="absolute text-center text-base font-bold text-red-600 px-3 py-1 bg-white/70 rounded-md"
          style={{
            top: '40%',
            width: '100%',
            maxWidth: '180px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3.5, // Langere duur
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.2, 0.8, 1]
          }}
        >
          {t.barriers.growth}
        </motion.div>
      </>
    );
  };

  // Groei-succes component
  const GrowthSuccess = () => {
    return (
      <>
        {/* Groene succesvolle groei ring rondom de organisatie */}
        <motion.div 
          className="absolute rounded-full border-4 border-green-600 z-5"
          style={{ 
            width: '144px', 
            height: '144px',
            boxShadow: '0 0 0 0 rgba(0, 255, 0, 0)' 
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              '0 0 0 0 rgba(0, 200, 0, 0.3)',
              '0 0 20px 4px rgba(0, 200, 0, 0.8)',
              '0 0 0 0 rgba(0, 200, 0, 0.3)'
            ],
            scale: [1, 1.2, 1.4, 1.5, 1]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5
          }}
        />
        
        {/* Groei effect rondom de organisatie */}
        <motion.div 
          className="absolute rounded-full bg-green-100 z-4"
          style={{ 
            width: '124px', 
            height: '124px'
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0.6, 0.4, 0],
            scale: [1, 1.3, 1.5, 1.3, 1]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5
          }}
        />
        
        {/* Groei-indicators rondom de organisatie */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI / 4);
          const radius = 90 + i % 2 * 20; // Afwisselende afstanden voor een stervormig effect
          
          return (
            <motion.div
              key={`success-${i}`}
              className="absolute flex items-center justify-center"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1, 0],
                x: [0, Math.cos(angle) * 15, Math.cos(angle) * 25, Math.cos(angle) * 30],
                y: [0, Math.sin(angle) * 15, Math.sin(angle) * 25, Math.sin(angle) * 30],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                delay: i * 0.1,
                times: [0, 0.3, 0.7, 1],
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0.7
              }}
            >
              <div className="text-2xl font-bold text-green-500">+</div>
            </motion.div>
          );
        })}
      </>
    );
  };

  // Geen client-side rendering? Toon een placeholder
  if (!isClient) {
    return <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg"></div>;
  }

  return (
    <div 
      className="w-full h-full relative flex flex-col items-center justify-center"
      onClick={handleUserInteraction}
      onKeyDown={handleUserInteraction}
      tabIndex={0}
    >
      {/* Toon startscherm als animatie nog niet is gestart */}
      {!hasStarted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-white/90">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {locale === 'nl' ? 'AI Visualisatie' : 'AI Visualization'}
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              {locale === 'nl' 
                ? 'Ontdek hoe AI assistenten jouw organisatie kunnen helpen groeien.' 
                : 'Discover how AI assistants can help your organization grow.'}
            </p>
          </div>
          <button
            onClick={() => {
              setHasStarted(true);
              handleUserInteraction(); // Activeer gebruikersinteractie voor audio
              startAnimation(); // Start de animatie
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            {locale === 'nl' ? 'Starten' : 'Start'}
          </button>
        </div>
      )}

      {/* Fase titel gecentreerd boven de animatie */}
      <div className="absolute top-2 left-0 right-0 text-center z-30">
        <h2 className="text-xl font-bold text-gray-800 bg-white/80 py-2 px-4 rounded-lg inline-block shadow-sm">
          {stageText}
        </h2>
      </div>

      {/* Centrale visualisatie container */}
      <motion.div 
        className="w-full h-full flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={isAnimating ? "visible" : "hidden"}
      >
        {/* Cirkel rondom organisatie (alleen zichtbaar in cirkel fase) */}
        {animationPhase === 'circle' && (
          <motion.div 
            className={`absolute w-[340px] h-[340px] rounded-full border-2 ${assistantsCommunicating ? 'border-dashed' : 'border-dashed'} border-blue-300 z-5`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: assistantsCommunicating ? [0.4, 0.7, 0.4] : 0.7, 
              scale: 1,
              borderColor: assistantsCommunicating ? ['rgba(147, 197, 253, 0.5)', 'rgba(147, 197, 253, 0.8)', 'rgba(147, 197, 253, 0.5)'] : 'rgba(147, 197, 253, 0.7)'
            }}
            transition={{ 
              duration: assistantsCommunicating ? 3 : 0.8,
              repeat: assistantsCommunicating ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
        )}
        
        {/* Kennisdeeltjes */}
        {generateParticles()}
        
        {/* Communicatielijnen/deeltjes tussen assistenten langs cirkel */}
        {generateAssistantConnections()}
        
        {/* Groei-indicatoren (alleen zichtbaar tijdens groei-fase) */}
        {growthAttempt && (
          <>
            {/* Puls-effect op de organisatie */}
            <motion.div 
              className="absolute w-[120px] h-[120px] rounded-full bg-green-100 opacity-30 z-4"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            {/* Barrière effect dat groei stopt */}
            <GrowthBarrier />
            
            {/* Groei-indicators rondom de organisatie */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const angle = (i * Math.PI / 4);
              return <GrowthIndicator key={`growth-${i}`} angle={angle} distance={100} />;
            })}
          </>
        )}
        
        {/* Groei-succes (alleen zichtbaar tijdens de groei-succes fase) */}
        {growthSuccess && <GrowthSuccess />}
        
        {/* Centrale organisatie */}
        <motion.div 
          className={`w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white border-2 ${growthAttempt ? 'border-green-400' : growthSuccess ? 'border-green-500' : 'border-blue-400'} rounded-full shadow-lg relative z-10 flex items-center justify-center`}
          initial={{ scale: 0 }}
          animate={{ 
            scale: growthAttempt ? [1, 1.15, 1] : growthSuccess ? [1, 1.2, 1.3, 1.2] : 1,
            borderWidth: growthAttempt ? ['2px', '4px', '2px'] : growthSuccess ? ['2px', '3px', '4px', '3px'] : '2px'
          }}
          transition={{ 
            duration: growthAttempt ? 2 : growthSuccess ? 2.5 : 0.5,
            repeat: growthAttempt || growthSuccess ? Infinity : 0,
            repeatType: "loop",
            repeatDelay: growthSuccess ? 0.5 : 0
          }}
        >
          <div className="text-center text-sm md:text-base text-gray-800 font-medium">
            {t.organization.title}
          </div>
        </motion.div>

        {/* Organisatie elementen */}
        {elements.map((element, index) => {
          // Controleer of dit element al zichtbaar zou moeten zijn
          const isVisible = visibleElements.includes(element.id);
            
          // Bereken positie op basis van de animatiefase
          let position: any;
          let elementStyle: any = {};
          
          if (animationPhase === 'initial') {
            position = initialPositions[index];
          } else {
            // In compacte fase, plaats op de cirkel
            position = getCirclePosition(circleAngles[index]);
            // Verander de stijl voor compacte fase
            elementStyle = {
              width: '32px',
              height: '32px',
              padding: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            };
          }
          
          return (
            <motion.div
              key={element.id}
              className={`absolute flex items-center gap-2 ${element.color} ${animationPhase === 'initial' ? 'px-3 py-2 rounded-lg' : 'rounded-lg'} border shadow-sm z-20`}
              style={elementStyle}
              initial={{ 
                ...initialPositions[index], 
                scale: 0, 
                opacity: 0 
              }}
              animate={isVisible ? { 
                ...position,
                scale: 1,
                opacity: 1
              } : {
                ...initialPositions[index],
                scale: 0,
                opacity: 0
              }}
              transition={{ 
                type: "spring", 
                stiffness: 150, 
                damping: 15,
                duration: 0.7
              }}
            >
              <span className={`${animationPhase === 'initial' ? 'w-6 h-6' : 'w-5 h-5'}`}>{element.icon}</span>
              {animationPhase === 'initial' && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {t.organization.elements[element.id as keyof typeof t.organization.elements]}
                </span>
              )}
            </motion.div>
          );
        })}
        
        {/* Digitale assistenten */}
        {assistants.map((assistant, index) => {
          // Controleer of deze assistent al zichtbaar zou moeten zijn
          const isVisible = visibleAssistants.includes(assistant.id);
          
          // Bepaal de positie op basis van de animatiefase
          let position: any = assistant.initialPosition;
          
          // In de cirkel fase, gebruik de cirkelposities (center van het scherm + x,y offset van de assistent's cirkelPositie)
          if (animationPhase === 'circle' && assistant.circlePosition) {
            position = {
              top: `calc(50% - ${assistant.circlePosition.y}px)`,
              left: `calc(50% + ${assistant.circlePosition.x}px)`
            };
          }
          
          return (
            <motion.div
              key={assistant.id}
              className={`absolute ${assistant.size} ${assistant.color} rounded-full flex items-center justify-center shadow-md z-15`}
              style={animationPhase === 'circle' ? undefined : position}
              initial={{ 
                scale: 0, 
                opacity: 0 
              }}
              animate={isVisible ? 
                animationPhase === 'circle' 
                  ? {
                      top: position.top,
                      left: position.left,
                      scale: 1,
                      opacity: 1,
                      translateX: '-50%',  // Centreren van het bolletje
                      translateY: '-50%',  // Centreren van het bolletje
                      boxShadow: knowledgeFlowing ? "0 0 15px rgba(255, 255, 255, 0.6)" : "none"
                    }
                  : {
                      scale: 1,
                      opacity: 1
                    }
                : {
                    scale: 0,
                    opacity: 0
                }
              }
              transition={{ 
                type: "spring", 
                stiffness: 80,  // Verlaagd van 120 voor soepelere beweging
                damping: 15,    // Verlaagd van 20 voor meer natuurlijke beweging
                duration: 1.2   // Verhoogd van 1 voor langere, vloeiendere animatie
              }}
            >
              {/* Pulse ring effect voor AI gevoel */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0.3, scale: 1 }}
                animate={isVisible ? { 
                  opacity: knowledgeFlowing && animationPhase === 'circle' 
                    ? [0.5, 0.8, 0.5] 
                    : [0.5, 0.2, 0.5], 
                  scale: knowledgeFlowing && animationPhase === 'circle'
                    ? [1, 1.15, 1]
                    : [1, 1.1, 1],
                  borderWidth: [1, 2, 1]
                } : { opacity: 0 }}
                transition={{ 
                  duration: knowledgeFlowing && animationPhase === 'circle' ? 1.5 : 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ 
                  background: 'transparent', 
                  border: '2px solid rgba(255, 255, 255, 0.5)'
                }}
              />
              
              {/* Centrale punt voor AI-bolletje */}
              <div className={`w-2 h-2 ${knowledgeFlowing && animationPhase === 'circle' ? 'bg-white scale-125' : 'bg-white'} rounded-full transition-all duration-300`}></div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
        {/* Reset knop */}
        <button 
          onClick={() => {
            setHasStarted(true); // Houd de animatie in gestarte toestand
            startAnimation(); // Start de animatie opnieuw
          }}
          className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
          aria-label={t.controls.restart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
        
        {/* Audio toggle knop */}
        <button 
          onClick={() => {
            handleUserInteraction();
            setAudioEnabled(!audioEnabled);
          }}
          className={`p-2 rounded-full ${audioEnabled ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'} hover:bg-blue-100 transition-colors`}
          aria-label={audioEnabled ? "Audio uitschakelen" : "Audio inschakelen"}
          title={audioEnabled ? "Audio uitschakelen" : "Audio inschakelen"}
        >
          {audioEnabled ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Audio hint als gebruiker nog niet heeft geïnteracteerd */}
      {isClient && audioEnabled && !userInteracted && (
        <div className="absolute top-16 left-0 right-0 text-center z-40">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg inline-flex items-center gap-2 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
            <span>Klik op de visualisatie om audio in te schakelen</span>
          </div>
        </div>
      )}
    </div>
  );
} 