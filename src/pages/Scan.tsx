import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { VoiceButton } from "@/components/VoiceButton";
import { Camera, ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { speak } from "@/lib/speech";

const Scan = () => {
  const [voiceMessage, setVoiceMessage] = useState("Please upload an image or tap the scan button");
  const [scannedObject, setScannedObject] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleScan = () => {
    setIsScanning(true);
    setVoiceMessage("Scanning image. Please wait.");
    speak("Scanning image. Please wait.");

    setTimeout(() => {
      const objects = [
        "Coffee mug on a wooden table",
        "Black smartphone with cracked screen",
        "Clear water bottle, half full",
        "Hardcover book titled The Great Gatsby",
        "Silver laptop computer, appears to be a MacBook",
        "Reading eyeglasses with black frames",
        "Red ceramic bowl",
        "House keys on a metal keychain",
        "White wireless earbuds in charging case"
      ];
      const detected = objects[Math.floor(Math.random() * objects.length)];
      setScannedObject(detected);
      const resultMessage = `Object detected. ${detected}`;
      setVoiceMessage(resultMessage);
      
      // Speak the result after a brief delay to ensure smooth transition
      setTimeout(() => {
        speak(resultMessage, { slow: true });
      }, 300);
      
      setIsScanning(false);
    }, 2500);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      speak("Image uploaded successfully. Starting scan.");
      handleScan();
    }
  };

  const handleVoiceCommand = () => {
    speak("Opening camera to scan object.");
    setTimeout(() => handleScan(), 500);
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
        <div className="flex flex-col gap-4">
          <Button
            size="xl"
            onClick={handleScan}
            disabled={isScanning}
            className="w-full h-40 text-accessible-2xl font-extrabold rounded-3xl shadow-2xl"
            aria-label="Scan object"
          >
            <Camera className="h-20 w-20 mr-4" aria-hidden="true" />
            {isScanning ? "Scanning..." : "Scan Now"}
          </Button>

          <Button
            variant="tactile"
            size="xl"
            onClick={() => fileInputRef.current?.click()}
            disabled={isScanning}
            className="w-full h-32 text-accessible-xl font-bold rounded-3xl"
            aria-label="Upload image from device"
          >
            <Upload className="h-16 w-16 mr-3" aria-hidden="true" />
            Upload Image
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
          aria-label="Upload image"
        />
      </main>
    </div>
  );
};

export default Scan;
