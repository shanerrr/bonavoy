import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {FaBars, FaTimes, FaRoute} from 'react-icons/fa'
import { Button } from '../Button/Button'
import './Navbar.css'
import { IconContext } from 'react-icons/lib'

function Navbar() {
    const[click, setClick] = useState(false);
    const[button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMenuMobile = () => setClick(false)
    const showButton = () => {
        if(window.innerWidth <=960) {
            setButton(false)
        } else{
            setButton(true)
        }
    };

    useEffect(() => {
        showButton();
    }, [])

    window.addEventListener('resize', showButton)
    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
            <div className="navbar">
                <div className="navbar-container container">
                    <Link to='/' className="navbar-logo" onClick={closeMenuMobile}>
                        <FaRoute className="navbar-icon"/>
                        traveller
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        {click ? <FaTimes/> : <FaBars/>}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMenuMobile}>
                                Explore
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMenuMobile}>
                                Trips
                            </Link>
                        </li>
                        <li className="nav-btn">
                            {button ? (
                                <Link to="/signup" className="btn-link">
                                    <Button buttonStyle='btn-outline'>Log In</Button>
                                </Link>
                            ): (
                                <Link to="/signup" className="btn-link" onClick={closeMenuMobile}>
                                    <Button buttonStyle='btn-outline' buttonSize='btn-mobile'>Log In</Button>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            </IconContext.Provider>
        </>
    );
}

export default Navbar
