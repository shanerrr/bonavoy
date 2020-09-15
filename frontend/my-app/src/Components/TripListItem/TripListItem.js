import React from 'react';
import './style.css';
class TripListItem extends React.Component {
    constructor(props){
        super(props);
        this.editTrip = this.editTrip.bind(this);
    }

    // open up planner with all trip information loaded 
    editTrip(e){
        console.log(e.target);
    }

    render(){ 
        return(
            <div className="trip-list-item" onClick={this.editTrip}>
                <h2 className="trip-name">{this.props.trip}</h2>
            </div>
        )
    }
}

export default TripListItem;