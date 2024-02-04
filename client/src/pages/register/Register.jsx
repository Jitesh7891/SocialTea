import { useEffect, useRef } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
// import { set } from 'mongoose';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmpassword = useRef();

    const[error,setError]=useState(false)

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
            await axios.post(process.env.REACT_APP_BACKEND+"/api/auth/register",user);
            navigate("/")
            }catch(error){
                setError(true)
            }
        }
    }

    useEffect(()=>{
        if(error){
            setTimeout(
                ()=>{setError(!error)},[3000]
                )
        }
    },[error])
    
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="registerLogo">SocialTea</h3>
                    <span className="registerdesc">Connect with your friends with SocialTea </span>
                </div>
                <div className="loginRight">

                    <form className="registerBox" onSubmit={handleSubmit}>

                        <input
                            placeholder="Username"
                            required
                            ref={username}
                            className="registerInput">
                        </input>

                        <input
                            placeholder="Email"
                            required
                            type="email"
                            ref={email}
                            className="registerInput">
                        </input>

                        <input
                            placeholder="Password"
                            type="password"
                            minLength={5}
                            required
                            ref={password}
                            className="registerInput">
                        </input>

                        <input
                            placeholder="Confirm Password"
                            ref={confirmpassword}
                            type="password"
                            minLength={5}
                            className="registerInput">
                        </input>
                {error&&<div className='registerError'>Sorry , user with this email already exists</div>}
                        <button className="loginButton" type='submit'>Sign Up</button>

                        <button className="registerButton" onClick={handleLogin}>Login </button>
                    </form>
                </div>
            </div>


        </div>
    )
}