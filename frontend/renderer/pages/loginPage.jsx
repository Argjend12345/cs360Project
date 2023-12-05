import React, {useState} from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Styles from '../stylesheets/homepage.module.scss';
import Styles1 from '../stylesheets/buttonComponent.module.scss';
import axios from 'axios'
import Router from 'next/router';
import { AES256Encryption } from '../components/AES256Encryption';
import { SHA256Hashing } from '../components/SHA256Hashing';

const { ipcRenderer } = require('electron');

function loginPage() {

  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError]     = useState(false);
  const encrypter = new AES256Encryption();
  const hasher = new SHA256Hashing();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      //Hash password, then encrypt and pass to backend. 
      const hashedPass = hasher.hash(password);//Password Hashing
      const encryptedPass = encrypter.encrypt(hashedPass);//Password Encryption
      const isAuthenticated = await handleLogin(username, encryptedPass);
      
      if (isAuthenticated) {
        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
          setIsError(false);
          setTimeout(() => {

            const role = ipcRenderer.sendSync('getRole');

            if(role == "ROLE_ADMIN")
            {
              Router.push('admin/adminHome');
            }else{
              if(role == "ROLE_EMPLOYEE")
              {
                Router.push('employee/employeeHome');
              }else{
                if(role == "ROLE_ACCOUNTANT")
                {
                  Router.push('accountant/accountantHome');
                }
              }
            }
         }, 1800);
        }, 2000);
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

  const logIn = async () => {
    try {
        Router.push('admin/adminHome');
        //Router.push('employee/employeeHome');
        //Router.push('accountant/accountantHome');
    }
    catch (error) {
    console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Joe's Hardware</title>
      </Head>
      
      <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
      </div>

      <div style = {{textAlign: "center"}}>
        <h1>Welcome Please Login!</h1>
      </div>

      <div className={Styles.contact}>
        <input type="text" id = "address" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
      </div>

      <br></br>

      <div className={Styles.contact}>
        <input type="password" id = "address" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>

      <div style={{paddingBottom: "15px"}}></div>

      <div style={{textAlign: 'center'}}>   
        <button id="submitB" onClick={logIn} className={`${Styles1.button} ${isLoading ? Styles1.loader : ''} ${isSuccess ? Styles1.success : ''} ${isError ? Styles1.error : ''}`}>
          {isSuccess ? 'Success' : isError ? 'Error' : 'Submit'}
        </button> 
      </div>

    </React.Fragment>
  )
}

const handleLogin = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8080/auth', {
      user: username,
      pass: password
    });
    
    const { token, role } = response.data; // Extract token and role separately & house in background.js
    ipcRenderer.send('setToken', token);
    ipcRenderer.send('setRole', role);
    
    return true;
  } catch (error) {
    console.log(error);
    return false;
    // Handle login error...
  }
};

export default loginPage;

