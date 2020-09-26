import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';
import Modal from '../Modal/Modal';
import Register from '../Register/Register';

function Login(props) {

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [submitBtn, setSubmitBtn] = useState(false);

  const [inputUserCount, setinputUserCount] = useState(false);
  const [inputPassCount, setinputPassCount] = useState(false);

  const countInput = (val, logpass) => {
    if (logpass === "login" && val.length >=1){
      setinputUserCount(true);
    } else if (logpass === "login" && val.length < 1){
      setinputUserCount(false);
    }
    if (logpass === "password" && val.length >=1){
      setinputPassCount(true);
    } else if (logpass === "password" && val.length < 1){
      setinputPassCount(false);
    }
  }
  
  const toRegisterChange = () => {
    props.switch()
  }

  const doLogin = () => {
    axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:4000/api/login",
    }).then((res) => {
      if (res.data.success) {
        props.handleClose();
        window.location.reload();
      }
      });
  };  
  return (
    <>
      <i className="user-modal-splash-image fas fa-times" onClick={props.handleClose}></i>
      {/* <img className="user-modal-splash-image" src="img/wave.png"/> */}
      <div className="user-modal-main-container">
        <div className="user-modal-container">
          <div className="user-modal-img">
            <img src="images/airplane.svg"/>
          </div>
          <div className="user-modal-login">
          {/* <form className="user-modal-form" action={props.ifLogin ? "/login":"/register"} method="POST"> */}
            <div className="user-modal-form">
              {/* <img src="images/login.png"/> */}
              <h2 className="user-modal-title">Continue your adventure.</h2>

                <div className={inputUserCount ? "user-modal-inputdiv username focus" : "user-modal-inputdiv username"}>
                  <div className="user-modal-i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h5>Username</h5>
                    <input type="text" autoComplete="off" id="username" name="username" className="user-modal-input" maxLength="15" onChange={(val) => {setLoginUsername(val.target.value); countInput(val.target.value, "login")}}/>
                    <label className="user-modal-username-label" ></label>
                  </div>
                </div>

                <div className={inputPassCount ? "user-modal-inputdiv pass focus" : "user-modal-inputdiv pass" }>
                  <div className="user-modal-i"> 
                    <i className="fas fa-lock"></i>
                  </div>
                  <div>
                    <h5>Password</h5>
                    <input type="password" id="password" name="password" className="user-modal-input" maxLength="25" onChange={(val) => {setLoginPassword(val.target.value); countInput(val.target.value, "password")}}/>
                    <label className="user-modal-password-label" ></label>
          
                  </div>
                </div>

                  <a className="user-modal-a" href="#">Forgot Password?</a>
                  <input type="submit" className="user-modal-btn" onClick={doLogin} value="Login"/>
                  <div className="user-modal-account-checker">
                    <p>Don't have an account?</p>
                    <a className="user-modal-othermodallink" onClick={toRegisterChange}>Sign up</a>
                  </div>
              </div>              
          </div>
        </div>
      </div>
      {
      }
    </>    
  );
}

export default Login;
