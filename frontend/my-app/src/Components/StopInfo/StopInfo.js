import React from 'react';

import './StopInfo.css';

const activityIcon = {
	'accomodations':<span className='activity-icon-accomodations'><i class="fas fa-bed"></i></span>,
	'foods,bakeries':<span className='activity-icon-foods'><i class="fas fa-utensils"></i></span>,
	'cultural,historic,architecture,abandoned_mineshafts,abandoned_railway_stations,dams':<span className='activity-icon-interesting-places'><i class="fas fa-binoculars"></i></span>,
	'supermarkets,conveniences,malls,marketplaces,outdoor':<span className='activity-icon-shops'><i class="fas fa-shopping-bag"></i></span>,
	'fuel,charging_station,atm,bank,bureau_de_change,bicycle_rental,boat_sharing,car_rental':<span className='activity-icon-services'><i class="fas fa-concierge-bell"></i></span>,
	'natural':<span className='activity-icon-natural'><i class="fas fa-mountain"/></span>,
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
		console.log(activities)
		return (
			<div className='stop-info'>
				{this.props.stop.accomodation ? (<div><span className='activity-icon-accomodations'><i class='fas fa-bed'></i></span> {this.props.stop.accomodation.name}</div>) : null}
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
				<div className='browse-activities-container'>
					<button className='browse-activities' onClick={this.showModal}>
						<i class="fas fa-plus"></i> Add Activities
					</button>
				</div>
			</div>
		)
	}
}
		
		export default StopInfo;
		