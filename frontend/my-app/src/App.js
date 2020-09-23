import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import Map from './Components/Map/Map';
import TripList from './Components/TripList/TripList';
import Account from './Components/Account/Account';
import Navbar from './Components/MNavbar/MNavbar'
// import PlannerNav from './Components/PlannerNav/PlannerNav'
import Home from './Components/pages/Home';
import UserStore from './stores/UserStore';

function App() {

  useEffect(() => {
    try{
      let res = fetch('/isLoggedIn', {
        method: 'post',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });
      let result = res.json();
      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;

      } else{
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch(e){
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    } 
  }, []);

  async function doLogout() {

    try{
      let res = await fetch('/logout', {
        method: 'post',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });
      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';

      }
    } catch(e){
      console.log(e);
    } 

  }

  
  return (    
    <Router>
      <Switch>

        <Route exact path="/">
          <Navbar username={UserStore.username} logoutfunction={doLogout}/>
          <Home/>
        </Route>

        <Route exact path="/account">
          <Account/>
        </Route>

        <Route exact path="/planner">
          <Navbar/>
          <Map/>
        </Route>

        <Route exact path="/trips">
          {/* <Navbar/> */}
          <TripList/>
        </Route>

      </Switch>


    </Router>

  );
}

export default App;
