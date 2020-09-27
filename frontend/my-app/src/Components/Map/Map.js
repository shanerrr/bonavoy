import React from 'react'
import mapboxgl from 'mapbox-gl';


import './style.css';
import Plan from '../Plan/Plan';
import Modal from '../Modal/Modal';
import BrowseActivities from '../BrowseActivities/BrowseActivities';

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
      markers:[],
      stops:[],
      duration:0,
      distance:0,
      selectedCoords:[],
      showModal:false,
    };
    this.map = null;
    this.addStopHandler = this.addStopHandler.bind(this);
    this.reorderStopsHandler = this.reorderStopsHandler.bind(this);
    this.removeStopHandler = this.removeStopHandler.bind(this);
    this.updateRoute = this.updateRoute.bind(this);
    this.getUpdatedBBox = this.getUpdatedBBox.bind(this);
    this.redrawMarkers = this.redrawMarkers.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);

    // ********DUMMY DATA***********
    this.state.stops.push({
      "bbox":[
         -113.713801689886,
         53.3956031350886,
         -113.271643300914,
         53.7159858649816
      ],
      "center":[
         -113.5065,
         53.5344
      ],
      "geometry":{
         "coordinates":[
            -113.5065,
            53.5344
         ]
      },
      "id":"place.9080100702660390",
      "language":"en",
      "place_name":"Edmonton, Alberta, Canada",
      "place_name_en-GB":"Edmonton, Alberta, Canada"
    })
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -113.41777, 53.48538], // TODO: implement ask and get location of person
      zoom: 10,
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

    // add stop by clicking on map
    map.on('click', (e) => {
      const coords = e.lngLat;
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.lng},${coords.lat}.json?access_token=${TOKEN}&types=place`)
        .then((response) => response.json())
        .then((data) => {
          if(data.features.length > 0){
            const stop = data.features[0];
            this.addStopHandler(stop);
          }
        });
    })

    this.map = map;
  }

  getUpdatedBBox(markers) {
    let coordsList = markers.map((marker) => {
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
    return bbox;
  }

  addStopHandler(stop){
    console.log(stop);
    // update markers
    const marker = new mapboxgl.Marker().setLngLat(stop.center);

    const markers = [...this.state.markers, marker];
    const stops = [...this.state.stops, stop];

    // append to current markers
    this.setState(prevState => ({
      ...prevState,
      markers:markers,
      stops:stops,
    }));

    const bbox = this.getUpdatedBBox(markers); 

    // determine if should offset by point or bbox
    let padding = {left:50, right:450, top:50, bottom:50};
    if(markers.length <= 1){
      padding = {left:50, right:400};
    }

    // fly to fit bounds
    this.map.fitBounds(bbox,{padding:padding, maxZoom:8});

    this.redrawMarkers(markers);
    this.updateRoute(stops);
  }

  removeStopHandler(index){
    // remove marker
    let markers = [...this.state.markers];
    const marker = markers.splice(index, 1)[0];
    marker.remove(); // remove from map

    // remove stop
    let stops = [...this.state.stops];
    stops.splice(index, 1);

    this.redrawMarkers(markers);
    this.updateRoute(stops);
    this.setState(prevState => ({...prevState, markers: markers, stops:stops}));
  }

  reorderStopsHandler(from, to){
    let markers = this.state.markers;
    const [removedMarker] = markers.splice(from, 1);
    markers.splice(to, 0, removedMarker);

    let stops = [...this.state.stops];
		const [removedStop] = stops.splice(from, 1);
		stops.splice(to, 0, removedStop);
		
    this.redrawMarkers(markers);
    this.updateRoute(stops);
    this.setState(prevState => ({...prevState, stops:stops, markers:markers}));	
  }

  redrawMarkers(markers){
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
    this.setState(prevState => ({...prevState, markers:markers}));
  }

  updateRoute(stops){
    // generate coordinate data array from markers
    const coords = stops.map((item) => {
      const lng = item.center[0].toString();
      const lat = item.center[1].toString();
      return lng.concat(",",lat);
    });
    const coordString = coords.join(';');

    // reset route and route data if <= 1
    if(stops.length <= 1){
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [[0,0]]
        }
      };
      this.map.getSource('route').setData(geojson); 
      this.setState(prevState => (
        {...prevState, duration:0, distance:0}
      ));
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
          
            this.setState(prevState => (
              {...prevState, duration:duration, distance:distance}
            ));

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

  showModal(index){
    const selectedStop = this.state.stops[index]; 
    const lat = selectedStop.center[1]; 
    const lng = selectedStop.center[0];
    const selectedCoords = [lat, lng];

    this.setState(prevState => ({
      ...prevState,
      selectedCoords:selectedCoords,
      showModal:true,
    }));
  }

  hideModal(){
    this.setState(prevState => ({
      ...prevState,
      showModal:false
    }));
  }

  render() {
    return (
        <div id="map">
          <Plan 
            stops={this.state.stops}
            duration={this.state.duration}
            distance={this.state.distance}
            addStop={this.addStopHandler}
            removeStop={this.removeStopHandler}
            reorderStops={this.reorderStopsHandler}
            showModal={this.showModal}
          />
          <Modal            
            show={this.state.showModal}
            className='browse-modal'
          >
            <BrowseActivities hideModal={this.hideModal} selectedCoords={this.state.selectedCoords}></BrowseActivities>
          </Modal>
        </div>
    )
  }

}

export default Map;
