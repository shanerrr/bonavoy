import React from 'react';

import './style.css';
import StopInfo from '../StopInfo/StopInfo';


class StopListItem extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            open:false,
        }
        this.toggleItem = this.toggleItem.bind(this);
    }

    toggleItem(e){
        this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div>
                <div onClick={(e)=>this.toggleItem(e)} className='collapsed'>
                    {this.props.stopName}
                </div>
                    {this.state.open ? 
                        (<StopInfo/>) 
                        : null
                    }

            </div>
        );
    }

}

export default StopListItem;
