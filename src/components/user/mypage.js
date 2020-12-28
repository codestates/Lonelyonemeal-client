import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import MainHeader from '../main/main-header'
import Result from './result'
import MyInfo from './myinfo'
import MyMenu from './mymenu.js'

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResultModalOpen: false,
      isLogin: true,
      userInfo: {
        username: '',
        foodImg: '',
        foodName: '',
        link: ''
      }
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  /* 유저정보 불러오는 함수 */
  getUserInfo() {
    axios({
      method: 'GET',
      url: 'https://onemeal.site/users/userinfo',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then(res => res.data.userInfo)
    .then(res => {
      this.setState({
        username: res.username,
        foodImg: res.foodImg,
        foodName: res.foodname,
        link: res.link
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  /* 로그아읏 함수 */
  handleLogout() {
    axios({
      method: 'POST',
      url: 'https://onemeal.site/users/logout',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
  }




  render() {
    const { isResultModalOpen, isLogin, userInfo } = this.state;
    return(
      <div className='my-wrap'>
        <MainHeader isLogin={isLogin} username={userInfo.username} loginModalHandler={this.loginModalHandler} />
        <div className='my-container'>
          <MyInfo userInfo={userInfo}/>
          <MyMenu/>
        </div>
        <button className='my-logout-button' onClick={this.handleLogout}>로그아웃</button>
        { isResultModalOpen ? <Result /> : null }
      </div>
    );
  }
}



export default withRouter(Mypage);
