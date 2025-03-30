"use client";

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useLocale } from 'next-intl';
import { ChatWindow } from '@/app/components/ui/chat-window';
import { ChatMessage } from '@/app/types';

export function ChatButton() {
  const locale = useLocale();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content: locale === 'nl' 
        ? "Hallo, ik ben Wilson, je AI-assistent. Hoe kan ik je vandaag helpen?" 
        : "Hello, I'm Wilson, your AI assistant. How can I help you today?",
    },
  ]);

  const handleNewMessage = (message: string) => {
    if (message.trim() === "") return;

    // Add user message
    const newUserMessage: ChatMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        role: "system",
        content: locale === 'nl'
          ? "Dank voor je bericht. Een medewerker van The Next Wilson neemt zo snel mogelijk contact met je op."
          : "Thank you for your message. A member of The Next Wilson team will contact you as soon as possible.",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Fancy chat knop met pulserende animatie */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-16 w-16 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
        aria-label={locale === 'nl' ? "Chat met Wilson" : "Chat with Wilson"}
      >
        {/* Gradient achtergrond */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        {/* Pulserend effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></div>
        
        {/* Icoon */}
        <MessageSquare className="h-7 w-7 text-white relative z-10" />
        
        {/* Tooltip */}
        <div className="absolute right-0 bottom-20 bg-white rounded-lg shadow-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          <div className="text-sm font-medium text-gray-800">
            {locale === 'nl' ? "Chat met Wilson" : "Chat with Wilson"}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {locale === 'nl' ? "Stel je vraag direct" : "Ask your question directly"}
          </div>
          {/* Pijltje naar beneden */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45"></div>
        </div>
      </button>

      {/* Chat venster */}
      <ChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        onSendMessage={handleNewMessage}
      />
    </>
  );
} 