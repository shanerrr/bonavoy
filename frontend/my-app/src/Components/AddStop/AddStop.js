import React from 'react';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import MapboxGeocoder from 'react-mapbox-gl-geocoder'
import './style.css';


const TOKEN = process.env.REACT_APP_MAPS_API_KEY;

const mapAccess = {
    mapboxApiAccessToken:TOKEN
}

const mapStyle = {
    width: '100%',
    height: 600
}

class AddStop extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            viewport:{}
        }

    }

    componentDidMount(){
        const geocoder = new MapboxGeocoder({
            accessToken:TOKEN,
            types: 'country,region,place',
            getItemValue: e => {
                this.props.addStop(e);

                // fill input with empty string
                return '';
            }
        });

        geocoder.addTo('#geocoder');
    
    }

    render(){

        return (
            <div 
                id='geocoder'>
            </div>
        )
    }
}

export default AddStop;
