import React from 'react'
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';

function retrievePaystub() {

    const cancel = async () => {
        Router.push('/accountant/accountantHome');    
    }

  return (
    <React.Fragment>
    <Head>
    <title>Retrieve Paystub</title>
    </Head>

    <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
        <h2>Retrieve Paystub</h2>
    </div>

    <div className={Styles.contact}>
        <input type="text" placeholder='UserId'/>
    </div>

    <div style={{textAlign: "center"}}>
        <button className={`${Styles1.button}`}>
            Submit
        </button>

        <button onClick={cancel} className={`${Styles1.button}`}>
            Cancel
        </button>
    </div>
    </React.Fragment>
  )
}

export default retrievePaystub