import React from 'react'
import mapboxgl from 'mapbox-gl';

import './style.css';
import Plan from '../Plan/Plan';

const path = require('path');
require('dotenv').config({ 
   path: path.resolve(__dirname, './../../.env.local') 
 });

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
      duration:0,
      distance:0
    };
    this.map = null;
    this.addMarkerHandler = this.addMarkerHandler.bind(this);
    this.reorderMarkersHandler = this.reorderMarkersHandler.bind(this);
    this.removeMarkerHandler = this.removeMarkerHandler.bind(this);
    this.updateRoute = this.updateRoute.bind(this);
    this.updateBBox = this.updateBBox.bind(this);
    this.redrawMarkers = this.redrawMarkers.bind(this);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat], // TODO: implement ask and get location of person
      zoom: this.state.zoom,
    });

    // disable map rotation using right click + drag
    map.dragRotate.disable();

    map.on('load', () => {
      // route layer and data source for map
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [[0,0]]
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#7D14FF',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    });

    this.map = map;
  }

  updateBBox() {
    let coordsList = this.state.markers.map((marker) => {
      return [marker._lngLat.lng, marker._lngLat.lat];
    });

    let bbox = [[0,0], [0,0]]; // default bbox 

    if(coordsList.length === 1){
      bbox = [coordsList[0], coordsList[0]]; 
    } 
    else if(coordsList.length > 1) {
      bbox = [[...coordsList[0]], [...coordsList[0]]];

      for(let coords of coordsList){
        // bottom left bound
        if(coords[0] < bbox[0][0]){

          bbox[0][0] = coords[0];
        }
        if(coords[1] < bbox[0][1]){
          bbox[0][1] = coords[1];
        }

        // top right bound
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
    // update markers
    const marker = new mapboxgl.Marker().setLngLat(coords)

    // append to current markers
    this.setState({
      ...this.state,
      markers:[...this.state.markers, marker]
    });

    this.updateBBox(); 

    // determine if should offset by point or bbox
    let padding = {left:50, right:450, top:50, bottom:50};
    if(this.state.markers.length <= 1){
      padding = {left:50, right:400};
    }

    // fly to fit bounds
    this.map.fitBounds(this.state.bbox,{padding:padding, maxZoom:8});

    this.redrawMarkers();
    this.updateRoute();
  }

  removeMarkerHandler(index){
    // remove from array
    let result = this.state.markers;
    const marker = result.splice(index, 1)[0];

    // remove from map
    marker.remove();
    this.setState({...this.state, markers:result});

    this.redrawMarkers();
    this.updateRoute();
  }

  redrawMarkers(){
    let markers = this.state.markers;
    // redrawing after reorder or deletion
    for(let i in markers){
      // clear current marker
      const oldMarker = markers[i];
      oldMarker.remove();
      const coords = [oldMarker._lngLat.lng, oldMarker._lngLat.lat];

      // create DOM element for new marker with updated label
      let markerElement = document.createElement('div');
      markerElement.className = 'marker';
      let waypointNumber = document.createTextNode((parseInt(i) + 1).toString());
      markerElement.appendChild(waypointNumber);

      // add new marker to top
      const newMarker = new mapboxgl.Marker(markerElement).setLngLat(coords).addTo(this.map);

      markers[i] = newMarker;
    }
    this.setState({...this.state, markers:markers});
  }

  updateRoute(){
    // generate coordinate data array from markers
    const coords = this.state.markers.map((item) => {
      const lng = item._lngLat.lng.toString();
      const lat = item._lngLat.lat.toString();
      return lng.concat(",",lat);
    });
    const coordString = coords.join(';');

    // reset route and route data if <= 1
    if(this.state.markers.length <= 1){
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [[0,0]]
        }
      };
      this.map.getSource('route').setData(geojson); 
      this.setState({...this.state, duration:0, distance:0});
    }
    // make request for route
    else if(this.state.markers.length > 1 && this.state.markers.length <= 25){
      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordString}?annotations=distance,speed&geometries=geojson&access_token=${TOKEN}`)
        .then((response) => response.json())
        .then((response) => {
          if(response.code === 'NoRoute'){
            console.log('no route'); // TODO: warn user no route
          }
          else if(response.code === 'InvalidInput'){
            console.log('invalid route') // TODO: warn user invalid route
          } 
          else if(response.code === 'Ok') {
            const data = response.routes[0];
            const duration = data.duration;
            const distance = data.distance;
            const route = data.geometry.coordinates;
          
            this.setState({...this.state, duration:duration, distance:distance});

            const geojson = {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route
              }
            };

            // add layer to map
            // cannot factor out of if statement since in promise
            this.map.getSource('route').setData(geojson);           
          }
        });
    }
  }

  reorderMarkersHandler(from, to){
    let result = this.state.markers;
    const [removed] = result.splice(from, 1);
    result.splice(to, 0, removed);
    this.setState({...this.state, markers:result});

    this.redrawMarkers();
    this.updateRoute();
  }

  render() {
    return (
        <div id="map">
          <Plan 
            stops={this.state.stops}
            addMarker={this.addMarkerHandler}
            reorderMarkers={this.reorderMarkersHandler}
            removeMarker={this.removeMarkerHandler}
            duration={this.state.duration}
            distance={this.state.distance}
          />
        </div>
    )
  }

}

export default Map;
