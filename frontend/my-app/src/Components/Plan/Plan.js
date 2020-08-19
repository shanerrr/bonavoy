import React from 'react';

import './style.css';
import StopList from '../StopList/StopList';
import PlanOverview from '../PlanOverview/PlanOverview';
import AddStop from '../AddStop/AddStop';

class Plan extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            stops:[]
        }
    }

    render(){
        return (
            <div className='plan'>
                <h1 style={{'text-align':'center', 'color':'darkgrey', 'font-size':'20px'}}>Plan name</h1>
                <AddStop></AddStop>
                <StopList stops={this.props.stops}/>
                <PlanOverview></PlanOverview>
            </div>
        )
    }
}

export default Plan;
