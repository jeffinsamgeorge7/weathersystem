import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = () => {
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

  // Extracting temperature data and timestamps
  const labels = [];
  const temperatures = [];

  for (const date in weatherData) {
    for (const timestamp in weatherData[date]) {
      const weatherInfo = weatherData[date][timestamp];
      labels.push(new Date(`${date} ${timestamp}`));
      temperatures.push(weatherInfo.temperature);
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: temperatures,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour', // or 'minute', 'day', etc.
          displayFormats: {
            hour: 'MMM D HH:mm', // customize the display format
          },
        },
      },
      y: {
        // other options for the y-axis
      },
    },
  };

  return (
    <div>
      <h2>Temperature Data Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
