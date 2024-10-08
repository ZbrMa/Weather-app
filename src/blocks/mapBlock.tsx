import { MapComponent } from "../components/mapComponent";


export function MapBlock(){

    return(
        <div className="map__block" style={{height:'calc(100vh - 32px)',width:'calc(100% - 32px)',margin:'16px',borderRadius:'8px',overflow:'hidden'}}>
            <MapComponent/>
        </div>
    );
};