import React, { useEffect } from 'react';

//import { onValue, ref } from "firebase/database";
import firebase from './firebase';
export {db} from './firebase';
export default function WeatherTable(){
  const [weatherData, setWeatherData] = useState([]);

    async function getWeatherData() {
        //const db = firebase.firestore();
        const docRef = db.collection('weatherstore').doc('2023-11-2').collection('16-11-18').doc('temperature,humidity,pressure');
        const doc = await docRef.get();
      
        const temperature = doc.get('temperature');
        const humidity = doc.get('humidity');
        const pressure = doc.get('pressure');
      
        // Get the date and time from the document ID.
        const date = doc.id.split('/')[0];
        const time = doc.id.split('/')[1];
      
        setWeatherData([...weatherData, { date, time, temperature, humidity, pressure }]);

        useEffect(() => {
            getWeatherData();
          }, []);
          
      }
      
    return (
        <table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Time</th>
      <th>Temperature</th>
      <th>Humidity</th>
      <th>Pressure</th>
    </tr>
  </thead>
  <tbody>
    {weatherData.map((item) => (
      <tr key={item.id}>
        <td>{item.date}</td>
        <td>{item.time}</td>
        <td>{item.temperature}</td>
        <td>{item.humidity}</td>
        <td>{item.pressure}</td>
      </tr>
    ))}
  </tbody>
</table>

    )
}