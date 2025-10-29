import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { VoiceButton } from "@/components/VoiceButton";
import { Camera, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Scan = () => {
  const [voiceMessage, setVoiceMessage] = useState("Say Scan or tap button");
  const [scannedObject, setScannedObject] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleScan = () => {
    setIsScanning(true);
    setVoiceMessage("Scanning...");

    setTimeout(() => {
      const objects = ["Coffee mug", "Smartphone", "Water bottle", "Book", "Laptop", "Eyeglasses"];
      const detected = objects[Math.floor(Math.random() * objects.length)];
      setScannedObject(detected);
      setVoiceMessage(`Detected: ${detected}`);
      setIsScanning(false);
    }, 2000);
  };

  const handleVoiceCommand = () => {
    handleScan();
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
          <VoiceButton onVoiceCommand={handleVoiceCommand} label="Say Scan" />
        </div>

        {/* Camera Preview */}
        <Card className="mb-12 aspect-video bg-card border-4 border-dashed border-primary/30 rounded-3xl flex items-center justify-center relative overflow-hidden">
          {isScanning ? (
            <div className="absolute inset-0 bg-primary/10 animate-pulse flex items-center justify-center">
              <Camera className="h-40 w-40 text-primary animate-pulse" aria-hidden="true" />
            </div>
          ) : scannedObject ? (
            <div className="p-12 text-center">
              <div className="bg-primary/20 rounded-3xl p-10">
                <p className="text-accessible-2xl font-bold text-primary">
                  {scannedObject}
                </p>
              </div>
            </div>
          ) : (
            <Camera className="h-40 w-40 text-muted-foreground" aria-hidden="true" />
          )}
        </Card>

        {/* Scan Button */}
        <Button
          size="xl"
          onClick={handleScan}
          disabled={isScanning}
          className="w-full h-40 text-accessible-2xl font-extrabold rounded-3xl shadow-2xl"
          aria-label="Scan object"
        >
          <Camera className="h-20 w-20" aria-hidden="true" />
          {isScanning ? "Scanning..." : "Scan"}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleScan}
          aria-label="Upload image"
        />
      </main>
    </div>
  );
};

export default Scan;
