import React from 'react';

import '../styling/style.css';
import StopList from './StopList';
import CollapsibleComponent from "react-collapsible-component";


class Plan extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='plan'>
                <h1 style={{'text-align':'center', 'color':'darkgrey'}}>Plan name</h1>
                <StopList stops={this.props.stops}/>
            </div>
        )
    }
}

export default Plan;
