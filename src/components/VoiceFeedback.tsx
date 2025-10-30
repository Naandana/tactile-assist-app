import { Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { speak } from "@/lib/speech";

interface VoiceFeedbackProps {
  message: string;
  autoSpeak?: boolean;
}

export const VoiceFeedback = ({ message, autoSpeak = true }: VoiceFeedbackProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message && autoSpeak) {
      setIsVisible(true);
      
      // Use enhanced speech utility
      speak(message, { slow: true });

      const timer = setTimeout(() => setIsVisible(false), 4000);
      return () => {
        clearTimeout(timer);
        window.speechSynthesis.cancel();
      };
    }
  }, [message, autoSpeak]);

  if (!isVisible || !message) return null;

  return (
    <div
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-full mx-4 bg-card border-4 border-primary rounded-3xl px-10 py-6 shadow-2xl shadow-primary/50 animate-in fade-in slide-in-from-top-4"
      role="status"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex items-center gap-6">
        <Volume2 className="h-12 w-12 text-primary animate-pulse flex-shrink-0" aria-hidden="true" />
        <p className="text-accessible-xl font-bold leading-tight">{message}</p>
      </div>
    </div>
  );
};
