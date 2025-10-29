import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { VoiceButton } from "@/components/VoiceButton";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Emergency = () => {
  const [voiceMessage, setVoiceMessage] = useState("Say Emergency or tap SOS");
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const activateEmergency = () => {
    setIsActivated(true);
    setVoiceMessage("Emergency alert in 5 seconds");

    let count = 5;
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      setVoiceMessage(`Alert in ${count}`);

      if (count === 0) {
        clearInterval(timer);
        sendEmergencyAlert();
      }
    }, 1000);
  };

  const sendEmergencyAlert = () => {
    setIsSent(true);
    setVoiceMessage("Emergency alert sent. Location shared.");
  };

  const cancelEmergency = () => {
    setIsActivated(false);
    setCountdown(5);
    setVoiceMessage("Cancelled");
  };

  const handleVoiceCommand = () => {
    if (!isSent && !isActivated) {
      activateEmergency();
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
        {!isSent && !isActivated && (
          <div className="flex justify-center mb-12">
            <VoiceButton onVoiceCommand={handleVoiceCommand} label="Say Emergency" />
          </div>
        )}

        {/* Status Display */}
        <Card className="mb-12 aspect-square bg-card border-4 border-destructive/40 rounded-3xl flex items-center justify-center p-10">
          {isSent ? (
            <div className="text-center space-y-8">
              <CheckCircle className="h-40 w-40 mx-auto text-primary" aria-hidden="true" />
              <p className="text-accessible-2xl font-bold text-primary">Alert Sent</p>
            </div>
          ) : isActivated ? (
            <div className="text-center space-y-8">
              <AlertCircle className="h-40 w-40 mx-auto text-destructive animate-pulse" aria-hidden="true" />
              <p className="text-accessible-2xl font-extrabold text-destructive">{countdown}</p>
            </div>
          ) : (
            <AlertCircle className="h-40 w-40 text-muted-foreground" aria-hidden="true" />
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6">
          {!isSent && !isActivated && (
            <Button
              variant="emergency"
              size="xl"
              onClick={activateEmergency}
              className="w-full h-48 text-accessible-2xl rounded-3xl shadow-2xl"
              aria-label="Send emergency SOS"
            >
              <AlertCircle className="h-24 w-24" aria-hidden="true" />
              SOS
            </Button>
          )}

          {isActivated && !isSent && (
            <Button
              variant="outline"
              size="xl"
              onClick={cancelEmergency}
              className="w-full h-40 text-accessible-2xl font-bold border-4 rounded-3xl"
              aria-label="Cancel emergency"
            >
              Cancel
            </Button>
          )}

          {isSent && (
            <Button
              variant="tactile"
              size="xl"
              onClick={() => {
                setIsSent(false);
                setIsActivated(false);
                setCountdown(5);
                setVoiceMessage("Ready");
              }}
              className="w-full h-40 text-accessible-2xl font-bold rounded-3xl"
              aria-label="Reset"
            >
              Reset
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Emergency;
