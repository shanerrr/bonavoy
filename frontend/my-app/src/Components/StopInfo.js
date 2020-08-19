import React from 'react';
import ActivitiesList from './ActivitiesList';

class StopInfo extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='expanded'>
                <div>
                    Hotel
                </div>
                <ActivitiesList/>
            </div>

        )
    }
}

export default StopInfo;
