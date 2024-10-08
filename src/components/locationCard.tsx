import { useFetchWeather } from "../api/fetching";
import { IoSunny, IoTrash } from "react-icons/io5";
import { weatherIcons } from "../types/weather";
import './styles/locationCard.css';
import { useUser } from "../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { removeCity, selectUser } from "../slices/authSlice";

type Props = {
    city:string,
}

export function LocationCard({city}:Props){

    const {weather,loading,error} = useFetchWeather(city);
    const dispatch = useDispatch();

    const getWeatherIcon = (main: string) => {
        return weatherIcons[main] || <IoSunny />;
    };

    const handleDelete = (city:string) =>{
        dispatch(
            removeCity({
                city:city,
            })
        );
    };

    if (weather){
        return(
            <div className="location__card">
                <h2>{city}</h2>
                <div className="location--temp">{Math.floor(weather.main.temp)} °C</div>
                <div className="location__card--data">{getWeatherIcon(weather.weather[0].main)}</div>
                <div className="location__card--data">{weather.main.humidity} %</div>
                <div className="location__card--data">{weather.main.pressure} Bar</div>
                <div className="location__card--data">{weather.wind.speed} m/s</div>
                <button onClick={()=>handleDelete(city)}><IoTrash/></button>
            </div>
        )
    }

    return(
        null
    );
}