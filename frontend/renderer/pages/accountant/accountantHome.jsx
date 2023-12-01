import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function accountantHome() {
  return (
    <React.Fragment>
      <Head>
        <title>Accountant View</title>
      </Head>

      <div style={{textAlign: "center"}}>
        <img style={{padding:"0px 0px 0px 0px", height: "200px", width:"350px"}}src="/images/logo.png"/>
      </div>

      <div style={{textAlign: "center"}}>
        <h1>This is the ACCOUNTANT Page!</h1>
      </div>

    </React.Fragment>
  );
};

export default accountantHome;
