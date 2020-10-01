import React from 'react';

import './style.css';

const activityIcon = {
	'accomodations':<i class="fas fa-bed"></i>,
	'foods':<i class="fas fa-utensils"></i>,
	'interesting_places':<i class="fas fa-binoculars"></i>,
	'shops':<i class="fas fa-shopping-bag"></i>,
	'fuel,charging_station,atm,bank,bureau_de_change,bicycle_rental,boat_sharing,car_rental':<i class="fas fa-concierge-bell"></i>,
	'natural':<i class="fas fa-mountain"/>,
}

class StopInfo extends React.Component {
	constructor(props){
		super(props);
		this.showModal = this.showModal.bind(this);
	}
	
	showModal(){
		this.props.showModal(this.props.index);
	}
	
	render(){
		const activities = this.props.stop.activities;
		return (
			<div className='expanded'>
				<p><i class='fas fa-bed'></i> {this.props.stop.accomodation ? this.props.stop.accomodation.name : 'none'}</p>
				<ul className='activity-list'>
					{activities ? activities.map((activity, key) => { //TODO: switch icons based on activity type
						return (
							<li 
								className='activity-list-item' 
								key={key}
							>
								<p>{activityIcon[activity.icon]} {activity.name}</p>
							</li>
						)
					})
						: null
					}
				</ul>

				<button className='browse-activities' onClick={this.showModal}>browse</button>
			</div>
		)
	}
}
		
		export default StopInfo;
		