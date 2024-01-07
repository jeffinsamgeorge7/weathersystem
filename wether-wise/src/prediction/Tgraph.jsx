import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph2 = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://weather-wise-f8948-default-rtdb.firebaseio.com/weatherstore.json');
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Extracting data and timestamps
  const labels = [];
  const temperatures = [];
  const humidity = [];
  const rain = [];
  const pressure = [];

  for (const date in weatherData) {
    for (const timestamp in weatherData[date]) {
      const weatherInfo = weatherData[date][timestamp];
      labels.push(new Date(`${date} ${timestamp}`));
      temperatures.push(weatherInfo.temperature);
      humidity.push(weatherInfo.humidity);
      rain.push(weatherInfo.rain);
      pressure.push(weatherInfo.pressure);
    }
  }

  const temperatureData = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        borderColor: 'rgba(75,192,192,1)',
        data: temperatures,
      },
    ],
  };

  const humidityData = {
    labels: labels,
    datasets: [
      {
        label: 'Humidity (%)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: humidity,
      },
    ],
  };

  const rainData = {
    labels: labels,
    datasets: [
      {
        label: 'Rain',
        borderColor: 'rgba(54, 162, 235, 1)',
        data: rain,
      },
    ],
  };

  const pressureData = {
    labels: labels,
    datasets: [
      {
        label: 'Pressure',
        borderColor: 'rgba(255, 206, 86, 1)',
        data: pressure,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'MMM D HH:mm',
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Temperature Data Over Time</h1>
      <Line data={temperatureData} options={options} />

      <h1>Humidity Data Over Time</h1>
      <Line data={humidityData} options={options} />

      <h1>Rain Data Over Time</h1>
      <Line data={rainData} options={options} />

      <h1>Pressure Data Over Time</h1>
      <Line data={pressureData} options={options} />
    </div>
  );
};

export default LineGraph2;