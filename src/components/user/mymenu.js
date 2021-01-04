import React, { Component } from 'react'
import x from './img2/X.png'


function Recomend({foodName,foodImg,foodLink,saveDate, deleteRecipeLog, key}) {

  return (
    <div className="saveResult">
      <a href={foodLink} target="_blank"><img className="saveresultImg" src={foodImg} alt="foodimg"/></a>
      <div className="saveresultEx">
        <div className="explainName">{foodName}</div>
        <div className="block"></div>
        <div className="explainData">{saveDate}</div>
      </div>
      <img className="deleteButton" src={x} alt='' onClick={deleteRecipeLog({key})}/>
    </div>
  )
}

class MyMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {accessToken, deleteRecipeLog} = this.props;
    
    return (
      <div className={accessToken ? 'my-menu-wrap-github' : 'my-menu-wrap'}>
        {accessToken ? null : <div className="menuInt">추천받은 음식</div>}
        {accessToken ? null : <div className="block" />}
        {
          accessToken ?
          null : 
          <div className="saveResultbox">
            {
              this.props.save.map(item => <Recomend key={item.id} foodName={item.foodName} foodImg={item.foodImg} foodLink ={item.link} saveDate={item.createdAt} deleteRecipeLog={deleteRecipeLog}/>)
            }
          </div >
        } 
      </div>
    )
  }
}

export default MyMenu;