import React from 'react';

import './ActivityListItem.css';

class ActivityListItem extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.activity.name) return null
    return (
      <div className="browse-activity-list-item">
        <img className="activity-list-photo"/>
        <h2 className="activity-list-name">
          {this.props.activity.name}
        </h2>
      </div>
    )
  }

}

export default ActivityListItem;
