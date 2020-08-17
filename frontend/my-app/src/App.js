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
import Map from './Components/Map';
import TripList from './Components/TripList';
import Account from './Components/Account';
import './styling/style.css';


function App() {
  return (
    <div className='content'>
      <Router>
        <Header/> 
        <body className='body'>
        <Switch> 
          <Route path="/account">
            <Account className='body'/>
          </Route>
          <Route path="/planner">
            <Map/>
          </Route>
          <Route path="/trips">
            <TripList/>
          </Route>
          <Route path="/">
            <div>
              <h1>landing page</h1>
            </div>
          </Route>
        </Switch>
        </body>
      </Router>
    </div>


  );
}

export default App;
