import React, { useState } from "react";

const yogaSessions = [
  {
    title: "Morning Yoga Flow",
    description: "Start your day with an energizing sequence to awaken body and mind.",
    duration: "20 mins",
    difficulty: "Beginner",
    type: "Yoga",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=80",
    steps: [
      "Begin in Mountain Pose, grounding your feet.",
      "Inhale to raise arms overhead.",
      "Flow through Sun Salutations slowly.",
      "Hold Warrior I and II on both sides.",
      "End with a short seated meditation.",
    ],
  },
  {
    title: "Full Body Stretch",
    description: "Improve flexibility and release tension with these deep stretches.",
    duration: "15 mins",
    difficulty: "All Levels",
    type: "Stretching",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
    steps: [
      "Neck rolls and shoulder shrugs.",
      "Side stretches and spinal twists.",
      "Forward fold and hamstring stretch.",
      "Butterfly pose for hips.",
      "Lay in supine twist to finish.",
    ],
  },
  {
    title: "Core Strength Routine",
    description: "Build endurance and tone your abs with this intense core workout.",
    duration: "10 mins",
    difficulty: "Intermediate",
    type: "Fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    steps: [
      "Plank hold - 30 seconds",
      "Mountain climbers - 45 seconds",
      "Bicycle crunches - 1 min",
      "Leg raises - 45 seconds",
      "Repeat cycle 2 times",
    ],
  },
  {
    title: "Evening Relaxation Yoga",
    description: "Unwind and stretch gently to prepare your body for a restful night.",
    duration: "25 mins",
    difficulty: "Beginner",
    type: "Yoga",
    image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&h=800",
    steps: [
      "Begin in Child's Pose and breathe deeply.",
      "Move into Cat-Cow stretch.",
      "Gentle spinal twists on the floor.",
      "Legs-up-the-wall pose for 5 mins.",
      "Finish with Savasana (Corpse Pose).",
    ],
  },
  {
    title: "HIIT Fat Burn",
    description: "Boost your metabolism and burn calories with high-intensity intervals.",
    duration: "12 mins",
    difficulty: "Advanced",
    type: "HIIT",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
    steps: [
      "Jumping jacks - 1 min",
      "Burpees - 30 sec",
      "Squat jumps - 1 min",
      "Push-ups - 30 sec",
      "Repeat twice with 30s rest",
    ],
  },
  {
    title: "Back Pain Relief Yoga",
    description: "Alleviate back pain through gentle poses and mindful breathing.",
    duration: "18 mins",
    difficulty: "Beginner",
    type: "Yoga Therapy",
    image: "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&h=800",
    steps: [
      "Cat-Cow stretch - 2 mins",
      "Child’s Pose - 3 mins",
      "Sphinx pose - 3 mins",
      "Knees to chest - 2 mins",
      "End with gentle twists and Savasana",
    ],
  },
];

const YogaAndFitness = () => {
  const [selectedSession, setSelectedSession] = useState(null);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-8 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          🧘 Yoga & Fitness Sessions
        </h1>
        <p className="text-center text-gray-600 text-lg mb-10 max-w-3xl mx-auto">
          Explore guided yoga flows, stretches, and workouts for your mind and body.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {yogaSessions.map((session, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedSession(session)}
              className="cursor-pointer bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
            >
              <img
                src={session.image}
                alt={session.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">{session.title}</h2>
                <p className="text-gray-600 text-sm">{session.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs bg-green-100 text-green-800 font-medium px-3 py-1 rounded-full">
                    ⏱ {session.duration}
                  </span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 font-medium px-3 py-1 rounded-full">
                    {session.difficulty}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full">
                    {session.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative">
              <button
                onClick={() => setSelectedSession(null)}
                className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-2">{selectedSession.title}</h2>
              <p className="text-gray-600 mb-4">{selectedSession.description}</p>
              <h4 className="font-semibold mb-2">📝 Steps:</h4>
              <ul className="list-disc ml-5 text-gray-700 mb-4 space-y-1">
                {selectedSession.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
              
            </div>
          </div>
        )}
         <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎥 Try This Guided Session</h2>
          <div className="flex justify-center">
            <iframe
              className="w-full max-w-2xl aspect-video rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/v7AYKMP6rOE"
              title="Yoga Session"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaAndFitness;
