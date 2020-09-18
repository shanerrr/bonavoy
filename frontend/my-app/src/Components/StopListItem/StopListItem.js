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
						<button className='stoplist-deletebtn' onClick={this.removeStop}>remove</button>
					</div>
				</div>
				{/* TODO: implement to change height to allow for animation */}
				{/* <StopInfo
					stop={this.props.stop}
					showModal={this.props.showModal}
					// style={{height:	this.state.open ? 'min-content': '0px !important'}}
				/> */}
				{this.state.open ? (<StopInfo stop={this.props.stop} showModal={this.props.showModal} index={this.props.index}/>) : null}
			</div>
		);
	}
	
}
	
	export default StopListItem;
	