import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import './styles/input.css';

type Props = {
    returnValue:(value:string)=>void;
}

export function Input({returnValue}:Props) {
    const [inputVal,setInputVal] = useState('');

    return(
        <div className="input-container">
            <input className="input-elem" onChange={(e)=>setInputVal(e.target.value)} type="text" placeholder="City..."></input>
            <button className="btn" onClick={()=>returnValue(inputVal)}>
                <FaMagnifyingGlass></FaMagnifyingGlass>
            </button>
        </div>
    );
}