import React, { Component } from 'react'
import Signin from './signin'
import x from './img2/X.png'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import mypage from './mypage'

class Result extends Component {
    constructor(props) {
        super(props)
        this.openLoginModal = this.openLoginModal.bind(this)
    }

    openLoginModal() {
        this.props.resultModalHandler();
        this.props.loginModalHandler();
    }
    //this.signupRequestHandler = this.signupRequestHandler.bind(this);


    /*
    signupRequestHandler() {

        axios({
            method: 'GET',
            url: 'https://onemeal.site/resultrecipe',
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            data: { foodName: this.foodName, foodImg: this.foodImg }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }{this.props.resultMenu.foodName}
    */
    render() {
        return (
            <div className="back">
                <div className='loginContainer'>
                    <img className='X' src={x} onClick={this.props.resultModalHandler} />
                    <div className="middleContainer">
                        <div className="title">{this.props.resultMenu.foodName}</div>
                        <div className="resultName"></div>
                        <img className="resultImg" src={this.props.resultMenu.foodImg} alt="foodimg" />
                        <div className="save">저장하기</div>
                        <div className='block' />
                        {this.props.isLogin ?
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


