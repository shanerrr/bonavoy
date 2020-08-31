import React, { useState } from 'react';
import '../../App.css';
import { Button } from '../Button/Button';
import './FrontPage.css';
import Typical from 'react-typical'
import MapboxGeocoder from 'react-mapbox-gl-geocoder'
require('dotenv').config()

const TOKEN = process.env.REACT_APP_MAPS_API_KEY;

const mapAccess = {
    mapboxApiAccessToken:TOKEN
}

function FrontPage() {
  const [clickExplore, setExploreClick] = useState(false);
  const exploreBox = () => setExploreClick(true);
  console.log(clickExplore)
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
          onClick={exploreBox}
        >
          EXPLORE <i className='far fa-compass' />
        </Button>
      </div>
      
      <div className={clickExplore ? 'showExplore active' : 'showExplore'}>
        
      </div>
    </div>
  );
}

export default FrontPage;
