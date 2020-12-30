import React, { Component } from 'react'
import axios from 'axios'
import { render } from '@testing-library/react';

function Recomend() {
  return (
    <div className="saveResult">
      <div className="saveresultImg"></div>
      <div className="saveresultEx">
        <div className="explainName">계란볶음밥</div>
        <div className="block"></div>
        <div className="explainData">2020-12-15</div>
      </div>
    </div>
  )
}

class MyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    /*
    fetch('https://onemeal.site/users/userinfoup', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: newUsername })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res.data);
      this.props.getUserInfo();
      alert('업로드 성공!');
    })
    .catch(err => {
      console.log(err);
      alert('업로드 실패..');
    })
    */
  }

  render() {
    return (
      <div className='my-menu-wrap'>
        <div className="menuInt">추천받은 음식</div>
        <div className="block" />
        < div className="saveResultbox" >
          <Recomend /><Recomend /><Recomend /><Recomend />
        </div >
      </div>
    );
  }
}

export default MyMenu;