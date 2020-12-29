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

  componentDidMount() {
    this.getUserInfo();
  }

  /* 유저정보 불러오는 함수 */
  async getUserInfo() {
    let userInfo = await axios.get('https://onemeal.site/users/userinfo', { withCredentials: true });
    console.log(userInfo);
    this.setState({
      userInfo: {
        username: userInfo.data.data.username,
        email: userInfo.data.data.email,
        password: userInfo.data.data.password,
        userImg: userInfo.data.data.userImg
      }
    });
  }

  /* 로그아읏 함수 */
  handleLogout() {
    axios({
      method: 'POST',
      url: 'https://onemeal.site/users/logout',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    this.props.handleLogout();
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
        { isResultModalOpen ? <Result /> : null }
      </div>
    );
  }
}



export default withRouter(Mypage);
