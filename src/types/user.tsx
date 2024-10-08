export interface IUser {
    username:string,
    name:string,
    password:string,
    location:ILocation,
    cities:string[],
}

interface ILocation {
    city:string,
    country:string,
}