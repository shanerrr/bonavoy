import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') });
console.log(process.env.MAPS_API_KEY);

const mapStyles = {
    width: '100%',
    height: '100%'
  };
  
export class Planner extends React.Component {
render() {
    return (
    <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
        lat: -1.2884,
        lng: 36.8233
        }}
    />
    );
}
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAPS_API_KEY
})(Planner);