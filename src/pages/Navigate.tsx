import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { VoiceButton } from "@/components/VoiceButton";
import { Navigation, ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { speak } from "@/lib/speech";

const Navigate = () => {
  const [voiceMessage, setVoiceMessage] = useState("Where would you like to go? Say Navigate to start.");
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const navigationSteps = [
    "Starting navigation. Head north for 50 meters.",
    "In 20 meters, turn right onto Oak Avenue.",
    "Continue straight on Oak Avenue for 200 meters.",
    "Your destination is on the left in 30 meters.",
    "You have arrived at your destination."
  ];

  const startNavigation = () => {
    setIsNavigating(true);
    setCurrentStep(0);
    setVoiceMessage(navigationSteps[0]);
    speak("Navigation started. " + navigationSteps[0], { slow: true });
  };

  const nextStep = () => {
    if (currentStep < navigationSteps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setVoiceMessage(navigationSteps[next]);
      speak(navigationSteps[next], { slow: true });
    } else {
      setIsNavigating(false);
      setVoiceMessage("Navigation complete. You have arrived.");
      speak("Navigation complete. You have arrived at your destination.");
    }
  };

  const handleVoiceCommand = () => {
    if (!isNavigating) {
      speak("Starting navigation now.");
      setTimeout(() => startNavigation(), 500);
    } else {
      setTimeout(() => nextStep(), 300);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <VoiceFeedback message={voiceMessage} />

      <main className="container max-w-4xl mx-auto px-6 py-12">
        <header className="flex items-center justify-between mb-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            aria-label="Go back"
          >
            <ArrowLeft className="h-10 w-10" />
          </Button>
        </header>

        {/* Voice Button */}
        <div className="flex justify-center mb-12">
          <VoiceButton 
            onVoiceCommand={handleVoiceCommand} 
            label={isNavigating ? "Say Next" : "Say Navigate"} 
          />
        </div>

        {/* Map/Direction Display */}
        <Card className="mb-12 aspect-square bg-card border-4 border-primary/30 rounded-3xl flex items-center justify-center p-10">
          {isNavigating ? (
            <div className="text-center space-y-8">
              <MapPin className="h-40 w-40 mx-auto text-primary animate-pulse" aria-hidden="true" />
              <p className="text-accessible-2xl font-bold leading-tight">
                {navigationSteps[currentStep]}
              </p>
            </div>
          ) : (
            <Navigation className="h-40 w-40 text-muted-foreground" aria-hidden="true" />
          )}
        </Card>

        {/* Action Button */}
        {!isNavigating ? (
          <Button
            size="xl"
            onClick={startNavigation}
            className="w-full h-40 text-accessible-2xl font-extrabold rounded-3xl shadow-2xl"
            aria-label="Start navigation"
          >
            <Navigation className="h-20 w-20" aria-hidden="true" />
            Navigate
          </Button>
        ) : (
          <Button
            size="xl"
            onClick={nextStep}
            className="w-full h-40 text-accessible-2xl font-extrabold rounded-3xl shadow-2xl"
            aria-label="Next step"
          >
            {currentStep === navigationSteps.length - 1 ? "Complete" : "Next"}
          </Button>
        )}
      </main>
    </div>
  );
};

export default Navigate;
