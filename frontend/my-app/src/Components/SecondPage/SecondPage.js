import React, { useState } from 'react';
import '../../App.css';
import './SecondPage.css';
import MapboxGeocoder from 'react-mapbox-gl-geocoder'
require('dotenv').config()

function SecondPage() {

    return (
      <div className='secondpage-container' id="secondpage">
        {/* <h1>Where are we going?</h1> */}
        <div className="explore-nav">
            <ul className="explore-menu">
                <li>Plan your Trip</li>
                <li>Explore Places</li>
            </ul>
        </div>
      </div>
    );
  }
  
  export default SecondPage;
  