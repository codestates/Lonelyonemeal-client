import React, { Component } from 'react'
import logo from './img2/logo.png'
import github from './img2/github.png'
import google from './img2/google.png'
import { withRouter } from 'react-router-dom'

import x from './img2/X.png'
import Signup from './signup'

require('dotenv').config(); 

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      showSignupView: false,
      errorMessage: "",
      googleId: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.loginRequestHandler = this.loginRequestHandler.bind(this);
    this.handleSignupView = this.handleSignupView.bind(this);
    this.socialLoginHandler = this.githubLoginHandler.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  async githubLoginHandler() {
    console.log(`누가누가 먼저 실행되나 나는 githubLoginHandler 그리고 로컬스토리지에 ${JSON.parse(localStorage.getItem('userInfo'))}`) //************************************************* */
    let GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    window.location.assign(GITHUB_LOGIN_URL)
    let username = JSON.parse(localStorage.getItem('userInfo')).username
    this.props.loginHandler(username);
  }

  handleInputValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handleSignupView() {
    this.setState({ showSignupView: !this.state.showSignupView });
  }


  async loginRequestHandler() {
    const { email, password } = this.state;

    if (email === "" || password === "") {
      this.setState({
        errorMessage: "모든항목을 입력해주세요"
      })
    }
    else {
     fetch('https://onemeal.site/users/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({email: email , password : password})
      })
      .then(res => res.json())
      .then(res => {
        if(res.message === "hashPwd exists" || res.message === "Not authorized") {
          alert('존재하지 않는 사용자 이메일 혹은 비밀번호 입니다.')
        }
        else {
          this.getUserInfo();
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  /* 유저인포 불러오는 함수 */
  getUserInfo() {
    fetch('https://onemeal.site/users/userinfo', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      this.props.loginHandler(res.data.username);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {

    return (
      this.state.showSignupView ?
        <Signup handleSignupView={this.handleSignupView} loginModalHandler={this.props.loginModalHandler} /> :
        <div className="back">
          <div className='loginContainer'>
            <img className='X' src={x} onClick={this.props.loginModalHandler} />
            <div className="middleContainer">
              <img className="go" src={logo} alt="go" />
              <div className='block1' />
              <input
                className="inputBox"
                name='email'
                onChange={(e) => this.handleInputValue(e)}
                placeholder='이메일'
                type='text' />
              <div className='block' />
              <input
                className="inputBox"
                name='password'
                onChange={(e) => this.handleInputValue(e)}
                placeholder='비밀번호'
                type='password' />
              <div className='block' />
              <button className="button" onClick={this.loginRequestHandler}>로그인</button>
              <div className='block' />
              <div className="alert-box">{this.state.errorMessage}</div>
              <div className='block' />
              <span className="text">
                아직 아이디가 없으신가요?
              <span className='text2' onClick={this.handleSignupView}>회원가입</span>
              </span>
              <div className='block' />
              <div>
                <img className="github" src={github} alt="github" onClick={this.githubLoginHandler} />  <img className="google" src={google} alt="google" />
              </div>
            </div>
            <div className="ex">2021 Baegopujo all rights reserved.</div>
          </div>
        </div>
    )
  }
}

export default withRouter(Signin)