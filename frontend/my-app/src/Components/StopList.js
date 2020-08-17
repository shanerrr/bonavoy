import React from 'react';
import { 
    CollapsibleComponent,
    CollapsibleHead,
    CollapsibleContent
} from "react-collapsible-component";
import StopListItem from './StopListItem';

class StopList extends React.Component {
    
    constructor(props){
        super(props);

    }

    render(){
        const items = this.props.stops.map((item) => {return <StopListItem stops={item}></StopListItem>});
        return(
            <div className='stop-list'>
                <CollapsibleComponent>
                    {items}
                </CollapsibleComponent>   
            </div>
        )
    }

}
export default StopList;