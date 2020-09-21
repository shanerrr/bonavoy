import React from 'react';

import ActivityListItem from '../ActivityListItem/ActivityListItem';
import './style.css';
class ActivityList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      activities:['activity 1', 'activity 2', 'activity 3', 'activity 4', 'activity 5', 'activity 6', 'activity 7', 'activity 8'],
    }
  }

  render(){
    return (
      <div className='browse-activity-list'>
        <ul>
          {this.state.activities.map((activity) => {
            return <ActivityListItem activity={activity}/>
          })}
        </ul>
      </div>
    )
  }

}

export default ActivityList;