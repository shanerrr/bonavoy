import React from 'react';
import Popup from "reactjs-popup";

class BrowseActivities extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Popup 
                trigger={<button>Add Activities</button>}
                modal
                closeOnDocumentClick
                contentStyle={{'width':'90%', 'height':'90%', 'cursor':'default', 'zIndex':999989}}
            >
                browse and add accomodation, tourist attractions, activities, and eats here!
                <div><button>add accomodation</button></div>
                <div><button>add activity</button></div>
            </Popup>
        )
    }
}

export default BrowseActivities;