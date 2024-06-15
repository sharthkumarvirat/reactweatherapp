import React from 'react';

export default function Left({ data, iconMap, search, changeTemp }) {

  let icon = data[0].weather[0].icon;
  console.log("ChengTemp = ", changeTemp);

  return (
    <div className='grid gap-2 max-sm:grid-rows-1 max-md:grid-rows-1 lg:grid-rows-3'>
      {/* Current weather */}
      <div className='w-full h-1/3 text-base'>
        <div className='customFlex w-full font-bold font-mono text-2xl text-[#B5BCC9]'>
          <h3>CURRENT WEATHER</h3>
        </div>
        <div className='customFlex justify-evenly w-full'>
          <div>
            <h3 className='text-slate-300 font-bold'>{search.toUpperCase()}</h3>
            <p>{data[0].dt_txt.split(" ")[0]}</p>
          </div>
          <div>
            {
              changeTemp ?
                <h5 className='text-3xl font-bold' >{data[0].main.temp} <sup>o</sup> C</h5>
                :
                <h5 className='text-3xl font-bold' >{((data[0].main.temp * 9 / 5) + 32).toFixed(2)} F</h5>
            }
          </div>
          <div>
            <img src={iconMap[icon]} alt="Weather Icon" className='max-h-[3rem]' />
            <h5>{data[0].weather[0].description}</h5>
          </div>
        </div>
      </div>

      {/* Air Conditions */}
      <div className='w-full h-1/3 text-base'>
        <div className='customFlex w-full font-bold font-mono text-2xl text-[#B5BCC9]'>
          <h3>AIR CONDITIONS</h3>
        </div>
        <div className='customFlex justify-evenly w-full'>
          <div>
            <h3 className='text-slate-400 font-semibold'>Real Feel</h3>
            <p className='font-semibold' text-xl>{data[0].main.feels_like} <sup>o</sup> C</p>
          </div>
          <div>
            <h3 className='text-slate-400 font-semibold' >Humidity</h3>
            <p className='font-semibold text-xl'>{data[0].main.humidity} %</p>
          </div>
          <div>
            <h3 className='text-slate-400 font-semibold' >Temp Max</h3>
            {
              changeTemp ?
                <p className='font-semibold text-xl'>{data[0].main.temp_max} <sup>o</sup> C</p>
                :
                <p className='font-semibold text-xl' >{((data[0].main.temp_max * 9 / 5) + 32).toFixed(2)} F</p>
            }
          </div>
          <div>
            <h3 className='text-slate-400 font-semibold' >Temp Min</h3>
            {
              changeTemp ?
                <p className='font-semibold text-xl'>{data[0].main.temp_min} <sup>o</sup> C</p>
                :
                <p className='font-semibold text-xl' >{((data[0].main.temp_min * 9 / 5) + 32).toFixed(2)} F</p>
            }
          </div>
        </div>
      </div>

      {/* Today's forecast */}
      <div className='w-full h-1/3'>
        <div className='customFlex w-full font-bold font-mono text-2xl text-[#B5BCC9]'>
          <h3>TODAY'S FORECAST</h3>
        </div>
        <div className='customFlex flex-row flex-wrap gap-4 mt-4'>
          {
            data.slice(0, 5).map((element) => {
              return (
                <div key={element.main.temp} className='bg-[#13131333] p-4 rounded-xl'>
                  <p>{element.dt_txt.split(" ")[1]}</p>
                  <img src={iconMap[element.weather[0].icon]} alt="Weather Icon" className='max-h-[3rem]' />
                  {
                    changeTemp ?
                      <p className='font-bold'>{element.main.temp} <sup>o</sup> C</p>
                      :
                      <p className='font-bold' >{((element.main.temp * 9 / 5) + 32).toFixed(2)} F</p>
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
