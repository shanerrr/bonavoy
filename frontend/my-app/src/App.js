import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Map from './Components/Map/Map';
import TripList from './Components/TripList/TripList';
import Account from './Components/Account/Account';
import Navbar from './Components/MNavbar/MNavbar';
// import PlannerNav from './Components/PlannerNav/PlannerNav'
import axios from 'axios'
import Home from './Components/pages/Home';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getUser();
  }, []);
  const doLogout = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: "http://localhost:4000/api/logout",
    }).then(window.location.reload());
  };

  async function getUser() {
    axios({
      method: 'GET',
      withCredentials: true,
      url: "http://localhost:4000/api/getUser",
    }).then(async (res) => await setData(res.data.username));
  };
 
  return (    
    <Router>
      <Switch>

        <Route exact path="/">
          <Navbar username={data} logoutfunction={doLogout} />
          <Home username={data}/>
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
