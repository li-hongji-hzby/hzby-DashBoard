import React, { Component } from 'react'
import { Row, Col, Button, Image } from 'react-bootstrap'

import brand from './brand.png'
import logo from './logo.png';
import style from './DefaultHeader.module.css'

class index extends Component {

  render() {
    return (
      <Row lg={12} md={12} sm={12} className="h-56 m-0 d-flex justify-content-center align-items-center">
        <div className={style.logoBox + " d-flex justify-content-center align-items-center self-border-bottom-dark self-border-right-dark"}>
          <img src={brand} style={{"width":"80%"}} alt=""/>
        </div>
        <Col className="h-56 d-flex justify-content-between pt-2 pb-2 pl-3 pr-3 self-border-bottom-dark">
          <Button className={style.sidebarBtn} variant="dark" size="sm" onClick={()=>this.props.sideBarVisible()}>
            <svg className="bi bi-list" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" clipRule="evenodd"/>
            </svg>
          </Button>
          {/* <Button className="mobile-sidebar-btn" variant="dark" size="sm" onClick={()=>this.props.mobileSideBarVisible()}>
            <svg className="bi bi-list" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" clipRule="evenodd"/>
            </svg>
          </Button> */}
          <div className={style.mobileLogoBox}>
            <img src={brand} style={{"width":"80%"}} alt=""/>
          </div>
          <div className="d-flex justify-content-between align-items-center" >
            <div className={style.usernameBox}>{this.props.user===undefined?"未登录":this.props.user}</div>
            <Image src={logo} className={style.headerUserIcon + " mr-2 ml-2"}  roundedCircle />
            <Button variant="danger" className={style.logoutBtn} size="sm" onClick={ () => this.props.logout() }>退出登录</Button>
          </div>
        </Col>
      </Row>
    )
  }
}

export default index
