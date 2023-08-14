import './register.css'

export default function Register() {
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocialTea</h3>
                <span className="logindesc">Connect with your friends with SocialTea </span>
            </div>
            <div className="loginRight">
                <div className="registerBox">
                    <input placeholder="Username" className="loginInput"></input>
                    <input placeholder="Email" className="loginInput"></input>
                    <input placeholder="Password" className="loginInput"></input>
                    <input placeholder="Confirm Password" className="loginInput"></input>
                    <button className="loginButton">Sign Up</button>

                    <button className="loginregisterButton">Create a New Account</button>
                </div>
            </div>
        </div>

      
    </div>
  )
}