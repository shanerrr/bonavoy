import React from 'react';

import './style.css';
class ActivityView extends React.Component {

  constructor(props){
    super(props);
    this.addActivity = this.addActivity.bind(this);
    this.openLink = this.openLink.bind(this);
  }

  addActivity(){
    this.props.addToStop(this.props.activityBeingViewed,this.props.selectedStop);
  }

  openLink(){
    const url = this.props.activityBeingViewed.url;
    window.open(url, '_blank');
  }

  render(){
    // TODO: set variables for name, address and cost here;
    const activityBeingViewed = this.props.activityBeingViewed;
    let websiteButtonClass = 'open-website';
    let websiteButtonText = 'Visit website';
    if(activityBeingViewed !== null && activityBeingViewed.kinds.includes('accomodations')){
      websiteButtonClass = 'book-accomodation';
      websiteButtonText = 'Book on booking.com'
    }
    return (
      <div className="activity-view"> 
      { activityBeingViewed ? 
        <div>
          <div className="activity-overview-container">
            <div className="activity-info-container activity-view-photo"></div>
            <div className="activity-info-container activity-view-info">
              <div className="text-containter">
                <h2 className="acitivity-name">{activityBeingViewed.name}</h2>
                <h3 className="activity-address">{activityBeingViewed.address.road}, {activityBeingViewed.address.postcode}</h3>
                <button className="btn add-activity" onClick={this.addActivity}><i class="fas fa-plus"></i> Add to trip</button>
                {activityBeingViewed.url ? <button className={`btn ${websiteButtonClass}`} onClick={this.openLink}>{websiteButtonText}</button> : null}
              </div>
            </div>
          </div>
          <div className="activity-info-container activity-view-description">
            google reviews here
          </div>
        </div>
        : 
        <div className="activity-view-placeholder">
          <h2 style={{'color':'grey'}}>click on an activity to get an overview!</h2>
        </div>
      } 
      </div>
    )
  }

}

export default ActivityView;
