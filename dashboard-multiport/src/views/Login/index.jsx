import React, { Component } from 'react'
import cookie from 'react-cookies';
import axios from 'axios';
import { Image, Form } from 'react-bootstrap'

import './style.css';

import logo from './images/logo.png'
import userIcon from './images/userIcon.png'
import pwdIcon from './images/pwdIcon.png'



export default class index extends Component {

  constructor(props){
    super(props)
    this.state={
      username:"",
      password:""
    }
  }

  usernameChange = (e) => {
    this.setState({
      username:e.target.value
    })
  }

  passwordChange = (e) => {
    this.setState({
      password:e.target.value
    })
  }
  Login = async () => {
    let resMsg = await axios.post('/user/login', {
      username : this.state.username,
      password : this.state.password
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
      return {}
    })
    let msg = JSON.parse(resMsg['msg'])
    cookie.remove("userMsg",{ path: '/' })
    cookie.remove("user",{ path: '/' })
    cookie.save("userMsg", msg['jwt'],{maxAge: 1000*60*2880})
    cookie.save("user", msg['user'],{maxAge: 1000*60*2880})
    this.props.history.push('/Home')
    
  }

  render() {
    return (
      <div className="login-page w-100 h-100">
        <Form className="login-box" action="javascript:void(0);">
          <Image className="login-logo" src={logo} fluid />
          <div className="input-box">
            <input className="user-input" type="text"  value={this.state.username} onChange={this.usernameChange.bind(this)}/>
            <img className="user-icon" src={userIcon} alt=""/>
          </div>
          <div className="input-box">
            <input className="pwd-input" type="password" value={this.state.password} onChange={this.passwordChange.bind(this)}/>
            <img className="user-icon" src={pwdIcon} alt=""/>
          </div>
          <button type="submit" className="login-btn" onClick={() => {this.Login()}}>登录</button>
        </Form>
      </div>
    )
  }
}
