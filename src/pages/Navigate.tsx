import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { Navigation, ArrowLeft, MapPin, ArrowRight, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Navigate = () => {
  const [voiceMessage, setVoiceMessage] = useState("Say 'Navigate' or tap to start navigation");
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const navigationSteps = [
    { instruction: "Head north on Main Street", distance: "50 meters", icon: ArrowUp },
    { instruction: "Turn right onto Oak Avenue", distance: "10 meters", icon: ArrowRight },
    { instruction: "Continue straight for 200 meters", distance: "200 meters", icon: ArrowUp },
    { instruction: "Your destination is on the left", distance: "Arrived", icon: MapPin },
  ];

  const startNavigation = () => {
    setIsNavigating(true);
    setCurrentStep(0);
    announceStep(0);
  };

  const announceStep = (stepIndex: number) => {
    if (stepIndex < navigationSteps.length) {
      const step = navigationSteps[stepIndex];
      setVoiceMessage(`${step.instruction}. ${step.distance}.`);
    }
  };

  const nextStep = () => {
    if (currentStep < navigationSteps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      announceStep(next);
    } else {
      setIsNavigating(false);
      setVoiceMessage("You have arrived at your destination");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <VoiceFeedback message={voiceMessage} />

      <main className="container max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            aria-label="Go back to home"
          >
            <ArrowLeft className="h-8 w-8" />
            Back
          </Button>
          <h1 className="text-4xl">Navigation</h1>
        </header>

        {/* Map Area */}
        <Card className="mb-8 aspect-square bg-card border-2 border-primary/30 flex items-center justify-center relative overflow-hidden">
          <div className="text-center space-y-6 p-8">
            <Navigation
              className={`h-32 w-32 mx-auto ${
                isNavigating ? "text-primary animate-pulse" : "text-muted-foreground"
              }`}
              aria-hidden="true"
            />
            <p className="text-accessible-lg text-muted-foreground">
              {isNavigating ? "Navigation active" : "Map preview"}
            </p>
          </div>
        </Card>

        {/* Current Direction */}
        {isNavigating && (
          <Card className="mb-8 p-8 bg-primary/10 border-2 border-primary">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                {(() => {
                  const StepIcon = navigationSteps[currentStep].icon;
                  return <StepIcon className="h-20 w-20 text-primary" aria-hidden="true" />;
                })()}
              </div>
              <div className="text-center space-y-3">
                <p className="text-accessible-xl font-bold">
                  {navigationSteps[currentStep].instruction}
                </p>
                <p className="text-accessible-lg text-muted-foreground">
                  {navigationSteps[currentStep].distance}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-6">
          {!isNavigating ? (
            <Button
              size="xl"
              onClick={startNavigation}
              className="w-full h-32 text-accessible-xl font-extrabold"
              aria-label="Start voice-guided navigation"
            >
              <Navigation className="h-16 w-16" />
              Start Navigation
            </Button>
          ) : (
            <>
              <Button
                size="xl"
                onClick={nextStep}
                className="w-full h-32 text-accessible-xl font-extrabold"
                aria-label="Continue to next navigation step"
              >
                <ArrowRight className="h-16 w-16" />
                {currentStep === navigationSteps.length - 1 ? "Complete" : "Next Step"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsNavigating(false)}
                className="w-full"
                aria-label="Stop navigation"
              >
                Stop Navigation
              </Button>
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-accessible-base text-muted-foreground">
            Get step-by-step voice-guided directions to your destination.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Navigate;
