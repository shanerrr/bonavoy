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
                contentStyle={{'width':'90%', 'height':'90%', 'cursor':'default'}}
            >
               glgjsdfklsdjaklfjaskl;fjl;askjfkl;ajdfkl; 
            </Popup>
        )
    }
}

export default BrowseActivities;