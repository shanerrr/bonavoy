import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import Map from './Components/Map';
import TripList from './Components/TripList';
import Account from './Components/Account';
import Navbar from './Components/MNavbar/MNavbar'
import Home from './Components/pages/Home';

function App() {

  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <Navbar/>
          <Home/>
        </Route>

        <Route exact path="/account">
          <Account/>
        </Route>

        <Route exact path="/planner">
          <Map/>
        </Route>

        <Route exact path="/trips">
          <TripList/>
        </Route>

      </Switch>


    </Router>

  );
}

export default App;
