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
			subTypes:[], //TODO: implement sub types
		},
		{
			label:'Food and Drinks',
			type:'foods',
			className:'foods',
			subTypes:[],
		},
		{
			label:'Interesting Places',
			type:'interesting_places',
			className:'interesting-places',
			subTypes:[],
		},
		{
			label:'Shops',
			type:'shops',
			className:'shops',
			subTypes:[],
		},
		{
			label:'Services',
			type:'fuel,charging_station,atm,bank,bureau_de_change,bicycle_rental',
			className:'services',
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