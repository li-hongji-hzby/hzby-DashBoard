import React, { Component } from 'react'
import cookie from 'react-cookies';
import axios from 'axios';
import { Image, Form } from 'react-bootstrap'

import style from './style.module.css';

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
    cookie.remove("project",{ path: '/' })
    localStorage.clear();
    cookie.save("userMsg", msg['jwt'],{maxAge: 1000*60*2880})
    cookie.save("user", msg['user'],{maxAge: 1000*60*2880})
    cookie.save("project", msg['project'],{maxAge: 1000*60*2880})
    window.localStorage.setItem("realtimePage",JSON.stringify(msg['pageConfig']['realtimePage']));
    window.localStorage.setItem("historyPage",JSON.stringify(msg['pageConfig']['historyPage']));
    // cookie.save("realtimePage", msg['pageConfig']['realtimePage'],{maxAge: 1000*60*2880})
    // cookie.save("historyPage", msg['pageConfig']['historyPage'],{maxAge: 1000*60*2880})
    this.props.history.push('/Home')
    
  }

  componentDidMount(){
    cookie.remove("userMsg",{ path: '/' })
    cookie.remove("user",{ path: '/' })
    cookie.remove("project",{ path: '/' })
    localStorage.clear();
  }

  render() {
    return (
      <div className={style.loginPage + " w-100 h-100"}>
        <Form className={style.loginBox} action="javascript:;">
          <Image className={style.loginLogo} src={logo} fluid />
          <div className={style.inputBox}>
            <input className={style.userInput} type="text"  value={this.state.username} onChange={this.usernameChange.bind(this)}/>
            <img className={style.userIcon} src={userIcon} alt=""/>
          </div>
          <div className={style.inputBox}>
            <input className={style.pwdInput} type="password" value={this.state.password} onChange={this.passwordChange.bind(this)}/>
            <img className={style.pwdIcon}  src={pwdIcon} alt=""/>
          </div>
          <button type="submit" className={style.loginBtn} onClick={() => {this.Login()}}>登录</button>
        </Form>
      </div>
    )
  }
}
