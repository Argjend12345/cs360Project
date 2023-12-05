import React from 'react'
import Head from 'next/head';
import Router  from 'next/router';
import Styles from '../../stylesheets/homepage.module.scss';
import Styles1 from '../../stylesheets/buttonComponent.module.scss';

function removeEmployee() {

    const cancel = () => {
        Router.push('/admin/adminHome');    
    }

    function removeEmployee()
    {
        removeEmployeeById(1);
    }
    
  return (
        <React.Fragment>
        <Head>
        <title>Remove Employee</title>
        </Head>

        <div style={{textAlign: "center"}}>
            <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
            <h2>Remove Employee</h2>
        </div>

        <div className={Styles.contact}>
            <input type="text" placeholder='UserId'/>
        </div>

        <div onClick={removeEmployee} style={{textAlign: "center"}}>
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

const removeEmployeeById = async (id) => {
    try {
      const response = await axios.put(
        'http://localhost:8080/employee/' + id,
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

export default removeEmployee