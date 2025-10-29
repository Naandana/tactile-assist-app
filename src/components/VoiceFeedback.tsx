import { Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

interface VoiceFeedbackProps {
  message: string;
  autoSpeak?: boolean;
}

export const VoiceFeedback = ({ message, autoSpeak = true }: VoiceFeedbackProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message && autoSpeak) {
      setIsVisible(true);
      // Simulate speech synthesis
      console.log("🔊 Speaking:", message);
      
      // In a real implementation, use Web Speech API:
      // const utterance = new SpeechSynthesisUtterance(message);
      // window.speechSynthesis.speak(utterance);

      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, autoSpeak]);

  if (!isVisible || !message) return null;

  return (
    <div
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-card border-2 border-primary rounded-full px-8 py-4 shadow-2xl shadow-primary/40 animate-in fade-in slide-in-from-top-4"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-4">
        <Volume2 className="h-8 w-8 text-primary animate-pulse" aria-hidden="true" />
        <p className="text-accessible-base font-bold">{message}</p>
      </div>
    </div>
  );
};
