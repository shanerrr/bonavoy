import React from 'react';

import './style.css';
import BrowseActivities from '../BrowseActivities/BrowseActivities';

class ActivitiesList extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            showModal:false
        }
        this.activityList = ['activity 1', 'activity 2', Math.random(), 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd'];
    }


    render(){
        return (
            <div>
                <ul className='activity-list'>
                    {this.activityList.map((item, key) => {
                        return <li 
                                className='activity-list-item' 
                                key={key}
                              >{item}</li>
                    })}
                </ul>
                <BrowseActivities/>
            </div>
        )
    }
}

export default ActivitiesList;
