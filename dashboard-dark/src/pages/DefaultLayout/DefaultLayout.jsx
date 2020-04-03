import React, { Component } from 'react';
import { Grid, Breadcrumb } from 'semantic-ui-react';
import '../../style/global-style.css';
import MySideBar from '../../components/MySideBar/MySideBar';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';

import MainData from '../../views/MainData';
import MachineDetail from '../../views/MachineDetail'
import MachineRoom from '../../views/MachineRoom'
import '../../style/global-style.css'


const HomeButton= () => {
  let history = useHistory();
  function handleClick() {
    history.push("/");
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
      menuDatas:[
        {        
          "name":"数据概览",
          "url":"/",
          "children":[]
        },
        {        
          "name":"实时数据",
          "url":"/MachineRoom",
          "children":[]
        },
        {        
          "name":"历史数据",
          "url":"/",
          "children":[
            {
              "name":"空压机一号",
              "url":"/Machine",
            },
            {
              "name":"空压机二号",
              "url":"/Marchine",
            },
          ]
        },
      ]
    }
  }

  render() {
    return (
        <Grid divided style={{"height":"100%"}} >
          {/* header */}
          <Grid.Row className="d-flex-center w-100 p-0 top" style={{"height":"10%"}}>
            <Grid.Column className="d-flex-center h-100" width={2}>
              header
            </Grid.Column>
            <Grid.Column className="d-flex-center h-100"  width={14}
                      style={{"backgroundColor": "#2c2c34","borderBottom":"1px solid #181924"}} >
            </Grid.Column>
          </Grid.Row>
          {/* header */}
          {/* main */}
          <Grid.Row className="d-flex w-100 p-0" style={{"height":"80%"}}>
            {/* 菜单 */}
            <Grid.Column  width={2} className="p-0"
                style={{"overflowY":"hidden","flex":"1", "backgroundColor": "#2c2c34","borderRight":"1px solid #181924"}}
            >
              { this.state.menuDatas.map((key, index) =>
                <MySideBar key={index} menuData={key}></MySideBar>
              )}
            </Grid.Column>
            {/* 菜单 */}
            <Grid.Column width={14} className="p-0" style={{"maxHeight":"100%"}}>
              <Grid.Row className="d-flex " 
                        style={{"height":"5%","backgroundColor": "#2c2c34","padding":"0 20px","justifyContent":"start","alignItems":"center"}} >
                <Breadcrumb>
                  <HomeButton></HomeButton>
                  <Breadcrumb.Divider style={{"color":"#e1e1e1"}} />
                  <Breadcrumb.Section link>{this.props.location.pathname.substr(1)}</Breadcrumb.Section>
                </Breadcrumb>
              </Grid.Row>
              <Grid.Row style={{"height":"95%","flex":"1", "backgroundColor":"#0A0B18", "padding":"2rem","overflowY":"scroll"}}>
                  <Switch>
                      <Route exact path='/' component={MainData}/>
                      <Route exact path='/Machine' component={MachineDetail}/>
                      <Route exact path='/MachineRoom' component={MachineRoom}/>
                  </Switch>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          {/* main */}
          <Grid.Row className="d-flex-center w-100 p-0" style={{"height":"10%"}}>
            <Grid.Column className="d-flex-center h-100" width={2}>
              header
            </Grid.Column>
            <Grid.Column className="d-flex h-100" width={14}
                      style={{"justifyContent":"space-between","alignItems":"center","padding":"0 1.5rem","backgroundColor": "#2c2c34"}}
            >
              <div>涵智博雅 © 2020 creativeLabs.</div>
              <div>Powered by Semantic UI</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}
export default withRouter(DefaultLayout);
