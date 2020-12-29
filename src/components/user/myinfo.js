import React, { Component } from 'react'
import axios from 'axios'

class MyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserImg: null,
      newUsername: null,
      newEmail: null,
      newPassword: null
    };
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
  }

  /* 로컬에서 선택한 이미지 스테이트에 담아두는 핸들링 함수 */
  handleImgChange(e) {
    let target = e.target.files[0];
    console.log(target);
    this.setState({ selectedUserImg: target })
  }

  /* 이름, 이메일, 비밀번호 온체인지 핸들링 함수 */
  handleAnyThing(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /* 서버에 이미지 업데이트 함수 */
  handleImgClick() {
    const formData = new FormData();
    formData.append('file', this.state.selectedUserImg);

  }

  render() {
    const {userInfo} = this.props;
    return(
      <aside className='my-info-container'>
        <div className='my-pic'>
          <img src={userInfo.userImg ? userInfo.userImg : undefined} alt='' />
          <input className='my-pic-upload' type='file' onChange={(e) => this.handleImgChange(e)}></input>
        </div>
        <button className='btn-pic' onClick={this.handleImgClick}>변경</button>
        <div className='my-name'>
          <h1 className='my-info-list'>사용자 이름</h1>
          <input type='text' className='my-name-disc' name='newUsername' value={userInfo.username ? userInfo.username : '김코딩'}></input>
        </div>
        <button className='btn'>변경</button>
        <div className='my-email'>
          <h1 className='my-info-list'>E-mail</h1>
          <input type='text' className='my-email-disc' name='newEmail' value={userInfo.email ? userInfo.email : 'testtest@test.com'}></input>
        </div>
        <button className='btn'>변경</button>
        <div className='my-password'>
          <h1 className='my-info-list'>비밀번호</h1>
          <input type='password' name='newPassword' placeholder='변경할 비밀번호를 입력하세요.'className='my-password-disc'></input>
        </div>
        <div className='my-password'>
          <h1 className='my-info-list'>비밀번호 확인</h1>
          <input type='password' placeholder='비밀번호를 다시 입력하세요.'className='my-password-disc'></input>
        </div>
        <button className='btn'>변경</button>
      </aside>
    );
  }
}

export default MyInfo;