import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/dropdown.module.scss';
import axios from 'axios'

const { ipcRenderer } = require('electron');

function addEmployee() {

  // Cancel button
  const cancel = () => {
      Router.push('/admin/adminHome');    
  }
  
  // Store employee data
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [name, setName]   = useState('');
  const [hourlyPay, setHourlyPay]   = useState('');

  // Store days of the week
  const [selectedDays, setSelectedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  // Checkbox function
  const handleCheckboxChange = (day) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }));
  };

  // Role functions
  const selectRole = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
  };
  const roles = [
    'Employee',
    'Admin',
    'Accountant',
  ];

  // Hide / unhide styles
  const [hidden, setHidden] = useState(false);
  const hideStyle = {
    display: hidden ? 'none' : ''
  };
  const showStyle = {
    display: hidden ? '' : 'none'
  }

  // Dropdown functions
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Submit button function
  function getInput() {
    setHidden(true)
    handleEmployeePost(name, username, password, selectedRole, hourlyPay);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Add Employee</title>
      </Head>

      <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
        <h2>Add Employee Information</h2>
      
        <div className={Styles2.dropdown}>
          <button style={hideStyle} className="dropdown-toggle" onClick={toggleDropdown}>
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
          <input type="text" id="name" placeholder='Name' onChange={(e) => setName(e.target.value)} style={hideStyle}/>
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} style={hideStyle}/>
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} style={hideStyle}/>
        </div>

        <div className={Styles.contact}>
          <input type="text" placeholder='Hourly Pay'onChange={(e) => setHourlyPay(e.target.value)} style={hideStyle}/>
        </div>

        <div style={{textAlign: "center"}}>
          <h2 style={showStyle}>Select Employee's Shifts for the Week</h2>
          {Object.keys(selectedDays).map((day) => (
            <div style={showStyle} key={day}>
              <label style={showStyle}>
                <input
                  type="checkbox"
                  checked={selectedDays[day]}
                  onChange={() => handleCheckboxChange(day)}
                />
                {day}
              </label>
        </div>
        ))}
        <div>
          <p style={showStyle}>Selected Days: {Object.keys(selectedDays).filter((day) => selectedDays[day]).join(', ')}</p>
        </div>
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

export default addEmployee