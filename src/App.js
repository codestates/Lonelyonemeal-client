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
    this.getAccessToken = this.getAccessToken.bind(this)

  }
  /** 세션 유지 코드 **/
  componentDidMount(prevProps, prevState) {
    if(localStorage.getItem('userInfo')) {
      this.setState({ isLogin: true });
    }
    else {
      this.setState({ isLogin: false });
    }
  }
 
  async getAccessToken(authorizationCode) {
    const accessToken = (await axios.post("https://onemeal.site/githubLogin",{authorizationCode} )).data.accessToken
      this.setState({
        isLogin :true,
        accessToken 
      })
  }

  componentDidMount() {
    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    if (authorizationCode) {
      this.getAccessToken(authorizationCode)
    }
  }

  handleLogin() {
    this.setState({ isLogin: !this.state.isLogin });
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
    const {isOpenning, isIntro, isLogin} = this.state;
    return (
      <div className="App" >
        <Switch>
          <Route exact path='/main' render={() => <Main isLogin={isLogin} handleLogin={this.handleLogin}/>} />
          <Route exact path='/intro' render={() => <Intro handleIntroClicked={this.handleIntroClicked} />} />
          <Route exact path='/signin' render = {() => <Signin />} />
          <Route exact path='/signup' render = {() => <Signup />} />
          <Route exact path='/openning' render = {() => <Openning isOpenning={isOpenning} handleOpenningClicked={this.handleOpenningClicked} />} />
          <Route exact path='/mypage' render ={()=> <Mypage isLogin={isLogin} handleLogin={this.handleLogin} accessToken={this.state.accessToken}/> }/>
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
