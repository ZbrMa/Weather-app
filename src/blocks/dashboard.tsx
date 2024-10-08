import { InfoCard } from '../components/infoCard';
import { Input } from '../components/input';
import './styles/dashboard.css';
import { useFetchWeather,useForeastFetch } from '../api/fetching';
import { useState } from 'react';
import { weatherIcons } from '../types/weather';
import { FaWind,FaWater } from 'react-icons/fa';
import { IoSunny, IoSearchOutline, IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5';
import { MdOutlineDashboard } from 'react-icons/md';
import { FiSunset,FiSunrise } from "react-icons/fi";
import { BarChart } from '../components/barChart';
import { useUser } from '../context/userContext';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';

const today = new Date();
const months = ['leden','únor','březen','duben','květen','červen','červenec','srpen','září','říjen','listopad','prosinec'];
const days = ['neděle','pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'];

export function Dashboard(){
    const {name,location} = useSelector(selectUser);

    const [city,setCity] = useState(location.city);
    const [inputCity,setInputCity] = useState('');
    const [activeChart,setActiveChart] = useState(0);    

    const {weather,loading:weatherLoading,error:weatherError} = useFetchWeather(city);
    const {data:forecast,loading:forecastLoading,error:forecastError} = useForeastFetch(city);

    const chartsConfig = [
        {
          title: 'Teplota',
          data: forecast ? forecast.list.map(item => item.main.temp) : [],
          barColor: 'orange',
        },
        {
          title: 'Srážky',
          data: forecast ? forecast.list.map(item => item.rain? item.rain['3h']: []) : [],
          barColor: 'blue',
        },
        {
          title: 'Vítr',
          data: forecast ? forecast.list.map(item => item.wind.speed) : [],
          barColor: 'green',
        },
      ];

    const handleCityClick = () => {
        setCity(inputCity);
    };

    function time_convert(num:number){
        const date = new Date(num); 
        const hours = date.getHours();
        let minutes = date.getMinutes();
        let minutesString = minutes.toString();

        if (minutes < 10) {
            minutesString = '0' + minutes;
        };

        return hours + ":" + minutesString;         
    };

    const getWeatherIcon = (main: string) => {
        return weatherIcons[main] || <IoSunny />;
    };

    const handleChartChange = (num: number) => {
        setActiveChart((prev) => {
          const nextChart = (prev + num + chartsConfig.length) % chartsConfig.length;
          return nextChart;
        });
      };

    return(
        <div className="dashboard">
            <div className="dashboard--left">
                <div className="dashboard__header">
                    <div className='dash__head--left'>
                        <h1>{months[today.getMonth()] + ' ' + today.getFullYear()}</h1>
                        <h3>{days[today.getDay()] + ', ' + today.getDate() + '.' + months[today.getMonth()].substring(0,3) + ' ' + today.getFullYear()}</h3>
                    </div>
                    <div className="dash__head--right">
                        <Input placeholderPosition='inside' placeholder='Město...' onChange={(e)=>setInputCity(e.target.value)}></Input>
                        <button onClick={handleCityClick}><IoSearchOutline/></button>
                    </div>
                </div>
                <div className="dashboard__left--content">
                    <h2>Dnešní přehled</h2>
                    <InfoCard data={weather?.main.humidity + ' %'} title='Vlhkost' loading={weatherLoading} image={<FaWater/>}/>
                    <InfoCard data={weather?.main.pressure + ' Bar'} title='Tlak' loading={weatherLoading} image={<MdOutlineDashboard/>}/>
                    <InfoCard data={weather?.wind.speed + ' m/s'} title='Rychlost větru' loading={weatherLoading} image={<FaWind/>}/>
                    <div className="forecast__container">
                        <h2>Předpověď: {chartsConfig[activeChart].title}</h2>
                        <div className='forecast__buttons'>
                            <button onClick={() => handleChartChange(-1)}><IoChevronBackOutline /></button>
                            <button onClick={() => handleChartChange(1)}><IoChevronForwardOutline /></button>
                        </div>
                    </div>
                    
                    {forecast ? (
                        <BarChart
                            title='Teplota'
                            inputData={chartsConfig[activeChart].data}
                            labels={forecast.list.map(item=>new Date(item.dt*1000).getDate() + '.' + (new Date(item.dt*1000).getMonth() + 1) + ' ' + (new Date(item.dt*1000).getHours() + 1 )+ 'h')}
                            barColor={chartsConfig[activeChart].barColor}
                            style={{gridColumn:'1 / 4', width:'100%',height:'calc(100% - 16px)', backgroundColor:'var(--primary)',borderRadius:'8px',padding:'8px',boxSizing:'border-box'}}
                        />
                    ):(
                        <div>chyba</div>
                    )}
                    
                </div>
            </div>
            <div className="dashboard--right">
                {weatherLoading ? (
                    <div>Načítám...</div>
                ):(
                    weather ? (
                        <>
                        <div className='dash__right--head'>
                            <div className='dash__user'>
                                <h1 className='dash__user--name'>{name}</h1>
                                <h3 className='dash__user--place'>{weather.name + ', ' + weather.sys.country}</h3>
                            </div>
                            <div className='dash--time'>
                                {time_convert(Date.now())}
                            </div>
                        </div>
                        <div className="dash__right--body">
                            <div className="curr__weather">
                                <div className='dash__right--temp'>
                                    
                                    {Math.floor(weather.main.temp) + '° C'}
                                </div>
                                <div className="curr__weather--desc">
                                    {weather.weather[0].description}
                                </div>
                            </div>

                            <div className="curr__weather--img">
                                        {getWeatherIcon(weather.weather[0].main)}
                                    </div>
                            <div className="dash__sun--container">
                                <div className='dash__sun'>
                                    <FiSunrise/>
                                    <div className="dash__sun--text">
                                        <h2>Východ slunce</h2>
                                        <div className="dash__sun--data">
                                            {time_convert(weather.sys.sunrise*1000)}
                                        </div>
                                    </div>
                                </div>
                                <div className='dash__sun'>
                                    <FiSunset/>
                                    <div className="dash__sun--text">
                                        <h2>Západ slunce</h2>
                                        <div className="dash__sun--data">
                                            {time_convert(weather.sys.sunset*1000)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    ):(
                        <div>chyba</div>
                    )
                )}
            </div>
        </div>
    );   
}