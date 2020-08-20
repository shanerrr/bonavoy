import React, { useState } from 'react';

import Plan from '../Plan/Plan';
import './style.css';

class TravelPlanGroup extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div className='travel-group'>
                <Plan 
                    stops={this.props.stops}
                    addStop={this.props.addStop}     
                />
            </div>
        )
    }
}

export default TravelPlanGroup;