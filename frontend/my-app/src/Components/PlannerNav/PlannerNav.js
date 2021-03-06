import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './PlannerNav.css';

function PlannerNav() {
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
    if (window.innerWidth <= 1200) {
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
      <nav className={click ? navbar ? 'navbarP active' : 'navbarP active': navbar ? 'navbarP active' : 'navbarP' }>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <i className = 'fas fa-route'/>
            traveller
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'navbar-x fas fa-times' : 'fas fa-bars'} />
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
                to='/planner'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Trip Planner
              </Link>
            </li>
            <div className="flexbox">
              <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  LOG IN
                </Link>
              </li>

              <li>
                <Link
                  to='/signup'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  SIGN UP
                </Link>
              </li>
            </div>
          </ul>
          <div className="btns">
            <span className="btn-span">
            {button && <Button buttonStyle='btn--outline'>LOG IN</Button>}
            </span>
            <span className="btn-span">
            {button && <Button buttonStyle='btn--primary'>SIGN UP</Button>}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default PlannerNav;
