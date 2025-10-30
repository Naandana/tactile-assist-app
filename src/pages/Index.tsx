import { useState, useEffect } from "react";
import { VoiceButton } from "@/components/VoiceButton";
import { FeatureCard } from "@/components/FeatureCard";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { Camera, FileText, Navigation, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { speak, initializeVoices } from "@/lib/speech";

const Index = () => {
  const [voiceMessage, setVoiceMessage] = useState(
    "Welcome to Accessibility Assistant. Say Scan, Read Text, Navigate, or Emergency."
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize voices on mount
    initializeVoices();
  }, []);

  const handleVoiceCommand = (command: string) => {
    const commandMap: Record<string, { route: string; message: string }> = {
      Scan: { route: "/scan", message: "Opening scan feature" },
      Read: { route: "/read", message: "Opening text reader" },
      Navigate: { route: "/navigate", message: "Opening navigation" },
      Emergency: { route: "/emergency", message: "Opening emergency mode" },
    };
    
    const action = commandMap[command];
    if (action) {
      setVoiceMessage(action.message);
      speak(action.message);
      setTimeout(() => navigate(action.route), 1000);
    }
  };

  const features = [
    {
      icon: Camera,
      title: "Scan",
      description: "Identify objects",
      route: "/scan",
      ariaLabel: "Scan objects around you",
    },
    {
      icon: FileText,
      title: "Read",
      description: "Text to speech",
      route: "/read",
      ariaLabel: "Read text from images",
    },
    {
      icon: Navigation,
      title: "Navigate",
      description: "Voice directions",
      route: "/navigate",
      ariaLabel: "Get voice-guided navigation",
    },
    {
      icon: AlertCircle,
      title: "Emergency",
      description: "Send SOS",
      route: "/emergency",
      ariaLabel: "Emergency alert",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <VoiceFeedback message={voiceMessage} />
      
      <main className="container max-w-5xl mx-auto px-6 py-16">
        {/* Voice Button - Primary Interaction */}
        <div className="flex justify-center mb-20">
          <VoiceButton onVoiceCommand={handleVoiceCommand} label="Speak or Tap" />
        </div>

        {/* Feature Grid - Simplified */}
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          {features.map((feature) => (
            <FeatureCard key={feature.route} {...feature} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
