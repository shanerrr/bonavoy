import React from 'react';

import './ActivityListItem.css';

class ActivityListItem extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
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
