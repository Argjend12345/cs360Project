import React, { useState }  from 'react'
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';
import Styles2 from '../../stylesheets/dropdown.module.scss';
import ButtonStyle from '../../stylesheets/loadButton.module.scss';
import axios from 'axios'
import { AES256Encryption } from '../../components/AES256Encryption';
import { SHA256Hashing } from '../../components/SHA256Hashing';

function editEmployee() {

  //Encoding pass & hash
  const encrypter = new AES256Encryption();
  const hasher = new SHA256Hashing();

  //Button loading
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError]     = useState(false);

  //Storing employee data from get request
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [name, setName]                 = useState('');
  const [hourlyPay, setHourlyPay]       = useState('');
  const [employeeId, setEmployeeId]     = useState('');

  //Used to keep track of selected inputs
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednseday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  // Role functions
  const selectRole = (role) => {setSelectedRole(role);setIsOpen(false);};
  const roles = ['Employee', 'Admin', 'Accountant',];
  // Dropdown functions
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {setIsOpen(!isOpen);};

  const submitHandler = async () => {
    try {
        setIsLoading(true);
        let isAuthenticated = false;

        if(document.getElementById('content2').style.display === 'none' && document.getElementById('content1').style.display === 'none')
        {
          isAuthenticated = await getEmployeeById(employeeId);
        }else{
          if(document.getElementById('content2').style.display === 'none' && document.getElementById('content3').style.display === 'none')
          {
            //Hash password, then encrypt and pass to backend. 
            const hashedPass = hasher.hash(password);//Password Hashing
            const encryptedPass = encrypter.encrypt(hashedPass);//Password Encryption
            setPassword(encryptedPass);

            isAuthenticated = await editEmployee();
          }else{
            if(document.getElementById('content2').style.display === 'inline')
            {
              isAuthenticated = await updateClientShifts();
            }
          }
        }

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


                if(document.getElementById('content2').style.display === 'none' && document.getElementById('content1').style.display === 'none')
                {
                  document.getElementById('content3').style.display='none';
                  document.getElementById('content1').style.display='inline';
                }else{
                  if(document.getElementById('content2').style.display === 'none' && document.getElementById('content3').style.display === 'none')
                  {
                    document.getElementById('content1').style.display='none';
                    document.getElementById('content2').style.display='inline';
                  }else{
                    if(document.getElementById('content2').style.display === 'inline')
                    {
                      Router.push('/admin/adminHome');
                    }
                  }
                }
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

  function updateClientShifts()
  {
      if (monday)
      {
        handleClientShifts(1, employeeId);
      }
      if(tuesday)
      {
        handleClientShifts(2, employeeId);
      }
      if(wednseday)
      {
        handleClientShifts(3, employeeId);
      }
      if(thursday)
      {
        handleClientShifts(4, employeeId);
      }
      if(friday)
      {
        handleClientShifts(5, employeeId);
      }
      if(saturday)
      {
        handleClientShifts(6, employeeId);
      }
      if(sunday)
      {
        handleClientShifts(7, employeeId);
      }

      return true;
  }

  const getEmployeeById = async (employeeId) => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMTg3NDc5MiwiZXhwIjoxNzAxOTEwNzkyfQ.GnXPwd_i4T0ex-QuB-Mh8v8awM6F5DmELmZuSnh7dec'; // Replace with your actual token
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
      setPassword("password");//Won't be setting the users password 
      setSelectedRole(response.data.role);
      setHourlyPay(response.data.hourlyPay);
      
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
            Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMTg3NDc5MiwiZXhwIjoxNzAxOTEwNzkyfQ.GnXPwd_i4T0ex-QuB-Mh8v8awM6F5DmELmZuSnh7dec'
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

  return (
    <React.Fragment>
      <Head>
        <title>Edit Employee</title>
      </Head>

        <div style={{textAlign: "Left"}}>
          <button onClick={(e) =>Router.push('/admin/adminHome')} className={`${Styles1.button}`}>
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
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className={Styles.contact}>
            <input type="text" placeholder='Hourly Pay' value={hourlyPay} onChange={(e) => setHourlyPay(e.target.value)}/>
          </div>
          <div style={{textAlign: 'center'}}>   
            <button id="submitB" onClick={submitHandler} className={`${ButtonStyle.button} ${isLoading ? ButtonStyle.loader : ''} ${isSuccess ? ButtonStyle.success : ''} ${isError ? ButtonStyle.error : ''}`}>
              {isSuccess ? 'Success' : isError ? 'Error' : 'Submit'}
            </button>
          </div>
        </div>

        <div id="content2" style={{display: 'none'}}>
          <h2>Select Employee Shifts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px' }}>
                <input type="checkbox" onChange={() => setMonday(true)}/>
                Monday
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px' }}>
                <input type="checkbox" onChange={() => setTuesday(true)}/>
                Tuesday
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px' }}>
                <input type="checkbox" onChange={() => setWednesday(true)}/>
                Wednesday
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px' }}>
                <input type="checkbox" onChange={() => setThursday(true)}/>
                Thursday
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px' }}>
                <input type="checkbox" onChange={() => setFriday(true)}/>
                Friday
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px' }}>
                <input type="checkbox" onChange={() => setSaturday(true)}/>
                Saturday
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px' }}>
                <input type="checkbox" onChange={() => setSunday(true)}/>
                Sunday
              </label>
            </div>
            <br></br>
            <div style={{textAlign: 'center'}}>   
              <button id="submitB" onClick={submitHandler} className={`${ButtonStyle.button} ${isLoading ? ButtonStyle.loader : ''} ${isSuccess ? ButtonStyle.success : ''} ${isError ? ButtonStyle.error : ''}`}>
                {isSuccess ? 'Success' : isError ? 'Error' : 'Submit'}
              </button>
            </div>
          </div>
        </div>

      </div>

    </React.Fragment>
  )
}

const handleClientShifts = async (shiftId, employeeId) =>
{
  try {
    const response = await axios.post(
      'http://localhost:8080/employee/' +employeeId+ '/shifts/' +shiftId+ '/update',
      {
        id:"0",
        shiftId: shiftId, 
        clockIn: '00:00:00',
        clockOut: '00:00:00',
        scheduled: true,
      },
      {
        headers: {
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMTg3NDc5MiwiZXhwIjoxNzAxOTEwNzkyfQ.GnXPwd_i4T0ex-QuB-Mh8v8awM6F5DmELmZuSnh7dec'
          //ipcRenderer.sendSync('getToken')
        }
      }
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
    // Handle error...
  }
};

export default editEmployee