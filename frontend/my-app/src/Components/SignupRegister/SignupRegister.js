import React, { useState } from 'react';
import UserStore from '../../stores/UserStore';
import './SignupRegister.css';

function SignupRegister(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitBtn, setSubmitBtn] = useState(false);

  function setInputValue(property, val, size) {
    val = val.trim();
    if (val.length > size){
      return;
    }
    if (property === "username"){
      setUsername(val);
    } else{
      setPassword(val);
    }
  }

  function resetForm() {
      setUsername('');
      setPassword('');
      setSubmitBtn(false);
  }

  async function doLogin() {
    if (!username) return;
    if (!password) return;
    setSubmitBtn(true);
    try {
      let res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      });
      let result = await res.json();
      console.log(result)
      if(result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.email;
      } else if(result && result.success === false) {
          resetForm();
        //maybe put in alert error

      }
    } catch (error) {
        console.log(error);
        resetForm();
    }
}

  const inputs = document.querySelectorAll(".user-modal-input");
  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl(){
    let parent = this.parentNode.parentNode;
    if(this.value === ""){
      parent.classList.remove("focus");
    }
  }


  inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });
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
          {/* <form className="user-modal-form" action={props.ifLogin ? "/login":"/register"} method="POST"> */}
            <form className="user-modal-form">
              {/* <img src="images/login.png"/> */}
              <h2 className="user-modal-title">{props.ifLogin ? "Login" : "Sign Up"}</h2>

                <div className={!props.ifLogin ? "user-modal-inputdiv email" : "display-none"}>
                  <div className="user-modal-i">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h5>Email</h5>
                    <input type="email" className="user-modal-input"/>
                  </div>
                </div>

                <div className="user-modal-inputdiv username">
                  <div className="user-modal-i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h5>Username</h5>
                    <input type="text" className="user-modal-input" maxLength="15" onChange={(val) => setInputValue('username', val.target.value, 15)}/>
                  </div>
                </div>

                <div className="user-modal-inputdiv pass">
                  <div className="user-modal-i"> 
                    <i className="fas fa-lock"></i>
                  </div>
                  <div>
                    <h5>Password</h5>
                    <input type="password" className="user-modal-input" maxLength="25" onChange={(val) => setInputValue('password',val.target.value, 25)}/>
                  </div>
                </div>

                  {props.ifLogin && <a className="user-modal-a" href="#">Forgot Password?</a>}
                  <input type="submit" className="user-modal-btn" disabled={submitBtn} onClick={doLogin} value={props.ifLogin ? "Login" : "Sign Up"}/>
              </form>
              
          </div>
        </div>
        <div className="user-modal-account-checker">
          <a onClick={props.ifLogin ? "":""}>{props.ifLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}</a>
        </div>
      </div>
    </>    
  );
}

export default SignupRegister;
