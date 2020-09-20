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
					activities:[],
				},
				{
					label:'Food and Drinks',
					type:'foods',
					className:'foods',
					color:'yellow',
					subTypes:[],
					activities:[],
				},
				{
					label:'Interesting Places',
					type:'interesting_places',
					className:'interesting-places',
					color:'orange',
					subTypes:[],
					activities:[],
				},
				{
					label:'Shops',
					type:'shops',
					className:'shops',
					color:'aqua',
					subTypes:[],
					activities:[],
				},
				{
					label:'Services',
					type:'fuel,charging_station,atm,bank,bureau_de_change,bicycle_rental',
					className:'services',
					color:'grey',
					subTypes:[],
					activities:[],
				}
			]
		};
		this.setActivityHandler = this.setActivityHandler.bind(this);
	}

	setActivityHandler(key, data){
		this.setState(prevState => {
			prevState.activityTypes[key].activities = data;
			return {
				...prevState
			}
		})
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
										activities={activityType} 
										index={key}
										selectedCoords={this.props.selectedCoords}
										setActivity={this.setActivityHandler}
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