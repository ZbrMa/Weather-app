import { ForecastItem } from "../types/forecast";
import { ForecastLine } from "./forecastPanel";
import { weatherIcons } from "../types/weather";
import { IoPartlySunnyOutline } from "react-icons/io5";
import './styles/forecastCard.css';

type Props = {
    value:ForecastItem;
}


export function ForecastCard({value}:Props) {

    const getWeatherIcon = (main: string) => {
        return weatherIcons[main] || <IoPartlySunnyOutline />;
    };

    return(
        <div className="forecast-card">
            <div className="forecast-card-inner">
                                                    <ForecastLine style={{ gridColumn: '1 / span 2' }}>
                                                        {(value.dt_txt.split(' ')[1]).split(':')[0]}h
                                                    </ForecastLine>
                                                    <div className="forecast-icon">
                                                        {getWeatherIcon(value.weather[0].main)}
                                                    </div>
                                                    <div className="forecast-info">
                                                        <ForecastLine title="Temp">
                                                            {Math.floor(value.main.temp)}°C
                                                        </ForecastLine>
                                                        <ForecastLine title="Desc">
                                                            {value.weather[0].main}
                                                        </ForecastLine>
                                                        <ForecastLine title="Wind">
                                                            {value.wind.speed} m/s
                                                        </ForecastLine>   
                                                    </div>
            </div>                                           
        </div>

    );
};