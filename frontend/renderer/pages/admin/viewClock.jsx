import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/dropdown.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/table.module.scss';

function viewClock() {

  // Return button
  const returnButton = () => {
      Router.push('/admin/adminHome');    
  }

  // Hide / unhide styles
  const [hidden, setHidden] = useState(false);
  const showStyle = {
      display: hidden ? '' : 'none'
  }

  // Employees
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Bruce Watson', clockIn: '7:00', clockOut: '5:00', hoursWorked: '10'},
    { id: 2, name: 'Candace Hill', clockIn: '7:00', clockOut: '2:00', hoursWorked: '8'},
    { id: 3, name: 'Peter Yan', clockIn: '9:00', clockOut: '5:00', hoursWorked: '8'},
    { id: 4, name: 'Jane Doe', clockIn: '9:00', clockOut: '5:00', hoursWorked: '8'},
    { id: 5, name: 'Steve Smith', clockIn: '9:00', clockOut: '1:00', hoursWorked: '4'},
    { id: 6, name: 'Ryan Ortega', clockIn: '1:00', clockOut: '9:00', hoursWorked: '8'},
    { id: 7, name: 'Tim Dunlap', clockIn: '5:00', clockOut: '9:00', hoursWorked: '4'},
    { id: 8, name: 'Marco Gonzalez', clockIn: '5:00', clockOut: '9:00', hoursWorked: '4'},
    { id: 9, name: 'Kenny Salcedo', clockIn: '5:00', clockOut: '9:00', hoursWorked: '4'},
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Dropdown menu
  const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
  ];
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  const selectQuestion = (question) => {
      setSelectedOption(question);
      setIsOpen(false);
      setHidden(true)
  };
    
  return (
      <React.Fragment>
      <Head>
      <title>View Clock In / Clock Out Times</title>
      </Head>

      <button onClick={returnButton} className={`${Styles1.button}`} style={{left: "0"}}>
        Return
      </button>

      <div style={{textAlign: "center"}}>
          <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
          <h2>View Clock In / Clock Out Times</h2>

          <div className={Styles.dropdown}>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedOption || 'Select a day'}
          </button>
          {isOpen && (
            <ul className={Styles.dropdownMenu}>
              {days.map((day, index) => (
                <li key={index} onClick={() => selectQuestion(day)}>
                  {day}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <table className={`${Styles2.table}`} style={showStyle}>
          <thead>
          <tr>
              <th className={`${Styles2.th}`}>Name</th>
              <th className={`${Styles2.th}`}>Clock In</th>
              <th className={`${Styles2.th}`}>Clock Out</th>
              <th className={`${Styles2.th}`}>Hours Worked</th>
          </tr>
          </thead>
          <tbody>
          {employees.map((employee) => (
              <tr key={employee.id}>
              <td className={`${Styles2.td}`}>{employee.name}</td>
              <td className={`${Styles2.td}`}>{employee.clockIn}</td>
              <td className={`${Styles2.td}`}>{employee.clockOut}</td>
              <td className={`${Styles2.td}`}>{employee.hoursWorked}</td>
              </tr>
          ))}
          </tbody>

      </table>
      </React.Fragment>
  )
}

export default viewClock