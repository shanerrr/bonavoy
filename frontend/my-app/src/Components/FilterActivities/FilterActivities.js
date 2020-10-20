import React from 'react';

import './FilterActivities.css';

class FilterActivities extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      filters:[],
    }
  }

  componentDidMount(){
    console.log(this.props.filters)
  }

  render(){
    return (
      <div className='filter-activities'></div>
    )
  }

}

export default FilterActivities;