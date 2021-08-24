import "./register.css";

import { Link } from "@material-ui/core";
import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(password.current.value + " ||" + confirmPassword.current.value);
    if (password.current.value !== confirmPassword.current.value) {
      password.current.setCustomValidity("Passwords's don't match.");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");

      } catch (err) {
        console.log(err);
      }
    }
  };

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
          <form className="registerBox" onSubmit={handleClick}>
            <input
              type="text"
              required
              ref={username}
              placeholder="Username"
              className="registerInput"
            />
            <input
              type="Email"
              required
              ref={email}
              placeholder="Email"
              className="registerInput"
            />
            <input
              type="Password"
              required
              ref={password}
              placeholder="Password"
              className="registerInput"
              minLength="6"
            />
            <input
              type="Password"
              required
              ref={confirmPassword}
              placeholder="Confirm Password"
              className="registerInput"
              minLength="6"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <Link className="loginRegisterButton" to="login">
              Log into Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
