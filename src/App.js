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
     
    }
    this.handleIntroClicked = this.handleIntroClicked.bind(this);
    this.handleOpenningClicked = this.handleOpenningClicked.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
          <Route exact path='/signin' render = {() => <Signin/>} />
          <Route exact path='/signup' render = {() => <Signup/>} />
          <Route exact path='/openning' render = {() => <Openning isOpenning={isOpenning} handleOpenningClicked={this.handleOpenningClicked}/>} />
          <Route exact path='/result' render ={()=> <Result />}/>
          <Route exact path='/mypage' render ={()=> <Mypage isLogin={isLogin} handleLogin={this.handleLogin}/>}/>
          <Route exact path='/share' render ={()=> <Share/>}/>
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
