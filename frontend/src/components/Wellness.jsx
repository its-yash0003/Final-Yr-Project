import React, { useState } from 'react';

const moods = ['Happy', 'Anxious', 'Stressed', 'Sad', 'Motivated'];
const goals = ['Reduce stress', 'Improve sleep', 'Increase focus', 'Stay positive'];
const activities = ['Meditation', 'Yoga', 'Journaling', 'Walking', 'Music'];

const Wellness = () => {
  const [mood, setMood] = useState('');
  const [goal, setGoal] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood || !goal || selectedActivities.length === 0) {
      alert('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
  };

  const resetForm = () => {
    setMood('');
    setGoal('');
    setSelectedActivities([]);
    setSubmitted(false);
  };

  return (
    <>
    <div className="h-16" />
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Wellness Planner
        </h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mood */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Current Mood</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a mood</option>
                {moods.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Wellness Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a goal</option>
                {goals.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Activities */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Preferred Activities</label>
              <div className="grid grid-cols-2 gap-3">
                {activities.map((activity) => (
                  <label key={activity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedActivities.includes(activity)}
                      onChange={() => toggleActivity(activity)}
                      className="accent-blue-600"
                    />
                    <span>{activity}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save Wellness Plan
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-green-600">Plan Created Successfully!</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <p><strong>Mood:</strong> {mood}</p>
              <p><strong>Goal:</strong> {goal}</p>
              <p><strong>Activities:</strong> {selectedActivities.join(', ')}</p>
            </div>
            <button
              onClick={resetForm}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Create Another Plan
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Wellness;
