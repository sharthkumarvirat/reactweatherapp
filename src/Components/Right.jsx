import React from 'react'

export default function Right({ data, iconMap, changeTemp }) {

  function extractFiveDaysWeather(data) {
    const fiveDaysWeather = {};

    // Iterate through each data point
    data.forEach(item => {
      const dateTime = new Date(item.dt_txt);
      const dateKey = dateTime.toISOString().split('T')[0]; // Extract YYYY-MM-DD

      // Check if the dateKey exists in the fiveDaysWeather object
      if (!fiveDaysWeather[dateKey]) {
        fiveDaysWeather[dateKey] = {
          date: dateKey,
          weekday: getWeekdayName(dateTime),
          data: []
        };
      }

      // Add the current data point to the corresponding date
      fiveDaysWeather[dateKey].data.push(item);
    });

    // Convert object to array and return
    return Object.values(fiveDaysWeather);
  }

  // Function to get weekday name from date
  function getWeekdayName(date) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[date.getDay()];
  }

  const fiveDaysWeatherData = extractFiveDaysWeather(data);

  return (
    <div className='w-1/2'>
      <div className='customFlex'>
        <p>WEEKLY FORECAST</p>
      </div>
      <div className='customFlex flex-col gap-2'>
        {
          fiveDaysWeatherData.map((day) => {
            return (
              <div key={day.date} className='customFlex justify-evenly items-center gap-6 w-full bg-[#3838431f] rounded-xl p-2'>
                <div>
                  <p className='font-semibold text-sm text-cyan-200'>{day.weekday}</p>
                  <img src={iconMap[day.data[0].weather[0].icon]} alt="Weather Icon" className='max-h-[2rem]' />
                  <p>{day.date}</p>
                </div>
                <div className='text-sm'>
                {
                    changeTemp ?
                      <p>{day.data[0].main.temp} <sup>o</sup> C</p>
                      :
                      <p>{((day.data[0].main.temp * 9 / 5) + 32).toFixed(2)} F</p>
                  }
                  <p>{day.data[0].weather[0].description}</p>
                </div>
                <div className='text-sm'>
                  <p>{day.data[0].wind.speed} m/s</p>
                  <p>{day.data[0].main.humidity} %</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
