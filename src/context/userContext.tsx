import React, { createContext, ReactNode , useContext, useState, useEffect} from "react";
import { themes,Theme,ThemeProperties } from "../types/theme";
import { IUser } from "../types/user";

interface UserProps {
    user: IUser;
    setUser:(user:IUser)=>void;
};

const initialUser:IUser = {
    username:'franta',
    name:'František Veselý',
    password:'ahoj',
    location:{city:'Olomouc', country:'Česko'},
    cities:['Praha','Brno','Olomouc']
}

const UserContext = createContext<UserProps>({user:initialUser,setUser:()=>initialUser});

export const UserProvider: React.FC<{ children:ReactNode }> = ({children}) => {
    
    const [user,setUser] = useState<IUser>(initialUser);

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};