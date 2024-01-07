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
  }, []);

  const predictWeather = async () => {
    if (weatherData) {
      const { temperature, humidity, pressure, rain } = weatherData;
      console.log(temperature)
      console.log(humidity)

      const inputArray = [humidity,temperature, rain, pressure];
  
        try {
          fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input_array: inputArray }),
            })
            .then(response => response.json())
            .then(result => {
              console.log(result)
                setPredictedWeather(result.prediction[0]);
            })

        } catch (error) {
          setPredictedWeather("ML Server not reachable!");
          console.error('Error predicting weather:', error);
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
	<div className="mb-2 text-3xl font-semibold">{weatherData?.temperature}°
		<span className="mx-1 font-normal"></span>
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