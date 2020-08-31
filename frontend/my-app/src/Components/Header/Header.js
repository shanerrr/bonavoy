import React from 'react';

import Navigation from '../Navigation/Navigation';
import '../../styling/style.css';


function Header(){
    return(
        <header className="border-b p-3 justify-between items-center">
            {/* <span className= "font-bold">
            PlaceHolder
            </span> */}
            <Navigation/>
        </header>
    )
}

export default Header;