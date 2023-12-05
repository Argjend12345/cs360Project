import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router  from 'next/router';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';

function adminHome() {

  const logOut = async () => {
    Router.push('/loginPage');    
  }

  const addEmployee = async () => {
    Router.push('/admin/addEmployee');    
 }

  const editEmployee = async () => {
    Router.push('/admin/editEmployee');    
 }

  const removeEmployee = async () => {
    Router.push('/admin/removeEmployee');    
  }

  const viewClock = async () => {
    Router.push('/admin/viewClock');    
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

        <button onClick={(addEmployee)} className={`${Styles1.button}`} style={{padding: "30px", marginLeft: "10px"}}>
          Add Employee
        </button>

        <button onClick={(editEmployee)} className={`${Styles1.button}`} style={{padding: "30px", marginLeft: "10px"}}>
          Edit Employee
        </button>

        <button onClick={(removeEmployee)} className={`${Styles1.button}`} style={{padding: "30px", marginLeft: "10px"}}>
          Remove Employee
        </button>
      </div>

      <div style={{textAlign: "center"}}>
        <button onClick={(viewClock)} className={`${Styles1.button}`} style={{padding: "30px", marginTop: "10px"}}>
          View Clock In / Clock Out Times
        </button>
      </div>
    </React.Fragment>
  );
};

export default adminHome;