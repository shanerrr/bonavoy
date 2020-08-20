import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);

  const handleClick = () => {
    setClick(!click);
    if (!click){
      document.body.style.overflow = 'hidden';
    } else{
      document.body.style.overflow = 'unset';
    }
  }
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener('resize', showButton);

  const transNav = () => {
    if(window.scrollY >= 80) {
        setNavbar(true);
    }
    else{
        setNavbar(false)
    }
  }
  window.addEventListener('scroll', transNav)

  return (
    <>
      <nav className={click ? navbar ? 'navbar active' : 'navbar active': navbar ? 'navbar active' : 'navbar' }>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <i className = 'fas fa-route'/>
            traveller
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {/* <ul className={navbar ? click ? 'nav-menu active' : 'nav-menu': click ? 'nav-menu active past' : 'nav-menu'}> */}
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Explore
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/trip-planner'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Trip Planner
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li> */}

            <li>
              <Link
                to='/signup'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                LOG IN
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>LOG IN</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
