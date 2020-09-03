import React from 'react'
import mapboxgl from 'mapbox-gl';

import './style.css';
import Plan from '../Plan/Plan';

import Turf from '@turf/turf';


const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../../.env.local') });

const TOKEN = process.env.REACT_APP_MAPS_API_KEY;
mapboxgl.accessToken = TOKEN;

class Map extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = { // TODO: change lng and lat to be current position
      lng: -113.41777,
      lat: 53.48538,
      zoom: 10,
      markers:[],
      bbox:[],
    };
    this.map = null;
    this.addMarkerHandler = this.addMarkerHandler.bind(this);
    this.reorderMarkersHandler = this.reorderMarkersHandler.bind(this);
    this.removeMarkerHandler = this.removeMarkerHandler.bind(this);
    this.updateBBox = this.updateBBox.bind(this);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat], // TODO: get location of person
      zoom: this.state.zoom,
    });
    this.map = map;
    // disable map rotation using right click + drag
    map.dragRotate.disable();
  }

  updateBBox(){
    let coordsList = this.state.markers.map((marker) => {
      return [marker._lngLat.lng, marker._lngLat.lat];
    });

    let bbox = [[0,0], [0,0]]; // bbox for no points

    if(coordsList.length == 1){
      bbox = [coordsList[0], coordsList[0]]; 
    } 
    else if(coordsList.length > 1) {
      bbox = [[...coordsList[0]], [...coordsList[0]]];

      for(let coords of coordsList){
        // bottom left
        if(coords[0] < bbox[0][0]){
          console.log(coords[0], bbox[0][0]);
          bbox[0][0] = coords[0];
        }
        if(coords[1] < bbox[0][1]){
          bbox[0][1] = coords[1];
        }

        // top right
        if(coords[0] > bbox[1][0]){
          bbox[1][0] = coords[0];
        }
        if(coords[1] > bbox[1][1]){
          bbox[1][1] = coords[1];
        }
      }
    }
    // update bbox state
    this.setState({...this.state, bbox:bbox});
  }

  addMarkerHandler(coords){
    const marker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(this.map);
    this.setState({
      ...this.state,
      markers:[...this.state.markers, marker]
    })

    this.updateBBox(); 
    const bbox = this.state.bbox;

    // determine if should offset
    let padding = {left:50, right:450, top:50, bottom:50};
    if(this.state.markers.length <= 1){
      padding = {left:50, right:400};
    }

    // fly to fit bounds
    this.map.fitBounds(bbox,{padding:padding, maxZoom:8});

    // make request
    // fetch(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/13.388860,52.517037;13.397634,52.529407;13.428555,52.523219?access_token=pk.eyJ1IjoibmVpbHpvbiIsImEiOiJja2R5MjNkc3cyNDd5MnVudWVvaXptY3IyIn0.t7H18YFnJnci9cvjd3Q-Tg`)
    //   .then((response) => response.json()).then((data) => console.log(data));


  }

  removeMarkerHandler(index){
    // remove from array
    let result = this.state.markers;
    const marker = result.splice(index, 1)[0];
    this.setState({...this.state, markers:result});
    // remove from map
    marker.remove();

    // get updated route
    
  }

  requestRoute(){
    // generate geoJSON data array from markers
    // make request 
  }

  reorderMarkersHandler(from, to){
    let result = this.state.markers;
    const [removed] = result.splice(from, 1);
    result.splice(to, 0, removed);
    this.setState({...this.state, markers:result});

    // update route
  }

  render() {
    return (
        <div id="map">
          <Plan 
            stops={this.state.stops}
            addMarker={this.addMarkerHandler}
            reorderMarkers={this.reorderMarkersHandler}
            removeMarker={this.removeMarkerHandler}
          />
        </div>
    )
  }

}

export default Map;
