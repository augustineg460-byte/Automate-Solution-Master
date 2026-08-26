const greeting = document.getElementById("greeting");
const voiceButton = document.getElementById("voiceButton");

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning 🙏";
  if (hour < 17) return "Good afternoon 🙏";
  return "Good evening 🙏";
}

const welcomeMessage =
  `${getGreeting()} Welcome to Smart Executive, your AI Executive Office.`;

if (greeting) {
  greeting.textContent = welcomeMessage;
}

function speakMessage() {
  if (!("speechSynthesis" in window)) {
    alert("Voice guidance is not supported by this browser.");
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel();

  const speech = new SpeechSynthesisUtterance(welcomeMessage);
  speech.lang = "en-IN";
  speech.rate = 0.85;
  speech.pitch = 1;
  speech.volume = 1;

  const voices = synth.getVoices();
  const preferredVoice =
    voices.find((voice) => voice.lang === "en-IN") ||
    voices.find((voice) => voice.lang.startsWith("en-GB")) ||
    voices.find((voice) => voice.lang.startsWith("en"));

  if (preferredVoice) {
    speech.voice = preferredVoice;
  }

  speech.onstart = () => {
    voiceButton.textContent = "🔊 Speaking…";
  };

  speech.onend = () => {
    voiceButton.textContent = "🎤 Give a Voice Command";
  };

  speech.onerror = () => {
    voiceButton.textContent = "🎤 Give a Voice Command";
    alert("Voice could not play. Please check the laptop volume and confirm that this browser tab is not muted.");
  };

  setTimeout(() => {
    synth.resume();
    synth.speak(speech);
  }, 150);
}

if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

if (voiceButton) {
  voiceButton.addEventListener("click", speakMessage);
}
