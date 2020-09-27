import React from 'react';

import './ActivityListItem.css';

class ActivityListItem extends React.Component {
  constructor(props){
    super(props);
    this.selectActivity = this.selectActivity.bind(this);
  }

  selectActivity(e){
    this.props.selectActivity(this.props.index);
  }

  render(){
    if(!this.props.activity.name) return null // don't render activities without a name
    return (
      <div className={`browse-activity-list-item ${this.props.selected ? 'selected' : null}`} onClick={this.selectActivity}>
        <img className="activity-list-photo"/>
        <h2 className="activity-list-name">
          {this.props.activity.name}
        </h2>
      </div>
    )
  }

}

export default ActivityListItem;
