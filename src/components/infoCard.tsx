import { FaCloudShowersHeavy } from "react-icons/fa";
import './styles/infoCard.css';
import { Weather } from "../types/weather";

type Props = {
    data:any | null,
    title:string,
    loading:boolean,
    image:React.ReactNode,
}

export function InfoCard({data,title,loading,image}:Props){

    return(
        <div className="card__container">
            {loading ? (
                <div>Načítám</div>
            ):(
                <>
                <div className="card--left">
                    {image}
                </div>
                <div className="card--center">
                    <h3>{title}</h3>
                    <div className="card--data">{data}</div>
                </div>
                </>
            )}
            
        </div>
    )
}