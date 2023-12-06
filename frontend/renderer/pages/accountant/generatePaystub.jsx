import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/alert.module.scss'

function generatePaystub() {

    // Cancel button
    const returnButton = () => {
        Router.push('/accountant/accountantHome');    
    }

    // Alert method
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
    <title>Generate Paystub</title>
    </Head>

    <button onClick={returnButton} className={`${Styles1.button}`} style={{left: "0"}}>
      Return
    </button>

    <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
        <h2>Generate Paystub</h2>

        {isVisible && (
        <div className={`${Styles2.alert}`}>
          Paystub generated!
        </div>
      )}
    </div>

    <div className={Styles.contact}>
        <input type="text" placeholder='UserId'/>
    </div>

    <div style={{textAlign: "center"}}>
        <button onClick={(alertUser)} className={`${Styles1.button}`}>
            Submit
        </button>
    </div>
    </React.Fragment>
  )
}

export default generatePaystub