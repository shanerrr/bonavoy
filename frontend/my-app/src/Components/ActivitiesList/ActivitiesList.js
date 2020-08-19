import React from 'react';

import ReactModal from 'react-modal';


class ActivitiesList extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            showModal:false
        }
        this.activityList = ['item 1', 'item 2', 'item 3'];

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    handleOpenModal () {
        this.setState({ showModal: true });
    }
    
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render(){
        return (
            <div>
                <ul className='stop-list'>
                    {this.activityList.map((item) => {return <li className='stop-list-item'>{item}</li>})}
                </ul>
                <button onClick={this.handleOpenModal}>Trigger Modal</button>
                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className='modal'
                >
                    <p>Modal text!</p>
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            </div>
        )
    }
}

export default ActivitiesList;
