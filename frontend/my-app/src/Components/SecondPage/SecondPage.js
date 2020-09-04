import React, { useState } from 'react';
import '../../App.css';
import './SecondPage.css';
import MapboxGeocoder from 'react-mapbox-gl-geocoder'
require('dotenv').config()

function SecondPage() {
  const [click, setClick] = useState(true);
  const handleClick1 = () => {
    if (!click) setClick(true)
  }
  const handleClick = () => {
    if (click) setClick(false)
  }
    return (
      <div className={click ? 'secondpage-container' :'secondpage-container diff'} id="secondpage">
        {/* <h1>Where are we going?</h1> */}
        <div className="explore-nav">
            <ul className="explore-menu">
                <li className='explore-plan-navlink' onClick={handleClick1}>Plan your Trip</li>
                <li className='explore-plan-navlink explorebtn padderfornav' onClick={handleClick}>Explore Places</li>
            </ul>
        </div>
      </div>
    );
  }
  
  export default SecondPage;
  