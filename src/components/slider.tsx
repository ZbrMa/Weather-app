import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { ForecastCard } from "./forecastCard";
import './styles/slider.css';
import { ForecastItem } from "../types/forecast";
import { useRef, useState, useEffect } from "react";

type Props = {
    slidedObject: ForecastItem[] | null;
}

export function Slider({ slidedObject }: Props) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [steps,setSteps] = useState(0);
    const [maxSteps,setMaxSteps] = useState(0);
    const [isNavigable,setIsNavigable] = useState(true);

    const getVisibleCards = () =>{
        const carousel = carouselRef.current;
        let chuldren = carousel?.children;
        let carouselChild = carousel? carousel.children.length:0;
        let visibleCards:number;
        if (carouselChild === 3){
            if (window.innerWidth >= 1220) {
                visibleCards = 3;
                setMaxSteps(0);
            } else {
                visibleCards = 2;
                setMaxSteps(1);
            }
            setIsNavigable(true);
        }
        else {
            visibleCards = carouselChild;
            setMaxSteps(0);
            setIsNavigable(false);
        };
        return visibleCards;
    };

    const updateSizes = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            let visibleCards = getVisibleCards();
            const cardWidth = carousel.offsetWidth / visibleCards;
            setCardWidth(cardWidth);
        };
    };

    const screenChnage = () =>{
        updateSizes();
        setCurrentPosition(0);
        setSteps(0);
    }

    useEffect(() => {
        updateSizes();
        window.addEventListener('resize', screenChnage);

        return () => {
            window.removeEventListener('resize', screenChnage);
        };
    }, [slidedObject]);

    const moveLeft = () => {
        if (carouselRef.current) {
            const newStep = steps - 1;
            if (newStep >= 0){
                setCurrentPosition(prev=>prev+cardWidth/2);
                setSteps(prev=>prev-1);
            };
        };
    };
    
    const moveRight = () => {
        if (carouselRef.current) {
            const newStep = steps + 1;
            if (newStep <= maxSteps){
                setCurrentPosition(prev=>prev-cardWidth/2);
                setSteps(prev=>prev+1);
            };
        };
    };

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.style.transform = `translateX(${currentPosition}px)`;
        }
    }, [currentPosition]);
    
    return (
        <div className="slider">
            <button className="slider-btn back" onClick={moveLeft} disabled={!isNavigable || maxSteps === 0}><IoChevronBack /></button>
            <div className="slider-carousel">
                <div className="carousel-moving" ref={carouselRef}>
                    {slidedObject?.map((event, index) => (
                        <ForecastCard value={event} key={index}></ForecastCard>
                    ))}
                </div>
            </div>
            <button className="slider-btn next" onClick={moveRight} disabled={!isNavigable || maxSteps === 0}><IoChevronForward /></button>
        </div>
    );
}