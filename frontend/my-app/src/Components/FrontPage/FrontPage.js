import React from 'react';
import '../../App.css';
import { Button } from '../Button/Button';
import './FrontPage.css';
import Typical from 'react-typical'
import ModalLogin from '../ModalLogin/ModalLogin';

function FrontPage() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>
          <Typical loop={Infinity} wrapper="b" steps={[
                    'Plan your next adventure.', 20000,
                    'Now, where to?', 20000,
                ]}/> 
        </h1>
      {/* <p>What are you waiting for?</p> */}
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          toGo='planner'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={ModalLogin}
        >
          EXPLORE <i className='far fa-compass' />
        </Button>
      </div>
    </div>
  );
}

export default FrontPage;
