// Enhanced Text-to-Speech utility with natural voice selection

export const speak = (text: string, options: { slow?: boolean; priority?: "high" | "normal" } = {}) => {
  if (!window.speechSynthesis) {
    console.warn("Speech synthesis not supported");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Get all available voices
  const voices = window.speechSynthesis.getVoices();
  
  // Prioritize natural-sounding voices
  const preferredVoices = [
    "Google UK English Female",
    "Google US English",
    "Google UK English Male",
    "Microsoft Zira - English (United States)",
    "Microsoft David - English (United States)",
    "Samantha",
    "Karen",
    "Daniel",
  ];

  // Find the best available voice
  let selectedVoice = voices.find(voice => 
    preferredVoices.some(preferred => voice.name.includes(preferred))
  );

  // Fallback to any English voice with "natural" or "premium" in the name
  if (!selectedVoice) {
    selectedVoice = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.toLowerCase().includes('natural') || 
       voice.name.toLowerCase().includes('premium') ||
       voice.name.toLowerCase().includes('google'))
    );
  }

  // Final fallback to any English voice
  if (!selectedVoice) {
    selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // Set speech parameters for natural, clear delivery
  utterance.rate = options.slow ? 0.8 : 0.85; // Slower for better comprehension
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Add natural pauses between sentences
  let enhancedText = text;
  if (text.includes('.') || text.includes('!') || text.includes('?')) {
    // Add brief pause after punctuation for natural flow
    enhancedText = text.replace(/([.!?])\s+/g, '$1  ');
  }
  
  utterance.text = enhancedText;

  // Ensure previous speech is fully stopped before starting new one
  window.speechSynthesis.cancel();
  
  // Small delay to ensure cancellation completes
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 100);
};

// Load voices (some browsers load them asynchronously)
export const initializeVoices = (): Promise<void> => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve();
      };
    }
  });
};
