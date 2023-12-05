import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Router  from 'next/router';

function employeeHome() {

  const logOut = async () => {
    try {
        Router.push('/loginPage');    
    }
    catch (error) {
      console.error(error);
    }
  }

  const alertUser = async () => {
    try {
        window.alert("Clocked in")   
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Employee View</title>
      </Head>

      <div style={{textAlign: "right"}}>
        <button onClick={logOut} className={`${Styles1.button}`}>
          Log out
        </button>
        </div>

      <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
      </div>

      <div style={{textAlign: "center"}}>
        <h1>Hello Employee!</h1>

        <button onClick={(alertUser)}className={`${Styles1.button}`} style={{padding: "20px", marginLeft: "10px"}}>
          Clock In / Clock Out
        </button>

        <button className={`${Styles1.button}`} style={{padding: "20px", marginLeft: "10px"}}>
          View Paystub
        </button>
      </div>

    </React.Fragment>
  );
};

export default employeeHome;
