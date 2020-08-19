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
import Homepage from './Components/Homepage'
import MiddleMain from './Components/MiddleMain'
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
          <Planner/>
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
