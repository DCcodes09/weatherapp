import { useEffect, useState,useRef } from 'react';
import './weather.css';
import search_icon from '../assets/search.png';
import clouds_icon from '../assets/clouds.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import drizzle_icon from '../assets/drizzle.png';
import clear_icon from '../assets/clear.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';


const Weather = () => {

    const inputRef = useRef ()

    const [WeatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": clouds_icon,
        "02n": clouds_icon,
        "03d": clouds_icon,
        "03n": clouds_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }
const search =async (city)=>{
    if(city ===""){
        alert("Enter City Name");
        return;
    }
    try {
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;
        
        const Response= await fetch (url);
        const data = await Response.json()

        if(!Response.ok){
            alert(data.message);
            return;
        }

        console.log(data);
        const icon = allIcons [data.weather[0].icon] || clear_icon;
        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon,

        })
    } catch (error) {
        setWeatherData(false);
        console.error

    }
}
useEffect(()=>{
    search("New York");
},[])
  return (
    < div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div> 
        {WeatherData?<>
        
        <img src={WeatherData.icon} alt="" className='weather-icon'/>
        <p className= 'temperature'>{WeatherData.temperature}°F</p>
        <p className='location'>{WeatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt=""/>
                <div>
                    <p>{WeatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt=""/>
                <div>
                    <p>{WeatherData.windSpeed} mph</p>
                    <span>Wind Speed</span>
                </div>
            </div>
 </div>
        </>:<></>}

    </div>
  )
}

export default Weather
