import React from "react";
import "./register.css";

export default function Register() {
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">SimpleSocial</h3>
          <span className="registerDescription">
            Connect with friends and the world around you on SimpleSocial.
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input type="text" placeholder="Username" className="registerInput" />
            <input type="Email" placeholder="Email" className="registerInput" />
            <input type="Password" placeholder="Password" className="registerInput" />
            <input type="Password" placeholder="Confirm Password" className="registerInput" />
            <button className="registerButton">Sign Up</button>
            <button className="loginRegisterButton">Log into Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
