import React, { Component } from 'react'
import MainHeader from './main-header'
import MainIngre from './main-ingredients'
import Chef from './main-chef'
import axios from 'axios'
import Signin from '../user/signin'
import Result from '../user/result'


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chefsMessage: null,
      isLogin: false,  /* 로그인 여부 판별 */
      isLoginModalOpen: false,  /* 로그인 모달창이 열렸는지 여부 판별 */
      username: null  /* 로그인 했을 시 사용자 이름 */,
      githubToken: ""
    }
    this.getOneMeal = this.getOneMeal.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.loginModalHandler = this.loginModalHandler.bind(this);
    this.getGithubToken = this.getGithubToken.bind(this)
  }

  async getGithubToken(authorizationCode) {
    const result = await axios.post("https://onemeal.site/githubLogin", { authorizationCode }, { withCredentials: true })
    this.setState({
      isLogin: true,
      githubToken: result.data.accessToken
    })
  }


  componentDidMount() {
    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    if (authorizationCode) {
      this.getGithubToken(authorizationCode)
    }
  }


  /* 셰프에게 추천받기 버튼 서버통신 함수 */
  getOneMeal() {
    axios({
      method: 'get',
      url: 'https://onemeal.site/',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
      .then(res => {
        console.log(res)
      })
  }

  /* 로그인 상태 변경 함수 */
  loginHandler(username) {
    this.setState({
      isLoginModalOpen: false,
      isLogin: true,
      username: username
    });
  }

  /* 로그인창 열고닫는 함수 */
  loginModalHandler() {
    this.setState({ isLoginModalOpen: !this.state.isLoginModalOpen });
  }


  render() {
    const { chefsMessage, isLogin, isLoginModalOpen, username } = this.state;
    return (
      <div className='main-wrap'>
        <Chef chefsMessage={chefsMessage} />
        <div className='main-main'>
          <MainHeader isLogin={isLogin} username={username} loginModalHandler={this.loginModalHandler} />
          <MainIngre />
          <button className='main-submit' onClick={this.getOneMeal}>셰프에게 추천받기</button>
        </div>
        {isLoginModalOpen ? <Signin loginHandler={this.loginHandler} loginModalHandler={this.loginModalHandler} /> : null}
      </div>
    );
  }
}




export default Main;
