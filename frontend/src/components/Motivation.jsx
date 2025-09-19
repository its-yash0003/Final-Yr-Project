import React from 'react';

const motivationItems = [
  {
    title: "You Are Capable 🌟",
    description:
      "Every day is a new opportunity to grow stronger and wiser. Embrace challenges as fuel for growth.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Progress Over Perfection 🛤️",
    description:
      "Small consistent efforts build massive results over time. Just take the next step forward.",
    image:  "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Rest is Productive Too 🌙",
    description:
      "Balance hustle with rest. Recovery isn't quitting — it's part of your strategy.",
    image: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mindset is Everything 💭",
    description:
      "Believe in your ability to rise above. Your mindset defines your reality more than any circumstance.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
];


const Motivation = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          🌱 Find Your Daily Motivation
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Sometimes a few words can change the course of your day. Here's your personal collection of motivation and energy boosters to keep you going.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {motivationItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-100 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🎥 Quick Motivation Video
          </h3>
          <div className="flex justify-center">
            <iframe
              className="w-full max-w-2xl aspect-video rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/ZXsQAXx_ao0"
              title="Motivational Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motivation;
