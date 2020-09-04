import React from 'react';
import Popup from "reactjs-popup";

class BrowseActivities extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<Popup 
			trigger={<button>Add Activities</button>}
			modal
			closeOnDocumentClick
			contentStyle={{'width':'90%', 'height':'90%', 'cursor':'default', 'zIndex':999989}}
			>
				<div>
					<div>browse and add accomodation, tourist attractions, activities, and eats here!</div>
					<div><button>add accomodation</button></div>
					<div><button>add activity</button></div>
				</div>
			</Popup>
			)
		}
	}
	
	export default BrowseActivities;