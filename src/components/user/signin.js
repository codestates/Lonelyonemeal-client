import React, { Component } from 'react'
import go from './img2/go.png'
import github from './img2/github.png'
import google from './img2/google.png'
import {Link , withRouter} from 'react-router-dom'


class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            password: ""
        };
        this.handleInputValue = this.handleInputValue
        this.loginRequestHandler = this.loginRequestHandler.bind(this)
    }
    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value })
    }
    //async 
    loginRequestHandler() {
        // await axios.post("https://localhost:2426/users/login",{userId : this.state.userId, password : this.state.password}, {withCredentials:true})
        // this.props.loginHandler()

        // let gotIt = await axios.get("https://localhost:4000/users/userinfo",{withCredentials:true})
        // this.props.setUserInfo(gotIt.data.data)
    }
    render() {
        return (
            <div className="back">
                <div className='loginContainer'>
                    <div className="middleContainer">
                        <img className="go" src={go} alt="go" />
                        <div className='block1' />

                        <input
                            className="inputBox"
                            name='userId'
                            onChange={(e) => this.handleInputValue(e)}
                            placeholder='아이디'
                            type='text' />
                        <div className='block' />
                        <input
                            className="inputBox"
                            name='password'
                            onChange={(e) => this.handleInputValue(e)}
                            placeholder='비밀번호'
                            type='password' />
                        <div className='block' />
                        <button className="button">로그인</button>
                        <div className='block' />
                        <span className="text">아직 아이디가 없으신가요?   <Link to='/signup' className="but">회원가입</Link></span>
                        <div className='block' />
                        <div>
                            <img className="github" src={github} alt="github" /> <img className="google" src={google} alt="google" />
                        </div>
                    </div>
                    <div className="ex">2021 Baegopudo all rights reserved.</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signin)