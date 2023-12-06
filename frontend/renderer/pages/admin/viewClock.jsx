import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/dropdown.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/table.module.scss';

function viewClock() {

    // Cancel button
    const cancel = () => {
        Router.push('/admin/adminHome');    
    }

    // Hide / unhide styles
    const [hidden, setHidden] = useState(false);
    const hideStyle = {
        display: hidden ? 'none' : ''
    };
    const showStyle = {
        display: hidden ? '' : 'none'
    }

    function getInput()
  {
    setHidden(true)
    getClockTimes();
  }

  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', clockIn: '9:00', clockOut: '5:00', hoursWorked: '8'},
    { id: 1, name: 'Jane Smith', clockIn: '9:00', clockOut: '5:00', hoursWorked: '8'},
  ]);

  const [isOpen, setIsOpen] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState(null);

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectQuestion = (question) => {
        setSelectedOption1(question);
        setIsOpen(false);
    };
    
  return (
        <React.Fragment>
        <Head>
        <title>View Clock In / Clock Out Times</title>
        </Head>

        <div style={{textAlign: "center"}}>
            <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
            <h2>View Clock In / Clock Out Times</h2>

            <div className={Styles.dropdown}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              {selectedOption1 || 'Select a day'}
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

        <div style={{textAlign: "center"}}>
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

const getClockTimes = async (id) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/employee/shifts',
        {
          headers: {
            Authorization: 'Bearer ' + ''
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

export default viewClock