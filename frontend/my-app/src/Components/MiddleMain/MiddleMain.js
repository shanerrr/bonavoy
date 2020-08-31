import React from 'react'
import Typical from 'react-typical'
import Autocomplete from '../Autocomplete/Autocomplete'
import './style.css';

function MiddleMain(){
    return(

        <div className="min-h-screen flex flex-col items-center justify-center">
            <p className="text-5xl mainfont">
                <Typical loop={Infinity} wrapper="b" steps={[
                    'Where to?', 10000,
                    'How about Canada?', 5000,
                    'Maybe Australlia?', 5000
                ]}/>  
            </p>
            <Autocomplete id='middle-main'/>

        </div>
    )
}

export default MiddleMain;