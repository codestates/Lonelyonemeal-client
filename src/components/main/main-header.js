import logo from './img/logo.png';


function MainHeader(props) {
  return(
    <header className='main-header'>
      <img className='main-header-logo' src={logo} alt=''/>
      <div className='main-header-bar'>
        {props.isLogin ?
          <div className='main-header-user'>{`${props.username}님 환영합니다!`}</div> :
          <div className='main-header-login' onClick={props.loginModalHandler}>로그인</div>
        }
      </div>
    </header>
  )
}

export default MainHeader;
