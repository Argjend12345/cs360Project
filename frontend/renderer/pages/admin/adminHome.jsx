import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Router  from 'next/router';

function adminHome() {

  const logOut = async () => {
    try {
        Router.push('/loginPage');    
    }
    catch (error) {
      console.error(error);
    }
  }

  const addEmployee = async () => {
    try {
        Router.push('/admin/addEmployee');    
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Admin View</title>
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
        <h1>Hello Admin!</h1>

        <button onClick={(addEmployee)} className={`${Styles1.button}`} style={{padding: "20px", marginLeft: "10px"}}>
          Add Employee
        </button>

        <button className={`${Styles1.button}`} style={{padding: "20px", marginLeft: "10px"}}>
          Edit Employee
        </button>

        <button className={`${Styles1.button}`} style={{padding: "20px", marginLeft: "10px"}}>
          Remove Employee
        </button>
      </div>

      <div style={{textAlign: "center"}}>
        <button className={`${Styles1.button}`} style={{padding: "40px", marginTop: "10px"}}>
          View Clock In / Clock Out Times
        </button>
      </div>
    </React.Fragment>
  );
};

export default adminHome;
