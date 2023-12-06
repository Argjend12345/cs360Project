import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/dropdown.module.scss';
import ButtonStyle from '../../stylesheets/loadButton.module.scss';

function securityQuestions() {

  // Return button
  const returnButton = () => {
      Router.push('/employee/employeeHome');    
  }

  // Dropdown menu
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

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
      setSelectedQuestion(question);
      setIsOpen(false);
  };

  //Button loading
  //Button loading
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError]     = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          Router.push('/employee/employeeHome');    
      }, 1700);
    }, 0);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Security Questions</title>
      </Head>

      <button onClick={returnButton} className={`${Styles1.button}`} style={{left: "0"}}>
        Return
      </button>

      <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
        <h2>Security Question</h2>
                
        <div className={Styles2.dropdown}>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedQuestion || 'Select a question'}
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

        <div className={Styles.contact}>
          <input type="text" name="Send" placeholder='Answer'/>
        </div>

        <button id="submitB" onClick={handleSubmit} className={`${ButtonStyle.button} ${isLoading ? ButtonStyle.loader : ''} ${isSuccess ? ButtonStyle.success : ''} ${isError ? ButtonStyle.error : ''}`}>
          {isSuccess ? 'Success' : isError ? 'Error' : 'Submit'}
        </button>
      </div>
    </React.Fragment>  
  )
}

export default securityQuestions