import { useState } from "react";
import { useFetchWeather, useForeastFetch } from "../api/fetching";
import { Input } from "./input";
import './styles/dashboard.css';
import { ForecastPanel } from "./forecastPanel";
import { WeatherPanel } from "./weatherPanel";

type Panels = 'weather' | 'forecast';

export function Dashboard() {

    const [city,setCity] = useState('Praha');
    const [panel,setPanel] = useState<Panels>('weather');

    const {weather,loading,error} = useFetchWeather(city);
    const {data:forecast,loading:forecastLoading,error:forecastError} = useForeastFetch(city);

    return(      

        <div className="dash-container">
            <div className="dash-head">
                <div className="dash-title">{panel}</div>
                <div className="city-input">
                    <Input returnValue={setCity}></Input>
                </div>
            </div>
            <div className="filter-panel">
                <button className="panel-btn" onClick={()=>setPanel('weather')}>Weather</button>
                <button className="panel-btn" onClick={()=>setPanel('forecast')}>Forecast</button>
            </div>
            <div className="dash-body">
                {panel === 'weather' ? (
                    <WeatherPanel weather={weather} loading={loading} error={error}></WeatherPanel>
                ):(
                    <ForecastPanel forecast={forecast} loading={forecastLoading} error={forecastError}></ForecastPanel>
                )}
            </div>
        </div>
    );
}