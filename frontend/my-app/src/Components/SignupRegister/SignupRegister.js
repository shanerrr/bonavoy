import React, { useState, useEffect } from 'react';
import './SignupRegister.css';

function SignupRegister() {

  return (
    <>
      {/* <img className="user-modal-bg-image"/> */}
      <div className="user-modal-container">
        <div className="user-modal-img">
          {/* <img src="images/login.svg"></img> */}
        </div>
        <div className="user-modal-login-container">
          <form className="user-modal-form" action="index.html">
            <img className="user-modal-splash" src="images/login.png"></img>
            <h2>Continue Your Adventure.</h2>
            <div class="user-modal-input user">
              <div className="user-modal-i">
                <i class="fas fa-user"></i>
              </div>


              <div class="user-modal-username user-modal-both">
                <h5>Username</h5>
                <input type="text" class="input-div-user-modal"/>
              </div>
            </div>

            <div class="user-modal-input pass">
           		   <div class="user-modal-i"> 
           		    	<i class="fas fa-lock"></i>
           		   </div>
           		   <div class="user-modal-password user-modal-both">
           		    	<h5>Password</h5>
           		    	<input type="password" class="input-div-user-modal"/>
            	   </div>
              </div>

              <a className="user-modal-a"href="#">Forgot Password?</a>
            	<input type="submit" class="user-modal-btn" value="Login"/>
            </form>
        </div>
      </div>
    </>    
  );
}

export default SignupRegister;
