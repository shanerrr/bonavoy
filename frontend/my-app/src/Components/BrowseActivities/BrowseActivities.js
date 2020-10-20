import React from 'react';

import Tabs from '../Tabs/Tabs'
import ActivityList from '../ActivityList/ActivityList';
import ActivityView from '../ActivityView/ActivityView';
import './BrowseActivities.css';

const pageSize = 5;
const clientId = '2SFWGSRXUHFAFQJZQLHLSXSHGJJBI0YJPFPK0BOQUXDR0G3K';
const clientSecret = 'USGJFTUYIOSAPD3BVH2IJNEF3DPTVBYDW2OIQ2JRL5LVORM0';


class BrowseActivities extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			activityBeingViewed:null,
			activityBeingViewedIcon:null,
			activityTypes:[
				{
					label:'Accomodation',
					type:'accomodations',
					className:'accomodation',
					filters:[
						'other_hotels',
						'campsites',
						'resorts',
						'motels',
						'hostel',
						'love_hotels',
						'villas_and_chalets',
						'guest_houses',
						'apartments', 
						'alphine_hut', 
					],
					offset:0,
					activities:[]
				},
				{
					label:'Food and Drinks',
					type:'foods,bakeries',
					className:'food-and-drinks',
					filters:[
						'restaurants',
						'fast_food',
						'cafes',
						'pubs',

					],
					offset:0,
					activities:[]
				},
				{
					label:'Nature',
					type:'natural',
					className:'natural',
					filters:[],
					offset:0,
					activities:[]
				},
				{
					label:'Interesting Places',
					type:'cultural,historic,architecture,abandoned_mineshafts,abandoned_railway_stations,dams',
					className:'interesting-places',
					filters:[],	
					offset:0,
					activities:[]
				},
				{
					label:'Shops',
					type:'supermarkets,conveniences,malls,marketplaces,outdoor',
					className:'shops',
					filters:[],
					offset:0,
					activities:[]
				},
				{
					label:'Services',
					type:'fuel,charging_station,atm,bank,bureau_de_change,bicycle_rental,boat_sharing,car_rental',
					className:'services',
					filters:[],
					offset:0,
					activities:[]
				}
			]
		};
		this.setActivityBeingViewedHandler = this.setActivityBeingViewedHandler.bind(this);	
		this.addActivitiesHandler = this.addActivitiesHandler.bind(this);
		this.fetchPlacesImages = this.fetchPlacesImages.bind(this);
	}

	setActivityBeingViewedHandler(activityTypeIndex, index){
		/**
		 * Sets the activity being viewed in ActivityView pane 
		 * @param int: index of activity currently being viewed 
		 */
		// todo: set icon here to pass through props to activity view
		const icon = this.state.activityTypes[activityTypeIndex].type;
		const activity = this.state.activityTypes[activityTypeIndex].activities[index];

		this.setState(prevState => ({
			...prevState,
			activityBeingViewed:activity,
			activityBeingViewedIcon:icon,
		}));
	}

	addActivitiesHandler(index, activities){
		let newState = {...this.state};

		// increase page offset for next page
		newState.activityTypes[index].offset++;

		// append activities
		let oldActivities = newState.activityTypes[index].activities;
		newState.activityTypes[index].activities = [...oldActivities,...activities];
		this.setState(newState);

		//get images
		this.fetchPlacesImages(index);
	}

	fetchPlacesImages(activityTypeIndex){
		// get todays date for version number for foursquare
		const d = new Date();
		let date = d.getDate().toString();
		date = date.length < 2 ? '0' + date : date;
		const today = d.getFullYear().toString() + (d.getMonth()+1).toString() + date;

		// get the activities we need to retrieve photos for
		const activityType = this.state.activityTypes[activityTypeIndex];
		const lowerRange = ((activityType.offset-1) * pageSize);
		const upperRange = Math.min(lowerRange + pageSize, activityType.activities.length);
		let activities = activityType.activities.slice(lowerRange, upperRange);

		// get photos of the activities
		const imageRequests = activities.map((activity) => {
			return fetch(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=${today}&ll=${activity.point.lat},${activity.point.lon}&radius=10000&query=${activity.name}`)
				.then(response => response.json())
				.then((data) => {
					const id = data.response.venues && data.response.venues[0] ? data.response.venues[0].id : null;
					return fetch(`https://api.foursquare.com/v2/venues/${id}/photos?v=${today}&client_id=${clientId}&client_secret=${clientSecret}`)
						.then(response => response.json())
				})
		})
		Promise.all(imageRequests)
			.then((imageRes) => {
				const activitiesWithImg = activities.map((activity, key) => {
					const imageData = imageRes[key].meta.code === 200 
						&& imageRes[key].response.photos.items !== undefined
						&& imageRes[key].response.photos.items.length > 0
						? imageRes[key].response.photos.items[0]
						: null;
					const imgSrc = imageData ? imageData.prefix + "500x500" + imageData.suffix : '/images/camera.svg';
					activity.imgSrc = imgSrc;
					return activity;
				});

				const newState = this.state;

				// replace old activities with new actitivities that have image url's
				let newActivities = newState.activityTypes[activityTypeIndex].activities;
				newActivities.splice(lowerRange, upperRange-lowerRange);
				newActivities = [...newActivities, ...activitiesWithImg];
				newState.activityTypes[activityTypeIndex].activities = newActivities;

				this.setState({
					...newState
				})
			});
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
										activityTypeIndex={key}
										activities={activityType.activities}
										offset={activityType.offset}
										selectedCoords={this.props.selectedCoords}
										addActivities={this.addActivitiesHandler}
										setActivityBeingViewed={this.setActivityBeingViewedHandler}
									/>
									<ActivityView 
										activityType={activityType.type}
										icon={this.state.activityBeingViewedIcon}
										activityBeingViewed={this.state.activityBeingViewed}
										addToStop={activityType.type === 'accomodations' ? this.props.setAccomodation : this.props.addActivity}
										selectedStop={this.props.selectedStop}
									/>
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