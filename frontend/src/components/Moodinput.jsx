import React, { useState } from 'react';
import { useFirebase } from '../context/firebase'; // Adjust the import path as necessary

const MoodInput = () => {
  const [mood, setMood] = useState('');
  const { user } = useFirebase(); // Access user info if needed
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mood) {
      setMessage('Please select a mood.');
      return;
    }

    try {
      // Here you would typically send the mood data to your server or save it
      console.log(`User ${user?.email} reported mood: ${mood}`);
      setMessage('Mood submitted successfully!'); // Display success message
      setMood(''); // Clear input field
    } catch (error) {
      console.error('Error submitting mood:', error);
      setMessage('Failed to submit mood. Please try again.'); // Display error message
    }
  };

  return (
    <div className="mood-input-container">
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="mood-select"
        >
          <option value="" disabled>Select your mood</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="anxious">Anxious</option>
          <option value="excited">Excited</option>
          <option value="neutral">Neutral</option>
          <option value="angry">Angry</option>
        </select>
        <button type="submit" className="submit-button">Submit Mood</button>
      </form>
      {message && <p className="feedback-message">{message}</p>}
    </div>
  );
};

export default MoodInput;
