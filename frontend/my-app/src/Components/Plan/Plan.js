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

		this.togglePlan = this.togglePlan.bind(this);
	}

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
