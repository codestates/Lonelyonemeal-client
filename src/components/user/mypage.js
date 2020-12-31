import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import MainHeader from '../main/main-header'
import MyInfo from './myinfo'
import MyMenu from './mymenu.js'
import Share from './share'
import { Link } from 'react-router-dom'
import leftArrow from '../main/img/left-arrow.png'

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResultModalOpen: false,
      userInfo: {
        username: '',
        email: '',
        password: '',
        userImg: null,
        save: [
          {
            foodName: '',
            foodImg: '',
            foodLink: '',
            saveDate: ''
          }
        ]
      }
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  /* 만약 로컬스토리지와 스테이트의 유저인포가 다를 때 유저정보 자동갱신 */
  componentDidMount() {
    this.getUserInfo();
  }

  /* 유저정보 불러오는 함수 */
  getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(!userInfo) {
      //여긴 그냥 로그인안하고 들어갔을때임
      this.setState({
        userInfo: {
          username: '당신은 억지로',
          email: '마이페이지에 접속했습니다',
          password: 'x',
          userImg: null
        }
      })
      this.props.history.push("/mypage");
      console.log('userInfo라는 로컬스토리지 없다~');
    }
    else if(this.props.accessToken) {
      let getInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.setState({
        userInfo: {
          username: getInfo.username,
          email: getInfo.email,
          userImg: getInfo.userImg
        }
      })
      console.log('스토리지에 저장된 깃헙인포를 가져왔어요');
      this.props.history.push("/mypage");
    }
    else {
      fetch('https://onemeal.site/users/userinfo', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        localStorage.setItem('recipelog', JSON.stringify(res.log));
        let getInfo = JSON.parse(localStorage.getItem('userInfo'));
        let getlog = JSON.parse(localStorage.getItem('recipelog'));
        this.setState({
          userInfo: {
            username: getInfo.username,
            email: getInfo.email,
            password: getInfo.password,
            userImg: `https://onemeal.site/userImg/${getInfo.userImg}`,
            save: this.state.save.concat({
              foodName: getlog.foodName,
              foodImg: getlog.foodImg,
              foodLink: getlog.link,
              saveDate: getlog.createdAt
            })
          }
        });
        console.log('유저정보 새로 받아왔어요')
        this.props.history.push("/mypage");
      })
      .catch(err => {
        console.log(err);
      })
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
      // 깃헙 로그아웃
      if(this.props.accessToken) {
        this.props.githubLogout();
      }
    })
    .then(() => {
      alert('성공적으로 로그아웃 되었습니다!')
      this.props.history.push("/main");
    })
  }

  render() {
    const { isResultModalOpen, userInfo, save } = this.state;
    return(
      <div className='my-wrap'>
        <MainHeader isLogin={this.props.isLogin} username={userInfo.username} loginModalHandler={this.loginModalHandler} />
        <div className='my-container'>
          <MyInfo userInfo={userInfo} getUserInfo={this.getUserInfo}/>
          <MyMenu userInfo={userInfo}/>
        </div>
        <Link to="/main" className='my-pieaceOfMainpage'><img src={leftArrow} alt='' className='l-arrow' /></Link>
        <button className='my-logout-button' onClick={this.handleLogout}>로그아웃</button>
        { isResultModalOpen ? <Share /> : null }
      </div>
    );
  }
}



export default withRouter(Mypage);
