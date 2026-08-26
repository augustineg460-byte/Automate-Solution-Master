const greeting = document.getElementById("greeting");
const voiceButton = document.getElementById("voiceButton");

const languages = {
  en: {
    code: "en-IN",
    name: "English",
    greeting: "Welcome to Smart Executive, your AI Executive Office.",
    instruction: "Press the microphone button and speak.",
    listening: "Listening… Please speak now.",
    captured: "This command has been captured.",
    opening: "Opening",
    retry: "I could not hear clearly. Please try again.",
    blocked: "Microphone permission was blocked. Please allow microphone access."
  },
  hi: {
    code: "hi-IN",
    name: "हिन्दी",
    greeting: "स्मार्ट एग्जीक्यूटिव में आपका स्वागत है।",
    instruction: "माइक्रोफोन बटन दबाकर बोलिए।",
    listening: "सुन रहा हूँ… अब बोलिए।",
    captured: "आपका आदेश दर्ज कर लिया गया है।",
    opening: "खोल रहा हूँ",
    retry: "मैं स्पष्ट रूप से नहीं सुन पाया। कृपया फिर से बोलिए।",
    blocked: "माइक्रोफोन की अनुमति दें।"
  },
  mr: {
    code: "mr-IN",
    name: "मराठी",
    greeting: "स्मार्ट एक्झिक्युटिवमध्ये आपले स्वागत आहे.",
    instruction: "मायक्रोफोन बटण दाबून बोला.",
    listening: "ऐकत आहे… आता बोला.",
    captured: "आपली आज्ञा नोंदवली आहे.",
    opening: "उघडत आहे",
    retry: "मला स्पष्ट ऐकू आले नाही. कृपया पुन्हा बोला.",
    blocked: "कृपया मायक्रोफोन वापरण्याची परवानगी द्या."
  },
  ml: {
    code: "ml-IN",
    name: "മലയാളം",
    greeting: "സ്മാർട്ട് എക്സിക്യൂട്ടീവിലേക്ക് സ്വാഗതം.",
    instruction: "മൈക്രോഫോൺ ബട്ടൺ അമർത്തി സംസാരിക്കുക.",
    listening: "കേൾക്കുന്നു… ഇപ്പോൾ സംസാരിക്കുക.",
    captured: "നിങ്ങളുടെ നിർദേശം രേഖപ്പെടുത്തി.",
    opening: "തുറക്കുന്നു",
    retry: "വ്യക്തമായി കേൾക്കാനായില്ല. വീണ്ടും സംസാരിക്കുക.",
    blocked: "മൈക്രോഫോൺ ഉപയോഗിക്കാൻ അനുമതി നൽകുക."
  }
};

let selectedLanguage = "en";

function getTimeGreeting() {
  const hour = new Date().getHours();

  if (selectedLanguage === "hi") {
    if (hour < 12) return "सुप्रभात 🙏";
    if (hour < 17) return "नमस्कार 🙏";
    return "शुभ संध्या 🙏";
  }

  if (selectedLanguage === "mr") {
    if (hour < 12) return "शुभ सकाळ 🙏";
    if (hour < 17) return "नमस्कार 🙏";
    return "शुभ संध्या 🙏";
  }

  if (selectedLanguage === "ml") {
    if (hour < 12) return "സുപ്രഭാതം 🙏";
    if (hour < 17) return "നമസ്കാരം 🙏";
    return "ശുഭ സായാഹ്നം 🙏";
  }

  if (hour < 12) return "Good morning 🙏";
  if (hour < 17) return "Good afternoon 🙏";
  return "Good evening 🙏";
}

const languageLabel = document.createElement("label");
languageLabel.textContent = "Language / भाषा / भाषा / ഭാഷ: ";
languageLabel.style.display = "block";
languageLabel.style.marginBottom = "10px";
languageLabel.style.fontWeight = "bold";

const languageSelect = document.createElement("select");
languageSelect.id = "languageSelect";
languageSelect.style.fontSize = "18px";
languageSelect.style.padding = "10px";
languageSelect.style.marginLeft = "8px";

Object.entries(languages).forEach(([key, language]) => {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = language.name;
  languageSelect.appendChild(option);
});

languageLabel.appendChild(languageSelect);
voiceButton.insertAdjacentElement("beforebegin", languageLabel);

const voiceStatus = document.createElement("p");
voiceStatus.id = "voiceStatus";
voiceButton.insertAdjacentElement("afterend", voiceStatus);

function updateLanguageDisplay() {
  const language = languages[selectedLanguage];
  greeting.textContent = `${getTimeGreeting()} ${language.greeting}`;
  voiceStatus.textContent = language.instruction;
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  const languageCode = languages[selectedLanguage].code;

  speech.lang = languageCode;
  speech.rate = 0.85;
  speech.pitch = 1;
  speech.volume = 1;

  const voices = synth.getVoices();
  const preferredVoice =
    voices.find((voice) => voice.lang === languageCode) ||
    voices.find((voice) =>
      voice.lang.startsWith(languageCode.split("-")[0])
    );

  if (preferredVoice) {
    speech.voice = preferredVoice;
  }

  synth.resume();
  synth.speak(speech);
}

const commandGroups = [
  {
    title: "Health & Wellbeing",
    words: [
      "health", "medicine", "wellbeing",
      "स्वास्थ्य", "दवा", "सेहत",
      "आरोग्य", "औषध",
      "ആരോഗ്യം", "മരുന്ന്"
    ]
  },
  {
    title: "AI Draft Studio",
    words: [
      "draft", "letter",
      "मसौदा", "पत्र",
      "मसुदा",
      "കരട്", "കത്ത്"
    ]
  },
  {
    title: "Contacts",
    words: [
      "contact", "address",
      "संपर्क", "पता",
      "संपर्क", "पत्ता",
      "ബന്ധങ്ങൾ", "വിലാസം"
    ]
  },
  {
    title: "Reminders",
    words: [
      "reminder", "bill", "renewal",
      "याद", "बिल",
      "स्मरणपत्र",
      "ഓർമ്മപ്പെടുത്തൽ", "ബിൽ"
    ]
  },
  {
    title: "Daily Briefing",
    words: [
      "briefing", "today", "priority",
      "आज", "प्राथमिकता",
      "आजचे", "प्राधान्य",
      "ഇന്ന്", "മുൻഗണന"
    ]
  },
  {
    title: "Quick Search",
    words: [
      "search", "find",
      "खोज", "ढूंढो",
      "शोध",
      "തിരയുക", "കണ്ടെത്തുക"
    ]
  },
  {
    title: "Ask Smart Executive",
    words: [
      "ask", "question",
      "पूछो", "सवाल",
      "विचारा", "प्रश्न",
      "ചോദിക്കുക", "ചോദ്യം"
    ]
  }
];

function findDashboardCard(command) {
  const normalizedCommand = command.toLowerCase();
  const matchingGroup = commandGroups.find((group) =>
    group.words.some((word) =>
      normalizedCommand.includes(word.toLowerCase())
    )
  );

  if (!matchingGroup) return null;

  const cards = document.querySelectorAll(".dashboard article");

  for (const card of cards) {
    const heading = card.querySelector("h2");

    if (heading && heading.textContent === matchingGroup.title) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.style.outline = "4px solid #d7a536";

      setTimeout(() => {
        card.style.outline = "none";
      }, 3000);

      return matchingGroup.title;
    }
  }

  return null;
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

languageSelect.addEventListener("change", () => {
  selectedLanguage = languageSelect.value;
  updateLanguageDisplay();
  speak(`${getTimeGreeting()} ${languages[selectedLanguage].greeting}`);
});

updateLanguageDisplay();

if (!SpeechRecognition) {
  voiceButton.addEventListener("click", () => {
    alert("Please use Microsoft Edge or Google Chrome for voice commands.");
  });
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceButton.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    recognition.lang = languages[selectedLanguage].code;
    voiceStatus.textContent = languages[selectedLanguage].listening;
    voiceButton.textContent = "🎙️ Listening…";

    try {
      recognition.start();
    } catch (error) {
      recognition.stop();
    }
  });

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.trim();
    const language = languages[selectedLanguage];

    voiceStatus.textContent = `“${command}”`;
    voiceButton.textContent = "🎤 Give a Voice Command";

    const openedSection = findDashboardCard(command);

    if (openedSection) {
      speak(`${language.opening}: ${openedSection}`);
    } else {
      speak(`${command}. ${language.captured}`);
    }
  };

  recognition.onerror = (event) => {
    voiceButton.textContent = "🎤 Give a Voice Command";

    if (event.error === "not-allowed") {
      voiceStatus.textContent = languages[selectedLanguage].blocked;
    } else {
      voiceStatus.textContent = languages[selectedLanguage].retry;
    }
  };

  recognition.onend = () => {
    voiceButton.textContent = "🎤 Give a Voice Command";
  };
}

if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
}
