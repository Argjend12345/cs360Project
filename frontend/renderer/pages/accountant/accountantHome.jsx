import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Router  from 'next/router';

function accountantHome() {

  const logOut = () => {
    Router.push('/loginPage');    
  }

  const generatePaystub = () => {
    Router.push('/accountant/generatePaystub');    
  }

  const retrievePaystub = () => {
    Router.push('/accountant/retrievePaystub');    
  }

  const payEmployee = () => {
    Router.push('/accountant/payEmployee');    
  }

  return (
    <React.Fragment>
      <Head>
        <title>Accountant View</title>
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

        <h1>Hello Accountant!</h1>
        <button onClick={generatePaystub} className={`${Styles1.button}`} style={{padding: "40px", marginLeft: "10px"}}>
          Generate Paystub
        </button>

        <button onClick={retrievePaystub} className={`${Styles1.button}`} style={{padding: "40px", marginLeft: "10px"}}>
          Retrieve Paystub
        </button>

        <button onClick={payEmployee} className={`${Styles1.button}`} style={{padding: "40px", marginLeft: "10px"}}>
          Pay Employee
        </button>
      </div>

    </React.Fragment>
  );
};

export default accountantHome;