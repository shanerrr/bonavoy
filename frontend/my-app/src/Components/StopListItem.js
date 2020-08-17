import React from 'react';
import { 
    CollapsibleComponent,
    CollapsibleHead,
    CollapsibleContent
} from "react-collapsible-component";

class StopListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open:false
        }
        this.toggleItem = this.toggleItem.bind(this);
    }

    toggleItem(e){
        this.setState({open: !this.state.open})
    }

    render() {
        return (<div>
        <div onClick={(e)=>this.toggleItem(e)} className='collapsed'>
            idiot
        </div>
            {this.state.open ? (<div className='expanded'> {this.props.stops}</div>) : null}
        </div>);
    }
}


export default StopListItem;