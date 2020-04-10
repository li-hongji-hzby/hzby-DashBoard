import React, { Component, Suspense } from 'react';
import { Grid, Breadcrumb, Button, Image } from 'semantic-ui-react';
import '../../style/global-style.css';
import MySideBar from '../../components/MySideBar/MySideBar';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import cookie from 'react-cookies';


import _nav from '../../_nav'
import routers from '../../router'
import '../../style/global-style.css';
import logo from '../DefaultLayout/logo.png';




const HomeButton= () => {
  let history = useHistory();
  function handleClick() {
    history.push("/Home");
  }
  return (
    <Breadcrumb.Section type="button" onClick={handleClick}>
      Home
    </Breadcrumb.Section>
  );
}


class DefaultLayout extends Component {

  constructor(props){
    super(props)
    this.state={
      user:cookie.load('user'),
      menuVisiable:true,
      loginOpen:false,
    }
  }

  loading = () => <div className="">载入中...</div>

  menuVisiable = () => {
    this.setState({
      menuVisiable:!this.state.menuVisiable
    })
  }


  logout = () => {
    cookie.remove("user",{ path: '/' })
    this.setState({
      user:undefined,
    })
    console.log(cookie.load('user'))
  }
  login(value) {
    this.setState({
      user: value,
      loginOpen: !this.state.loginOpen
    })
  }

  loginOpen = () => {
    this.setState({
      loginOpen: !this.state.loginOpen
    })
  }
  
  render() {
    return (
        <Grid divided style={{"height":"100%", "margin": 0}} >
          {/* header */}
          <Grid.Row className="d-flex-center w-100 p-0 top" style={{"height":"8%"}}>
            <Grid.Column  className="h-100" width={2} 
                          style={{"display":this.state.menuVisiable?"flex":"none","justifyContent":"center",
                                  "alignItems":"center"}}>
              header
            </Grid.Column>
            <Grid.Column className="d-flex h-100"  
                      style={{"flex":1,"backgroundColor": "#2c2c34","borderBottom":"1px solid #181924",
                              "justifyContent":"space-between","alignItems":"center","padding":"20px"}} >
              <Button onClick={() => this.menuVisiable()} color='black' icon='align justify' size="big" />
              <div style={{"padding":"0 3rem","boxSizing":"border-box"}}>
                <span>{this.state.user===undefined?'未登录':this.state.user}</span>
                <Image style={{"margin":"0 1rem"}} src={logo} avatar />
                <Button positive size="mini" style={{"display":this.state.user===undefined?"inline-block":"none"}} 
                        onClick={()=> this.props.history.push('/Login')}>
                    登录
                </Button>
                <Button onClick={this.logout} style={{"display":this.state.user===undefined?"none":"inline-block"}}
                        negative size="mini">退出登录</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
          {/* header */}
          {/* main */}
          <Grid.Row className="d-flex w-100 p-0" style={{"height":"84%"}}>
            {/* 菜单 */}
            <Grid.Column  width={2} className="p-0"
                style={{"overflowY":"hidden", "backgroundColor": "#2c2c34","borderRight":"1px solid #181924",
                        "display":this.state.menuVisiable?"block":"none"}}
            >
              
              <Suspense fallback={this.loading()}>
                { _nav.map((key, index) =>
                  <MySideBar key={index} menuData={key}></MySideBar>
                )}
              </Suspense>
            </Grid.Column>
            {/* 菜单 */}
            <Grid.Column className="p-0" style={{"flex":1,"maxHeight":"100%"}}>
              <Grid.Row className="d-flex " 
                        style={{"height":"5%","backgroundColor": "#2c2c34","padding":"0 20px",
                                "justifyContent":"start","alignItems":"center"}} >
                <Breadcrumb>
                  <HomeButton></HomeButton>
                  <Breadcrumb.Divider style={{"color":"#e1e1e1"}} />
                  <Breadcrumb.Section link>{this.props.location.pathname.substr(6)}</Breadcrumb.Section>
                </Breadcrumb>
              </Grid.Row>
              <Grid.Row style={{"height":"95%","flex":"1", "backgroundColor":"#0A0B18", 
                                "padding":"2rem","overflowY":"scroll"}}>
                <Suspense fallback={this.loading()}>
                  <Switch>
                      { routers.map((route,index) => {
                        return route.component ? (
                          <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                              <route.component {...props} />
                            )} />
                        ) : (null);
                      })}
                  </Switch>
                </Suspense>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          {/* main */}
          <Grid.Row className="w-100 p-0" style={{"height":"8%"}}>
            <Grid.Column  className="h-100" width={2}
                          style={{"display":this.state.menuVisiable?"flex":"none",
                                  "justifyContent":"center","alignItems":"center"}}>
              header
            </Grid.Column>
            <Grid.Column  className="d-flex h-100" 
                          style={{"flex":1,"justifyContent":"space-between","alignItems":"center",
                                  "padding":"0 1.5rem","backgroundColor": "#2c2c34"}}>
              <div>涵智博雅 © 2020 creativeLabs.</div>
              <div>Powered by Semantic UI</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}
export default withRouter(DefaultLayout);
