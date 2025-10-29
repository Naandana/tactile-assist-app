import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { FileText, ArrowLeft, Upload, Play, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const ReadText = () => {
  const [voiceMessage, setVoiceMessage] = useState("Upload an image to read text");
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = () => {
    setIsProcessing(true);
    setVoiceMessage("Processing image and extracting text...");

    // Simulate OCR processing
    setTimeout(() => {
      const sampleTexts = [
        "Welcome to our store. Opening hours: Monday to Friday, 9 AM to 6 PM.",
        "Please take a number and wait for your turn. Thank you for your patience.",
        "Ingredients: Flour, Sugar, Eggs, Butter, Vanilla Extract, Baking Powder.",
        "Meeting scheduled for tomorrow at 2:00 PM in Conference Room A.",
      ];
      const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      setExtractedText(text);
      setVoiceMessage("Text extracted. Tap play to hear it read aloud.");
      setIsProcessing(false);
    }, 2000);
  };

  const toggleReading = () => {
    if (!extractedText) return;

    setIsReading(!isReading);
    if (!isReading) {
      setVoiceMessage(`Reading: ${extractedText}`);
      // Simulate reading completion
      setTimeout(() => setIsReading(false), 5000);
    } else {
      setVoiceMessage("Reading paused");
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
          <h1 className="text-4xl">Read Text</h1>
        </header>

        {/* Image Preview Area */}
        <Card className="mb-8 min-h-64 bg-card border-2 border-dashed border-primary/30 flex items-center justify-center relative overflow-hidden p-8">
          {isProcessing ? (
            <div className="absolute inset-0 bg-primary/10 animate-pulse flex items-center justify-center">
              <FileText className="h-32 w-32 text-primary animate-pulse" />
            </div>
          ) : extractedText ? (
            <div className="w-full space-y-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <FileText className="h-12 w-12 text-primary" aria-hidden="true" />
                <h2 className="text-accessible-lg font-bold">Extracted Text:</h2>
              </div>
              <p className="text-accessible-base leading-relaxed p-6 bg-secondary rounded-lg">
                {extractedText}
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <FileText className="h-32 w-32 mx-auto text-muted-foreground" aria-hidden="true" />
              <p className="text-accessible-lg text-muted-foreground">
                Upload an image with text
              </p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6">
          {extractedText && (
            <Button
              size="xl"
              onClick={toggleReading}
              className="w-full h-32 text-accessible-xl font-extrabold"
              aria-label={isReading ? "Pause reading" : "Start reading text aloud"}
            >
              {isReading ? (
                <>
                  <Pause className="h-16 w-16" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-16 w-16" />
                  Read Aloud
                </>
              )}
            </Button>
          )}

          <Button
            variant="tactile"
            size="lg"
            onClick={handleUpload}
            className="w-full"
            aria-label="Upload image to extract text"
          >
            <Upload className="h-10 w-10" />
            Upload Image
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
            aria-label="File upload input"
          />
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-accessible-base text-muted-foreground">
            Upload an image containing text, and it will be read aloud to you.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ReadText;
