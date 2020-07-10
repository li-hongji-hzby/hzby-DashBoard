import React, { Component } from 'react'
import { Row, Col, Button, Image, ButtonGroup, DropdownButton, Dropdown,  } from 'react-bootstrap'
import cookie from 'react-cookies';
import Axios from 'axios'

import Toast from '../../../component/GlobalToast'

import brand from './brand.png'
import logo from './logo.png';
import style from './DefaultHeader.module.css'

class index extends Component {

  constructor(props){
    super(props)
    this.state = {
      projectName:'',
      projectMap:{}
    }
  }

  // 选择项目
  setProject = project => {
    Toast.loading("项目切换中", 1000,()=>Toast.success("项目切换成功"))
    Axios.get("/PageConfig/getConfigByProject",{
      params: {
        "project":this.state.projectMap[project],
      }
    }).then(res =>{
      let result = res.data
      window.localStorage.setItem("realtimePage",JSON.stringify(result['realtimePage']));
      window.localStorage.setItem("historyPage",JSON.stringify(result['historyPage']));
      let projectCookie = cookie.load('project') 
      projectCookie['projectNameEn'] = this.state.projectMap[project]
      projectCookie['projectNameZh'] = project
      cookie.remove("project",{ path: '/' })
      cookie.save("project", projectCookie,{maxAge: 1000*60*2880})
      this.props.reRenderMainContent()
    }).catch(err => {
      
    })
    this.setState({
      projectName:this.state.projectMap[project]
    })
  }

  componentDidMount(){
    console.log(cookie.load('project'))
    this.setState({
      projectName:cookie.load('project')['projectNameZh'],
      projectMap:JSON.parse(localStorage.getItem("allProject"))
    })
    
  }

  render() {
    return (
      <Row lg={12} md={12} sm={12} className="h-56 m-0 d-flex justify-content-center align-items-center">
        <div className={style.logoBox + " d-flex justify-content-center align-items-center self-border-bottom-dark self-border-right-dark"}>
          <img src={brand} style={{"width":"80%"}} alt=""/>
        </div>
        <Col className="h-56 d-flex justify-content-between pt-2 pb-2 pl-3 pr-3 self-border-bottom-dark">
          <div className={"d-flex"}>
            <Button className={style.sidebarBtn} variant="dark" size="sm" onClick={()=>this.props.sideBarVisible()}>
              <svg className="bi bi-list" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" clipRule="evenodd"/>
              </svg>
            </Button>
            <div className={style.mobileLogoBox + " mr-2"}>
              <img src={brand} style={{"width":"80%"}} alt=""/>
            </div>
            
            <DropdownButton size="sm" className="ml-2 mobile-top-divider" as={ButtonGroup} title={this.state.projectName} variant="dark">
              <Dropdown.Item disabled>项目列表</Dropdown.Item>
              { Object.keys(this.state.projectMap).map( (key,index) => 
                <Dropdown.Item onClick={ () =>this.setProject(key)} key={index} >{key}</Dropdown.Item>
              )}
            </DropdownButton>
          </div>
          {/* <Button className="mobile-sidebar-btn" variant="dark" size="sm" onClick={()=>this.props.mobileSideBarVisible()}>
            <svg className="bi bi-list" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" clipRule="evenodd"/>
            </svg>
          </Button> */}
          
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
