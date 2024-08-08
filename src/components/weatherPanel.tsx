import { InfoCard } from "./infoCard";
import { Weather } from "../types/weather";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { weatherIcons } from "../types/weather";
import './styles/weatherPanel.css';

type Props = {
    weather:Weather | null;
    loading:boolean;
    error:boolean;
};

export function WeatherPanel({weather,loading,error}:Props){

    const getWeatherIcon = (main: string) => {
        return weatherIcons[main] || <IoPartlySunnyOutline />;
    };

    return(
        <>
        {loading? (
            <div>Načítá se...</div>
        ):(
            error? (
                <div>Chyba</div>
            ):(
                <div className="weather-panel">
                    <div className="city">
                        {weather?.name}
                    </div>
                    <div className="main-info">
                        <div className="info-left-top">
                            <InfoCard title="Temperature">{Math.floor(weather? weather.main.temp: 0)}°C</InfoCard>
                        </div>
                        <div className="info-left-bottom">
                            <InfoCard title="Feels like">{Math.floor(weather? weather.main.feels_like:0)}°C</InfoCard>
                        </div>
                        <div className="info-center">
                            <InfoCard title={weather?.weather[0].description}>
                                {weather &&(getWeatherIcon(weather.weather[0].main))}
                            </InfoCard> 
                        </div>
                        <div className="info-center-bottom">
                            <InfoCard title="Wind speed">{weather?.wind.speed} m/s</InfoCard>
                        </div>
                        <div className="info-right-top">
                            <InfoCard title="Pressure">{weather?.main.pressure} Bar</InfoCard>
                        </div>
                        <div className="info-right-bottom">
                            <InfoCard title="Humidity">{weather?.main.humidity} %</InfoCard>
                        </div>
                    </div>
                </div>
            )
        )}
        </>
    );
};

