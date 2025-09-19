import React, { useState, useEffect } from 'react';

const meditationSessions = [
  {
    title: "5-Minute Breath Focus",
    description: "A short session to reset your mind using gentle breath awareness.",
    duration: 5,
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
    steps: [
      "Find a quiet place to sit.",
      "Close your eyes gently.",
      "Inhale deeply through your nose.",
      "Exhale slowly through your mouth.",
      "Focus on the rhythm of your breath.",
    ],
  },
  {
    title: "10-Minute Body Scan",
    description: "Relax each part of your body and let go of tension through mindful scanning.",
    duration: 10,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    steps: [
      "Lie down comfortably on your back.",
      "Start by bringing attention to your toes.",
      "Move your awareness upward: legs, stomach, chest, arms.",
      "Notice sensations without judgment.",
      "Breathe deeply throughout the scan.",
    ],
  },
  {
    title: "Evening Calm Meditation",
    description: "Unwind after a long day and prepare your mind for deep, restful sleep.",
    duration: 15,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    steps: [
      "Dim the lights and sit or lie comfortably.",
      "Take 5 deep breaths, inhaling calm and exhaling stress.",
      "Visualize a peaceful place (e.g., beach, forest).",
      "Repeat a calming mantra like 'I am at peace'.",
      "Gradually bring awareness back to your breath.",
    ],
  },
  {
    title: "Mindful Walking",
    description: "Bring awareness to each step and reconnect with the present moment.",
    duration: 8,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    steps: [
      "Choose a quiet path or open area.",
      "Walk slowly and naturally, noticing your pace.",
      "Feel the contact of your feet with the ground.",
      "Breathe in rhythm with your steps.",
      "Observe sounds and surroundings without judgment.",
    ],
  },
  {
    title: "Morning Intention Setting",
    description: "Start your day mindfully by aligning thoughts, emotions, and goals.",
    duration: 6,
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
    steps: [
      "Sit upright in a bright space.",
      "Take 3 deep breaths to center yourself.",
      "Ask: 'How do I want to feel today?'",
      "Visualize a successful and calm day.",
      "Repeat a positive affirmation out loud.",
    ],
  },
  {
    title: "Gratitude Pause",
    description: "Reflect on things you’re grateful for to shift into a positive mindset.",
    duration: 7,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
    steps: [
      "Sit quietly and close your eyes.",
      "Take 3 breaths, each slower than the last.",
      "Recall 3 people or moments you're thankful for.",
      "Let yourself feel the warmth of those memories.",
      "Open your eyes slowly and smile gently.",
    ],
  },
];


const Meditation = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-8 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          🧘 Guided Meditation Sessions
        </h1>
        <p className="text-center text-gray-600 text-lg mb-10 max-w-3xl mx-auto">
          Tap into your inner calm. Choose a session below and follow the guided steps to begin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {meditationSessions.map((session, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedSession(session)}
              className="cursor-pointer bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={session.image}
                alt={session.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{session.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{session.description}</p>
                <span className="inline-block text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                  ⏱ {session.duration} mins
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl relative">
              <button
                onClick={() => {
                  setSelectedSession(null);
                  setTimeLeft(0);
                }}
                className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-2">{selectedSession.title}</h2>
              <p className="text-gray-600 mb-4">{selectedSession.description}</p>

              <h4 className="font-semibold mb-2">🧭 Steps:</h4>
              <ul className="list-disc ml-5 text-gray-700 mb-4">
                {selectedSession.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => startTimer(selectedSession.duration)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold"
                >
                  Start Timer ⏱
                </button>
                {timeLeft > 0 && (
                  <span className="text-xl font-mono text-gray-800">
                    ⌛ {formatTime(timeLeft)}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meditation;
