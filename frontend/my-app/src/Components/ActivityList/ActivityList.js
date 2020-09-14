import React from 'react';

class ActivityList extends React.Component {

  

  constructor(props){
    super(props);
    this.state = {
      activities:['activity 1', 'activity 2', 'activity 3'],
    }
  }

  render(){
    return (
      <div className='activity-list'>
        <ul>
          {this.state.activities.map((activity) => {
            return <li className="activity-list-item">{activity}</li>
          })}
        </ul>
      </div>
    )
  }

}

export default ActivityList;