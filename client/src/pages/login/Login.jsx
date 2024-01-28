import { useContext, useEffect, useRef, } from 'react'
import './login.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginCall } from '../../apiCalls'

export default function Login() {

    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/")
        }
    },[localStorage.getItem("user")])

    const email = useRef();
    const password = useRef();

    useEffect(() => {
        // Set initial value when the component mounts
        email.current.value = 'user1@email.com';
        password.current.value = '12345';
      }, []);

    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick =async (e) => {
        if (localStorage.getItem("user")) {
            navigate("/")
        }
        e.preventDefault()
      
       const response=loginCall({ email: email.current.value, password: password.current.value }, dispatch);

       response.then(data => {
        
      }).catch(error => {
        console.error(error); // This will log any errors that occur during the promise execution
      });
        
    }

    const handleRegister = (e) => {
        e.stopPropagation()
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
                    <form className="loginBox">
                        <input placeholder="Email" type="email" ref={email} className="loginInput"></input>
                        <input placeholder="Password" type="password" minLength={5} required ref={password} className="loginInput"></input>
                        <p style={{textAlign:"center"}}>You can use user1 as dummy account or create your own</p>
                        <button onClick={handleClick} className="loginButton">{isFetching ? "Loading..." : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginregisterButton" onClick={handleRegister}>Create a New Account</button>
                    </form>
                </div>
            </div>


        </div>

    )
}
