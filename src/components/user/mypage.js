import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import MainHeader from '../main/main-header'
import MyInfo from './myinfo'
import MyMenu from './mymenu.js'
import Share from './share'

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResultModalOpen: false,
      userInfo: {
        username: '',
        email: '',
        password: '',
        userImg: null
      }
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidUpdate(prevState, prevProps) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(userInfo) {
      if(this.state.userInfo.username !== userInfo.username ||
      this.state.userInfo.password !== userInfo.password ||
      this.state.userInfo.userImg !== userInfo.userImg) {
        this.getUserInfo();
      }
    }
  }

  /* 유저정보 불러오는 함수 */
  getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({
      userInfo: {
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        userImg: userInfo.userImg
      }
    })
    if(!userInfo) {
      console.log('userInfo라는 로컬스토리지 없다~');
    }
  }

  /* 로그아읏 함수 */
  handleLogout() {
    axios({
      method: 'POST',
      url: 'https://onemeal.site/users/logout',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then(() => {
      this.props.handleLogin();
      localStorage.clear();
    })
    .then(() => {
      alert('성공적으로 로그아웃 되었습니다!')
      this.props.history.push("/main");
    })
  }

  render() {
    const { isResultModalOpen, userInfo } = this.state;
    return(
      <div className='my-wrap'>
        <MainHeader isLogin={this.props.isLogin} username={userInfo.username} loginModalHandler={this.loginModalHandler} />
        <div className='my-container'>
          <MyInfo userInfo={userInfo} getUserInfo={this.getUserInfo}/>
          <MyMenu/>
        </div>
        <button className='my-logout-button' onClick={this.handleLogout}>로그아웃</button>
        { isResultModalOpen ? <Share /> : null }
      </div>
    );
  }
}



export default withRouter(Mypage);
