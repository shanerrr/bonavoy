import React from 'react';

import './Spinner.css';


class Spinner extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    return (
      <div className='spinner-container'>
        <div className='loader'>
          <img src={'./images/spinner.svg'}/>
        </div>
      </div>
    )
  }

}

export default Spinner;