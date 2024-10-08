import { IoAddOutline } from "react-icons/io5";
import { useUser } from "../context/userContext";
import { LocationCard } from "../components/locationCard";
import './styles/myLocations.css';
import { Input } from "../components/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slices/authSlice";
import { addCity } from "../slices/authSlice";

export function MyLocations() {
    const {name,location,cities} = useSelector(selectUser);
    const [inputCity,setInputCity] = useState('');
    const [error,setError] = useState(false);
    const dispatch = useDispatch();

    const handleAdd = () => {
        if(!cities.find(city=>city===inputCity)){
            dispatch(
                addCity({
                    city:inputCity,
                })
            )
        }
        else {
            setError(true);
            setTimeout(()=>setError(false),400);
        };
    };

    return(
        <div className="locations__container">
            <div className="locations__header">
                    <div className='locations__head--left'>
                        <h1>Moje lokace</h1>
                        <h3>Celkem {cities.length} míst</h3>
                    </div>
            </div>
            <div className="locations__body">
                <div className="locations--add">
                    <Input placeholderPosition="inside" placeholder="Přidej místo..." onChange={(e)=>setInputCity(e.target.value)} style={{width:'fit-content',backgroundColor:`${error? '#c92222' : ''}`, color:`${error? 'var(--primary)' : ''}`}}></Input>
                    <button onClick={handleAdd}><IoAddOutline/></button>
                </div>
                <div className="locations__cards">
                    {cities.map(city=>(
                        <LocationCard city={city}/>
                    ))}
                </div>
            </div>
            
        </div>
    );   
};