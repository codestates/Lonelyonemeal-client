import React, { Component } from 'react'
import logo from './img2/logo.png'
import x from './img2/X.png'
import {withRouter} from 'react-router-dom'


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      userName: "",
      password: "",
      checkPassword: "",
      errorMessage: ""
    }
    this.handleInputValue = this.handleInputValue.bind(this);
    this.signupRequestHandler = this.signupRequestHandler.bind(this);
  }

  handleInputValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signupRequestHandler() {
    const {email, username, password, checkPassword} = this.state;
    if(!email || !username || !password || !checkPassword) {
      this.setState({ errorMessage: '모든 항목을 입력해주세요' });
    }
    else {
      fetch('https://onemeal.site/users/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: email, username: username, password: password })
      })
      .then(res => res.json())
      .then(res => {
        if(res.message === 'email exists') {
          this.setState({errorMessage: '이미 존재하는 이메일입니다.'})
        }
        else {
          this.props.handleSignupView();
        }
      })
    }
  }
  

  render() {
    return (
      <div className="back">
        <div className='loginContainer'>
        <img className='X' src={x} onClick={this.props.loginModalHandler}/>
          <div className="middleContainer">
            <img className="go" src={logo} alt="go" />
            <input
              className="inputBox"
              name='email'
              onChange={(e) => this.handleInputValue(e)}
              placeholder='이메일'
              type='text' />
            <div className='block' />
            <input
              className="inputBox"
              name='username'
              onChange={(e) => this.handleInputValue(e)}
              placeholder='이름'
              type='text' />
            <div className='block' />
            <input
              className="inputBox"
              name='password'
              onChange={(e) => this.handleInputValue(e)}
              placeholder='비밀번호'
              type='password' />
            <div className='block' />
            <input
              className="inputBox"
              name='checkPassword'
              onChange={(e) => this.handleInputValue(e)}
              placeholder='비밀번호 확인'
              type='password' />
            <div className='block' />
            <button className="button" onClick={this.signupRequestHandler}>회원가입</button>
            <div className='block' />
            <div className="alert-box">{this.state.errorMessage}</div>
            <div className='block' />
            <span className="text">
              아이디가 있으신가요?
              <span className="text2" onClick={this.props.handleSignupView}>로그인</span>
            </span>
            <div className='block' />
          </div>
          <div className="ex">2021 Baegopujo all rights reserved.</div>
        </div>
      </div >
    )
  }
}


export default withRouter(Signup)