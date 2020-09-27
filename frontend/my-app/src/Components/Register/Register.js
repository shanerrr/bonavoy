import React, {useState } from 'react';
import axios from 'axios';
// import './SignupRegister.css';

function Register(props) {

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [submitBtn, setSubmitBtn] = useState(false);

  const [inputUserCount, setinputUserCount] = useState(false);
  const [inputPassCount, setinputPassCount] = useState(false);
  const [inputEmailCount, setinputEmailCount] = useState(false);

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
    if (logpass === "email" && val.length >=1){
      setinputEmailCount(true);
    } else if (logpass === "email" && val.length < 1){
      setinputEmailCount(false);
    }
  }

  const toLoginChange = () => {
    props.switch()
  }
    
  const doRegister = () => {
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail
      },
      withCredentials: true,
      url: "http://localhost:4000/api/register",
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
            <img src="images/map-connected.svg"/>
          </div>
          <div className="user-modal-login">
          {/* <form className="user-modal-form" action={props.ifLogin ? "/login":"/register"} method="POST"> */}
            <div className="user-modal-form">
              {/* <img src="images/login.png"/> */}
              <h2 className="user-modal-title">Plan your next trip.</h2>

                <div className={inputEmailCount ? "user-modal-inputdiv email focus" : "user-modal-inputdiv email"}>
                  <div className="user-modal-i">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h5>Email</h5>
                    <input type="email" className="user-modal-input" onChange={(val) => {setRegisterEmail(val.target.value); countInput(val.target.value, "email") }}/>
                  </div>
                </div>

                <div className={inputUserCount ? "user-modal-inputdiv username focus" : "user-modal-inputdiv username"}>
                  <div className="user-modal-i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h5>Username</h5>
                      <input type="text" className="user-modal-input" maxLength="15" onChange={(val) => {setRegisterUsername(val.target.value); countInput(val.target.value, "login")}}/>
                  </div>
                </div>

                <div className={inputPassCount ? "user-modal-inputdiv pass focus" : "user-modal-inputdiv pass"}>
                  <div className="user-modal-i"> 
                    <i className="fas fa-lock"></i>
                  </div>
                  <div>
                    <h5>Password</h5>
                    <input type="password" className="user-modal-input" maxLength="15" onChange={(val) => {setRegisterPassword(val.target.value); countInput(val.target.value, "password")}}/>
                  </div>
                </div>
                  <input type="submit" className="user-modal-btn" onClick={doRegister} value="Sign Up"/>
                  <div className="user-modal-account-checker">
                    <p>Already have an account?</p>
                    <a className="user-modal-othermodallink" onClick={toLoginChange}>Log in</a>
                  </div>
              </div>
              
          </div>
        </div>
      </div>
    </>    
  );
}

export default Register;
