import { ForecastItem, WeatherForecast } from "../types/forecast";
import { weatherIcons } from "../types/weather";
import { IoPartlySunnyOutline } from "react-icons/io5";
import './styles/forecastPanel.css';
import { Slider } from "./slider";

type Props = {
    forecast:WeatherForecast | null;
    loading:boolean;
    error:boolean;
};

const groupForecastsByDate = (list: ForecastItem[]) => {
    return list.reduce((acc: { [key: string]: ForecastItem[] }, value) => {
        const date = value.dt_txt.split(' ')[0];
        const time = value.dt_txt.split(' ')[1];
        const hour = parseInt(time.split(':')[0], 10);

        if (hour === 6 || hour === 12 || hour === 18) {
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(value);
        }
        return acc;
    }, {});
};


export function ForecastPanel({forecast,loading,error}:Props){

    const getWeatherIcon = (main: string) => {
        return weatherIcons[main] || <IoPartlySunnyOutline />;
    };

    const forecastGroups = forecast ? groupForecastsByDate(forecast.list) : {};

    return(
        <div className="forecast-container">
            {loading? (
                <div>Načítá se...</div>
            ):(
                error? (
                    <div>Chyba</div>
                ):(
                    <>
                    <div className="city">
                        {forecast?.city.name}
                    </div>
                    <div className="forecast-body">
                        {Object.keys(forecastGroups).map((date) => (
                            <div key={date} className="forecast-day">
                                <div className="for-day-day">{date}</div>
                                <Slider slidedObject={forecastGroups[date]}></Slider>
                                
                                {/*<div className="forecast-carousel">
                                <button className="for-btn" onClick={scrollLeft}><IoChevronBack></IoChevronBack></button>
                                    <div className="forecast-carousel-inner">
                                        <div className="forecast-carousel-moving">
                                            {forecastGroups[date].map((value, index) => (
                                                <div className="forecast-card">
                                                    <ForecastLine style={{ gridColumn: '1 / span 2' }}>
                                                        {(value.dt_txt.split(' ')[1]).split(':')[0]}h
                                                    </ForecastLine>
                                                    <div className="forecast-icon">
                                                        {getWeatherIcon(value.weather[0].description)}
                                                    </div>
                                                    <div className="forecast-info">
                                                        <ForecastLine title="Temperature">
                                                            {Math.floor(value.main.temp)}°C
                                                        </ForecastLine>
                                                        <ForecastLine title="Rain">
                                                            {value.rain? Math.floor(value.rain['3h']):0} %
                                                        </ForecastLine>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="for-btn" onClick={scrollRight}><IoChevronForward></IoChevronForward></button>
                                </div>*/}
                                
                            </div>
                        ))}
                    </div>
                    </>
                )
            )}
        </div>
    );
};

type LineProps = {
    children:React.ReactNode;
    title?:string;
    style?:React.CSSProperties;
}

export function ForecastLine({children,title,style}:LineProps){

    return(
        <div className="forecast-line" style={style}>
            {title&&(<div className="for-line-title">
                {title}
            </div>)}
            <div className="for-line-data">
                {children}
            </div>
        </div>

    );
};