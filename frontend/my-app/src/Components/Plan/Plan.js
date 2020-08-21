import React from 'react';

import './style.css';
import StopList from '../StopList/StopList';
import PlanOverview from '../PlanOverview/PlanOverview';
import AddStop from '../AddStop/AddStop';

class Plan extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='plan'>
                <h1 style={{'textAlign':'center', 'color':'darkgrey', 'fontSize':'20px'}}>Jerome's Trip</h1>
                <AddStop addStop={this.props.addStop}></AddStop>
                <StopList stops={this.props.stops}/>
                <PlanOverview></PlanOverview>
            </div>
        )
    }
}

export default Plan;
