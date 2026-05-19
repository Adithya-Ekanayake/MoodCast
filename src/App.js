import React, { useState, useEffect } from "react";

const GEMINI_KEY = "AIzaSyBmmb6fWZAejkhrulqE8ljrTZBf4xrKeIs";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
const moods = [
  {
    label: "Happy", emoji: "😊", gradient: "from-yellow-400 to-orange-400",
    light: "bg-yellow-50", border: "border-yellow-400", text: "text-yellow-700",
    plan: { morning: "☀️ Start with a 10-minute dance session to your favorite song and a bright fruit smoothie!", afternoon: "🌤️ Channel your energy into a creative project or surprise a friend with a kind message.", evening: "🌙 Host a mini movie night or cook a new recipe you've been curious about.", quote: "💬 \"Happiness is not something ready-made. It comes from your own actions.\" – Dalai Lama" },
    affirmation: "You radiate joy and positivity today. Keep spreading that sunshine!",
    breathing: "Try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s.",
    playlist: { name: "Happy Hits", url: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC" },
    foods: [{ name: "Rainbow Sushi 🍣", desc: "Celebrate your mood with colorful rolls", search: "sushi" }, { name: "Fruit Waffle 🧇", desc: "Sweet and fun, just like you!", search: "waffle" }, { name: "Ice Cream Sundae 🍨", desc: "Because happy days deserve treats", search: "ice cream" }],
  },
  {
    label: "Anxious", emoji: "😰", gradient: "from-blue-400 to-cyan-400",
    light: "bg-blue-50", border: "border-blue-400", text: "text-blue-700",
    plan: { morning: "🌿 Begin with 5 minutes of deep breathing and a warm chamomile tea. Go slow today.", afternoon: "📖 Step away from screens for 20 minutes. Take a short walk or read something light.", evening: "🛁 Draw a warm bath or do a gentle yoga stretch. Write down 3 things you're grateful for.", quote: "💬 \"You don't have to control your thoughts. You just have to stop letting them control you.\" – Dan Millman" },
    affirmation: "You are safe, capable, and stronger than your worries. One breath at a time.",
    breathing: "4-7-8 breathing: inhale 4s, hold 7s, exhale 8s. Repeat 3 times.",
    playlist: { name: "Calm Vibes", url: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY" },
    foods: [{ name: "Oat Bowl 🥣", desc: "Calming complex carbs to soothe the nerves", search: "oatmeal" }, { name: "Chamomile Tea + Toast 🍵", desc: "Gentle and grounding", search: "herbal tea" }, { name: "Dark Chocolate 🍫", desc: "Proven to reduce cortisol levels", search: "dark chocolate" }],
  },
  {
    label: "Tired", emoji: "😴", gradient: "from-purple-400 to-indigo-400",
    light: "bg-purple-50", border: "border-purple-400", text: "text-purple-700",
    plan: { morning: "☕ Allow yourself a slow start. A warm coffee or matcha and light stretches is enough.", afternoon: "💤 Take a 20-minute power nap if possible. Don't push through — rest is productive.", evening: "📵 Screens off by 9pm. Try reading or listening to a podcast as you wind down.", quote: "💬 \"Almost everything will work again if you unplug it for a few minutes — including you.\" – Anne Lamott" },
    affirmation: "Rest is not laziness. Your body is asking for care, and you deserve to give it.",
    breathing: "Slow exhale breathing: inhale 4s, exhale 8s. Activates your rest response.",
    playlist: { name: "Chill Lofi", url: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn" },
    foods: [{ name: "Smoothie Bowl 🥤", desc: "Banana + spinach for natural energy", search: "smoothie bowl" }, { name: "Avocado Toast 🥑", desc: "Healthy fats to fuel your brain", search: "avocado toast" }, { name: "Nuts & Dates 🌰", desc: "Quick energy without the crash", search: "healthy snacks" }],
  },
  {
    label: "Focused", emoji: "🎯", gradient: "from-green-400 to-teal-400",
    light: "bg-green-50", border: "border-green-400", text: "text-green-700",
    plan: { morning: "🧠 Tackle your hardest task first — your focus is sharpest in the morning. Skip social media.", afternoon: "⏱️ Use the Pomodoro technique: 25 min work, 5 min break. Repeat 4 times.", evening: "📝 Review what you accomplished and plan tomorrow's top 3 tasks before bed.", quote: "💬 \"The successful warrior is the average man, with laser-like focus.\" – Bruce Lee" },
    affirmation: "Your mind is sharp and clear today. You have everything it takes to achieve your goals.",
    breathing: "Energizing breath: 10 quick inhale-exhales through the nose. Then breathe normally.",
    playlist: { name: "Deep Focus", url: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
    foods: [{ name: "Grilled Salmon 🐟", desc: "Omega-3s for peak brain performance", search: "grilled salmon" }, { name: "Blueberry Yogurt 🫐", desc: "Antioxidants that boost memory", search: "yogurt bowl" }, { name: "Green Tea + Almonds 🍵", desc: "Sustained energy without jitters", search: "green tea" }],
  },
  {
    label: "Sad", emoji: "😢", gradient: "from-gray-400 to-slate-500",
    light: "bg-gray-50", border: "border-gray-400", text: "text-gray-700",
    plan: { morning: "🌧️ It's okay to feel this way. Get some sunlight if you can — even 5 minutes helps.", afternoon: "📞 Reach out to someone you trust, or write your feelings in a journal.", evening: "🎬 Watch a comforting movie or show. Be gentle with yourself tonight.", quote: "💬 \"Even the darkest night will end and the sun will rise.\" – Victor Hugo" },
    affirmation: "Your feelings are valid. This moment will pass, and you are never truly alone.",
    breathing: "Heart breathing: breathe slowly while placing hand on chest. Feel the warmth.",
    playlist: { name: "Feel Better", url: "https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634" },
    foods: [{ name: "Chicken Soup 🍜", desc: "A warm hug in a bowl", search: "chicken soup" }, { name: "Mac & Cheese 🧀", desc: "Classic comfort food, no judgment", search: "mac and cheese" }, { name: "Warm Cookies 🍪", desc: "Bake or order — both are healing", search: "cookies" }],
  },
  {
    label: "Excited", emoji: "🚀", gradient: "from-orange-400 to-pink-500",
    light: "bg-orange-50", border: "border-orange-400", text: "text-orange-700",
    plan: { morning: "⚡ Ride this energy wave! Write down your biggest idea and take one action on it today.", afternoon: "🎉 Share your excitement with someone — enthusiasm is contagious and builds momentum.", evening: "🌟 Celebrate tonight, whatever size. You deserve to enjoy this feeling fully.", quote: "💬 \"The secret of getting ahead is getting started.\" – Mark Twain" },
    affirmation: "Your excitement is a superpower. Let it fuel you toward something amazing today!",
    breathing: "Victory breath: big inhale through nose, hold 2s, big exhale through mouth. Repeat 5x.",
    playlist: { name: "Power Hour", url: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP" },
    foods: [{ name: "Loaded Tacos 🌮", desc: "Bold flavors for a bold mood", search: "tacos" }, { name: "Gourmet Burger 🍔", desc: "Treat yourself to something epic", search: "burger" }, { name: "Bubble Tea 🧋", desc: "Fun, colorful and totally exciting", search: "bubble tea" }],
  },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [activeTab, setActiveTab] = useState("plan");
  const [journal, setJournal] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [savedJournal, setSavedJournal] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [aiPlan, setAiPlan] = useState("");
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [aiFoods, setAiFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    setHistory(saved);
    const s = parseInt(localStorage.getItem("streak") || "0");
    setStreak(s);
    const today = new Date().toDateString();
    const lastCheckin = localStorage.getItem("lastCheckin");
    if (lastCheckin === today) setCheckedIn(true);
  }, []);

  const selectMood = (mood) => {
    setSelectedMood(mood);
    setActiveTab("plan");
    setJournal("");
    setSavedJournal(false);
    setAiPlan("");
    setAiFoods([]);
  };

  const generateAIPlan = async (mood) => {
    setLoadingPlan(true);
    setAiPlan("");
    try {
      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `I'm feeling ${mood} today. Give me a short personalized day plan with exactly 4 sections: Morning, Afternoon, Evening, and a Motivational Quote. Make it warm, practical and uplifting. Format each section starting with an emoji.` }] }]
        }),
      });
      const data = await response.json();
      setAiPlan(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAiPlan("Couldn't generate a plan right now. Please try again!");
    }
    setLoadingPlan(false);
  };

  const generateAIFoods = async (mood) => {
    setLoadingFoods(true);
    setAiFoods([]);
    try {
      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `I'm feeling ${mood} today. Suggest 3 perfect foods or drinks for my mood. For each one give: name with emoji, one short sentence why it fits my mood, and a search keyword for food delivery. Reply in this exact JSON format with no extra text: [{"name": "Food Name 🍕", "desc": "Why it fits", "search": "keyword"}]` }] }]
        }),
      });
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const cleaned = text.replace(/```json|```/g, "").trim();
      setAiFoods(JSON.parse(cleaned));
    } catch (error) {
      setAiFoods([]);
    }
    setLoadingFoods(false);
  };

  const checkIn = () => {
    if (checkedIn || !selectedMood) return;
    const today = new Date().toDateString();
    const lastCheckin = localStorage.getItem("lastCheckin");
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = lastCheckin === yesterday ? streak + 1 : 1;
    const entry = { date: today, day: DAYS[new Date().getDay()], mood: selectedMood.label, emoji: selectedMood.emoji, journal };
    const newHistory = [entry, ...history.slice(0, 29)];
    localStorage.setItem("moodHistory", JSON.stringify(newHistory));
    localStorage.setItem("streak", newStreak);
    localStorage.setItem("lastCheckin", today);
    setHistory(newHistory);
    setStreak(newStreak);
    setCheckedIn(true);
    if (journal) setSavedJournal(true);
  };

  const last7 = (() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const ds = d.toDateString();
      const found = history.find((h) => h.date === ds);
      days.push({ day: DAYS[d.getDay()], entry: found || null });
    }
    return days;
  })();

  const bg = darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800";
  const card = darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100 shadow-lg";
  const tabActive = darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800 shadow";
  const tabInactive = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
<svg width="44" height="44" viewBox="0 0 100 100">
  <path d="M50 85 C30 85 10 72 8 55 C6 42 13 30 20 25 C15 15 17 3 25 0 C33 -3 43 2 48 10 L48 85Z" fill="#a855f7"/>
  <path d="M50 85 C70 85 90 72 92 55 C94 42 87 30 80 25 C85 15 83 3 75 0 C67 -3 57 2 52 10 L52 85Z" fill="#ec4899"/>
  <line x1="50" y1="8" x2="50" y2="85" stroke="white" stroke-width="3" stroke-dasharray="5,4"/>
  <path d="M25 35 Q35 28 32 45" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M22 58 Q33 50 30 67" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M75 35 Q65 28 68 45" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M78 58 Q67 50 70 67" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
</svg>
  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">MoodCast</h1>
</div>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Your daily mood companion</p>
          </div>
          <div className="flex items-center gap-3">
            {streak > 0 && (
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${darkMode ? "bg-orange-900 text-orange-300" : "bg-orange-100 text-orange-600"}`}>
                🔥 {streak} day streak
              </div>
            )}
            <button onClick={() => setDarkMode(!darkMode)} className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}>
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* Mood Grid */}
        <p className={`text-center font-medium mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>How are you feeling today?</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => selectMood(mood)}
              className={`bg-gradient-to-br ${mood.gradient} rounded-2xl p-5 flex flex-col items-center text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ${selectedMood?.label === mood.label ? "ring-4 ring-offset-2 ring-white scale-105" : ""}`}
            >
              <span className="text-4xl mb-2">{mood.emoji}</span>
              <span className="font-bold text-sm">{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Mood Panel */}
        {selectedMood && (
          <div className={`${card} rounded-3xl overflow-hidden mb-6`}>
            {/* Mood Header */}
            <div className={`bg-gradient-to-r ${selectedMood.gradient} p-5 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">You're feeling</p>
                  <p className="text-3xl font-bold">{selectedMood.emoji} {selectedMood.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-xs">Today's affirmation</p>
                  <p className="text-white text-xs mt-1 max-w-xs italic">"{selectedMood.affirmation}"</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className={`flex gap-1 p-2 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
              {["plan", "food", "journal", "wellness"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab === tab ? tabActive : tabInactive}`}>
                  {tab === "plan" ? "📋 Plan" : tab === "food" ? "🍽️ Food" : tab === "journal" ? "📝 Journal" : "🧘 Wellness"}
                </button>
              ))}
            </div>

            <div className="p-5">
              {/* Day Plan Tab */}
              {activeTab === "plan" && (
                <div className="space-y-3">
                  <button
                    onClick={() => generateAIPlan(selectedMood.label)}
                    disabled={loadingPlan}
                    className={`w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r ${selectedMood.gradient} hover:opacity-90 transition-all disabled:opacity-50`}
                  >
                    {loadingPlan ? "✨ Generating your plan..." : "✨ Generate AI Day Plan"}
                  </button>
                  {aiPlan ? (
                    <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-700" : selectedMood.light}`}>
                      <p className={`text-sm leading-relaxed whitespace-pre-wrap ${darkMode ? "text-gray-200" : selectedMood.text}`}>{aiPlan}</p>
                    </div>
                  ) : (
                    !loadingPlan && (
                      <div className="space-y-3">
                        {Object.values(selectedMood.plan).map((item, i) => (
                          <div key={i} className={`p-4 rounded-2xl ${darkMode ? "bg-gray-700" : selectedMood.light}`}>
                            <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-200" : selectedMood.text}`}>{item}</p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Food Tab */}
              {activeTab === "food" && (
                <div className="space-y-3">
                  <button
                    onClick={() => generateAIFoods(selectedMood.label)}
                    disabled={loadingFoods}
                    className={`w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r ${selectedMood.gradient} hover:opacity-90 transition-all disabled:opacity-50`}
                  >
                    {loadingFoods ? "🍽️ Finding perfect foods..." : "🍽️ Generate AI Food Suggestions"}
                  </button>
                  {(aiFoods.length > 0 ? aiFoods : selectedMood.foods).map((food, i) => (
                    <div key={i} className={`flex items-center justify-between p-4 rounded-2xl ${darkMode ? "bg-gray-700" : selectedMood.light}`}>
                      <div>
                        <p className={`font-bold text-sm ${darkMode ? "text-white" : selectedMood.text}`}>{food.name}</p>
                        <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{food.desc}</p>
                      </div>
                      <div className="flex gap-2">
                        <a href={`https://www.ubereats.com/search?q=${food.search}`} target="_blank" rel="noreferrer" className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${selectedMood.gradient} hover:opacity-90 transition-opacity`}>
                          Uber Eats
                        </a>
                        <a href="https://www.pickme.lk/food" target="_blank" rel="noreferrer" className={`px-3 py-1.5 rounded-xl text-xs font-bold ${darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-700"} hover:opacity-90 transition-opacity`}>
                          PickMe
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Journal Tab */}
              {activeTab === "journal" && (
                <div>
                  <p className={`text-sm font-semibold mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>How's your day going? Write it out:</p>
                  <textarea
                    className={`w-full rounded-2xl p-4 text-sm resize-none outline-none border-2 transition-colors ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-purple-400" : `${selectedMood.light} ${selectedMood.border}`}`}
                    rows={5}
                    placeholder={`What's on your mind today? You're feeling ${selectedMood.label.toLowerCase()}...`}
                    value={journal}
                    onChange={(e) => setJournal(e.target.value)}
                  />
                  {savedJournal && <p className="text-green-500 text-sm mt-2 text-center">✅ Journal saved with today's check-in!</p>}
                </div>
              )}

              {/* Wellness Tab */}
              {activeTab === "wellness" && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-700" : selectedMood.light}`}>
                    <p className={`font-bold text-sm mb-2 ${darkMode ? "text-white" : selectedMood.text}`}>🎵 Playlist for your mood</p>
                    <a href={selectedMood.playlist.url} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold bg-gradient-to-r ${selectedMood.gradient} hover:opacity-90 transition-opacity`}>
                      Open "{selectedMood.playlist.name}" on Spotify →
                    </a>
                  </div>
                  <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-700" : selectedMood.light}`}>
                    <p className={`font-bold text-sm mb-2 ${darkMode ? "text-white" : selectedMood.text}`}>🌬️ Breathing exercise</p>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{selectedMood.breathing}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Check-in Button */}
            <div className="px-5 pb-5">
              <button
                onClick={checkIn}
                disabled={checkedIn}
                className={`w-full py-3 rounded-2xl font-bold text-white transition-all ${checkedIn ? "bg-green-500 cursor-default" : `bg-gradient-to-r ${selectedMood.gradient} hover:opacity-90 hover:scale-[1.02] active:scale-95`}`}
              >
                {checkedIn ? "✅ Checked in today!" : "📌 Save today's mood & journal"}
              </button>
            </div>
          </div>
        )}

        {/* Mood History */}
        {history.length > 0 && (
          <div className={`${card} rounded-3xl p-5`}>
            <p className={`font-bold text-base mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>📊 Your week</p>
            <div className="flex justify-between gap-1 mb-4">
              {last7.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-lg ${d.entry ? (darkMode ? "bg-gray-700" : "bg-gray-100") : (darkMode ? "bg-gray-800" : "bg-gray-50")}`}>
                    {d.entry ? d.entry.emoji : "·"}
                  </div>
                  <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-400"}`}>{d.day}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {history.slice(0, 5).map((h, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                  <span className="text-xl">{h.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-700"}`}>{h.mood} — {h.date}</p>
                    {h.journal && <p className={`text-xs mt-0.5 truncate ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{h.journal}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className={`text-center text-xs mt-6 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>Made by Adithya ❤️</p>
      </div>
    </div>
  );
}