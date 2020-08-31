import React from 'react';
import MapboxGeocoder from 'react-mapbox-gl-geocoder'
require('dotenv').config()

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

    onSelected(viewport, item){
        console.log(item);
        // add to stops
    }

    render(){
        const {viewport} = this.state;

        return (
            <div id='add-stop'>
                <MapboxGeocoder
                    className='search-locations'
                    {...mapAccess} 
                    onSelected={this.onSelected} 
                    viewport={viewport} 
                    hideOnSelect={true}
                    limit={5}
                />
            </div>
        )
    }
}

export default AddStop;
