import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Allone = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState([new Date().setDate(new Date().getDate() - 6), new Date()]);
  
      

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://weather-wise-f8948-default-rtdb.firebaseio.com/weatherstore.json');
      const weatherData = response.data;

      // Convert the data into a format that is easier to work with
      const formattedData = [];
      for (const date in weatherData) {
        for (const day in weatherData[date]) {
          formattedData.push({
            date,
            day,
            humidity: weatherData[date][day].humidity,
            pressure: weatherData[date][day].pressure,
            rain: weatherData[date][day].rain,
            temperature: weatherData[date][day].temperature,
          });
          const filteredData = data.filter((item) => {
            const itemDate = new Date(item.date);
            return (itemDate >= selectedDate[0] && itemDate <= selectedDate[1]);
          });
    
        }
      }
      

      // Sort the data by date and day
      formattedData.sort((a, b) => {
        const dateComparison = Date.parse(a.date) - Date.parse(b.date);
        if (dateComparison === 0) {
          return a.day.localeCompare(b.day);
        }
        return dateComparison;
      });

      setData(formattedData);
    };

    fetchData();
  }, []);
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    return (itemDate >= selectedDate[0] && itemDate <= selectedDate[1]);
  });


  return (
    <>
  
     
    

<div class="relative overflow-x-auto">


    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Time
                </th>
                <th scope="col" class="px-6 py-3">
                    Hunidity
                </th>
                <th scope="col" class="px-6 py-3">
                    Pressure
                </th>
                <th scope="col" class="px-6 py-3">
                    Rain
                </th>
                <th scope="col" class="px-6 py-3">
                    Temperature
                </th>
            </tr>
        </thead>
        <tbody>
          
        {filteredData.map((item) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                <th scope="row" class="px-6 py-4 ">
                {item.date}
                </th>
                <td class="px-6 py-4">
                {item.day}
                </td>
                <td class="px-6 py-4">
                {item.humidity}
                </td>
                <td class="px-6 py-4">
                {item.pressure}
                </td>
                <td class="px-6 py-4">
                {item.rain}
                </td>
                <td class="px-6 py-4">
                {item.temperature}
                </td>
            </tr>
              ))}
            
        </tbody>
    </table>
</div>
</>
  );
};

export default Allone;
