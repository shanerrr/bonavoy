import React, { useState } from 'react'
import mapboxgl, { Marker } from 'mapbox-gl';
import MapGL, {GeolocateControl } from 'react-map-gl'

import '../styling/style.css';
import TravelPlanGroup from './TravelPlanGroup';
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
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    this.map = map;

    // add marker
    map.on('click', (e) => {

      const coords = [e.lngLat.lng, e.lngLat.lat];
      const stops = [...this.state.stops];
      this.setState({stops:[...stops, coords]});
      var marker = new mapboxgl.Marker()
        .setLngLat(coords)
        .addTo(this.map);
    });

    // disable map rotation using right click + drag
    map.dragRotate.disable();

  }

  render() {
    return (
      <div className='body-content'>
        <div ref={el => this.mapContainer = el} className='map'>
          <TravelPlanGroup stops={this.state.stops}/>
        </div>
      </div>
    )
  }

}

export default Map;
