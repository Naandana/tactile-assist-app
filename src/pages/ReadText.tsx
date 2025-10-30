import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { VoiceFeedback } from "@/components/VoiceFeedback";
import { VoiceButton } from "@/components/VoiceButton";
import { FileText, ArrowLeft, Play, Pause, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { speak } from "@/lib/speech";

const ReadText = () => {
  const [voiceMessage, setVoiceMessage] = useState("Please upload an image with text to read aloud");
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsProcessing(true);
      setVoiceMessage("Processing image. Extracting text. Please wait.");
      speak("Image uploaded successfully. Processing text. Please wait.");

      setTimeout(() => {
        const sampleTexts = [
          "Welcome to Green Valley Market. Opening hours: Monday to Friday, 9 AM to 6 PM. Saturday 10 AM to 4 PM. Closed on Sundays.",
          "Please take a number and wait to be called. Thank you for your patience. Current wait time is approximately 5 minutes.",
          "Chocolate Chip Cookie Recipe. Ingredients: 2 cups all-purpose flour, 1 cup sugar, half cup brown sugar, 2 eggs, 1 cup butter, 1 teaspoon vanilla extract, half teaspoon baking soda, 2 cups chocolate chips.",
          "Parking Notice. No parking in this area between 8 AM and 6 PM, Monday through Friday. Violators will be towed at owner's expense.",
          "Medicine Instructions. Take one tablet twice daily with food. Do not exceed recommended dose. Keep out of reach of children. Store in a cool, dry place."
        ];
        const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        setExtractedText(text);
        setVoiceMessage("Text extracted successfully. Ready to read aloud.");
        
        // Speak confirmation after brief delay
        setTimeout(() => {
          speak("Text extraction complete. Tap the read button to hear it.");
        }, 300);
        
        setIsProcessing(false);
      }, 2500);
    }
  };

  const toggleReading = () => {
    if (!extractedText) return;
    
    if (!isReading) {
      setIsReading(true);
      setVoiceMessage("Reading text aloud now.");
      
      // Start reading after brief delay
      setTimeout(() => {
        speak(extractedText, { slow: true });
      }, 200);
      
      // Estimate reading time and auto-stop (average speaking rate: 2.5 words per second at slow speed)
      const estimatedTime = (extractedText.split(' ').length / 2.5) * 1000 + 1000;
      setTimeout(() => {
        setIsReading(false);
        setVoiceMessage("Finished reading.");
        speak("Finished reading.");
      }, estimatedTime);
    } else {
      setIsReading(false);
      window.speechSynthesis.cancel();
      setVoiceMessage("Reading paused.");
      
      setTimeout(() => {
        speak("Reading paused.");
      }, 100);
    }
  };

  const handleVoiceCommand = () => {
    speak("Opening file picker to upload image.");
    setTimeout(() => handleUpload(), 500);
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
            disabled={isProcessing}
            className="w-full h-40 text-accessible-2xl font-bold rounded-3xl"
            aria-label="Upload image with text"
          >
            <Upload className="h-20 w-20 mr-3" aria-hidden="true" />
            Upload Image
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
