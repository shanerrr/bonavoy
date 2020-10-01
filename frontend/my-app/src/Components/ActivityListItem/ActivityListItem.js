import React from 'react';

import './ActivityListItem.css';

class ActivityListItem extends React.Component {
  constructor(props){
    super(props);
    this.selectActivity = this.selectActivity.bind(this);
  }

  selectActivity(e){
    this.props.selectActivity(this.props.index);
    fetch('https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyADmNaqiMxBc5EhbkJCZOaWAAkVEvUQsOk&photoreference=CkQ0AAAAeEiOhbVE-DsGW4e7rYhAZTYbtp5tIhsSeZx7kCOGgQAy7ZsMvBOUYyVw9k9_1PiYliQUtqkrnDBATF2yTzX6yRIQYcidZdTNAk5CzVnxlBba1RoUZgTQcRiKCjy81QKLP7xKH-xEceU&maxheight=800&maxwidth=800')
      .then((response) => console.log(response));
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
