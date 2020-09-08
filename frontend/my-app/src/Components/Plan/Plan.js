import React from 'react';

import './style.css';
import StopList from '../StopList/StopList';
import PlanOverview from '../PlanOverview/PlanOverview';
import AddStop from '../AddStop/AddStop';


class Plan extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			showPlan:true,
		}
		// this.addStopHandler = this.addStopHandler.bind(this);
		// this.reorderStopsHandler = this.reorderStopsHandler.bind(this);
		// this.removeStopHandler = this.removeStopHandler.bind(this);
		this.togglePlan = this.togglePlan.bind(this);
	}
	
	// addStopHandler(stop){
	// 	//add stop to state
	// 	this.setState({stops:[...this.state.stops, stop]});
	// 	//add new marker 
	// 	this.props.addMarker(stop.center);
	// }
	
	// reorderStopsHandler(from, to){
	// 	let result = [...this.state.stops];
	// 	const [removed] = result.splice(from, 1);
	// 	result.splice(to, 0, removed);
	// 	this.setState({...this.state,stops:result});		

	// 	// reorder markers
	// 	this.props.reorderMarkers(from, to);
	// }

	// removeStopHandler(index){
	// 	let result = [...this.state.stops];
	// 	result.splice(index, 1);
	// 	this.setState({...this.state, stops:result});

	// 	// remove marker
	// 	this.props.removeMarker(index);
	// }

	togglePlan(){
		this.setState({showPlan:!this.state.showPlan});
	}
	
	render(){
		return (
			<div>
				{this.state.showPlan ? "" :
					<button onClick={this.togglePlan} className="toggle-plan" >
						Show Plan
					</button>
				}
				<div className={this.state.showPlan ? "plan-group show" : "plan-group hidden" }>
					<div className="plan-container">
						<div id="plan">
							<div className='plan-header'>
								<button onClick={this.togglePlan} className="toggle-plan header-toggle-plan">Hide</button>
								<h3 className="trip-title">Jerome's Trip</h3>
							</div>
							<AddStop addStop={this.props.addStop}/>
							<StopList 
								stops={this.props.stops}
								reorderStops={this.props.reorderStops}
								removeStop={this.props.removeStop}
							/>
							<PlanOverview
								duration={this.props.duration}
								distance={this.props.distance}
								stopCount={this.props.stops.length}	
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
	
	export default Plan;
