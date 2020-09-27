import React from 'react';

import ActivityListItem from '../ActivityListItem/ActivityListItem';
import './style.css';
class ActivityList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pageSize:5,
      offset:0,
      activityList:[],
    }
    this.fetched = false;
    this.handleScroll = this.handleScroll.bind(this);
    this.fetchPlaces = this.fetchPlaces.bind(this);
  }

  componentDidMount(){
    if(!this.fetched){
      console.log("stop");
      this.fetchPlaces();
      this.fetched = true; 
    }
  }

  handleScroll = (e) =>{
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) { 
      console.log('scrolled');
      this.fetchPlaces();
    }
  }

  fetchPlaces(){
    console.log('fetching...');
    const lat = this.props.selectedCoords[0];
    const lng = this.props.selectedCoords[1];	
    const kind = this.props.activityType;

		const radius = 4000;
		fetch(`http://localhost:4000/api/external/places?lat=${lat}&lng=${lng}&radius=${radius}&kind=${kind}&page_size=${this.state.pageSize}&offset=${this.state.offset}`)
			.then((response) => response.json())
			.then((data) => {
        const index = this.props.index;
        console.log('before set state');
        const activityList = [...this.state.activityList, ...data]
        this.setState(prevState => {
          return {...prevState,offset:prevState.offset+1, activityList:activityList};
        })  
			})
			.catch((err) => console.log(err));
  }

  render(){
    return (
      <div className='browse-activity-list' onScroll={this.handleScroll}>
        <ul>
          {this.state.activityList.map((activity, key) => {
            return <ActivityListItem key={key} activity={activity}/>
          })}
        </ul>
      </div>
    )
  }

}

export default ActivityList;