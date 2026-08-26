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
    alert("Voice guidance is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(welcomeMessage);
  speech.lang = "en-IN";
  speech.rate = 0.9;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

if (voiceButton) {
  voiceButton.addEventListener("click", speakMessage);
}
