import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { VoiceButton } from "@/components/VoiceButton";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { speak } from "@/lib/speech";

const Emergency = () => {
  const [voiceMessage, setVoiceMessage] = useState("Tap SOS for emergency or say Emergency");
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const activateEmergency = async () => {
    setIsActivated(true);
    setVoiceMessage("Emergency mode activated. Alert will be sent in 5 seconds. Tap cancel to stop.");
    await speak("Emergency mode activated. Sending alert in 5 seconds. Tap cancel to stop.", { type: "prompt" });

    let count = 5;
    timerRef.current = setInterval(async () => {
      count--;
      setCountdown(count);
      
      if (count > 0) {
        setVoiceMessage(`Sending alert in ${count} seconds`);
        await speak(`${count}`, { type: "prompt" });
      } else {
        // Clear interval before sending alert to prevent overlap
        if (timerRef.current) clearInterval(timerRef.current);
        sendEmergencyAlert();
      }
    }, 1000);
  };

  const sendEmergencyAlert = async () => {
    setIsSent(true);
    const message = "Emergency alert sent successfully. Your location has been shared with emergency services and your emergency contact. Help is on the way.";
    setVoiceMessage(message);
    
    // Ensure the full message is spoken without interruption
    await new Promise(resolve => setTimeout(resolve, 300));
    await speak(message, { slow: true, type: "confirmation" });
  };

  const cancelEmergency = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    window.speechSynthesis.cancel();
    setIsActivated(false);
    setCountdown(5);
    setVoiceMessage("Emergency alert cancelled.");
    await new Promise(resolve => setTimeout(resolve, 100));
    await speak("Alert cancelled.", { type: "confirmation" });
  };

  const handleVoiceCommand = async () => {
    if (!isSent && !isActivated) {
      await speak("Activating emergency mode.", { type: "prompt" });
      setTimeout(() => activateEmergency(), 500);
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
              <CheckCircle className="h-40 w-40 mx-auto text-primary animate-pulse" aria-hidden="true" />
              <p className="text-accessible-2xl font-bold text-primary leading-tight">
                Emergency Alert Sent Successfully
              </p>
              <p className="text-accessible-lg text-muted-foreground">
                Location shared with emergency services
              </p>
            </div>
          ) : isActivated ? (
            <div className="text-center space-y-8">
              <AlertCircle className="h-40 w-40 mx-auto text-destructive animate-pulse" aria-hidden="true" />
              <p className="text-accessible-2xl font-extrabold text-destructive">{countdown}</p>
              <p className="text-accessible-lg text-destructive/80">Sending alert...</p>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <AlertCircle className="h-40 w-40 mx-auto text-destructive/60" aria-hidden="true" />
              <p className="text-accessible-xl text-muted-foreground">Ready to send emergency alert</p>
            </div>
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
