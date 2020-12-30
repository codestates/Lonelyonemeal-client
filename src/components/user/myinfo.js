import React, { Component } from 'react'
import axios from 'axios'

class MyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserImg: null,
      newUsername: null,
      newPassword: null,
      password2: null
    };
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
    this.handlePasswordClick = this.handlePasswordClick.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleAnyThing = this.handleAnyThing.bind(this);
  }

  /* 로컬에서 선택한 이미지 스테이트에 담아두는 핸들링 함수 */
  handleImgChange(e) {
    let target = e.target.files[0];
    console.log(target);
    this.setState({ selectedUserImg: target })
  }

  /* 이름, 비밀번호 온체인지 핸들링 함수 */
  handleAnyThing(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /* 서버에 이미지 업데이트 함수 */
  handleImgClick() {
    const formData = new FormData();
    formData.append('img', this.state.selectedUserImg);
    for (let key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    axios.put('https://onemeal.site/users/userimgup', formData, {withCredentials: true})
    .then(res => {
      console.log(res);
      alert('업로드 성공!');
      this.props.getUserInfo();
      this.props.history.push("/mypage");
    })
    .catch(err => {
      console.log(err);
      alert('업로드 실패!')
    })
  }

  /* 서버에 이름 업데이트 함수 */
  handleNameClick() {
    const {newUsername} = this.state;
    return fetch('https://onemeal.site/users/userinfoup', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: newUsername })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.props.getUserInfo();
        alert('업로드 성공!');
        this.props.history.push("/mypage");
      })
      .catch(err => {
        console.log(err);
        alert('업로드 실패..');
      })
  }

  /* 서버에 비밀번호 업데이트 함수 */
  handlePasswordClick() {
    const {newPassword, password2} = this.state;
    if(newPassword === password2) {
      const {newUsername} = this.state;
      return fetch('https://onemeal.site/users/userinfoup', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: newPassword })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.props.getUserInfo();
        alert('업로드 성공!');
        this.props.history.push("/mypage");
      })
      .catch(err => {
        console.log(err);
        alert('업로드 실패..');
      })
    }
    else {
      alert('비밀번호를 확인 해 주세요')
    }
  }

  render() {
    const {userInfo} = this.props;
    return(
      <aside className='my-info-container'>
        <div className='my-pic'>
          <img src={userInfo.userImg ? userInfo.userImg : undefined} alt='' />
          <input className='my-pic-upload' name='img' type='file' onChange={(e) => this.handleImgChange(e)}></input>
        </div>
        <button className='btn-pic' onClick={this.handleImgClick}>변경</button>
        <div className='my-name'>
          <h1 className='my-info-list'>사용자 이름</h1>
          <input type='text' className='my-name-disc' name='newUsername' defaultValue={userInfo.username} onChange={(e) => this.handleAnyThing(e)}></input>
        </div>
        <button className='btn' onClick={this.handleNameClick}>변경</button>
        <div className='my-email'>
          <h1 className='my-info-list'>E-mail</h1>
          <div className='my-email-disc'>{userInfo.email}</div>
        </div>
        <div className='my-password'>
          <h1 className='my-info-list'>비밀번호</h1>
          <input type='password' name='newPassword' placeholder='변경할 비밀번호를 입력하세요.'className='my-password-disc' onChange={(e) => this.handleAnyThing(e)}></input>
        </div>
        <div className='my-password'>
          <h1 className='my-info-list'>비밀번호 확인</h1>
          <input type='password' name='password2' placeholder='비밀번호를 다시 입력하세요.'className='my-password-disc' onChange={(e) => this.handleAnyThing(e)}></input>
        </div>
        <button className='btn' onClick={this.handlePasswordClick}>변경</button>
      </aside>
    );
  }
}

export default MyInfo;