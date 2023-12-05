import React from 'react'
import Head from 'next/head';
import Router  from 'next/router';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';

function viewPaystub() {

    const cancel = async () => {
        Router.push('/employee/employeeHome');    
    }
    
  return (
    <React.Fragment>
    <Head>
    <title>View Paystubs</title>
    </Head>

    <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
        <h2>View Paystubs</h2>
        <button onClick={cancel} className={`${Styles1.button}`}>
            Cancel
        </button>
    </div>

    </React.Fragment>
  )
}

export default viewPaystub