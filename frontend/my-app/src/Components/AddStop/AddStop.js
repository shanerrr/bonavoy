import React from 'react';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './style.css';


const TOKEN = process.env.REACT_APP_MAPS_API_KEY;

class AddStop extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		const geocoder = new MapboxGeocoder({
			accessToken:TOKEN,
			types: 'region,place',
			placeholder:'Where would you like to visit?',
			getItemValue: e => {
				this.props.addStop(e);
				return ''; // fill input with empty string
			}
		});
		geocoder.addTo('#geocoder');
	}

	render(){
		return (<div id='geocoder'/>)
	}
}

export default AddStop;
