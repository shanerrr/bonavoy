import React from 'react';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './AutoComplete.css'

const TOKEN = process.env.REACT_APP_MAPS_API_KEY;

class AutoComplete extends React.Component {
	constructor(props){
			super(props);
	}

	componentDidMount(){
		const geocoder = new MapboxGeocoder({
			accessToken:TOKEN,
			types: 'country, region, place',
			placeholder:this.props.msg,
		});
		console.log(this.props.id)
		geocoder.addTo('#'+this.props.id);
	}

	render(){
		return (<div className={this.props.className} id={this.props.id}/>)
	}
}

export default AutoComplete;
