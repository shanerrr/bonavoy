import React from 'react';

import './style.css';
import StopInfo from '../StopInfo/StopInfo';


class StopListItem extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			open:false,
		}
		this.toggleItem = this.toggleItem.bind(this);
		this.removeStop = this.removeStop.bind(this);
	}
	
	toggleItem(e){
		this.setState({open: !this.state.open})
	}

	removeStop(){
		console.log('key', this.props.index);
		this.props.removeStop(this.props.index);
	}
	
	render() {
		return (
			<div>
				<div 
					onClick={(e)=>this.toggleItem(e)} 
					className='collapsed'
					style={this.props.style}
				>
					<div>
						<button className='btn delete' onClick={this.removeStop}>remove</button>
						<p className="place-name">{this.props.stop.place_name}</p>
					</div>
				</div>
				{/* TODO: implement to change height to allow for animation */}
				{this.state.open ? (<StopInfo stop={this.props.stop}/>) : null}
			</div>
		);
	}
	
}
	
	export default StopListItem;
	