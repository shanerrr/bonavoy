import React from 'react';

import Tabs from '../Tabs/Tabs'
import ActivityList from '../ActivityList/ActivityList';
import ActivityView from '../ActivityView/ActivityView';
import './style.css';

class BrowseActivities extends React.Component {

	static activityTypes = [
		{
			label:'Accomodation',
			type:'accomodations',
			className:'accomodation',
			color:'red',
			subTypes:[], //TODO: implement sub types
		},
		{
			label:'Food and Drinks',
			type:'foods',
			className:'foods',
			color:'yellow',
			subTypes:[],
		},
		{
			label:'Interesting Places',
			type:'interesting_places',
			className:'interesting-places',
			color:'orange',
			subTypes:[],
		},
		{
			label:'Shops',
			type:'shops',
			className:'shops',
			color:'aqua',
			subTypes:[],
		},
		{
			label:'Services',
			type:'fuel,charging_station,atm,bank,bureau_de_change,bicycle_rental',
			className:'services',
			color:'grey',
			subTypes:[],
		}
	];

	constructor(props){
		super(props);
		this.hideModal = this.hideModal.bind(this);
	}

	hideModal(){
		this.props.hideModal();
	}
	
	render(){
		return (
			<div>
				<Tabs> 
					{BrowseActivities.activityTypes.map((activityType) => {
						return (
							<div label={activityType.label} className={activityType.className}> 
								<div className="browse-activity-container">
									<ActivityList/>
									<ActivityView/>
								</div>
							</div>
						)
					})}
     		</Tabs> 
			</div>
		)
	}
}
	
export default BrowseActivities;