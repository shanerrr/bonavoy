import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import logo from './logo.svg';
//import './App.css';
// import Main from './Components/Main'
import Header from './Components/Header'
// import CounterExample from './Components/CounterExample'
import Planner from './Components/Planner';
import TripList from './Components/TripList';
import Account from './Components/Account';


function App() {
  return (
    
    <Router>
      <Switch>

        <Route path="/account">
          <Account/>
        </Route>
        <Route path="/planner">
          <Planner/>
        </Route>
        <Route path="/trips">
          <TripList/>
        </Route>
        <Route path="/">
          <h1>landing page</h1>
        </Route>

      </Switch>
    </Router>

  );
}

export default App;
