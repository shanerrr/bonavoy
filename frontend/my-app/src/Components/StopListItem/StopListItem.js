import React from 'react';

import './StopListItem.css';
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
						<p className="place-name">{this.props.stop.place_name}</p>
						<button className='stoplist-delete-btn' onClick={this.removeStop}>remove</button>
					</div>
					{this.state.open ? (<StopInfo stop={this.props.stop} showModal={this.props.showModal} index={this.props.index}/>) : null}
				</div>
			</div>
		);
	}
	
}
	
	export default StopListItem;
	