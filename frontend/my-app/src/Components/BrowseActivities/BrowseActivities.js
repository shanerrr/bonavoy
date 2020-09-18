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
					subTypes:[], //TODO: implement sub types
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
		this.hideModal = this.hideModal.bind(this);
	}

	componentDidMount(){
		fetch(`http://localhost:4000/api/external/places?lat=${this.props[0]}&lng=${this.props[1]}&radius=${4000}&kind=${this.state.activityTypes[0].type}`)
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}

	hideModal(){
		this.props.hideModal();
	}
	
	render(){
		return (
			<div>
				<Tabs> 
					{this.state.activityTypes.map((activityType) => {
						return (
							<div label={activityType.label} className={activityType.className}> 
								<div className="browse-activity-container">
									<ActivityList activity={activityType.activities}/>
									<ActivityView/>
								</div>
							</div>
						)
					})}

				{/* <div className="close"><i className="fas fa-times" aria-hidden="true"></i></div> */}
     		</Tabs> 
			</div>
		)
	}
}
	
export default BrowseActivities;