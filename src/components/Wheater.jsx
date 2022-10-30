import { useEffect, useState } from "react";
import axios from 'axios';


const Wheater = () => {

  const [data, setData] = useState(null);
  const [isCelcius,setIsCelcius] = useState(true);
  
  useEffect( ()=> {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    const success = (pos) => {
      const  lat = pos.coords.latitude;
      const  lon = pos.coords.longitude;
      
      const endPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f75f9dfa75fd4b692660e5aede8cd7e5`;

      axios.get(endPoint)
         .then(res => setData(res.data));
    };
    
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);

  }, []);

  const toCelcius = () => {
    setTempCelcius((data.main.temp -273.15).toFixed(2));
  };

  if(data == null){
    return (
      <div className="loader"></div>
    );
  }
  
  console.log(data);

  return (
    <div className="card">
      <div className="title">
        <h1 className="title-app">Weather App</h1>
        <h2 className="country-city">
          <i className="fa-solid fa-location-dot"></i> {" "}
          {data.name}, {data.sys.country}
        </h2>
        <h3 className="description">{data.weather?.[0].description}</h3>
      </div>
     
      <div className="info-container">
        
        <div className="icon-weather-container">
          <img className="icon-weather-api" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
          <p className="temperature">
            { isCelcius ? `${(data.main.temp -273.15).toFixed(2) } °C`:
                          `${((data.main.temp - 273.15) * 9/5 + 32).toFixed(2)} °F`
            }
            </p>
          <p className="temperature-min-max">
            Min {" "}
            { isCelcius ? `${(data.main.temp -273.15).toFixed(2) } °C`:
                          `${((data.main.temp - 273.15) * 9/5 + 32).toFixed(2)}°F`
            }
            {" "}
            -
            Max {" "}
            { isCelcius ? `${(data.main.temp -273.15).toFixed(2) } °C`:
                          `${((data.main.temp - 273.15) * 9/5 + 32).toFixed(2)}°F`
            }
          </p>
        </div>

        <div className="detail">
          <div className="detail-data">
            <div className="icons"><i className="fa-solid fa-wind"></i></div>
            Wind Speed: {' '}
            <div className="detail-data-values">{data.wind.speed} m/s</div>
          </div>
          <div className="detail-data">
            <div className="icons"><i className="fa-solid fa-cloud"></i></div>
            Cloud: {' '}
            <div className="detail-data-values">{data.clouds.all}%</div>
          </div>
          <div className="detail-data">
            <div className="icons"><i className="fa-solid fa-droplet"></i></div>
            Humidity: {' '}
            <div className="detail-data-values">{data.main.humidity}%</div>
          </div>
          <div className="detail-data">
            <div className="icons"><i className="fa-solid fa-temperature-three-quarters"></i></div>
            Pressure: {' '}
            <div className="detail-data-values">{data.main.pressure} hPa</div>
          </div>
        </div>

      </div>
      <button onClick={()=>{setIsCelcius(!isCelcius)}}>{isCelcius ? 'Change to °C': 'Change to °F'}</button>
    </div>
  );
};

export default Wheater;