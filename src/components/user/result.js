import React, { Component } from 'react'
import x from './img2/X.png'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'


class Result extends Component {
    constructor(props) {
        super(props)
        this.openLoginModal = this.openLoginModal.bind(this)
        this.saveClick=this.saveClick.bind(this)
    }

    openLoginModal() {
        this.props.resultModalHandler();
        this.props.loginModalHandler();
    }

    saveClick(){
        if(!this.props.isLogin) {
            return alert('로그인이 필요합니다!')
        }
        axios.post("https://onemeal.site/users/saverecipe" ,{
            foodName: this.props.resultMenu.foodName,
            foodImg :this.props.resultMenu.foodImg,
            link : this.props.resultMenu.link
        }, 
        {withCredentials: true})
        .then(() => {
            alert('저장이 완료되었습니다!');
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="back">
                <div className='loginContainer'>
                    <img className='X' src={x} onClick={this.props.resultModalHandler} />
                    <div className="middleContainer">
                        <div className="title">{this.props.resultMenu.foodName}</div>
                        <div className="resultName"></div>
                        <a href={this.props.resultMenu.link} target="_blank"><img className="resultImg" src={this.props.resultMenu.foodImg} alt="foodimg"/></a>
                        <div className="save" onClick={this.saveClick}>저장하기</div>
                        <div className='block' />
                        {
                            this.props.isLogin ?
                            <Link to="/mypage" className="goMyPage">마이페이지에서 확인하세요!</Link> :
                            <Link to="/main" className="goMyPage" onClick={this.openLoginModal}>마이페이지에서 확인하세요!</Link>
                        }
                    </div>
                </div>
            </div >
        )
    }
}


export default withRouter(Result)


