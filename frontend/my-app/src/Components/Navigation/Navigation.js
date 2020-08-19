import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function Navigation(){
    const [showMenu, setShowMenu] = useState(false);
    return(
        <nav>
            <Link to="/explore" className="">Explore</Link>
            {/* <span className="text-xl">
                <FontAwesomeIcon
                    icon={faBars}
                    />
            </span> */}
            <Link to="/settings" className="">Settings</Link>
        </nav>
    )
}

export default Navigation;