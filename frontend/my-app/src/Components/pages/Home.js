import React from 'react';
import '../../App.css';
import Cards from '../Cards/Cards';
import FrontPage from '../FrontPage/FrontPage';
import SecondPage from '../SecondPage/SecondPage'
// import Footer from '../Footer';

function Home(props) {

  return (
    <>
      <FrontPage username={props.username}/>
      <SecondPage username={props.username}/>
      {/* <Footer /> */}
    </>
  );
}

export default Home;
