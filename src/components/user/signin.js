import React, { Component } from 'react'
import logo from './img2/logo.png'
import github from './img2/github.png'
import google from './img2/google.png'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import x from './img2/X.png'
import Signup from './signup'
import { GoogleLogin } from "react-google-login"

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

  }

  async githubLoginHandler() {
    let result = await axios.get("https://onemeal.site/githubLogin", { withCredentials: true })
    let GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${result.client_id}`
    window.location.assign(GITHUB_LOGIN_URL)
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
      let result = await axios.post("https://onemeal.site/users/login",{email: email , password : password},{withCredentials: true})
      console.log(result)
      this.props.loginHandler(result.data.username)
      // fetch('https://onemeal.site:443/users/login', {
      //   method: 'post',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email, password: password }),
      //   credentials: 'include'
      // })
      // .then(res => res.data)
      // .then(data => {
      //   this.props.loginHandler(data.username)
      // })
      // .catch(err => {
      //   console.log(err)
      // })
      /*
      axios({
        method: 'POST',
        url: 'https://onemeal.site:443/users/login',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        data: { email: email, password: password }
      })
      .then(res => res.data)
      .then(data => {
        this.props.loginHandler(data.username)
      })
      .catch(err => {
        console.log(err)
      })
      */
    }
  }

  render() {

    const responseGoogle = (any) => {

    }
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