import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/dropdown.module.scss';
import axios from 'axios'

const { ipcRenderer } = require('electron');

function editEmployee() {

  const cancel = () => {
      Router.push('/admin/adminHome');    
  }
  //Storing employee data
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [name, setName]   = useState('');
  const [hourlyPay, setHourlyPay]   = useState('');

  const roles = [
    'Employee',
    'Admin',
    'Accountant',
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectRole = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  function getInput()
  {
      getEmployeeById(1);
      //handleEmployeePost(name, username, password, selectedRole, hourlyPay);
  }


  return (
    <React.Fragment>
      <Head>
        <title>Edit Employee</title>
      </Head>

      <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
        <h2>Edit Employee Information</h2>
      
        <div className={Styles2.dropdown}>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedRole || 'Select a role'}
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
          <input type="text" id="name" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Hourly Pay'onChange={(e) => setHourlyPay(e.target.value)}/>
        </div>
      </div>

      <div style={{textAlign: 'center'}}>   
        <button onClick={getInput} className={`${Styles1.button}`}>
            Submit
        </button>

        <button onClick={cancel} className={`${Styles1.button}`}>
            Cancel
        </button>
      </div>
      </React.Fragment>
  )
}

const getEmployeeById = async (id) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/employee/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMTgwMjEzMCwiZXhwIjoxNzAxODM4MTMwfQ.o4FZzHSgpXi9WRnYEiKafoXbKNytf0jZMwdVfT4cM7Q'
            //ipcRenderer.sendSync('getToken')
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
  

const handleEmployeePost = async (name, username, password, selectedRole, hourlyPay) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/employee',
      {
        name: name, 
        username: username,
        password: password,
        role: selectedRole,
        hourlyPay: hourlyPay
      },
      {
        headers: {
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMTgwMDc3NywiZXhwIjoxNzAxODM2Nzc3fQ.nliPugzeVFhPFmpUtDHYH1-fNUuUroM6vtwZCw6x1I0'
          //ipcRenderer.sendSync('getToken')
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

export default editEmployee