import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";
import * as tf from "@tensorflow/tfjs";

function Newhome() {
  const [weatherData, setWeatherData] = useState(null);
  const [predictedWeather, setPredictedWeather] = useState("Unknown");

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        const values = Object.values(data)[0];
        setWeatherData({
          ...values,
        });
      }
    }, []);

    // Load a simple TensorFlow.js classification model
    const loadModel = async () => {
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 3, inputShape: [4], activation: "softmax" }));
      model.compile({ loss: "categoricalCrossentropy", optimizer: "adam" });

      // Sample dataset (temperature, humidity, pressure, rain, and predicted weather condition)
      const trainingData = {
        features: tf.tensor2d([
          [15, 60, 1013, 0.2],
          [20, 55, 1010, 0.0],
          [25, 70, 1015, 0.1],
          [18, 75, 1008, 0.3],
          [22, 50, 1012, 0.0],
          // Add more data here...
        ]),
        labels: tf.tensor2d([
          [0, 0, 1], // Sunny
          [0, 1, 0], // Rainy
          [1, 0, 0], // Cloudy
          [0, 0, 1], // Sunny
          [0, 1, 0], // Rainy
          // Add more labels here...
        ]),
      };

      const trainingConfig = {
        epochs: 100,
      };

      await model.fit(trainingData.features, trainingData.labels, trainingConfig);

      setWeatherModel(model);
    };
    loadModel();
  }, []);

  const predictWeather = () => {
    if (weatherData) {
      const { temperature, humidity, pressure, rain } = weatherData;
      if (weatherModel && !isNaN(temperature) && !isNaN(humidity) && !isNaN(pressure) && !isNaN(rain)) {
        const input = tf.tensor2d([[temperature, humidity, pressure, rain]]);
        const prediction = weatherModel.predict(input).dataSync();
        const weatherConditions = ["Sunny", "Rainy", "Cloudy"];
        const predictedCondition = weatherConditions[prediction.indexOf(Math.max(...prediction))];
        setPredictedWeather(predictedCondition);
      }
    }
  };

  const [weatherModel, setWeatherModel] = useState(null);

  return (
    <>
   
    <div className="flex flex-col items-center p-8 rounded-md w-80  sm:px-12 dark:bg-gray-900 dark:text-gray-100">
	<div className="text-center">
		<h2 className="text-xl font-semibold">Temperature: {weatherData?.temperature}°</h2>
    <h2 className="text-xl font-semibold">Humidity: {weatherData?.humidity}hp</h2>
    <h2 className="text-xl font-semibold">Pressure: {weatherData?.pressure}</h2>
    <h2 className="text-xl font-semibold">{weatherData?.rain === 1 ? "Raining" : "Not Raining"}</h2>
		
	</div>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-32 h-32 p-6 dark:text-yellow-400 fill-current">
		<path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"></path>
		<rect width="32" height="48" x="240" y="16"></rect>
		<rect width="32" height="48" x="240" y="448"></rect>
		<rect width="48" height="32" x="448" y="240"></rect>
		<rect width="48" height="32" x="16" y="240"></rect>
		<rect width="32" height="45.255" x="400" y="393.373" transform="rotate(-45 416 416)"></rect>
		<rect width="32.001" height="45.255" x="80" y="73.373" transform="rotate(-45 96 96)"></rect>
		<rect width="45.255" height="32" x="73.373" y="400" transform="rotate(-45.001 96.002 416.003)"></rect>
		<rect width="45.255" height="32.001" x="393.373" y="80" transform="rotate(-45 416 96)"></rect>
	</svg>
	<div className="mb-2 text-3xl font-semibold">32°
		<span className="mx-1 font-normal">/</span>20°
	</div>
  <p className="mb-2 text-3xl font-semibold"> {predictedWeather}</p>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        type="submit"
        onClick={predictWeather}
        >Predict 
        </button>
</div>
    </>
  );
}

export default Newhome;
