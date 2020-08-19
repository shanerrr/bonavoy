import React from 'react';

import '../styling/style.css';
import StopList from './StopList';
import PlanOverview from './PlanOverview';
import AddStop from './AddStop';

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
