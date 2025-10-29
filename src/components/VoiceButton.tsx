import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface VoiceButtonProps {
  onVoiceCommand?: (command: string) => void;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
}

export const VoiceButton = ({ onVoiceCommand, size = "xl" }: VoiceButtonProps) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    
    // Simulate voice command recognition
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
    <Button
      variant="voice"
      size={size}
      onClick={handleVoiceToggle}
      className={`relative overflow-hidden ${
        isListening ? "animate-pulse bg-voice-active" : ""
      }`}
      aria-label={isListening ? "Listening for voice command" : "Tap to speak"}
    >
      {isListening ? (
        <>
          <MicOff className="h-12 w-12" />
          <span className="sr-only">Stop listening</span>
        </>
      ) : (
        <>
          <Mic className="h-12 w-12" />
          <span className="sr-only">Start voice command</span>
        </>
      )}
      {isListening && (
        <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-40" />
      )}
    </Button>
  );
};
