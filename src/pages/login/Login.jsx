import React from "react";
import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SimpleSocial</h3>
          <span className="loginDescription">
            Connect with friends and the world around you on SimpleSocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input type="Email" placeholder="Email" className="loginInput" />
            <input type="Password" placeholder="" className="loginInput" />
            <button className="loginButton">Login</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegister">Create a New Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
