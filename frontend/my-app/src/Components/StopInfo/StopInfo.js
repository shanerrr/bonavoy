import React from 'react';

import './style.css';


class StopInfo extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			accomodation: 'Banff Beaver Lodge',
			activityList: ['Sulpher Mountain', 'Skating', 'Scenic'],
		}
		this.showModal = this.showModal.bind(this);
	}
	
	showModal(){
		this.props.showModal();
	}
	
	render(){
		return (
			<div className='expanded'>
				<p><i class="fas fa-bed"></i> {this.state.accomodation}</p>
				<ul className='activity-list'>
					{this.state.activityList.map((item, key) => { //TODO: switch icons based on activity type
						return (
							<li 
								className='activity-list-item' 
								key={key}
							>
								<p><i class="fas fa-mountain"/> {item}</p>
							</li>
						)
					})}
					<button onClick={this.showModal}>browse</button>
				</ul>
			</div>
				
		)
			}
		}
		
		export default StopInfo;
		