import React, { Component } from 'react'
import go from './img2/go.png'
import {Link , withRouter} from 'react-router-dom'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            userName: "",
            password: "",
            checkPassword: "",
            errorMessage: ""
        }
        this.handleInputValue = this.handleInputValue.bind(this)
    }
    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value })
    }
    hadleSignup = () => {
        // if (this.state.username === '' || this.state.password === '' || this.state.mobile === '' || this.state.email === '') {
        //     this.setState({ errorMessage: '모든 항목은 필수입니다' })
        // }else if(this.state.password !== this.state.checkPassword){
        //     this.setState({errorMessage: '비밀번호가 일치하지 않습니다.'})
        // } else {
        //     await axios.post('http://localhost:2426/signup', {
        //         userId: this.state.userId,
        //         userName: this.state.userName,
        //         password: this.state.password,
        //         checkPassword: this.state.checkPassword
        //     }, {
        //         withCredentials: true
        //     })
        // }
    }

    render() {
        return (
            <div className="back">
                <div className='loginContainer'>
                    <div className="middleContainer">
                        <img className="go" src={go} alt="go" />
                        <input
                            className="inputBox"
                            name='userId'
                            onChange={(e) => this.handleInputValue(e)}
                            placeholder='아이디'
                            type='text' />
                        <div className='block' />
                        <input
                            className="inputBox"
                            name='username'
                            onChange={(e) => this.handleInputValue(e)}
                            placeholder='이름'
                            type='text' />
                        <div className='block' />
                        <input
                            className="inputBox"
                            name='password'
                            onChange={(e) => this.handleInputValue(e)}
                            placeholder='비밀번호'
                            type='password' />
                        <div className='block' />
                        <input
                            className="inputBox"
                            name='checkPassword'
                            onChange={(e) => this.handleInputValue(e)}
                            placeholder='비밀번호'
                            type='password' />
                        <div className='block' />
                        <button className="button">회원가입</button>
                        <div className='block' />
                        <span className="text">아이디가 있으신가요?   <Link to='/signin' className="but">로그인</Link></span>
                        <div className='block' />
                    </div>
                    <div className="ex">2021 Baegopudo all rights reserved.</div>
                </div>
            </div >
        )
    }
}


export default withRouter(Signup)