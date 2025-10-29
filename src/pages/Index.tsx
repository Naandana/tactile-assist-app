import { useState } from "react";
import { VoiceButton } from "@/components/VoiceButton";
import { FeatureCard } from "@/components/FeatureCard";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { Camera, FileText, Navigation, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [voiceMessage, setVoiceMessage] = useState(
    "Welcome to Accessibility Assistant. You can say: Scan, Read Text, Navigate, or Emergency."
  );
  const navigate = useNavigate();

  const handleVoiceCommand = (command: string) => {
    setVoiceMessage(`Command received: ${command}`);
    
    // Navigate based on voice command
    const commandMap: Record<string, string> = {
      Scan: "/scan",
      Read: "/read",
      Navigate: "/navigate",
      Emergency: "/emergency",
    };
    
    const route = commandMap[command];
    if (route) {
      setTimeout(() => navigate(route), 1000);
    }
  };

  const features = [
    {
      icon: Camera,
      title: "Scan Object",
      description: "Identify objects around you",
      route: "/scan",
      ariaLabel: "Navigate to scan object feature",
    },
    {
      icon: FileText,
      title: "Read Text",
      description: "Read text from images aloud",
      route: "/read",
      ariaLabel: "Navigate to read text feature",
    },
    {
      icon: Navigation,
      title: "Navigation",
      description: "Get voice-guided directions",
      route: "/navigate",
      ariaLabel: "Navigate to navigation feature",
    },
    {
      icon: AlertCircle,
      title: "Emergency",
      description: "Send SOS to emergency contact",
      route: "/emergency",
      ariaLabel: "Navigate to emergency SOS feature",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <VoiceFeedback message={voiceMessage} />
      
      <main className="container max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="mb-6">Accessibility Assistant</h1>
          <p className="text-accessible-lg text-muted-foreground max-w-2xl mx-auto">
            Your voice-powered companion for everyday accessibility
          </p>
        </header>

        {/* Voice Button */}
        <div className="flex justify-center mb-16">
          <div className="text-center space-y-6">
            <VoiceButton onVoiceCommand={handleVoiceCommand} />
            <p className="text-accessible-base text-muted-foreground">
              Tap or say a command
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.route} {...feature} />
          ))}
        </div>

        {/* Accessibility Info */}
        <div className="mt-16 text-center">
          <p className="text-accessible-sm text-muted-foreground max-w-xl mx-auto">
            This app is designed to be fully accessible through voice commands.
            All features can be activated by speaking or tapping large tactile buttons.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
