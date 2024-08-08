import axios from "axios";
import { useEffect, useState } from "react";
import { Weather } from "../types/weather";
import { WeatherForecast } from "../types/forecast";

const API_KEY = '1afc1505109667925767068cd0256c13';

function useFetchWeather(city:string){
    const [weather,setWeather] = useState<Weather | null>(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try{
                const response = await axios.get(url);
                setWeather(response.data);
            }
                
            catch{
                setWeather(null);
                setError(true);
            };
            setLoading(false);
        };
        fetchData();
    },[city]);

    return {weather,loading,error};
};

function useForeastFetch(city:string){
    const [data,setData] = useState<WeatherForecast | null>(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try{
                const response = await axios.get(url);
                setData(response.data);
            }
                
            catch{
                setData(null);
                setError(true);
            };
            setLoading(false);
        };
        fetchData();
    },[city]);

    return {data,loading,error};

};

export {useFetchWeather,useForeastFetch};