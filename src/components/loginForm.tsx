import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./input";
import './styles/loginForm.css';
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";

type Inputs = {
    name:string,
    pass:string,
};

type FormProps = {
    trigger:boolean,
    close:()=>void,
};

export function LoginForm({trigger,close}:FormProps){
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState:{errors},
    } = useForm<Inputs>();

    const onSubmit:SubmitHandler<Inputs> = (data) =>{
        dispatch(
            login({
                name:data.name,
                pass:data.pass,
            })
        );
    };

    return(
        <div className="form__container">
            <div className="shadow"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form__header">
                    <h2>Přihlášení</h2>
                    <button type='button' onClick={close}><IoCloseOutline/></button>
                </div>
                <Input id="name" placeholder="Jméno" {...register("name")} required type="text"/>
                <Input id="pass" placeholder="Heslo" {...register("pass")} required type="password"/>
                <button type='submit'>Přihlásit se</button>
                
            </form>
        </div>
    );
};