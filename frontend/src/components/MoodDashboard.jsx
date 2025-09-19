// src/components/MoodDashboard.jsx
import React from 'react';
import { Line } from 'react-chartjs-2'; // You can use Chart.js to visualize the data

const MoodDashboard = ({ healthData }) => {
  // Check if healthData is defined and contains bucket data
  if (!healthData || !healthData.bucket || healthData.bucket.length === 0) {
    return <div>No data available</div>;
  }

  // Prepare data for Chart.js visualization
  const heartRateData = healthData.bucket.flatMap((bucket) => 
    bucket.dataset[0].point.map((point) => point.value[0].fpVal)
  );

  // Extracting timestamps for labels
  const labels = healthData.bucket.flatMap((bucket) => 
    bucket.dataset[0].point.map((point) => new Date(point.startTimeNanos / 1e6).toLocaleTimeString())
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Heart Rate (BPM)',
        data: heartRateData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Health Dashboard</h2>
      <Line data={data} />
    </div>
  );
};

export default MoodDashboard;
