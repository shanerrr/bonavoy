import React from 'react'
import mapboxgl from 'mapbox-gl';

import './style.css';
import TravelPlanGroup from '../TravelPlanGroup/TravelPlanGroup';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../../.env.local') });


const TOKEN = process.env.REACT_APP_MAPS_API_KEY;
mapboxgl.accessToken = TOKEN;

class Map extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      lng: -113.41777,
      lat: 53.48538,
      zoom: 10,
      stops:[],
    };
    this.addStopHandler = this.addStopHandler.bind(this);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    this.map = map;

    // disable map rotation using right click + drag
    map.dragRotate.disable();

  }

  addStopHandler(stop){

    // add to stop list 
    const coords = [stop.center[0], stop.center[1]];
    this.setState({stops:[...this.state.stops, stop]});
    
    // draw stop on map
    var marker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(this.map);

    // compute shortest path 
  }

  render() {
    return (
        <div id='map'>
          <TravelPlanGroup 
            stops={this.state.stops}
            addStop={this.addStopHandler} 
          />
        </div>
    )
  }

}

export default Map;
