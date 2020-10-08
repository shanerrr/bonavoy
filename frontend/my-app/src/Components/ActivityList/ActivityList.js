import React from 'react';

import ActivityListItem from '../ActivityListItem/ActivityListItem';
import './style.css';


class ActivityList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pageSize:5,
      placesLeft:true,
      initiallyFetched:false
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.selectActivityHandler = this.selectActivityHandler.bind(this);
  }

  componentDidMount(){
    // prevent another fetch after mounting and rendering after first fetch
    if(this.props.activities.length === 0){
      console.log("fetching");
      this.fetchPlaces()
    }
  }

  // fetch more places when scrolled to bottom of list
  handleScroll = (e) =>{
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) { 
      this.fetchPlaces();
    }
  }

  // fetch places under activity type
  fetchPlaces(){
    const lat = this.props.selectedCoords[0];
    const lng = this.props.selectedCoords[1];	
    const kind = this.props.activityType;

		const radius = 4000;
		fetch(`http://localhost:4000/api/external/places?lat=${lat}&lng=${lng}&radius=${radius}&kind=${kind}&page_size=${this.state.pageSize}&offset=${this.props.offset}`)
			.then((response) => response.json())
			.then((data) => {
      
        if(data.length === 0){
          this.setState(prevState => (
            {
              ...prevState,
              placesLeft:false
            }
          ))
          console.log('no more places within this radius')
          return;
        }
        const index = this.props.activityTypeIndex;
        this.props.addActivities(index, data);
			})
			.catch((err) => console.log(err));
  }

  selectActivityHandler(index){
    this.setState(prevState => ({
      ...prevState,
      selected:index
    }))
    // call back to send to activityview component
    this.props.setActivityBeingViewed(this.props.activityTypeIndex ,index);
  }

  render(){
    return (
      <div className='browse-activity-list' onScroll={this.handleScroll}>
        <ul>
          {this.props.activities.map((activity, key) => {
            const selected = key === this.state.selected ? true: false;
            return ( 
              <ActivityListItem 
                activityIndex={key} 
                activityTypeIndex={this.props.activityTypeIndex}
                key={key} 
                activity={activity} 
                selected={selected}
                selectActivity={this.props.selectActivityHandler}
                selectActivityBeingViewed={this.props.setActivityBeingViewed}
              />
            )
          })}
          {this.state.placesLeft ? (
            <div className='spinner-container'>
              <div className='loader'>
                <img src={'./images/spinner.svg'}/>
              </div>
            </div>
          )
          : null          
          }
        </ul>
      </div>
    )
  }

}

export default ActivityList;