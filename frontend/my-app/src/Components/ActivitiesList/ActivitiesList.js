import React from 'react';

import BrowseActivities from '../BrowseActivities/BrowseActivities';



class ActivitiesList extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            showModal:false
        }
        this.activityList = ['activity 1', 'activity 2', 'activity 3'];
    }


    render(){
        return (
            <div>
                <ul className='stop-list'>
                    {this.activityList.map((item) => {return <li className='stop-list-item'>{item}</li>})}
                </ul>

                <BrowseActivities/>
            </div>
        )
    }
}

export default ActivitiesList;
