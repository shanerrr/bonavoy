import React from 'react'
import {MenuItems} from './MenuItems'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button/Button'

class Navbar extends React.Component {

    state = {clicked: false}
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    render() {
        return (
            <nav className="NavbarItems mainfont ">
                <h1 className="navbar-logo"><FontAwesomeIcon
                    icon={faRoute}
                    /> travellers </h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    {this.state.clicked ? <FontAwesomeIcon icon={faTimes}/> : <FontAwesomeIcon icon={faBars}/> }
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.className} href={item.link}>
                                    {item.label}
                                </a>
                            </li>
                        )
                    })}
                    
                </ul>
                <Button>Log In</Button>
            </nav>
        )
    }
    
}

export default Navbar