import React from 'react';
import TripListItem from '../TripListItem/TripListItem';

import './style.css';

class TripList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			trips:['San francisco trip', 'Edmonton trip', 'Some other trip', 'trip 1', 'another trip', 'one other trip', 'another another trip', 'i dontrea lyy know']
		}
	}
	
	render(){
		return (
			<div>
				<ul className="trip-list">
					{this.state.trips.map((trip) => {
						return <li><TripListItem trip={trip}/></li>
					})}
				</ul>
			</div>
		)
	}
}
	
	export default TripList;