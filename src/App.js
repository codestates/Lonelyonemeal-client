import { Component } from 'react';
import './App.css';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import Intro from "./components/main/intro"
import Signin from "./components/user/signin"
import Signup from "./components/user/signup"
import Main from "./components/main/main"
import Openning from "./components/main/openning"
import Result from "./components/user/result"
import Mypage from "./components/user/mypage"
import Share from "./components/user/share"
import axios from "axios"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      isIntro: true,
      isOpenning: true,
      accessToken: null
    }
    this.handleIntroClicked = this.handleIntroClicked.bind(this);
    this.handleOpenningClicked = this.handleOpenningClicked.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.isLoginSetUp = this.isLoginSetUp.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.githubLogout = this.githubLogout.bind(this);
    this.LoginChecker = this.LoginChecker.bind(this);
  }
  /** 세션 유지 코드 **/
  /*
  componentDidMount(prevProps, prevState) {
    if(localStorage.getItem('userInfo')) {
      this.setState({ isLogin: true });
    }
    else {
      this.setState({ isLogin: false });
    }
  }
  */
 
  async getAccessToken(authorizationCode) {
    const result = await axios.post("https://onemeal.site/socials/githubLogin",{authorizationCode} )
    console.log(result);
    if(result) {
      this.setState({
        isLogin :true,
        accessToken: result.data.accessToken
      })
      let response = await axios.get('https://api.github.com/user', {
      headers: { authorization: `token ${result.data.accessToken}` }
      })
      console.log(response);
      let userInfo = {id: response.data.node_id, username: response.data.name, userImg: response.data.avatar_url, email: response.data.email};
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log(JSON.stringify(userInfo) + '가 스토리지에 저장!')
      history.go(0);
    }
  }

  componentDidMount() {
    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    console.log(authorizationCode)
    if (authorizationCode) {
      this.getAccessToken(authorizationCode)
    }
  }

  LoginChecker() {
    if(localStorage.getItem('userInfo') && !this.state.isLogin) {
      this.setState({ isLogin: true })
    }
  }

  githubLogout() {
    localStorage.clear();
    this.setState({ accessToken: null })
  }

  handleLogin() {
    this.setState({ isLogin: !this.state.isLogin });
  }

  isLoginSetUp() {
    this.setState({ isLogin: false });
  }

  handleIntroClicked = () => {
    this.setState({
      isIntro: false
    })
    this.props.history.push("/")
  }

  handleOpenningClicked = () => {
    this.setState({
      isOpenning: false
    })
    this.props.history.push("/")
  }
 
  render() {
    const {isOpenning, isIntro, isLogin, accessToken} = this.state;
    return (
      <div className="App" >
        <Switch>
          <Route exact path='/main' render={() => <Main isLogin={isLogin} handleLogin={this.handleLogin} LoginChecker={this.LoginChecker}/>} />
          <Route exact path='/mypage' render ={()=> <Mypage isLogin={isLogin} handleLogin={this.handleLogin} accessToken={accessToken} githubLogout={this.githubLogout} LoginChecker={this.LoginChecker}/>}/>
          <Route exact path='/intro' render={() => <Intro handleIntroClicked={this.handleIntroClicked} />} />
          <Route exact path='/signin' render = {() => <Signin />} />
          <Route exact path='/signup' render = {() => <Signup />} />
          <Route exact path='/openning' render = {() => <Openning isOpenning={isOpenning} isLoginSetUp={this.isLoginSetUp} handleOpenningClicked={this.handleOpenningClicked} />} />
          <Route
          path = '/'
          render = {() => {
            if(!isIntro && isOpenning) {
              return <Redirect to = '/openning' />
            }
            else if(!isIntro && !isOpenning) {
              return <Redirect to = '/main' />
            }
            else {
              return <Redirect to = '/intro' />
            }
          }}
          />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
