import React, { Component } from 'react'
import MainHeader from './main-header'
import MainIngre from './main-ingredients'
import Chef from './main-chef'
import Signin from '../user/signin'
import Result from '../user/result'
import { Link } from 'react-router-dom'
import rightArrow from './img/right-arrow.png'


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chefsMessage: null,
      isLoginModalOpen: false,  /* 로그인 모달창이 열렸는지 여부 판별 */
      isResultModalOpen: false,  /* 결과 모달창이 열렸는지 여부 판별 */
      shoppingBag: [],  /* 유저가 고른 재료들 */
      resultMenu: {}  /* 셰프의 결과음식 */
    }
    this.getOneMeal = this.getOneMeal.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.loginModalHandler = this.loginModalHandler.bind(this);
    this.resultModalHandler = this.resultModalHandler.bind(this);
    this.copyShoppingBag = this.copyShoppingBag.bind(this);
    this.randomChefTalk = this.randomChefTalk.bind(this);
  }

  componentDidMount() {
    this.props.LoginChecker();
    this.props.maintainToken();
    setTimeout(() => {
      if(this.props.isLogin && this.props.username === '') {
        console.log('누가누가 먼저 실행되나 나는 DidMount at Main.js') //************************************************* */
        let name = JSON.parse(localStorage.getItem('userInfo')).username;
        this.props.setUsername(name);
      }
    }, 1600);
  }

  /* 셰프에게 추천받기 버튼 서버통신 함수 */
  async getOneMeal() {
    if(this.state.shoppingBag.length < 2) {
      return alert('재료를 2개 이상 골라주세요!')
    }
    fetch("https://onemeal.site/users/resultrecipe",{
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ingredients: this.state.shoppingBag})
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ resultMenu: res.data });
      this.resultModalHandler();
    })
  }

  /* 로그인 상태 변경 함수 */
  loginHandler(username) {
    this.setState({
      isLoginModalOpen: false,
      username: username
    });
    this.props.handleLogin();
    // 상위 이즈로그인 변경
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
    this.setState({ shoppingBag: bag });
  }

  /* 셰프 랜덤메시지 출력 함수 */
  randomChefTalk() {
    const talkBox = [ '좋은 선택이에요!', '좋아!!', '흠...', '최선인가요..?', '']
    this.setState({ chefsMessage: talkBox[Math.floor(Math.random() * (9 - 0 + 1) + 0)]});
  }

  render() {
    const { chefsMessage, isLoginModalOpen, isResultModalOpen, resultMenu } = this.state;
    return (
      <div className='main-wrap'>
        <Chef chefsMessage={chefsMessage} />
        <div className='main-main'>
          <MainHeader isLogin={this.props.isLogin} username={this.props.username} loginModalHandler={this.loginModalHandler} />
          <MainIngre copyShoppingBag={this.copyShoppingBag} randomChefTalk={this.randomChefTalk} />
          <button className='main-submit' onClick={this.getOneMeal}>셰프에게 추천받기</button>
        </div>
        {this.props.isLogin ? <Link to="/mypage" className='main-pieaceOfMypage'><img src={rightArrow} alt='' className='r-arrow'/></Link> : <div className='main-pieaceOfMypage' onClick={this.loginModalHandler}><img src={rightArrow} alt='' className='r-arrow' /></div>}
        {isLoginModalOpen ? <Signin loginHandler={this.loginHandler} loginModalHandler={this.loginModalHandler} /> : null}
        {isResultModalOpen ? <Result resultModalHandler={this.resultModalHandler} resultMenu={resultMenu} loginModalHandler={this.loginModalHandler} isLogin ={this.props.isLogin}/> : null}
      </div>
    );
  }
}




export default Main;
