import React, { Component } from 'react'

function Recomend({foodName,foodImg,foodLink,saveDate}) {

  return (
    <div className="saveResult">
      <a href={foodLink} target="_blank"><img className="saveresultImg" src={foodImg} alt="foodimg"/></a>
      <div className="saveresultEx">
        <div className="explainName">{foodName}</div>
        <div className="block"></div>
        <div className="explainData">{saveDate}</div>
      </div>
    </div>
  )
}

class MyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='my-menu-wrap'>
        <div className="menuInt">추천받은 음식</div>
        <div className="block" />
        < div className="saveResultbox" >
          {
            this.props.save.map(item => <Recomend key={item.id} foodName={item.foodName} foodImg={item.foodImg} foodLink ={item.link} saveDate={item.createdAt}  />)
          }
        </div >
      </div>
    );
  }
}

export default MyMenu;