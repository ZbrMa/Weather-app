// types/weather.ts
export interface WeatherForecast {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: City;
}

export interface ForecastItem {
    dt: number; // Timestamp for the data
    main: MainWeather;
    weather: WeatherDescription[];
    clouds: Clouds;
    wind: Wind;
    sys: Sys;
    dt_txt: string; // Human-readable timestamp
    rain?: {'3h':number};
}

export interface MainWeather {
    temp: number; // Current temperature in Kelvin (or specified unit)
    feels_like: number; // "Feels like" temperature
    temp_min: number; // Minimum temperature at the moment
    temp_max: number; // Maximum temperature at the moment
    pressure: number; // Atmospheric pressure in hPa
    humidity: number; // Humidity percentage
}

export interface WeatherDescription {
    id: number; // Weather condition ID
    main: string; // Main weather condition (e.g., Rain, Clouds)
    description: string; // Weather condition description (e.g., light rain)
    icon: string; // Weather icon code
}

export interface Clouds {
    all: number; // Cloudiness percentage
}

export interface Wind {
    speed: number; // Wind speed in meters/sec
    deg: number; // Wind direction in degrees
}

export interface Sys {
    pod: string; // Part of the day (e.g., 'd' for day, 'n' for night)
}

export interface City {
    id: number; // City ID
    name: string; // City name
    coord: Coordinates; // City coordinates
    country: string; // Country code
    population: number; // City population
    timezone: number; // City timezone offset
    sunrise: number; // Sunrise time in Unix timestamp
    sunset: number; // Sunset time in Unix timestamp
}

export interface Coordinates {
    lat: number; // Latitude
    lon: number; // Longitude
}
