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
import MNavbar from './Components/MNavbar/MNavbar';
// import PlannerNav from './Components/PlannerNav/PlannerNav'
import axios from 'axios'
import Home from './Components/pages/Home';

function App() {
  const [data, setData] = useState(null);

  useEffect( () => {
    getUser();
  }, []);

  const doLogout = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: "http://localhost:4000/api/logout",
    }).then(window.location.reload());
  };

  const getUser = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: "http://localhost:4000/api/getUser",
    }).then((res) => setData(res.data));
  };

  return (    
    <Router>
      <Switch>

        <Route exact path="/">
          <MNavbar data={data} logoutfunction={doLogout} />
          <Home data={data}/>
        </Route>

        <Route exact path="/account">
          <Account/>
        </Route>

        <Route exact path="/planner">
          <MNavbar/>
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
