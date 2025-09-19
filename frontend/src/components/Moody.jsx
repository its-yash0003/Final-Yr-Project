import React, { useState } from 'react';
import axios from 'axios';

const HeartFailurePredictionForm = () => {
  const [formData, setFormData] = useState({
    age: 48,
    bloodPressure: 140,
    cholesterol: 228,
    heartRate: 75,
    gender: 'Male',
    Mood: 'Happy😊',
  });

  const [predictionData, setPredictionData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleIncrement = (field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: prevState[field] + 1
    }));
  };

  const handleDecrement = (field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: prevState[field] - 1
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    const requestData = {
      age: formData.age,
      blood_pressure: formData.bloodPressure,
      cholesterol: formData.cholesterol,
      heart_rate: formData.heartRate,
      gender: formData.gender,
      mood: formData.Mood,
    };

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${API_BASE_URL}/predict`, requestData);

      setPredictionData(response.data);
    } catch (error) {
      console.error('Error sending request:', error);
      setPredictionData({ error: 'An error occurred while fetching the prediction.' });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-24 px-4 bg-black">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="bg-gray-900 p-6 rounded-lg w-full lg:w-2/3 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['age', 'bloodPressure', 'cholesterol'].map((field) => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 capitalize">
                    {field === 'bloodPressure' ? 'Resting Blood Pressure' : field}
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="bg-gray-800 text-white px-3 py-2 rounded-l-md w-full"
                    />
                    <div className="flex flex-col">
                      <button type="button" onClick={() => handleIncrement(field)} className="bg-gray-700 text-white px-2 py-1 rounded-tr-md">+</button>
                      <button type="button" onClick={() => handleDecrement(field)} className="bg-gray-700 text-white px-2 py-1 rounded-br-md">-</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="bg-gray-800 text-white px-3 py-2 rounded-md w-full"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Heart Rate</label>
                <div className="flex">
                  <input
                    type="number"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleInputChange}
                    className="bg-gray-800 text-white px-3 py-2 rounded-l-md w-full"
                  />
                  <group className="flex flex-col">
                    <button type="button" onClick={() => handleIncrement('heartRate')} className="bg-gray-700 text-white px-2 py-1 rounded-tr-md">+</button>
                    <button type="button" onClick={() => handleDecrement('heartRate')} className="bg-gray-700 text-white px-2 py-1 rounded-br-md">-</button>
                  </group>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Mood🌿</label>
                <select
                  name="Mood"
                  value={formData.Mood}
                  onChange={handleInputChange}
                  className="bg-gray-800 text-white px-3 py-2 rounded-md w-full"
                >
                  <option>Happy😊</option>
                  <option>Sad🥲</option>
                  <option>Anxious😫</option>
                  <option>Excited🤩</option>
                  <option>Neutral🙃</option>
                  <option>Angry😡</option>
                  <option>Isolation😞</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Send 🚀
            </button>
          </form>
        </div>

        {/* Prediction Results */}
        <div className="bg-gray-800 p-6 rounded-lg w-full lg:w-1/3 shadow-lg">
          {predictionData && (
            <div>
              <h3 className="text-lg font-bold text-gray-300 mb-2">Prediction Results:</h3>
              {predictionData.error ? (
                <p className="text-red-500">{predictionData.error}</p>
              ) : (
                <div>
                  <p className="text-gray-200">Mental Status: <span className="font-bold">{predictionData.prediction}</span></p>
                  <p className="text-gray-200 mt-2">Risk Factors:</p>
                  <ul className="list-disc ml-5">
                    {predictionData.risk_factors && predictionData.risk_factors.length > 0 ? (
                      predictionData.risk_factors.map((factor, index) => (
                        <li key={index} className="text-gray-200">{factor}</li>
                      ))
                    ) : (
                      <li className="text-gray-200">None</li>
                    )}
                  </ul>
                  <p className="text-gray-200 mt-2">Severity: <span className="font-bold">{predictionData.severity}</span></p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeartFailurePredictionForm;
