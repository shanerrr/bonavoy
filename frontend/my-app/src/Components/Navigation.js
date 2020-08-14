import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Navigation(){
    const [showMenu, setShowMenu] = useState(false);
    return(
        <nav>
            <span className="text-xl">
                <FontAwesomeIcon
                    icon={faBars}
                    />
            </span>
        </nav>
    )
}

export default Navigation;