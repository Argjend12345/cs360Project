import React, { useState }  from 'react'
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/dropdown.module.scss';
import ButtonStyle from '../../stylesheets/loadButton.module.scss';
import axios from 'axios'

function editEmployee() {


    //Button loading
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError]     = useState(false);

    const submitHandler = async () => {
      try {
          setIsLoading(true);
          let isAuthenticated = getEmployeeById(employeeId);

          /*

          if(document.getElementById('content2').style.display === 'none' && document.getElementById('content1').style.display === 'none')
          {
            isAuthenticated = getEmployeeById(employeeId);
          }

          if(document.getElementById('content1').style.display === 'none' && document.getElementById('content3').style.display === 'none')
          {
            isAuthenticated = editEmployee();
          }

          if(document.getElementById('content1').style.display === 'inline')
          {
            //isAuthenticated = shift
            //Update shifts. 
          }

          */
          
          
          if (isAuthenticated) {
            setTimeout(() => {
              setIsLoading(false);
              setIsSuccess(true);
              setIsError(false);
              setTimeout(() => {
                //If successful ~ loading content2 and hiding content1 
                
                  setIsLoading(false);
                  setIsError(false);
                  setIsSuccess(false);
                  //Hide content3, show content1
                  document.getElementById('content3').style.display='none';
                  document.getElementById('content1').style.display='inline';

                  //Router.push('/admin/adminHome');
             }, 1000);
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

    const cancel = () => {
        Router.push('/admin/adminHome');    
    }

    const [selectedRole, setSelectedRole] = useState(null);
    const [username, setUsername]         = useState('');
    const [password, setPassword]         = useState('');
    const [name, setName]                 = useState('');
    const [hourlyPay, setHourlyPay]       = useState('');
    const [employeeId, setEmployeeId]     = useState('');
    const [shifts, setShifts] = useState([]);


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
  const roles = ['Employee', 'Admin', 'Accountant',];

  // Dropdown functions
  const [isOpen, setIsOpen] = useState(false);

    const getEmployeeById = async (employeeId) => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMTgzNTg2MywiZXhwIjoxNzAxODcxODYzfQ.xAQPQPjvjx4JaeKF0NpkmnpvbtZrJ4sq5fMLi8Cq680'; // Replace with your actual token
        const response = await axios.get(
          `http://localhost:8080/employee/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        //After receiving employee by ID populate form data to match existing employee data.
        setName(response.data.name);
        setUsername(response.data.username);
        setPassword(response.data.password);
        setSelectedRole(response.data.role);
        setHourlyPay(response.data.hourlyPay);
        setShifts(response.data.shifts);

        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const editEmployee = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/employee/' +employeeId+ '/edit',
          {
            name: name, 
            username: username,
            password: password,
            role: selectedRole,
            hourlyPay: hourlyPay
          },
          {
            headers: {
              Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMTgyODgyOSwiZXhwIjoxNzAxODY0ODI5fQ.cQOICdfLTDo-jhN34Sk8ZjY6h17LSMoRkceMLDKJ9nY'
              //ipcRenderer.sendSync('getToken')
            }
          }
        );
        console.log(response.data);
    
        //If successful ~ loading content2 and hiding content1 
        document.getElementById('content1').style.display='none';
        document.getElementById('content2').style.display='inline';
    
        return true;
      } catch (error) {
        console.log(error);
        return false;
        // Handle error...
      }
    };



    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  return (
        <React.Fragment>
        <Head>
        <title>Edit Employee</title>
        </Head>

        <div style={{textAlign: "Left"}}>
          <button onClick={cancel} className={`${Styles1.button}`}>
            Return
          </button>
        </div>

        <div style={{textAlign:'center'}}>
          <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
        </div>
       
        <div id='content3'>
          <div style={{textAlign: "center"}}>       
              <h2>Edit Employee</h2>
          </div>

          <div className={Styles.contact}>
              <input type="text" placeholder='UserId' onChange={(e) => setEmployeeId(e.target.value)}/>
          </div>

          <div style={{textAlign: "center"}}>
          <button id="submitB" onClick={submitHandler} className={`${ButtonStyle.button} ${isLoading ? ButtonStyle.loader : ''} ${isSuccess ? ButtonStyle.success : ''} ${isError ? ButtonStyle.error : ''}`}>
              {isSuccess ? 'Success' : isError ? 'Error' : 'Submit'}
            </button>
          </div>
        </div>

        <div style={{textAlign: "center"}}>

        <div id="content1" style={{display:'none'}}>
          <h2>Edit Employee Information</h2>
        
          <div className={Styles2.dropdown}>
            <button style={{width:"100px", height: "30px"}} className="dropdown-toggle" onClick={toggleDropdown}>
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
            <input type="text" id="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className={Styles.contact}>
            <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className={Styles.contact}>
            <input type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className={Styles.contact}>
            <input type="text" placeholder='Hourly Pay' value={hourlyPay} onChange={(e) => setHourlyPay(e.target.value)}/>
          </div>
          <div style={{textAlign: 'center'}}>   
            <button  onClick={editEmployee} className={`${Styles1.button}`} style={{height: "50px", width: "100px"}}>
              Submit
            </button> 
          </div>
        </div>

        <div id="content2" style={{textAlign: "center", display:'none'}}>
          <h2>Select Employee's Shifts for the Week</h2>
          {Object.keys(selectedDays).map((day) => 
          (
            <div key={day}>
              <label>
                <input type="checkbox" checked={selectedDays[day]} onChange={() => handleCheckboxChange(day)}/>
                {day}
              </label>
            </div>
          ))}
          <div>
            <p>Selected Days: {Object.keys(selectedDays).filter((day) => selectedDays[day]).join(', ')}</p>
            <button  onClick={submitHandler} className={`${Styles1.button}`} style={{height: "50px", width: "100px"}}>
              Submit
            </button> 
          </div>
        </div>

      </div>

        </React.Fragment>
  )
}


export default editEmployee