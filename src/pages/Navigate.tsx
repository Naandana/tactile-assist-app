import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { VoiceButton } from "@/components/VoiceButton";
import { Navigation, ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Navigate = () => {
  const [voiceMessage, setVoiceMessage] = useState("Say Navigate to start");
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const navigationSteps = [
    "Head north 50 meters",
    "Turn right onto Oak Avenue",
    "Continue straight 200 meters",
    "Destination on the left",
  ];

  const startNavigation = () => {
    setIsNavigating(true);
    setCurrentStep(0);
    setVoiceMessage(navigationSteps[0]);
  };

  const nextStep = () => {
    if (currentStep < navigationSteps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setVoiceMessage(navigationSteps[next]);
    } else {
      setIsNavigating(false);
      setVoiceMessage("You have arrived");
    }
  };

  const handleVoiceCommand = () => {
    if (!isNavigating) {
      startNavigation();
    } else {
      nextStep();
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
