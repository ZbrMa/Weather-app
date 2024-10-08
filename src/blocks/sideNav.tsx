import { useLocation, useNavigate } from "react-router-dom";
import './styles/sideNav.css';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { CiLocationArrow1 } from "react-icons/ci";
import { LoginForm } from "../components/loginForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLogin } from "../slices/authSlice";

export function SideNav(){
    const [loginTrigger,setLoginTrigger] = useState(false);
    const dispatch = useDispatch();
    const loggedIn = useSelector(selectLogin);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClose = () =>{
        setLoginTrigger(false);
    };

    useEffect(() => {
        if (loggedIn) {
            if (location.pathname === '/') {
                setLoginTrigger(false);
                navigate('/');            }
        }
    }, [loggedIn, location.pathname, navigate]);

    const handleLogout = () =>{
        dispatch(logout());
        navigate('/');
    };

    return(
        <div className="side__nav">
            <div className="side__nav--inner">
                <div className="title">
                    Počasí
                </div>
                <nav className="nav__items">
                    <li className={`nav--item  ${location.pathname === '/' ? 'active' : ''}`}nav--item onClick={()=>navigate('/')}><MdOutlineSpaceDashboard/> Přehled</li>
                    <li className={`nav--item  ${location.pathname === '/mapa' ? 'active' : ''}`} onClick={()=>navigate('/mapa')}><LiaMapMarkedAltSolid/> Mapa</li>
                    <li className={`nav--item  ${location.pathname === '/mista' ? 'active' : ''}`} onClick={()=>navigate('/mista')}><CiLocationArrow1/> Moje lokace</li>
                </nav>
                {!loggedIn ? (<button onClick={()=>setLoginTrigger(true)}>Přihlásit se</button>):(
                    <button onClick={handleLogout}>Odhlásit se</button>
                )}
            </div>
            {loginTrigger &&(<LoginForm trigger={loginTrigger} close={handleLoginClose}/>)}
        </div>
    );
};