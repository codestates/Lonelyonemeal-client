import { Component } from 'react';
import './App.css';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import Intro from "./components/main/intro"
import Signin from "./components/user/signin"
import Signup from "./components/user/signup"
import Main from "./components/main/main"
import Openning from "./components/main/openning"
import Mypage from "./components/user/mypage"
import axios from "axios"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      isIntro: true,
      isOpenning: true,
      accessToken: null,
      username: ''
    }
    this.handleIntroClicked = this.handleIntroClicked.bind(this);
    this.handleOpenningClicked = this.handleOpenningClicked.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.isLoginSetUp = this.isLoginSetUp.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.githubLogout = this.githubLogout.bind(this);
    this.LoginChecker = this.LoginChecker.bind(this);
    this.maintainToken = this.maintainToken.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }
 
  async getAccessToken(authorizationCode) {
    const result = await axios.post("https://onemeal.site/socials/githubLogin",{authorizationCode} )
    if(result) {
      this.setState({
        isLogin: true,
        accessToken: result.data.accessToken
      })
      localStorage.setItem('token', result.data.accessToken + "");
      let response = await axios.get('https://api.github.com/user', {
      headers: { authorization: `token ${result.data.accessToken}` }
      })
      let userInfo = {id: response.data.node_id, username: response.data.name, userImg: response.data.avatar_url, email: response.data.email};
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }

  componentDidMount() {
    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    if (authorizationCode) {
      this.getAccessToken(authorizationCode)
    }
  }

  setUsername(name) {
    this.setState({ username: name });
  }

  /* 깃헙 토큰 계속해서 유지시켜주는 함수 */
  maintainToken() {
    if(localStorage.getItem('token') && !this.state.accessToken) {
      this.setState({ accessToken: JSON.parse(localStorage.getItem('token')) });
    }
  }

  LoginChecker() {
    if(localStorage.getItem('userInfo') && !this.state.isLogin) {
      this.setState({ isLogin: true })
    }
  }

  githubLogout() {
    localStorage.clear();
    this.setState({ accessToken: null, isLogin: false })
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
    const {isOpenning, isIntro, isLogin, accessToken, username} = this.state;
    return (
      <div className="App" >
        <Switch>
          <Route exact path='/main' render={() => <Main isLogin={isLogin} handleLogin={this.handleLogin} LoginChecker={this.LoginChecker} maintainToken={this.maintainToken} setUsername={this.setUsername} username={username}/>} />
          <Route exact path='/mypage' render ={()=> <Mypage isLogin={isLogin} handleLogin={this.handleLogin} accessToken={accessToken} githubLogout={this.githubLogout} LoginChecker={this.LoginChecker} maintainToken={this.maintainToken}/>}/>
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
