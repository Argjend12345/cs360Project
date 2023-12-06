import React, { useState } from 'react';
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/table.module.scss';

function retrievePaystub() {

    // Return button
    const returnButton = () => {
        Router.push('/accountant/accountantHome');    
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
  }

  // Day functions
  const day = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  const selectRole = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  // Store employee's information
  const [employees, setEmployees] = useState([
    { id: 1, payWeek: '12/3/23 - 12/10/23', name: 'Joe Smith', hourlyPay: 20, hoursWorked: 50, grossPay: 1000, percentDeduction: 10, netPay: 900},
    { id: 2, payWeek: '11/26/23 - 12/3/23', name: 'Joe Smith', hourlyPay: 20, hoursWorked: 40, grossPay: 800, percentDeduction: 10, netPay: 720},
    { id: 3, payWeek: '11/19/23 - 11/26/23', name: 'Joe Smith', hourlyPay: 20, hoursWorked: 40.50, grossPay: 810, percentDeduction: 10, netPay: 729},
    { id: 4, payWeek: '11/12/23 - 11/19/23', name: 'Joe Smith', hourlyPay: 20, hoursWorked: 38.25, grossPay: 765, percentDeduction: 10, netPay: '688.50'},
    { id: 5, payWeek: '11/5/23 - 11/12/23', name: 'Joe Smith', hourlyPay: 20, hoursWorked: 39, grossPay: 780, percentDeduction: 10, netPay: 702},
  ]);

  return (
    <React.Fragment>
    <Head>
    <title>Retrieve Paystubs</title>
    </Head>

    <button onClick={returnButton} className={`${Styles1.button}`} style={{left: "0"}}>
      Return
    </button>

    <div style={{textAlign: "center"}}>
      <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
      <h2>Retrieve Paystubs</h2>

      <div className={Styles.contact}>
          <input type="text" placeholder='UserId' style={hideStyle}/>
      </div>

      <table className={`${Styles2.table}`} style={showStyle}>
          <thead>
          <tr>
              <th className={`${Styles2.th}`}>Pay Week</th>
              <th className={`${Styles2.th}`}>Name</th>
              <th className={`${Styles2.th}`}>Hourly Pay</th>
              <th className={`${Styles2.th}`}>Hours Worked</th>
              <th className={`${Styles2.th}`}>Gross Pay</th>
              <th className={`${Styles2.th}`}>Percent Deduction</th>
              <th className={`${Styles2.th}`}>Net Pay</th>
          </tr>
          </thead>
          <tbody>
          {employees.map((employee) => (
              <tr key={employee.id}>
              <td className={`${Styles2.td}`}>{employee.payWeek}</td>
              <td className={`${Styles2.td}`}>{employee.name}</td>
              <td className={`${Styles2.td}`}>{employee.hourlyPay}</td>
              <td className={`${Styles2.td}`}>{employee.hoursWorked}</td>
              <td className={`${Styles2.td}`}>${employee.grossPay}</td>
              <td className={`${Styles2.td}`}>{employee.percentDeduction}%</td>
              <td className={`${Styles2.td}`}>${employee.netPay}</td>
              </tr>
          ))}
          </tbody>
      </table>

      <button onClick={getInput} className={`${Styles1.button}`} style={hideStyle}>
          Submit
      </button>
    </div>
    </React.Fragment>
  )
}

export default retrievePaystub