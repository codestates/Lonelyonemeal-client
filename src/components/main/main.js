import React, { Component } from 'react'
import MainHeader from './main-header'
import MainIngre from './main-ingredients'
import Chef from './main-chef'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenning: true,
      talkingCount: 0,
      chefsMessage: null,
      isLogin: false,
      isMypageOpen: false,
      isModalOpen: false,
      username: null
    }
    this.talkingCountUp = this.talkingCountUp.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.handleMypage = this.handleMypage.bind(this);
  }

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

  talkingCountUp() {
    this.changeMessage();
    this.setState({ talkingCount: this.state.talkingCount + 1 });
    if(this.state.talkingCount === 5) {
      this.setState({
        isOpenning: false,
        chefsMessage: '냉장고에 있는 재료들을 골라주세요!'
      })
    }
  }

  handleMypage() {
    this.setState({ isMypageOpen: !this.state.isMypageOpen})
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
          ? null
          :
          <div className='main-main'>
            <MainHeader isLogin={isLogin}/>
            <MainIngre />
            <button className='main-submit'>셰프에게 추천받기</button>
          </div>
        }
        </div>
      </main>
    );
  }
}




export default Main;
