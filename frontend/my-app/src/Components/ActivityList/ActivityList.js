import React from 'react';

import ActivityListItem from '../ActivityListItem/ActivityListItem';
import './style.css';
class ActivityList extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
		const lat = this.props.selectedCoords[0];
    const lng = this.props.selectedCoords[1];	
    const kind = this.props.activities.type;
    console.log(kind);
		const radius = 4000;
		fetch(`http://localhost:4000/api/external/places?lat=${lat}&lng=${lng}&radius=${radius}&kind=${kind}`)
			.then((response) => response.json())
			.then((data) => {
        const index = this.props.index;
        this.props.setActivity(index, data);
			})
			.catch((err) => console.log(err));
  }

  render(){
    return (
      <div className='browse-activity-list'>
        <ul>
          {this.props.activities.activities.map((activity, key) => {
            return <ActivityListItem key={key} activity={activity}/>
          })}
        </ul>
      </div>
    )
  }

}

export default ActivityList;