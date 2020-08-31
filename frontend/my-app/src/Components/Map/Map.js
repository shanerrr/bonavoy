import React from 'react'
import mapboxgl from 'mapbox-gl';


import './style.css';
import Plan from '../Plan/Plan';

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
      bbox:{}
    };
    this.map = null;
    this.addMarkerHandler = this.addMarkerHandler.bind(this);
    this.exchangeMarkersHandler = this.exchangeMarkersHandler.bind(this);
    this.updateBBox = this.updateBBox.bind(this);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    this.map = map;
    // disable map rotation using right click + drag
    map.dragRotate.disable();
  }

  updateBBox(coords){
    if(Object.keys(this.state.bbox).length === 0){
      const min = {x:coords[0], y:coords[1]};
      const max = {x:coords[0], y:coords[1]};

      this.setState({
        ...this.state,
        bbox:{min,max}
      })

    } else {
      const x = coords[0];
      const y = coords[1];
      const bbox = {...this.state.bbox}

      // x bounds
      if(x < bbox.min.x){
        bbox.min.x = x;
      }
      if(x > bbox.max.x){
        bbox.max.x = x;
      }

      // y bounds
      if(y < bbox.min.y){
        bbox.min.y = y;
      }
      if(y > bbox.max.y){
        bbox.max.y = y;
      }
      this.setState({
        ...this.state,
        bbox:bbox
      });
    }
  }

  addMarkerHandler(coords){
    const marker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(this.map);
    console.log(this.state.markers); 
    this.setState({
      ...this.state,
      markers:[...this.state.markers, marker]
    })

    this.updateBBox(coords); 
    const bbox = this.state.bbox;

    // determine if should offset
    let padding = {left:50, right:450, top:50, bottom:50};
    if(this.state.markers.length <= 1){
      padding = {left:50, right:400};
    }

    // fly to fit bounds
    this.map.fitBounds([
      [bbox.min.x, bbox.min.y],
      [bbox.max.x, bbox.max.y] 
    ],
    {
      padding:padding,
      maxZoom:8
    });

  }

  removeMarkerHandler(key){

  }

  // TODO: change to exchange markers
  exchangeMarkersHandler(from, to){
    console.log(from,to);
  }

  render() {
    return (
        <div id="map">
          <Plan 
            stops={this.state.stops}
            addMarker={this.addMarkerHandler}
            exchangeMarkers={this.exchangeMarkersHandler}     
          />
        </div>
    )
  }

}

export default Map;
