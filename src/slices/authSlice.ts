import { createSlice,configureStore, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/user";

const users:IUser[] = [
    {   
        username:'alena',
        name:'Alena Mladá',
        password:'nazdar',
        location:{city:'Olomouc', country:'Česko'},
        cities:['Praha','Brno','Olomouc']
    },
    {
        username:'franta',
        name:'František Veselý',
        password:'ahoj',
        location:{city:'Ostrava', country:'Česko'},
        cities:['Ostrava','Brno','Olomouc']
    },
    {   
        username:'jarda',
        name:'Jaroslav Modrý',
        password:'cau',
        location:{city:'Zlín', country:'Česko'},
        cities:['Praha','Brno','Zlín']
    }
];

// Definice typu RootState (který zahrnuje typ stavu uživatele)
export interface RootState {
    user: {
        user: IUser;
        loggedIn:boolean,
    };
}


const initialUser:IUser = {
    username:'host',
    name:'Host',
    password:'',
    location:{city:'Brno',country:'Česko'},
    cities:[]
};

const initialState = {
    user:initialUser,
    loggedIn:false,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action:PayloadAction<{name:string,pass:string}>)=>{
            const user = users.find((u)=>u.username === action.payload.name)
            if(user && user.password === action.payload.pass){
                state.user = user;
                state.loggedIn = true;
            } else {
                alert('Nesprávné přihlašovací údaje.')
            }
        },
        logout:(state)=>{
            state.user = initialUser;
            state.loggedIn = false;
        },
        addCity:(state,action:PayloadAction<{city:string}>)=>{
            state.user.cities.push(action.payload.city);
        },
        removeCity:(state,action:PayloadAction<{city:string}>)=>{ 
            state.user.cities = state.user.cities.filter(city=>city !== action.payload.city);
        },
    },
});

export const {login,logout,addCity,removeCity} = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectLogin = (state: RootState) => state.user.loggedIn;
export default userSlice.reducer;