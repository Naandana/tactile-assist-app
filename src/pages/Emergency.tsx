import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { AlertCircle, ArrowLeft, Phone, MapPin, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Emergency = () => {
  const [voiceMessage, setVoiceMessage] = useState(
    "This is the emergency page. Tap the SOS button or say 'Emergency' to send alert."
  );
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const activateEmergency = () => {
    setIsActivated(true);
    setVoiceMessage("Emergency alert activating in 5 seconds. Tap cancel to stop.");

    let count = 5;
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      setVoiceMessage(`Emergency alert in ${count} seconds`);

      if (count === 0) {
        clearInterval(timer);
        sendEmergencyAlert();
      }
    }, 1000);
  };

  const sendEmergencyAlert = () => {
    setIsSent(true);
    setVoiceMessage(
      "Emergency alert sent. Your location has been shared with your emergency contact."
    );
  };

  const cancelEmergency = () => {
    setIsActivated(false);
    setCountdown(5);
    setVoiceMessage("Emergency alert cancelled");
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
          <h1 className="text-4xl">Emergency SOS</h1>
        </header>

        {/* Status Card */}
        {isSent ? (
          <Card className="mb-8 p-12 bg-primary/10 border-2 border-primary text-center space-y-6">
            <CheckCircle className="h-32 w-32 mx-auto text-primary" aria-hidden="true" />
            <div className="space-y-4">
              <h2 className="text-accessible-xl font-bold text-primary">Alert Sent Successfully</h2>
              <p className="text-accessible-lg">
                Your emergency contact has been notified and your location has been shared.
              </p>
            </div>
          </Card>
        ) : (
          <Card className="mb-8 p-12 bg-card border-2 border-destructive/30 text-center space-y-6">
            <AlertCircle
              className={`h-32 w-32 mx-auto ${
                isActivated ? "text-destructive animate-pulse" : "text-muted-foreground"
              }`}
              aria-hidden="true"
            />
            {isActivated && (
              <div className="space-y-4">
                <p className="text-accessible-2xl font-extrabold text-destructive">
                  {countdown}
                </p>
                <p className="text-accessible-lg text-muted-foreground">
                  Sending emergency alert...
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Emergency Info */}
        {!isSent && (
          <div className="mb-8 space-y-4">
            <Card className="p-6 flex items-start gap-4">
              <Phone className="h-10 w-10 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="text-accessible-lg font-bold mb-2">Emergency Contact</h3>
                <p className="text-accessible-base text-muted-foreground">
                  John Doe - (555) 123-4567
                </p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <MapPin className="h-10 w-10 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="text-accessible-lg font-bold mb-2">Your Location</h3>
                <p className="text-accessible-base text-muted-foreground">
                  Will be shared when alert is sent
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-6">
          {!isSent && !isActivated && (
            <Button
              variant="emergency"
              size="xl"
              onClick={activateEmergency}
              className="w-full h-40 text-accessible-2xl"
              aria-label="Activate emergency SOS alert"
            >
              <AlertCircle className="h-20 w-20" />
              SOS
            </Button>
          )}

          {isActivated && !isSent && (
            <Button
              variant="outline"
              size="xl"
              onClick={cancelEmergency}
              className="w-full h-32 text-accessible-xl font-bold border-4"
              aria-label="Cancel emergency alert"
            >
              Cancel
            </Button>
          )}

          {isSent && (
            <Button
              variant="tactile"
              size="lg"
              onClick={() => {
                setIsSent(false);
                setIsActivated(false);
                setCountdown(5);
                setVoiceMessage("Ready to send another alert if needed");
              }}
              className="w-full"
              aria-label="Reset emergency alert"
            >
              Reset
            </Button>
          )}
        </div>

        {/* Warning */}
        <div className="mt-12 p-6 bg-destructive/10 rounded-lg">
          <p className="text-accessible-base text-center">
            <strong className="text-destructive">Important:</strong> Only use this feature in real
            emergencies. Your location and alert will be sent to your designated emergency contact.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Emergency;
