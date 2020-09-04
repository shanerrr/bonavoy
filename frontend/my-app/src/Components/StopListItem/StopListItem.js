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
				>
					<div>
						<p className="place-name">{this.props.stop.place_name}</p>
						<button className='btn delete' onClick={this.removeStop}>remove</button>
					</div>
				</div>
				{this.state.open ? (<StopInfo stop={this.props.stop}/>) : null}
			</div>
			);
		}
		
	}
	
	export default StopListItem;
	