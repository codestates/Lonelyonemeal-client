import React, { Component } from 'react'
import logo from './img2/logo.png'
import github from './img2/github.png'
import google from './img2/google.png'
import {Link , withRouter} from 'react-router-dom'
import axios from 'axios'
import x from './img2/X.png'
import Signup from './signup'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      showSignupView: false
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.loginRequestHandler = this.loginRequestHandler.bind(this);
    this.handleSignupView = this.handleSignupView.bind(this);
  }

  handleInputValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignupView() {
    this.setState({ showSignupView: !this.state.showSignupView });
  }
  
  
  loginRequestHandler() {
    const {email, password} = this.state;
    if(!email || !password) {
      return; // 입력요청 출력
    }
    else {
      axios({
        method: 'POST',
        url: 'http://onemeal.site/users/login',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        data: { email: email, password: password }
      })
      .then(res => {
        console.log(res.data);
        this.props.loginHandler(res.data.username); // <----- 응답으로 유저네임정도 보내줬음 좋겠음.
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    return (
      this.state.showSignupView ?
      <Signup handleSignupView={this.handleSignupView} loginModalHandler={this.props.loginModalHandler}/> :
      <div className="back">
        <div className='loginContainer'>
          <img className='X' src={x} onClick={this.props.loginModalHandler}/>
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
            <span className="text">
              아직 아이디가 없으신가요?
              <span className='text2' onClick={this.handleSignupView}>회원가입</span>
            </span>
            <div className='block' />
            <div>
              <img className="github" src={github} alt="github" /> <img className="google" src={google} alt="google" />
            </div>
          </div>
          <div className="ex">2021 Baegopujo all rights reserved.</div>
        </div>
      </div>
    )
  }
}

export default withRouter(Signin)