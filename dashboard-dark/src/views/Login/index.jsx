import React, { Component } from 'react'
import { Button, Header, Icon, Label, Form } from 'semantic-ui-react'
import cookie from 'react-cookies';

import './style.css';



export default class index extends Component {

  Login = () => {
    cookie.save("user","用户",{maxAge: 6})
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
              <input className="YaHei" placeholder='请输入用户名' />
            </Form.Field>
            <Form.Field className='d-flex'>
              <Label  color='blue' pointing='right' className="YaHei d-flex-center" 
                      style={{'fontSize':'0.5rem','whiteSpace': 'nowrap','width':'5rem','marginRight':'1rem'}}>密码</Label> 
              <input className="YaHei" placeholder='请输入密码' />
            </Form.Field>
            <Form.Field>
              <Button className="YaHei" color='green'  inverted  onClick={() => this.Login()}>
                <Icon name='checkmark'/> 登录
              </Button>
            </Form.Field>
        </Form>
        <div style={{'flex':1,'height':'100%','backgroundColor':'#4638C2'}}>

        </div>
      </div>
    )
  }
}
