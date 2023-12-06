import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../stylesheets/homepage.module.scss';
import Styles1 from '../stylesheets/buttonComponent.module.scss';
import Styles2 from '../stylesheets/dropdown.module.scss';
import ButtonStyle from '../stylesheets/loadButton.module.scss';

function forgotPassword() {

  // Return button
  const returnButton = () => {
      Router.push('/loginPage');    
  }

  // Dropdown menu
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState(null);
  const questions = [
    'What is your favorite dish?',
    'In what city were you born?',
    'Who is your favorite musician?',
    "What is your mother's maiden name?",
    "What is the name of your favorite teacher?",
  ];
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  const selectQuestion = (question) => {
      setSelectedOption1(question);
      setIsOpen(false);
  };

  // Hide / unhide styles
  const [hidden, setHidden] = useState(false);
  const hideStyle = {
      display: hidden ? 'none' : ''
  };
  const showStyle = {
      display: hidden ? '' : 'none'
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
          setHidden(true)
        }, 2000)
      }, 3000);
    }, 0);
  }

  const changePage = () => {
    setTimeout(() => {
      setIsLoading(true);
      setIsSuccess(false);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setHidden(true)
          Router.push('/changePassword');    
        }, 2000)
      }, 3000);
    }, 0);
  }

  return (
<React.Fragment>
    <Head>
      <title>Forgot Password</title>
    </Head>

    <button onClick={returnButton} className={`${Styles1.button}`} style={{left: "0"}}>
      Return
    </button>

    <div style={{textAlign: "center"}}>
      <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
      <h2>Forgot Your Password?</h2>

        <div className={Styles.contact}>
          <input type="text" placeholder='Username' style={hideStyle}/>
        </div>
      
      <div className={Styles2.dropdown}>
          <button className="dropdown-toggle" onClick={toggleDropdown} style={showStyle}>
            {selectedOption1 || 'Select a question'}
          </button>
          {isOpen && (
            <ul className={Styles2.dropdownMenu}>
              {questions.map((question, index) => (
                <li key={index} onClick={() => selectQuestion(question)}>
                  {question}
                </li>
              ))}
            </ul>
          )}
        </div>

      <div className={Styles.contact} style={showStyle}>
        <input type="text" placeholder='Answer'/>
      </div>

      <button id="submitB" onClick={handleSubmit} className={`${ButtonStyle.button} ${isLoading ? ButtonStyle.loader : ''} ${isSuccess ? ButtonStyle.success : ''} ${isError ? ButtonStyle.error : ''}`} style={hideStyle}>
        {isSuccess ? 'Success' : isError ? 'Error' : 'Submit'}
      </button>

      <button id="submitB" onClick={changePage} className={`${ButtonStyle.button} ${isLoading ? ButtonStyle.loader : ''} ${isSuccess ? ButtonStyle.success : ''} ${isError ? ButtonStyle.error : ''}`} style={showStyle}>
        {isSuccess ? 'Success' : isError ? 'Error' : 'Submit'}
      </button>
    </div>
    </React.Fragment>  
  )
}

export default forgotPassword