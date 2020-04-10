import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import cookie from 'react-cookies';

export default class index extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }
  
  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  login = () => {
    cookie.save("user","用户")
    this.setState({ open: false })
    console.log(cookie.load('user'))
    this.props.getLogin("用户");
  }
  render() {
    return (
      <Modal  size='small'
              closeOnEscape={true}
              closeOnDimmerClick={false}
              open={this.props.open}
              className="YaHei"
      >
        <Header className="YaHei" icon='archive' content='用户登录' />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label className="YaHei">用户名</label>
              <input className="YaHei" placeholder='请输入用户名' />
            </Form.Field>
            <Form.Field>
              <label className="YaHei">密  码</label>
              <input className="YaHei" placeholder='请输入密码' />
            </Form.Field>
            <Button className="YaHei" color='green'  inverted  onClick={this.login}>
              <Icon name='checkmark' /> 登录
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}
