import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface VoiceButtonProps {
  onVoiceCommand?: (command: string) => void;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  label?: string;
}

export const VoiceButton = ({ onVoiceCommand, size = "xl", label = "Tap to speak" }: VoiceButtonProps) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isListening) {
      // Visual and audio feedback
      const utterance = new SpeechSynthesisUtterance("Listening");
      window.speechSynthesis.speak(utterance);
    }
  }, [isListening]);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      setTimeout(() => {
        const commands = ["Scan", "Read", "Navigate", "Emergency"];
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        onVoiceCommand?.(randomCommand);
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        variant="voice"
        size={size}
        onClick={handleVoiceToggle}
        className={`relative overflow-hidden shadow-2xl ${
          isListening ? "animate-pulse bg-voice-active shadow-glow/60" : "shadow-primary/30"
        }`}
        aria-label={isListening ? "Listening for voice command" : label}
      >
        {isListening ? (
          <MicOff className="h-16 w-16" aria-hidden="true" />
        ) : (
          <Mic className="h-16 w-16" aria-hidden="true" />
        )}
        {isListening && (
          <>
            <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-40" />
            <span className="absolute inset-0 animate-pulse rounded-full bg-glow/20" />
          </>
        )}
      </Button>
      {!isListening && (
        <p className="text-accessible-lg font-bold text-center" aria-live="polite">
          {label}
        </p>
      )}
      {isListening && (
        <p className="text-accessible-lg font-bold text-primary animate-pulse" aria-live="polite">
          Listening...
        </p>
      )}
    </div>
  );
};
