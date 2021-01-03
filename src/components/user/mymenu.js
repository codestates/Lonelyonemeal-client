import React, { Component } from 'react'
import x from './img2/X.png'
import axios from 'axios'

function Recomend({foodName,foodImg,foodLink,saveDate, deleteRecipeLog,key}) {

  return (
    <div className="saveResult">
      <a href={foodLink} target="_blank"><img className="saveresultImg" src={foodImg} alt="foodimg"/></a>
      <div className="saveresultEx">
        <div className="explainName">{foodName}</div>
        <div className="block"></div>
        <div className="explainData">{saveDate}</div>
      </div>
      <img className="deleteButton" src={x} alt='' onClick={deleteRecipeLog}/>
    </div>
  )
}

class MyMenu extends Component {
  constructor(props) {
    super(props);
 
  } 
  async deleteRecipeLog(){
  await axios.delete('https://onemeal.site/users/deleterecipe',{id:this.props.id},{withCredentials: true})
  console.log(this.props.id)
  }

  render() {
    return (
      <div className='my-menu-wrap'>
        <div className="menuInt">추천받은 음식</div>
        <div className="block" />
        <div className="saveResultbox">
          {
            this.props.save.map(item => <Recomend key={item.id} foodName={item.foodName} foodImg={item.foodImg} foodLink ={item.link} saveDate={item.createdAt} deleteRecipeLog={this.props.deleteRecipeLog} />)
          }
        </div >
      </div>
    );
  }
}

export default MyMenu;