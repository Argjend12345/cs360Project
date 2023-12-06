import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../stylesheets/homepage.module.scss';
import Styles1 from '../stylesheets/buttonComponent.module.scss';
import ButtonStyle from '../stylesheets/loadButton.module.scss';

function changePassword() {

    // Return button
  const returnButton = () => {
    Router.push('/loginPage');    
}

//Button loading
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError]     = useState(false);

const handleSubmit = () => {
  setTimeout(() => {
    setIsLoading(true);
    setIsSuccess(false);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        Router.push('/loginPage');    
      }, 2000)
    }, 3000);
  }, 0);
}
  return (
    <React.Fragment>
      <Head>
        <title>Change Password</title>
      </Head>

      <button onClick={returnButton} className={`${Styles1.button}`} style={{left: "0"}}>
        Return
      </button>

      <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
        <h2>Change Password</h2>

        <div className={Styles.contact}>
          <input type="password" placeholder='Password'/>
        </div>

        <button id="submitB" onClick={handleSubmit} className={`${ButtonStyle.button} ${isLoading ? ButtonStyle.loader : ''} ${isSuccess ? ButtonStyle.success : ''} ${isError ? ButtonStyle.error : ''}`}>
          {isSuccess ? 'Success' : isError ? 'Error' : 'Submit'}
        </button>
      </div>
    </React.Fragment>  
  )
}

export default changePassword