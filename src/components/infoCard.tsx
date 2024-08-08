import React from 'react';
import './styles/infoCard.css';

type Props = {
    children:React.ReactNode;
    title?:string;
}

export function InfoCard({children,title}:Props) {
    return(
        <div className="info-card">
            {title &&<div className="card-title">{title}</div>}
            <div className="card-info">{children}</div>
        </div>
    )
}