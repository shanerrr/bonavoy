import React from 'react'
import Geocoder from 'react-mapbox-gl-geocoder'
import './index.css'
 
const mapAccess = {
    mapboxApiAccessToken: "pk.eyJ1IjoibmVpbHpvbiIsImEiOiJja2R2NGRleGYyZnoyMnpxcWhzbHA1bXo4In0.bYlefpiV4C7Ir183j8OG3g"
}
 
class AutoComplete extends React.Component {
    state = {
        viewport: {}
    }
 
    onSelected = (viewport, item) => {
        this.setState({viewport});
        console.log('Selected: ', item)
    }
 
    render() {
        const {viewport} = this.state
 
        return (
            <div>
                <Geocoder class
                    {...viewport}{...mapAccess} onSelected={this.onSelected} hideOnSelect={true} updateInputOnSelect={true}
                    
                />
            </div>
        )
    }
}
export default AutoComplete