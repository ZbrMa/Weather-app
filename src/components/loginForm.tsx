import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./input";
import './styles/loginForm.css';
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch,useSelector } from "react-redux";
import { login, users, selectLogin } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    const navigate = useNavigate();
    const loggedIn = useSelector(selectLogin);

    useEffect(()=>{
        loggedIn && navigate('/');
    },[loggedIn]);

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
                <table className="users">
                    <thead>
                    <tr>
                        <th>Jméno</th>
                        <th>Heslo</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index)=>(
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
};