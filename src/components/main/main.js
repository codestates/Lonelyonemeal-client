import React, { Component } from 'react'
import MainHeader from './main-header'
import MainIngre from './main-ingredients'
import Chef from './main-chef'
import axios from 'axios'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenning: true,  /* 오프닝 씬인지 아닌지 여부 */
      talkingCount: 0,  /* 오프닝 씬 내에서 셰프가 얘기한 숫자, 해당 숫자에 따라 알맞은 대사를 chefsMessage에 할당. 5가 맥시멈 */
      chefsMessage: null,  /* 셰프 대사 */
      isLogin: false,  /* 로그인 여부 판별 */
      isMypageOpen: false,  /* 마이페이지가 열렸는지 여부 판별 */
      isModalOpen: false,  /* 모달창이 열렸는지 여부 판별 */
      username: null  /* 로그인 했을 시 사용자 이름 */
    }
    this.talkingCountUp = this.talkingCountUp.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.handleMypage = this.handleMypage.bind(this);
    this.getOneMeal = this.getOneMeal.bind(this);
  }

  /* talkingCount state에 할당된 번호에 따라 chefsMessage에 알맞은 대사 삽입 */
  changeMessage() {
    const {talkingCount} = this.state;
    if(talkingCount === 0) {
      this.setState({chefsMessage: '안녕하세요! 고독한 한끼입니다.'})
    }
    if(talkingCount === 1) {
      this.setState({chefsMessage: '고독한 한끼는 여러분의 허전한 냉장고~ 어쩌구'})
    }
    if(talkingCount === 2) {
      this.setState({chefsMessage: '여러분의 균형잡힌 영양소 밸런스를~ 어쩌구'})
    }
    if(talkingCount === 3) {
      this.setState({chefsMessage: '저, 황셰프의 안목으로~ 어쩌구'})
    }
    if(talkingCount === 4) {
      this.setState({chefsMessage: '그럼 시작해볼까요? 우선 재료를 골라주세요.'})
    }
  }

  /* 화면 클릭 때 마다 talkingCount state 숫자 올려주기 */
  talkingCountUp() {
    this.changeMessage();  /* 숫자 올려주며 chefsMesaage도 같이 변환 */
    this.setState({ talkingCount: this.state.talkingCount + 1 });
    if(this.state.talkingCount === 5) {  /* 숫자가 한계치인 5에 다다르면 더이상 클릭해도 숫자를 올릴 수 없으며 오프닝이 종료됨. */
      this.setState({
        isOpenning: false,
        chefsMessage: '냉장고에 있는 재료들을 골라주세요!'
      })
    }
  }

  /* 마이페이지 핸들링 클릭이벤트 함수 */
  handleMypage() {
    this.setState({ isMypageOpen: !this.state.isMypageOpen})
  }

  /* 셰프에게 추천받기 버튼 서버통신 함수 */
  getOneMeal() {
    axios({
      method: 'get',
      url: 'https://onemeal.site/resultrecipe',
      headers: { 'Content-Type': 'application/json'},
      withCredentials: true
    })
    .then(res => {
      console.log(res)
    })
  }


  render() {
    const {chefsMessage, isOpenning, isLogin, isMypageOpen} = this.state;
    return(
      <main className='wrapAll'>
        <div className='dummy-mypage'></div>
        <div className={isMypageOpen ? 'main-wrap-moved' : 'main-wrap'} onClick={isOpenning ? this.talkingCountUp : null}>
        <span className={isOpenning ? null : 'main-pieaceOfMypage'} onClick={this.handleMypage}>
        </span>
        <Chef isOpenning={isOpenning} chefsMessage={chefsMessage} />
        {
          isOpenning 
          ? null              /* 오프닝이 참 일때 아래 엘리먼트 및 컴포넌트는 렌더링 하지 않음 */
          :<div className='main-main'>
            <MainHeader isLogin={isLogin}/>
            <MainIngre />
            <button className='main-submit' onClick={this.getOneMeal}>셰프에게 추천받기</button>
          </div>
        }
        </div>
      </main>
    );
  }
}




export default Main;
