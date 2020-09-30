import React, { useState } from 'react';
// import '../../App.css';
import './SecondPage.css';
import AutoComplete from '../Autocomplete/Autocomplete';
function SecondPage() {

  // const [click, setClick] = useState(true);
  // const handleClick1 = () => {
  //   if (!click) setClick(true)
  // }
  // const handleClick = () => {
  //   if (click) setClick(false)
  // }
    return (
      <>
        <div className="secondpage-container" id="secondpage">
        {/* <div className={click ? 'secondpage-container' :'secondpage-container diff'} id="secondpage">
          <div className="sortitems">
          <div className="explore-nav">
              <ul className="explore-menu">
                  <li className='explore-plan-navlink' onClick={handleClick1}>Plan your Trip</li>
                  <li className='explore-plan-navlink explorebtn' onClick={handleClick}>Explore Places</li>
              </ul>
          </div>
          <div className="planitems-container">
            <div className="planitems">
              <AutoComplete className="planstyling starting" id="planAutoS" msg="STARTING FROM"/>
              <AutoComplete className="planstyling destination" id="planAutoD" msg="DESTINATION"/>
            </div>
          </div>
          </div>
      </div> */}

        </div>
      </>
    );
  }
  
  export default SecondPage;
  