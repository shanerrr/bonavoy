import React, {useState } from 'react';
import axios from 'axios';
import './Register.css'

function Register(props) {

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [submitBtn, setSubmitBtn] = useState(false);

  //if username and email exists in database already
  const [emailError, setEmailError] = useState(false);
  const [emailInvalidError, setEmailInvalidError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [usernameLengthError, setUsernameLengthError] = useState(false);

  const [inputUserCount, setinputUserCount] = useState(false);
  const [inputPassCount, setinputPassCount] = useState(false);
  const [inputEmailCount, setinputEmailCount] = useState(false);

  const countInput = (val, logpass) => {
    if (logpass === "login" && val.length >=1){
      setinputUserCount(true);
      if (usernameError) setUsernameError(false);
      if (usernameLengthError) setUsernameLengthError(false);
    } else if (logpass === "login" && val.length < 1){
      setinputUserCount(false);
    } 
    if (logpass === "password" && val.length >=1){
      setinputPassCount(true);
      if (passwordLengthError) setPasswordLengthError(false);
    } else if (logpass === "password" && val.length < 1){
      setinputPassCount(false);
    }
    if (logpass === "email" && val.length >=1){
      setinputEmailCount(true);
      if (emailError) setEmailError(false);
      if (emailInvalidError) setEmailInvalidError(false);
    } else if (logpass === "email" && val.length < 1){
      setinputEmailCount(false);
    }
  }
  const errorHelper = () => {
    if(emailError){
      return "Email Already Exists";
    }
    if(emailInvalidError){
      return "Invalid Email Format";
    }
    if(usernameError){
      return "Username Already Exists";
    }
    if(passwordLengthError){
      return "Password must be atleast 8 characters long";
    }
    if(usernameLengthError){
      return "Username must be atleast 5 characters long and less than 15 characters";
      
    }
  }

  const toLoginChange = () => {
    props.switch()
  }
    
  const doRegister = () => {
    setSubmitBtn(true);
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
      },
      withCredentials: true,
      url: "http://localhost:4000/api/register",
    }).then((res) => {
      if (res.data.success) {
        props.handleClose();
        window.location.reload();
      } else{
          if (res.data.reason == "emailexists"){
            setEmailError(true);
          }
          if (res.data.reason == "invalidemail"){
            setEmailInvalidError(true);
          }
          if (res.data.reason == "usernameexists"){
            setUsernameError(true);
          }
          if (res.data.reason == "usernamelength"){
            setUsernameLengthError(true);
          }
          if (res.data.reason == "passwordlength"){
            setPasswordLengthError(true);
          }
        }
      setSubmitBtn(false);
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

                <div className={inputEmailCount ? emailError || emailInvalidError ? "user-modal-inputdiv email focus error" : "user-modal-inputdiv email focus" : "user-modal-inputdiv email"}>
                  <div className="user-modal-i">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    {/* <h5>{emailError || emailInvalidError ? emailInvalidError ? "Email (Invalid email)" : "Email (Already exists)":"Email"}</h5> */}
                    <h5>Email</h5>
                    <input type="email" className="user-modal-input" onChange={(val) => {setRegisterEmail(val.target.value); countInput(val.target.value, "email") }}/>
                  </div>
                </div>

                <div className={inputUserCount ? usernameError || usernameLengthError ? "user-modal-inputdiv username focus error" :"user-modal-inputdiv username focus" : "user-modal-inputdiv username"}>
                  <div className="user-modal-i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h5>Username</h5>
                    {/* <h5>{usernameLengthError ? "Username (Username must be atleast 5 characters)" : "Username"}</h5> */}
                      <input type="text" className="user-modal-input" maxLength="15" onChange={(val) => {setRegisterUsername(val.target.value); countInput(val.target.value, "login")}}/>
                  </div>
                </div>

                <div className={inputPassCount ? passwordLengthError ? "user-modal-inputdiv pass focus error" : "user-modal-inputdiv pass focus" : "user-modal-inputdiv pass"}>
                  <div className="user-modal-i"> 
                    <i className="fas fa-lock"></i>
                  </div>
                  <div>
                    <h5>Password</h5>
                    {/* <h5>{passwordLengthError ? "Password (Password must be atleast 8 characters)" : "Password"}</h5> */}
                    <input type="password" className="user-modal-input" maxLength="25" onChange={(val) => {setRegisterPassword(val.target.value); countInput(val.target.value, "password")}}/>
                  </div>
                </div>
                  <input type="submit" className="user-modal-btn" disabled={emailInvalidError || passwordLengthError || usernameLengthError || emailError || usernameError || submitBtn ? true: false} onClick={doRegister} value="Sign Up"/>
                  <div>
                    <p className="user-modal-error-message">
                      {errorHelper()}      
                    </p>
                  </div>
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
