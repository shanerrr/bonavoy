import React from 'react'
import landingMP4 from "../landingMP4.mp4"
import Navbar from './Navbar/Navbar'

function Homepage(){
    return(
        <div>
            <Navbar/>
            <video autoPlay loop muted
            style={{
                position: "absolute",
                width: "100%",
                left: "50%",
                top: "50%",
                height: "100%",
                objectFit: "cover",
                transform: "translate(-50%, -50%)",
                zIndex: "-1"
                }}>
                <source src={landingMP4} type="video/mp4"/>
            </video>
        </div>
    )
}

export default Homepage;