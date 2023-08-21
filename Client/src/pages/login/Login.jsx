import { useContext, useRef, } from 'react'
import './login.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginCall } from '../../apiCalls'

export default function Login() {

    const navigate = useNavigate();


    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
        if (localStorage.getItem("user")) {
            navigate("/")
        }
    }

    const handleRegister = () => {
        navigate("/register")
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialTea</h3>
                    <span className="logindesc">Connect with your friends with SocialTea </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" ref={email} className="loginInput"></input>
                        <input placeholder="Password" type="password" minLength={5} required ref={password} className="loginInput"></input>
                        <button className="loginButton">{isFetching ? "Loading..." : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginregisterButton" onClick={handleRegister}>Create a New Account</button>
                    </form>
                </div>
            </div>


        </div>

    )
}
