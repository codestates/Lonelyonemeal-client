import React, { Component } from 'react'
import axios from 'axios'

function MyInfo(props) {
  return(
    <aside className='my-info-container'>
      <div className='my-pic'></div>
      <div className='my-name'></div>
      <div className='my-email'></div>
      <div className='my-password'></div>
    </aside>
  );
}

export default MyInfo;