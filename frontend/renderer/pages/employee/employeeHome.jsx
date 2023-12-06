import React, { useState } from 'react';
import Head from 'next/head';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Router  from 'next/router';
import ButtonStyle from '../../stylesheets/loadButton.module.scss';

function employeeHome() {

  // Routing
  const logOut = () => {
    Router.push('/loginPage');    
  }
  const viewPaystub = () => {
    Router.push('/employee/viewPaystubs');    
  }
  const securityQuestions = () => {
    Router.push('/employee/securityQuestions');    
  }

  //Button loading
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError]     = useState(false);
  const handleClock = () => {
    setTimeout(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
      }, 2000);
    }, 0);
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

        <button id="submitB" onClick={handleClock} className={`${ButtonStyle.button} ${isLoading ? ButtonStyle.loader : ''} ${isSuccess ? ButtonStyle.success : ''} ${isError ? ButtonStyle.error : ''}`} style={{height: "100px", width: "200px"}}>
        {isSuccess ? 'Success' : isError ? 'Error' : 'Clock In / Clock Out'}
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