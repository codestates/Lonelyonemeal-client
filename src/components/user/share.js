import React, { Component } from 'react'
import kakao from './img2/kakao.png'
import x from './img2/X.png'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

class Share extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foodName: "",
            foodImg: ""

        }
        this.signupRequestHandler = this.signupRequestHandler.bind(this);
    }

  

    async signupRequestHandler() {
        let result = await axios.get("https://onemeal.site/resultrecipe",{ foodName: this.foodName, foodImg: this.foodImg },{headers: { 'Content-Type': 'application/json'} ,withCredentials: true})


        // axios({
        //     method: 'GET',
        //     url: 'https://onemeal.site/resultrecipe',
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: true,
        //     data: { foodName: this.foodName, foodImg: this.foodImg }
        // })
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }


    render() {
        return (
            <div className="back">
                <div className='loginContainer'>
                    <img className='X' src={x} onClick={this.props.loginModalHandler} />
                    <div className="middleContainer">
                        <div className="title">셰프의 선택은</div>
                        <div className="resultName">계란 볶음밥</div>
                        <div className="resultImg" />
                        <div className="text">친구들에게 <span className="text1">고독한 한끼</span>를 소개해보세요!</div>
                        <div className='block' />
                        <img className='kakao' src={kakao} alt='kakao'/>
                    </div>
                </div>
            </div >
        )
    }
}


export default withRouter(Share)


      