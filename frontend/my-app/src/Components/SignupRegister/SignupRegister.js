import React from 'react';
import './SignupRegister.css';

function SignupRegister(props) {

  const inputs = document.querySelectorAll(".user-modal-input");
  function addcl() {
    let parent = this.parentNode.parentNode;
    console.log(parent);
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
            <form className="user-modal-form" action=" ">
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
                    <input type="text" className="user-modal-input"/>
                  </div>
                </div>

                <div className="user-modal-inputdiv pass">
                  <div className="user-modal-i"> 
                    <i className="fas fa-lock"></i>
                  </div>
                  <div>
                    <h5>Password</h5>
                    <input type="password" className="user-modal-input"/>
                  </div>
                </div>

                  {props.ifLogin && <a className="user-modal-a" href="#">Forgot Password?</a>}
                  <input type="submit" className="user-modal-btn" value={props.ifLogin ? "Login" : "Sign Up"}/>
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
