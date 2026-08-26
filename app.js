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

const voiceStatus = document.createElement("p");
voiceStatus.id = "voiceStatus";
voiceStatus.textContent = "Press the microphone button and speak.";
voiceButton.insertAdjacentElement("afterend", voiceStatus);

function speak(text) {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const speech = new SpeechSynthesisUtterance(text);
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

  synth.resume();
  synth.speak(speech);
}

function findDashboardCard(command) {
  const cards = document.querySelectorAll(".dashboard article");
  const words = command.toLowerCase();

  for (const card of cards) {
    const heading = card.querySelector("h2");
    if (!heading) continue;

    const title = heading.textContent.toLowerCase();

    if (
      words.includes(title) ||
      (words.includes("health") && title.includes("health")) ||
      (words.includes("medicine") && title.includes("health")) ||
      (words.includes("draft") && title.includes("draft")) ||
      (words.includes("contact") && title.includes("contact")) ||
      (words.includes("reminder") && title.includes("reminder")) ||
      (words.includes("briefing") && title.includes("briefing")) ||
      (words.includes("search") && title.includes("search"))
    ) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.style.outline = "4px solid #d7a536";

      setTimeout(() => {
        card.style.outline = "none";
      }, 3000);

      return heading.textContent;
    }
  }

  return null;
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  voiceButton.addEventListener("click", () => {
    alert("Voice command input is not supported by this browser. Please use Microsoft Edge or Google Chrome.");
  });
} else {
  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceButton.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    voiceStatus.textContent = "Listening… Please speak now.";
    voiceButton.textContent = "🎙️ Listening…";

    try {
      recognition.start();
    } catch (error) {
      recognition.stop();
    }
  });

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.trim();

    voiceStatus.textContent = `You said: “${command}”`;
    voiceButton.textContent = "🎤 Give a Voice Command";

    const openedSection = findDashboardCard(command);

    if (openedSection) {
      speak(`Opening ${openedSection}.`);
    } else {
      speak(`You said ${command}. This command has been captured.`);
    }
  };

  recognition.onerror = (event) => {
    voiceButton.textContent = "🎤 Give a Voice Command";

    if (event.error === "not-allowed") {
      voiceStatus.textContent =
        "Microphone permission was blocked. Please allow microphone access.";
    } else {
      voiceStatus.textContent =
        "I could not hear clearly. Please press the button and try again.";
    }
  };

  recognition.onend = () => {
    voiceButton.textContent = "🎤 Give a Voice Command";
  };
}

if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
}
