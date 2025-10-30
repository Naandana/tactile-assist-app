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

  // Set speech parameters for clarity
  utterance.rate = options.slow ? 0.85 : 0.9; // Slightly slower for better comprehension
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Add slight pause between sentences for clarity
  if (text.includes('.') || text.includes('!') || text.includes('?')) {
    const sentences = text.split(/([.!?])\s+/);
    let fullText = '';
    sentences.forEach((sentence, index) => {
      if (index % 2 === 0 && sentence.trim()) {
        fullText += sentence + (sentences[index + 1] || '') + ' ... ';
      }
    });
    utterance.text = fullText.trim();
  }

  window.speechSynthesis.speak(utterance);
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
