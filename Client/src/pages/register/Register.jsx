import { useRef } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmpassword = useRef();

    const navigate=useNavigate();

    const handleLogin=()=>{
        navigate("/login")
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(password.current.value!==confirmpassword.current.value){
            confirmpassword.current.setCustomValidity("Password don't match")
        }else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try{
            await axios.post("/auth/register",user);
            navigate("/")
            }catch(error){

            }
        }
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialTea</h3>
                    <span className="logindesc">Connect with your friends with SocialTea </span>
                </div>
                <div className="loginRight">

                    <form className="registerBox" onSubmit={handleSubmit}>

                        <input
                            placeholder="Username"
                            required
                            ref={username}
                            className="loginInput">
                        </input>

                        <input
                            placeholder="Email"
                            required
                            type="email"
                            ref={email}
                            className="loginInput">
                        </input>

                        <input
                            placeholder="Password"
                            type="password"
                            minLength={5}
                            required
                            ref={password}
                            className="loginInput">
                        </input>

                        <input
                            placeholder="Confirm Password"
                            ref={confirmpassword}
                            type="password"
                            minLength={5}
                            className="loginInput">
                        </input>

                        <button className="loginButton" type='submit'>Sign Up</button>

                        <button className="loginregisterButton" onClick={handleLogin}>Login </button>
                    </form>
                </div>
            </div>


        </div>
    )
}