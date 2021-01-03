import React, { Component } from 'react'
import axios from 'axios'
import blankPic from './img2/blank.png'

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
    if(!this.state.selectedUserImg) {
      return alert('이미지를 업로드 해주세요')
    }
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
      //this.props.history.push("/mypage");
    })
    .catch(err => {
      console.log(err);
      alert('업로드 실패!')
    })
  }

  /* 서버에 이름 업데이트 함수 */
  handleNameClick() {
    const {newUsername} = this.state;
    if(newUsername === this.props.userInfo.username) {
      alert('새로운 사용자 이름을 작성해주세요')
    }
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
        alert('사용자 이름이 변경되었습니다!');
      })
      .catch(err => {
        console.log(err);
        alert('업로드 실패');
      })
  }

  /* 서버에 비밀번호 업데이트 함수 */
  handlePasswordClick() {
    const {newPassword, password2} = this.state;
    if(newPassword === password2) {
      return fetch('https://onemeal.site/users/userinfoup', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password: newPassword })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.props.getUserInfo();
        alert('비밀번호가 변경되었습니다!');
      })
      .catch(err => {
        console.log(err);
        alert('업로드 실패');
      })
    }
    else {
      alert('비밀번호를 확인 해 주세요')
    }
  }

  render() {
    const {userInfo, accessToken} = this.props;
    return(
      <aside className={accessToken ? 'my-info-container-github' : 'my-info-container'}>
        <div className={accessToken ? 'my-pic-github' : 'my-pic'}>
          <img src={userInfo.userImg ? userInfo.userImg : blankPic} alt='' />
          {accessToken ? null : <input className='my-pic-upload' name='img' type='file' onChange={(e) => this.handleImgChange(e)}></input>}
        </div>
        {accessToken ? null : <button className='btn-pic' onClick={this.handleImgClick}>변경</button>}
        <div className='my-name'>
          <h1 className='my-info-list'>사용자 이름</h1>
          {accessToken ? <div className='my-name-disc-github'>{userInfo.username}</div> : <input type='text' className='my-name-disc' name='newUsername' defaultValue={userInfo.username} onChange={(e) => this.handleAnyThing(e)}></input>}
        </div>
        {accessToken ? null : <button className='btn' onClick={this.handleNameClick}>변경</button>}
        {
          accessToken ? null :
          <div className='my-email'>
            <h1 className='my-info-list'>E-mail</h1>
            <div className='my-email-disc'>{userInfo.email}</div>
          </div>
        }
        {
          accessToken ? null :
          <div className='my-password'>
            <h1 className='my-info-list'>비밀번호</h1>
            <input type='password' name='newPassword' placeholder='변경할 비밀번호를 입력하세요.'className='my-password-disc' onChange={(e) => this.handleAnyThing(e)}></input>
          </div>
        }
        {
          accessToken ? null :
          <div className='my-password'>
            <h1 className='my-info-list'>비밀번호 확인</h1>
            <input type='password' name='password2' placeholder='비밀번호를 다시 입력하세요.'className='my-password-disc' onChange={(e) => this.handleAnyThing(e)}></input>
          </div>
        }
        {accessToken ? null : <button className='btn' onClick={this.handlePasswordClick}>변경</button>}
      </aside>
    );
  }
}

export default MyInfo;