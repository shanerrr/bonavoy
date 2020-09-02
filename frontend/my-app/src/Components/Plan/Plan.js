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
			showPlan:true,
		}
		this.addStopHandler = this.addStopHandler.bind(this);
		this.reorderStopsHandler = this.reorderStopsHandler.bind(this);
		this.togglePlan = this.togglePlan.bind(this);
	}
	
	addStopHandler(stop){
		this.setState({stops:[...this.state.stops, stop]});
		console.log(this.state.stops);
		//add new marker 
		this.props.addMarker(stop.center);
	}
	
	reorderStopsHandler(from, to){
		let result = [...this.state.stops];
		const temp = result[to];	
		result[to] = result[from];
		result[from] = temp;
		this.setState({stops:result});		
		console.log(result);	
		// reorder markers
		this.props.reorderMarkers(from, to);
	}

	togglePlan(){
		this.setState({...this.state, showPlan:!this.state.showPlan});
	}
	
	render(){
		return (
			<div className="plan-group">
				<button 
					onClick={this.togglePlan} 
					className="toggle-plan"
				>
					Toggle
				</button>
				<div className="plan-container">
					<div id="plan">
						<div className='plan-header'>
							Jerome's Trip
						</div>
						<AddStop addStopHandler={this.addStopHandler}/>
						<StopList 
							stops={this.state.stops}
							reorderStops={this.reorderStopsHandler}
						/>
						<PlanOverview/>
					</div>
				</div>
			</div>
			)
		}
	}
	
	export default Plan;
