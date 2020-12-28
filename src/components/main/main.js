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
      isResultModalOpen: false,
      username: null  /* 로그인 했을 시 사용자 이름 */,
      githubToken: "",
      shoppingBag: [],  /* 유저가 고른 재료들 */
      resultMenu: {}  /* 셰프의 결과음식 */
    }
    this.getOneMeal = this.getOneMeal.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.loginModalHandler = this.loginModalHandler.bind(this);
    this.resultModalHandler = this.resultModalHandler.bind(this);
    this.getGithubToken = this.getGithubToken.bind(this);
    this.copyShoppingBag = this.copyShoppingBag.bind(this);
    this.randomShefTalk = this.randomShefTalk.bind(this);
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
  async getOneMeal() {
    let result = await axios.post("https://onemeal.site/users/resultrecipe" , {ingredients: this.state.shoppingBag}, {withCredentials: true});
    console.log(result.data);
    this.setState({ resultMenu: result.data.recipe });
    this.resultModalHandler();
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

  /* 음식결과창 열고닫는 함수 */
  resultModalHandler() {
    this.setState({ isResultModalOpen: !this.state.isResultModalOpen })
  }

  /* MainIngre의 shoppingBag 스테이트를 복사해오는 함수 */
  /* 생각 못하고 만들어서 쇼핑백이 하위 컴포넌트의 스테이트로만 존재하여 불가피하게 간단한 선택 (쇼핑백은 통신을 위해 현재 메인컴포넌트에서 필요함) */
  copyShoppingBag(bag) {
    console.log(bag)
    this.setState({ shoppingBag: bag });
  }

  /* 셰프 랜덤메시지 출력 함수 */
  randomShefTalk() {
    const talkBox = ['', '좋은 선택이에요!', '', '흠...', '', '', '', '최선인가요..?', '']
    this.setState({ chefsMessage: talkBox[Math.floor(Math.random() * (9 - 0 + 1) + 0)]});
  }


  render() {
    const { chefsMessage, isLogin, isLoginModalOpen, isResultModalOpen, username, resultMenu } = this.state;
    return (
      <div className='main-wrap'>
        <Chef chefsMessage={chefsMessage} />
        <div className='main-main'>
          <MainHeader isLogin={isLogin} username={username} loginModalHandler={this.loginModalHandler} />
          <MainIngre copyShoppingBag={this.copyShoppingBag} randomShefTalk={this.randomShefTalk} />
          <button className='main-submit' onClick={this.getOneMeal}>셰프에게 추천받기</button>
        </div>
        {isLoginModalOpen ? <Signin loginHandler={this.loginHandler} loginModalHandler={this.loginModalHandler} /> : null}
        {isResultModalOpen ? <Result resultModalHandler={this.resultModalHandler} resultMenu={resultMenu} /> : null}
      </div>
    );
  }
}




export default Main;
