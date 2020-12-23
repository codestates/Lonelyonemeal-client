import React, { Component } from 'react'
import chef from '../../components/main/img/chef.png'

class Main extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return(
      <div className='main-wrap'>
        <img src={chef} alt=''/>
      </div>
    );
  }
}




export default Main;
