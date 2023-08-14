import './login.css'

export default function Login() {
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocialTea</h3>
                <span className="logindesc">Connect with your friends with SocialTea </span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input placeholder="Email" className="loginInput"></input>
                    <input placeholder="Password" className="loginInput"></input>
                    <button className="loginButton">Log In</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginregisterButton">Create a New Account</button>
                </div>
            </div>
        </div>

      
    </div>
  )
}

