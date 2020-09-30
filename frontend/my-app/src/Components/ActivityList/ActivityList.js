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
      selected:null,
    }
    this.fetched = false;
    this.handleScroll = this.handleScroll.bind(this);
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.selectActivityHandler = this.selectActivityHandler.bind(this);
  }

  componentDidMount(){
    // prevent another fetch after mounting and rendering after first fetch
    if(!this.fetched){
      this.fetchPlaces();
      this.fetched = true; 
    }
  }

  handleScroll = (e) =>{
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) { 
      this.fetchPlaces();
    }
  }

  fetchPlaces(){
    const lat = this.props.selectedCoords[0];
    const lng = this.props.selectedCoords[1];	
    const kind = this.props.activityType;

		const radius = 4000;
		fetch(`http://localhost:4000/api/external/places?lat=${lat}&lng=${lng}&radius=${radius}&kind=${kind}&page_size=${this.state.pageSize}&offset=${this.state.offset}`)
			.then((response) => response.json())
			.then((data) => {
        console.log(data);
        if(data.length === 0){
          console.log('no more places within this radius')
          return;
        }
        const index = this.props.index;
        const activityList = [...this.state.activityList, ...data]
        this.setState(prevState => {
          return {...prevState,offset:prevState.offset+1, activityList:activityList};
        })  
			})
			.catch((err) => console.log(err));
  }

  selectActivityHandler(index){
    this.setState(prevState => ({
      ...prevState,
      selected:index
    }))
    // call back to send to activityview component
    this.props.setActivityBeingViewed(this.state.activityList[index]);
  }

  render(){
    return (
      <div className='browse-activity-list' onScroll={this.handleScroll}>
        <ul>
          {this.state.activityList.map((activity, key) => {
            const selected = key === this.state.selected ? true: false;
            return ( 
              <ActivityListItem 
                index={key} 
                key={key} 
                activity={activity} 
                selected={selected}
                selectActivity={this.selectActivityHandler}
              /> 
            )
          })}
        </ul>
      </div>
    )
  }

}

export default ActivityList;