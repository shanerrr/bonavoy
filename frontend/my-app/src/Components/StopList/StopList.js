import React from 'react';

import './style.css';
import StopListItem from '../StopListItem/StopListItem';


class StopList extends React.Component {
    
    constructor(props){
        super(props);
    }

    render(){
        const items = this.props.stops.map((item) => {return <StopListItem stops={item}></StopListItem>});
        return(
            <div className='stop-list'>
                {items}
            </div>
        )
    }

}

export default StopList;
