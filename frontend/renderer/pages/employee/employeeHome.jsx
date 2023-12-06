import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/alert.module.scss';
import Router  from 'next/router';
import '../../stylesheets/alert.module.scss';
import securityQuestions from './securityQuestions';


function employeeHome() {

  const logOut = () => {
    Router.push('/loginPage');    
  }

  const viewPaystub = () => {
    Router.push('/employee/viewPaystubs');    
  }

  const securityQuestions = () => {
    Router.push('/employee/securityQuestions');    
  }

  const [isVisible, setIsVisible] = useState(false);

  const alertUser = () => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Employee View</title>
      </Head>

      {isVisible && (
        <div className={`${Styles2.alert}`}>
          You are clocked in /out!
        </div>
      )}

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

        <button onClick={(alertUser)}className={`${Styles1.button}`} style={{padding: "40px"}}>
          Clock In / Clock Out
        </button>

        <button onClick={(viewPaystub)} className={`${Styles1.button}`} style={{padding: "40px", marginLeft: "20px"}}>
          View Paystubs
        </button>
      </div>
      
      <div style={{textAlign: "center"}}>
        <button onClick={(securityQuestions)} className={`${Styles1.button}`} style={{padding: "40px", marginTop: "10px"}}>
          Change Security Question
        </button>
      </div>

    </React.Fragment>
  );
};

export default employeeHome;