import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import logo from './logo.svg';
//import './App.css';
// import Main from './Components/Main'

// import CounterExample from './Components/CounterExample'
import Map from './Components/Map/Map';
import TripList from './Components/TripList/TripList';
import Account from './Components/Account/Account';
import Homepage from './Components/Homepage/Homepage'
import MiddleMain from './Components/MiddleMain/MiddleMain'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/pages/HomePage/Home';

function App() {
  return (
    <Router>
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


    </Router>

  );
}

export default App;
