import React from 'react';

import './style.css';
import StopInfo from '../StopInfo/StopInfo';
import { Draggable } from 'react-beautiful-dnd';


class StopListItem extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			open:false,
		}
		this.toggleItem = this.toggleItem.bind(this);
	}
	
	toggleItem(e){
		this.setState({open: !this.state.open})
	}
	
	render() {
		return (
			<div>
				<div 
					onClick={(e)=>this.toggleItem(e)} 
					className='collapsed'
				>
					<div>
						{this.props.stop.place_name}
					</div>
				</div>
				{this.state.open ? (<StopInfo stop={this.props.stop}/>) : null}
			</div>
			);
		}
		
	}
	
	export default StopListItem;
	