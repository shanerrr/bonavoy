import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// import logo from './logo.svg';
import './App.css';
// import Main from './Components/Main'
// import CounterExample from './Components/CounterExample'
import Map from './Components/Map';
import TripList from './Components/TripList';
import Account from './Components/Account';
// import MiddleMain from './Components/MiddleMain'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/pages/Home';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
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
