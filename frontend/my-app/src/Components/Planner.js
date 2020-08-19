import React, { useState } from 'react'
import MapGL, {GeolocateControl } from 'react-map-gl'

import '../styling/style.css';
import TravelPlanGroup from './TravelPlanGroup';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../../.env.local') });


const TOKEN = process.env.REACT_APP_MAPS_API_KEY;

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

function Planner (){

  const [viewport, setViewPort ] = useState({
    width: "100%",
    height:900,
    latitude: 0,
    longitude: 0,
    zoom: 2
  })

  const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 0 });
  
  return (
    <div>
      <MapGL
        className='body'
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
        trackResize={true}
      >
        <TravelPlanGroup/>
      </MapGL>
    </div>
  )
}

export default Planner