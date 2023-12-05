import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/dropdown.module.scss';

function securityQuestions() {
    const cancel = () => {
        Router.push('/employee/employeeHome');    
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);


    const questions = [
        'In what city were your born?',
        'What is your favorite dish?',
        'Who is your favorite musician?',
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectQuestion1 = (question) => {
        setSelectedOption1(question);
        setIsOpen(false);
    };

    const selectQuestion2 = (question) => {
      setSelectedOption2(question);
      setIsOpen(false);
  };

  const selectQuestion3 = (question) => {
    setSelectedOption3(question);
    setIsOpen(false);
};

  return (
    <React.Fragment>
      <Head>
        <title>Security Questions</title>
      </Head>

      <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
        <h2>Security Questions</h2>
                
        <div className={Styles2.dropdown}>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedOption1 || 'Select a question'}
          </button>
          {isOpen && (
            <ul className={Styles2.dropdownMenu}>
              {questions.map((question, index) => (
                <li key={index} onClick={() => selectQuestion1(question)}>
                  {question}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Answer'/>
        </div>

        <div className={Styles2.dropdown}>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedOption2 || 'Select a question'}
          </button>
          {isOpen && (
            <ul className={Styles2.dropdownMenu}>
              {questions.map((question, index) => (
                <li key={index} onClick={() => selectQuestion2(question)}>
                  {question}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Answer'/>
        </div>

        <div className={Styles2.dropdown}>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedOption3 || 'Select a question'}
          </button>
          {isOpen && (
            <ul className={Styles2.dropdownMenu}>
              {questions.map((question, index) => (
                <li key={index} onClick={() => selectQuestion3(question)}>
                  {question}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Answer'/>
        </div>

      </div>

      <div style={{textAlign: 'center'}}>   
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

export default securityQuestions