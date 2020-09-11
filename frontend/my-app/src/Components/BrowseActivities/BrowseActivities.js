import React from 'react';

class BrowseActivities extends React.Component {
	constructor(props){
		super(props);
		this.hideModal = this.hideModal.bind(this);
	}

	hideModal(){
		this.props.hideModal();
	}
	
	render(){
		return (
			<div>
				<button onClick={this.hideModal}>close</button>
				i dont really know but we broswing and shit
			</div>
		)
	}
}
	
	export default BrowseActivities;