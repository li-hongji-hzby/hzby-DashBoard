import React, { Component } from 'react'
import { Button, Header, Icon, Label, Form } from 'semantic-ui-react'
import cookie from 'react-cookies';
import axios from 'axios';

import './style.css';
import '../../server'



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
    let resMsg = await axios.post('http://139.196.28.123/API/user/login', {
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
    cookie.save("userMsg", msg['jwt'],{maxAge: 5000})
    cookie.save("user", msg['user'],{maxAge: 5000})
    this.props.history.push('/Home')
    
  }

  
  render() {
    return (
      <div className="locate-middle d-flex" style={{'width':'40%','height':'50%','backgroundColor':'#23242D','color':'#e1e1e1'}}>
        <Form color="black"
              className="d-flex"
              style={{'backgroundColor':'#23242D','color':'#e1e1e1','width':'50%','height':'100%',
                      'alignItems':'start','flexDirection':'column','justifyContent':'center','padding':'3rem'}}>
            <Form.Field>
                <Header size='huge' className="YaHei" style={{'color':'#e1e1e1','fontSize':'3rem'}}>登录</Header>
            </Form.Field>
            <Form.Field className='d-flex'>
              <Label  color='blue' pointing='right' className="YaHei d-flex-center" 
                      style={{'fontSize':'0.5rem','whiteSpace': 'nowrap','width':'5rem','marginRight':'1rem'}}>用户名</Label>
              <input className="YaHei" placeholder='请输入用户名' value={this.state.username} onChange={this.usernameChange.bind(this)} />
            </Form.Field>
            <Form.Field className='d-flex'>
              <Label  color='blue' pointing='right' className="YaHei d-flex-center" 
                      style={{'fontSize':'0.5rem','whiteSpace': 'nowrap','width':'5rem','marginRight':'1rem'}}>密码</Label> 
              <input className="YaHei" placeholder='请输入密码' type="password" value={this.state.password} onChange={this.passwordChange.bind(this)}/>
            </Form.Field>
            <Form.Field>
              <Button className="YaHei" color='green'  inverted  onClick={() => this.Login()}>
                <Icon name='checkmark'/> 登录
              </Button>
            </Form.Field>
        </Form>
        <div style={{'flex':1,'height':'100%','backgroundColor':'#302684'}}>

        </div>
      </div>
    )
  }
}
