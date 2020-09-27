import React from 'react';

import Tabs from '../Tabs/Tabs'
import ActivityList from '../ActivityList/ActivityList';
import ActivityView from '../ActivityView/ActivityView';
import './style.css';


class BrowseActivities extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			activityTypes:[
				{
					label:'Accomodation',
					type:'accomodations',
					className:'accomodation',
					color:'red',
					subTypes:[], //TODO: specify sub types for filtering
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
					className:'interesting-places,natural,cultural,architectural',
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
			]
		};

	}
	
	render(){
		return (
			<div>
				<Tabs hideModal={this.props.hideModal}> 
					{this.state.activityTypes.map((activityType, key) => {
						return (
							<div label={activityType.label} className={activityType.className}> 
								<div className="browse-activity-container">
									<ActivityList 
										activityType={activityType.type} 
										index={key}
										selectedCoords={this.props.selectedCoords}
										addActivities={this.addActivitiesHandler}
									/>
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