import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { Camera, ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Scan = () => {
  const [voiceMessage, setVoiceMessage] = useState("Tap the scan button or say 'Scan' to capture");
  const [scannedObject, setScannedObject] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleScan = () => {
    setIsScanning(true);
    setVoiceMessage("Scanning object...");

    // Simulate object detection
    setTimeout(() => {
      const objects = [
        "Coffee mug",
        "Smartphone",
        "Water bottle",
        "Book",
        "Laptop computer",
        "Eyeglasses",
        "Pen",
        "Notebook",
      ];
      const detected = objects[Math.floor(Math.random() * objects.length)];
      setScannedObject(detected);
      setVoiceMessage(`Object detected: ${detected}`);
      setIsScanning(false);
    }, 2000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
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
          <h1 className="text-4xl">Scan Object</h1>
        </header>

        {/* Camera Preview Area */}
        <Card className="mb-8 aspect-video bg-card border-2 border-dashed border-primary/30 flex items-center justify-center relative overflow-hidden">
          {isScanning ? (
            <div className="absolute inset-0 bg-primary/10 animate-pulse flex items-center justify-center">
              <Camera className="h-32 w-32 text-primary animate-pulse" />
            </div>
          ) : (
            <div className="text-center space-y-4 p-8">
              <Camera className="h-32 w-32 mx-auto text-muted-foreground" aria-hidden="true" />
              <p className="text-accessible-lg text-muted-foreground">
                Camera preview area
              </p>
              {scannedObject && (
                <div className="mt-8 p-6 bg-primary/20 rounded-lg">
                  <p className="text-accessible-xl font-bold text-primary">
                    {scannedObject}
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6">
          <Button
            size="xl"
            onClick={handleScan}
            disabled={isScanning}
            className="w-full h-32 text-accessible-xl font-extrabold"
            aria-label="Scan object with camera"
          >
            <Camera className="h-16 w-16" />
            {isScanning ? "Scanning..." : "Scan Now"}
          </Button>

          <Button
            variant="tactile"
            size="lg"
            onClick={handleFileUpload}
            className="w-full"
            aria-label="Upload image from device"
          >
            <Upload className="h-10 w-10" />
            Upload Image
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleScan}
            aria-label="File upload input"
          />
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-accessible-base text-muted-foreground">
            Point your camera at an object and tap 'Scan Now', or say 'Scan' to identify it.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Scan;
