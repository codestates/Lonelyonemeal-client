import { Component } from 'react';
import './App.css';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import Intro from "./components/main/Intro"
import Signin from "./components/user/Signin"
import Signup from "./components/user/Signup"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introClicked: false,
      

    }
    this.handleIntroClicked = this.handleIntroClicked.bind(this)
  }

  handleIntroClicked = () => {
    this.setState({
      introClicked: true
    })
    this.props.history.push("/")
  }
  render() {
    return (
      <div className="App" >
        <Switch>
          <Route exact path='/main' render={() => <Main />} />
          <Route exact path='/intro' render={() => <Intro handleIntroClicked={this.handleIntroClicked} />} />
          <Route exact path='/signin'render = {()=><Signin/>} />
          <Route exact path='/signup'render = {()=><Signup/>} />
          <Route
          path = '/'
          render ={()=>{
            if(this.state.introClicked){
              return <Redirect to = '/signin'/>
            }
            return <Redirect to = '/intro'/>
          }}
          />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
