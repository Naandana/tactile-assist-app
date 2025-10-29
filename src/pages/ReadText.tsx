import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { VoiceButton } from "@/components/VoiceButton";
import { FileText, ArrowLeft, Play, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const ReadText = () => {
  const [voiceMessage, setVoiceMessage] = useState("Say Read or tap to upload");
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
    setVoiceMessage("Processing...");

    setTimeout(() => {
      const sampleTexts = [
        "Welcome to our store. Opening hours: Monday to Friday, 9 AM to 6 PM.",
        "Please take a number and wait. Thank you for your patience.",
        "Ingredients: Flour, Sugar, Eggs, Butter, Vanilla Extract.",
      ];
      const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      setExtractedText(text);
      setVoiceMessage("Text extracted. Tap play.");
      setIsProcessing(false);
    }, 2000);
  };

  const toggleReading = () => {
    if (!extractedText) return;
    setIsReading(!isReading);
    if (!isReading) {
      setVoiceMessage(extractedText);
      setTimeout(() => setIsReading(false), 5000);
    } else {
      setVoiceMessage("Paused");
    }
  };

  const handleVoiceCommand = () => {
    handleUpload();
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
          <VoiceButton onVoiceCommand={handleVoiceCommand} label="Say Read" />
        </div>

        {/* Text Display */}
        <Card className="mb-12 min-h-80 bg-card border-4 border-primary/30 rounded-3xl flex items-center justify-center p-10">
          {isProcessing ? (
            <FileText className="h-40 w-40 text-primary animate-pulse" aria-hidden="true" />
          ) : extractedText ? (
            <p className="text-accessible-xl leading-relaxed text-center font-bold">
              {extractedText}
            </p>
          ) : (
            <FileText className="h-40 w-40 text-muted-foreground" aria-hidden="true" />
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6">
          {extractedText && (
            <Button
              size="xl"
              onClick={toggleReading}
              className="w-full h-40 text-accessible-2xl font-extrabold rounded-3xl shadow-2xl"
              aria-label={isReading ? "Pause" : "Read aloud"}
            >
              {isReading ? (
                <>
                  <Pause className="h-20 w-20" aria-hidden="true" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-20 w-20" aria-hidden="true" />
                  Read
                </>
              )}
            </Button>
          )}

          <Button
            variant="tactile"
            size="xl"
            onClick={handleUpload}
            className="w-full h-40 text-accessible-2xl font-bold rounded-3xl"
            aria-label="Upload image"
          >
            <FileText className="h-20 w-20" aria-hidden="true" />
            Upload
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </main>
    </div>
  );
};

export default ReadText;
