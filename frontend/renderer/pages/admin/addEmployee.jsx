import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/dropdown.module.scss';

function addEmployee() {

  const cancel = () => {
      Router.push('/admin/adminHome');    
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedRole] = useState(null);

  const roles = [
    'Employee',
    'Admin',
    'Accountant',
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectRole = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Add Employee</title>
      </Head>

      <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
        <h2>Add Employee Information</h2>
      
        <div className={Styles2.dropdown}>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedOption || 'Select a role'}
          </button>
          {isOpen && (
            <ul className={Styles2.dropdownMenu} style={{position: "absolute"}}>
              {roles.map((role, index) => (
                <li key={index} onClick={() => selectRole(role)}>
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Name'/>
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Address'/>
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Username'/>
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Password'/>
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Hourly Pay'/>
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

export default addEmployee