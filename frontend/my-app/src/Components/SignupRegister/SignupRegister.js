import React, { useState, useEffect } from 'react';
import './SignupRegister.css';

function SignupRegister(props) {
  return (
    <>
      <i className="user-modal-splash-image fas fa-times" onClick={props.handleClose}></i>
      {/* <img className="user-modal-splash-image" src="img/wave.png"/> */}
      <div className="user-modal-main-container">
        <div className="user-modal-container">
          <div className="user-modal-img">
            <img src={props.ifLogin ? "images/airplane.svg" : "images/map-connected.svg"}/>
          </div>
          <div className="user-modal-login">
            <form className="user-modal-form"action="index.html">
              {/* <img src="images/login.png"/> */}
              <h2 className="user-modal-title">{props.ifLogin ? "Login" : "Sign Up"}</h2>
                <div className="user-modal-inputdiv username">
                  <div className="user-modal-i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h5>Username</h5>
                    <input type="text"/>
                  </div>
                </div>
                <div className="user-modal-inputdiv pass">
                  <div className="user-modal-i"> 
                    <i className="fas fa-lock"></i>
                  </div>
                <div>
                  <h5>Password</h5>
                  <input type="password"/>
                </div>
                </div>
                  {props.ifLogin && <a className="user-modal-a" href="#">Forgot Password?</a>}
                  <input type="submit" className="user-modal-btn" value="Login"/>
              </form>
              
          </div>
        </div>
        <div className="user-modal-account-checker">
          <a onClick={props.ifLogin ? "":""}>{props.ifLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}</a>
        </div>
      </div>
      <script type="text/javascript" src="js/inputanimator.js"></script>
    </>    
  );
}

export default SignupRegister;
