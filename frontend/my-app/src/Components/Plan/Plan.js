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
		this.removeStopHandler = this.removeStopHandler.bind(this);
		this.togglePlan = this.togglePlan.bind(this);
	}
	
	addStopHandler(stop){
		//add stop to state
		this.setState({stops:[...this.state.stops, stop]});
		//add new marker 
		this.props.addMarker(stop.center);
	}
	
	reorderStopsHandler(from, to){
		let result = [...this.state.stops];
		const [removed] = result.splice(from, 1);
		result.splice(to, 0, removed);
		this.setState({...this.state,stops:result});		

		// reorder markers
		this.props.reorderMarkers(from, to);
	}

	removeStopHandler(index){
		let result = [...this.state.stops];
		result.splice(index, 1);
		this.setState({...this.state, stops:result});

		// remove marker
		this.props.removeMarker(index);
	}

	togglePlan(){
		this.setState({...this.state, showPlan:!this.state.showPlan});
	}
	
	render(){
		return (
			<div className={this.state.showPlan ? "plan-group show" : "plan-group hidden" }>
				<button 
					onClick={this.togglePlan} 
					className="toggle-plan"
				>
					Toggle
				</button>
				<div className="plan-container">
					<div id="plan">
						<div className='plan-header'>
							<button onClick={this.togglePlan} className="mobile-toggle-plan">toggle</button>
							Jerome's Trip
						</div>
						<AddStop addStopHandler={this.addStopHandler}/>
						<StopList 
							stops={this.state.stops}
							reorderStops={this.reorderStopsHandler}
							removeStop={this.removeStopHandler}
						/>
						<PlanOverview/>
					</div>
				</div>
			</div>
			)
		}
	}
	
	export default Plan;
