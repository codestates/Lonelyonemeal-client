import React, { Component } from 'react'

import x from './img2/X.png'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foodName: "",
            foodImg: ""
        }
        this.signupRequestHandler = this.signupRequestHandler.bind(this);
    }

  
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
    }
    */


    render() {
        return (
            <div className="back">
                <div className='loginContainer'>
                    <img className='X' src={x} onClick={this.props.resultModalHandler} />
                    <div className="middleContainer">
                        <div className="title">셰프의 선택은</div>
                        <div className="resultName">계란 볶음밥</div>
                        <div className="resultImg" />
                        <div className="save">저장하기</div>
                        <div className='block' />
                        <div className="goMyPage">마이페이지 에서 확인하세요!</div>
                    </div>
                </div>
            </div >
        )
    }
}


export default withRouter(Result)


      