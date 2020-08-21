import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import logo from './logo.svg';
//import './App.css';
// import Main from './Components/Main'

import './style.css'

// import CounterExample from './Components/CounterExample'
import Map from './Components/Map/Map';
import TripList from './Components/TripList/TripList';
import Account from './Components/Account/Account';
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/pages/HomePage/Home';

function App() {
  return (
    <Router>
      <div className='page'>
        <Navbar/>
        <Switch>
          <Route exact path="/account">
            <Account/>
          </Route>
          <Route exact path="/planner">
            <Map/>
          </Route>
          <Route exact path="/trips">
            <TripList/>
          </Route>
          <Route path="/" exact component={Home}>
            {/* <Homepage/>
            <MiddleMain/> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
