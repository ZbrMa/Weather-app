import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './styles/mapComponent.css';
import { useEffect, useState } from "react";
import { getCoordinates } from "../api/fetching";
import { LatLngExpression } from "leaflet";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/authSlice";

const radarLayer = "precipitation_new";
const API_KEY = 'a586f983a9ffbed3caff7d42f9c36f0b';
const date = Math.floor(Date.now() / 1000);

export function MapComponent(){
    const [position,setPosition] = useState<LatLngExpression>();

    const {name,location} = useSelector(selectUser);

    useEffect(() => {
        async function fetchCoordinates() {
          const userLocation = await getCoordinates(location.city);
          setPosition([userLocation.lat, userLocation.lon]);
        }
        fetchCoordinates();
      }, [location.city]);

    useEffect(() => {
        const L = require("leaflet");
    
        delete L.Icon.Default.prototype._getIconUrl;
    
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
      }, []);

    if (position){
        return (
          <>
            <MapContainer center={position} zoom={12} scrollWheelZoom={true} style={{height:'100%',width:'100%'}}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <TileLayer
                    url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                />
              <Marker position={position}></Marker>
            </MapContainer>
            <div className="legend">
              <h3>Srážky (mm/h)</h3>
              <div><span style={{ backgroundColor: 'rgba(225, 200, 100, 0)' }}></span> 0 mm/h</div>
              <div><span style={{ backgroundColor: 'rgba(200, 150, 150, 0)' }}></span> 0.1 mm/h</div>
              <div><span style={{ backgroundColor: 'rgba(150, 150, 170, 0)' }}></span> 0.2 mm/h</div>
              <div><span style={{ backgroundColor: 'rgba(120, 120, 190, 0)' }}></span> 0.5 mm/h</div>
              <div><span style={{ backgroundColor: 'rgba(110, 110, 205, 0.3)' }}></span> 1 mm/h</div>
              <div><span style={{ backgroundColor: 'rgba(80, 80, 225, 0.7)' }}></span> 10 mm/h</div>
              <div><span style={{ backgroundColor: 'rgba(20, 20, 255, 0.9)' }}></span> 140 mm/h</div>
            </div>
          </>
          );
    }

    return null;

    
};