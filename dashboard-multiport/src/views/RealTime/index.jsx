import React, { Component } from 'react'
import { Col, Row, Container, Card, Badge, Table } from 'react-bootstrap'
import Axios from 'axios';
import cookie from 'react-cookies';

import './style.css'

const bgColors = [ "#352B9B","#448BCD","#DF9B28","#C65757",]
export class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mainDatas:{
        "流量":{
          "data":"",
          "unit":"m³/min"
        },
        "功率":{
          "data":"",
          "unit":"kw"
        },
        "压力":{
          "data":"",
          "unit":"Mpa"
        },
        "单耗":{
          "data":"",
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
    let result = await Axios.get("/RealTime/listRealTimeDatas").then(res =>{
      return res.data
    }).catch(err => {
      console.log(err)
      this.props.history.push('/Login')
      return {}
    })
    // console.log(result)
    let newData = this.state.tableDatas
    for(let i in result['realTimeDatas']){
      let arr=[]
      for(let j in result['realTimeDatas'][i]){
        arr.push(Object.values(result['realTimeDatas'][i][j]))
      }
      newData[i]['datas'] = arr
    }
    let newMainDatas = this.state.mainDatas
    for(let i in result['realtimeOverview']){
      newMainDatas[result['realtimeOverview'][i]['property']]['data'] = result['realtimeOverview'][i]['value']
    }
    this.setState({
      tableDatas:newData,
      mainDatas:newMainDatas
    })
    // console.log(newData)
  }

  render() {
    return (
      <Container fluid className="ml-0 mr-0">
        <Row>
          { Object.keys(this.state.mainDatas).map((key, index) => 
            <Col lg={3} md={6} sm={6} key={index} className="d-flex justify-content-center align-items-center">
              <Card className="self-card realtime-top-card top-divider">
                <Card.Header className="d-flex justify-content-center align-items-center" style={{"backgroundColor":bgColors[index]}}>
                  <h2>{key}</h2>
                </Card.Header>
                <Card.Body className="self-card-content d-flex justify-content-center align-items-center" style={{ "position": "relative" }}>
                  <h2>{this.state.mainDatas[key]['data']}</h2>
                  <h3 style={{"padding":"5px"}}>{this.state.mainDatas[key]['unit']}</h3>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
        {Object.keys(this.state.tableDatas).map((key, index) =>
          <Row className="w-100 top-divider mr-0 ml-0" key={index}>
            <Card className="w-100 self-card" style={{"boxShadow":"none"}}>
              <Card.Header className="d-flex justify-content-start align-items-center self-card-header">
                <Badge className="p-2 h-100" style={{"backgroundColor":this.state.labelColor}} variant="primary">{key}</Badge>
              </Card.Header>
              <Card.Body className=" self-card-content">
                <Table className="self-table global-color" striped bordered>
                  <thead>  
                    <tr>
                      {this.state.tableDatas[key].labels.map((label, index) =>
                          <th key={index}>{label}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.tableDatas[key].datas.map((data, index) =>
                        <tr key={index}>
                          {data.map((msg, index) => 
                              typeof(msg) == 'boolean'
                              ? (<td key={index} ><div style={{"height":"15px","width":"15px","borderRadius":"50%","backgroundColor":msg?"green":"red"}}></div></td> )
                              : (<td key={index} >{ msg }</td> )
                          )}
                        </tr>
                      )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Row>
        )}
      </Container>
    )
  }
}

export default index
