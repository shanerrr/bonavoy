import React from 'react';

import './ActivityListItem.css';

class ActivityListItem extends React.Component {
  constructor(props){
    super(props);
    this.selectActivity = this.selectActivity.bind(this);
  }

  selectActivity(e){
    this.props.selectActivityBeingViewed(this.props.activityTypeIndex, this.props.activityIndex);
  }

  render(){
    if(!this.props.activity.name) return null // don't render activities without a name
    return (
      <div className={`browse-activity-list-item ${this.props.selected ? 'selected' : null}`} onClick={this.selectActivity}>
        <div className="activity-list-photo-container">  
          <img className='activity-list-photo' src={'https://fastly.4sqi.net/img/general/300x300/55785718_7IdPDiz7QMxSV-l_i40dwgTplfs1pHu6UkiMfLJplP0.jpg'/* this.props.imgSrc*/}/>
        </div>
        <h2 className="activity-list-name">
          {this.props.activity.name}
        </h2>
      </div>
    )
  }

}

export default ActivityListItem;
