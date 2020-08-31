import React from 'react';

import './style.css';
import StopList from '../StopList/StopList';
import PlanOverview from '../PlanOverview/PlanOverview';
import AddStop from '../AddStop/AddStop';

class Plan extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            stops:[],  
        }
        this.addStopHandler = this.addStopHandler.bind(this);
        this.exchangeStopsHandler = this.exchangeStopsHandler.bind(this);
        this.removeStopHandler = this.removeStopHandler.bind(this);
    }

    addStopHandler(stop){
        this.setState({stops:[...this.state.stops, stop]});

        //add new marker 
        this.props.addMarker(stop.center);
    }

    exchangeStopsHandler(from, to){
        let stops = [...this.state.stops];

		const temp = stops[to];
		stops[to] = stops[from];
        stops[from] = temp;

		this.setState({
		  stops:stops
        });
        // exchange marker positions
        this.props.exchangeMarkers(from,to);
    }
    
    removeStopHandler(key){
        console.log(key);
    }

    render(){
        return (
            <div className='plan'>
                <div className='plan-name'>
                    Jerome's Trip
                </div>
                <AddStop addStopHandler={this.addStopHandler}/>
                <StopList 
                    exchangeStops={this.exchangeStopsHandler} 
                    removeStop={this.removeStopHandler}
                    stops={this.state.stops}
                />
                <PlanOverview/>
            </div>
        )
    }
}

export default Plan;
