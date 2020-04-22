import React, { Component } from 'react';
import { Grid, Card, Header, Label, Table } from 'semantic-ui-react';
import Axios from 'axios';
import cookie from 'react-cookies';

import '../../server'


const bgColors = [ "#352B9B","#448BCD","#DF9B28","#C65757",]

class index extends Component {

  constructor(props){
    super(props)
    this.state={
      mainDatas:{
        "空气流量":{
          "data":"12",
          "unit":"m³/min"
        },
        "功率":{
          "data":"20",
          "unit":"kw"
        },
        "压力":{
          "data":"15",
          "unit":"Mpa"
        },
        "气电比":{
          "data":"99",
          "unit":"kWh/m³"
        },
      },
      tableDatas:{
        "空压机":{    
          "labels":['机器','状态','出口压力','功率',"频率","排气温度"],
          "datas":[]
        },
        "干燥机":{    
          "labels":['机器','状态','压力','功率',"露点"],
          "datas":[]
        },
        "流量计":{
          "labels":['机器','状态','流量'],
          "datas":[]
        }
      }
    }
  }

  
  intervalId 

  componentDidMount() {

    if(cookie.load('userMsg') === undefined){
      this.props.history.push('/Login')
    }
    this.getTableDatas()
    this.intervalId = setInterval(() => {
      this.getTableDatas()
    }, 10*1000);
  }

  componentWillUnmount(){
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  getTableDatas = async () => {
    let result = await Axios.get("http://139.196.28.123/API/RealTime/listRealTimeDatas").then(res =>{
      return res.data
    }).catch(err => {
      console.log(err)
      this.props.history.push('/Login')
      return {}
    })
    // console.log(result)
    let newData = this.state.tableDatas
    for(let i in result){
      let arr=[]
      for(let j in result[i]){
        arr.push(Object.values(result[i][j]))
      }
      newData[i]['datas'] = arr
    }
    this.setState({
      tableDatas:newData
    })
    // console.log(newData)
  }

  render() {
    return (
      <Card className="w-100" style={{"boxShadow":"none"}}>
        {/* <Card.Content className="color-gray" style={{"backgroundColor":"#0A0B18","padding":"1rem 3rem 1rem 1.5rem"}}>
          <Card.Header className="d-flex" style={{"justifyContent":"start","alignItems":"center"}}>
            <Label className="d-flex"  color='blue'style={{"justifyContent":"start","alignItems":"center"}} >
              <Icon name="align left" className="color-gray" style={{"marginRight":"10px"}} />
              <Header as='h2' className="color-gray m-0">机房数据</Header>
            </Label>
          </Card.Header>
        </Card.Content> */}
        <Card.Content className="d-flex" style={{"backgroundColor":"#0A0B18","justifyContent":"start","padding":"20px 30px","flexWrap":"wrap"}}>
          <Grid className="my-card">
            <Grid.Row className="w-100 d-flex" style={{"justifyContent":"start","padding":"20px 30px","flexWrap":"wrap"}}>
              { Object.keys(this.state.mainDatas).map((key, index) => 
                <Grid.Column width={4} key={index}>
                  <Card style={{"boxShadow":"none","backgroundColor":bgColors[index]}}>
                    <Card.Content className="color-gray" style={{"padding":"1rem","backgroundColor":bgColors[index]}}>
                      <Card.Header className="d-flex" style={{"justifyContent":"center","alignItems":"center","backgroundColor":bgColors[index]}}>
                          <Header as='h2' className="color-gray m-0 YaHei">{key}</Header>
                      </Card.Header>
                    </Card.Content>
                    <Card.Content className="color-gray card-body d-flex-center" style={{}}>
                      <Header as='h2' className="color-gray m-0">{this.state.mainDatas[key]['data']}</Header>
                      <Header as='h3' className="color-gray m-0" style={{"padding":"5px"}}>{this.state.mainDatas[key]['unit']}</Header>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              )}
              
            </Grid.Row>
            {Object.keys(this.state.tableDatas).map((key, index) =>
              <Grid.Row className="w-100" style={{"padding":"20px 30px"}} key={index}>
                <Card className="w-100" style={{"boxShadow":"none"}}>
                  <Card.Content className="color-gray card-header">
                    <Card.Header className="d-flex" style={{"justifyContent":"start","alignItems":"center"}}>
                      <Label className="d-flex"  color='blue'style={{"justifyContent":"start","alignItems":"center"}} >
                        <Header as='h2' className="color-gray m-0 YaHei">{key}</Header>
                      </Label>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content className="color-gray card-body">
                    <Table celled className="table-dark">
                      <Table.Header>  
                        <Table.Row>
                          {this.state.tableDatas[key].labels.map((label, index) =>
                              <Table.HeaderCell key={index}>{label}</Table.HeaderCell>
                          )}
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                          {this.state.tableDatas[key].datas.map((data, index) =>
                            <Table.Row key={index}>
                              {data.map((msg, index) => 
                                  typeof(msg) == 'boolean'
                                  ? (<Table.Cell key={index} ><div style={{"height":"15px","width":"15px","borderRadius":"50%","backgroundColor":msg?"green":"red"}}></div></Table.Cell> )
                                  : (<Table.Cell key={index} >{ msg }</Table.Cell> )
                              )}
                            </Table.Row>
                          )}
                      </Table.Body>
                    </Table>
                  </Card.Content>
                </Card>
              </Grid.Row>
            )}
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

export default index;
