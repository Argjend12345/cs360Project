import React, { useState }  from 'react'
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import ButtonStyle from '../../stylesheets/loadButton.module.scss';
import axios from 'axios'

const { ipcRenderer } = require('electron');

function removeEmployee() {

  //Button loading
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError]     = useState(false);
  //House employeeId
  const [employeeId, setEmployeeId]     = useState('');

  const submitHandler = async () => {
    try {
        setIsLoading(true);
        let isAuthenticated = removeEmployeeById(employeeId);
        if (isAuthenticated) {
          setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setIsError(false);
            setTimeout(() => {
              //If successful ~ loading content2 and hiding content1 
                setIsLoading(false);
                setIsError(false);
                setIsSuccess(false);
                Router.push('/admin/adminHome');
            }, 1000);
          }, 1000);
        } else {
          setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(false);
            setIsError(true);
            setTimeout(() => {
              setIsError(false);
            }, 3000);
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
  const removeEmployeeById = async (id) => {
    try {
      const response = await axios.delete(
        'http://localhost:8080/employee/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + ipcRenderer.sendSync('getToken')
          }
        }
      );
  
      console.log(response.data);
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
      // Handle error...
    }
  };
  
  return (
        <React.Fragment>
        <Head>
        <title>Remove Employee</title>
        </Head>

        <div style={{textAlign: "Left"}}>
          <button onClick={(e) =>Router.push('/admin/adminHome')} className={`${Styles1.button}`}>
            Return
          </button>
        </div>

        <div style={{textAlign: "center"}}>
            <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
            <h2>Remove Employee</h2>
        </div>
        
        <div className={Styles.contact}>
            <input type="text" placeholder='UserId' onChange={(e) => setEmployeeId(e.target.value)}/>
        </div>

        <div style={{textAlign: "center"}}>
           <button id="submitB" onClick={submitHandler} className={`${ButtonStyle.button} ${isLoading ? ButtonStyle.loader : ''} ${isSuccess ? ButtonStyle.success : ''} ${isError ? ButtonStyle.error : ''}`}>
              {isSuccess ? 'Success' : isError ? 'Error' : 'Submit'}
            </button>
        </div>
        </React.Fragment>
  )
}

export default removeEmployee