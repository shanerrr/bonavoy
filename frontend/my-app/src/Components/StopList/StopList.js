import React from 'react';

import './style.css';
import StopListItem from '../StopListItem/StopListItem';


class StopList extends React.Component {
    
	constructor(props){
		super(props);
		this.state = {
			stops:[],
			beforeDragState:{
				dragging: false,
				draggedTo: null,
				draggedFrom: null,
			},
			duringDragState:{
				dragging: false,
				draggedTo: null,
				draggedFrom: null,
			}
		}
		this.onDragStartHandler = this.onDragStartHandler.bind(this);
		this.onDragOverHandler = this.onDragOverHandler.bind(this);
		this.onDropHandler = this.onDropHandler.bind(this);
	}

	onDragStartHandler(event){
		const draggedFrom = event.currentTarget.dataset.position;
		this.state.duringDragState.draggedFrom = draggedFrom;
		console.log(this.state.stops);
	}

	onDragOverHandler(event){
		// stop default browser behavior
		event.preventDefault();

		const duringDraggedFrom = this.state.duringDragState.draggedFrom;
		const duringDraggedTo = this.state.duringDragState.draggedTo;

		const draggedTo = event.currentTarget.dataset.position;
		if(duringDraggedFrom !== draggedTo && duringDraggedTo !== draggedTo)
		{
			// temporary exchange for style
			this.props.exchangeStops(duringDraggedFrom, draggedTo);
			this.setState({
				...this.state, 
				duringDragState:{
					...this.duringDragState,
					draggedFrom:draggedTo
				}
			})
		}

	}

	onDropHandler(event){
		const beforeDragState = this.state.beforeDragState;
		const state = {
			...this.state,
			duringDragState:beforeDragState
		}
	}

	render(){
		const stops = this.props.stops.map((stop, key) => {
			return ( 
				<li 
					key={key}        
					id='draggable'            
					draggable='true'
					onDragStart={this.onDragStartHandler}
					data-position={key}
					onDrop={this.onDropHandler}
					onDragOver={this.onDragOverHandler}
					onDragEnd={this.onDragEndHandler}
				>
					<StopListItem 
						stopName={stop.place_name} 
						id={key}
						removeStop={this.props.removeStop}
					/>
				</li>
			)
		});
		
		return(
			<ul className='stop-list'>
				{stops}
			</ul>
		)
	}

}

export default StopList;
