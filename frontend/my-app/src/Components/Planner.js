import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



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
apiKey: 'YOUR_GOOGLE_API_KEY_GOES_HERE'
})(Planner);