import React, { useState } from 'react';
import '../../App.css';
import { Button } from '../Button/Button';
import './FrontPage.css';
import Typical from 'react-typical'
import {Link} from 'react-scroll'
require('dotenv').config()

function FrontPage() {

  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>
          <Typical loop={1} wrapper="p" steps={[
                    'Plan your next adventure.', 20000,
                    'Now, where to?', 20000,
                ]}/> 
        </h1>
      {/* <p>What are you waiting for?</p> */}

      <div className='hero-btns'>
        <Link to="secondpage" smooth={true} duration={500}>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            GET STARTED
          </Button>
        </Link>

          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
            EXPLORE <i className='far fa-compass' />
          </Button>
      </div>
    </div>
  );
}

export default FrontPage;
