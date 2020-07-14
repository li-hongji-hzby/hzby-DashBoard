import React, { Component } from 'react'
import { Col, Row, Container, Card, Badge, Table } from 'react-bootstrap'
import Axios from 'axios';
import cookie from 'react-cookies';

import style from './style.module.css'

const bgColors = [ "#352B9B","#448BCD","#DF9B28","#C65757",]




export class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tableMsg:[],
      mainDatas:{
        "流量":{
          "data":"",
          "unit":"m³/min"
        },
        "功率":{
          "data":"",
          "unit":"kW"
        },
        "压力":{
          "data":"",
          "unit":"bar"
        },
        "单耗":{
          "data":"",
          "unit":"kWh/m³"
        },
      },
      tableDatas:{
      }
    }
    // console.log(cookie.load("pageConfig")['historyPage'])
  }

  intervalId 
  
  componentDidMount() {
    if(cookie.load('userMsg') === undefined){
      this.props.history.push('/Login')
    } 
    // 获取localStorage数据并进进行处理
    let tableMsg = {}
    let realPage = JSON.parse(localStorage.getItem("realtimePage"))
    let tableDatas = JSON.parse(JSON.stringify(this.state.tableDatas))
    for(let i in realPage){
      tableMsg[i]={}
      tableMsg[i]["attributes"]={}
      tableMsg[i]['machines']={}
      tableDatas[i] = {}
      tableDatas[i]["labels"] = ["机器","状态"]
      JSON.parse(realPage[i][0]['attributeList']).map(e => {
        tableMsg[i]["attributes"][e["attributeNameCn"]]=e["attributeNameEn"]
        tableDatas[i]["labels"].push(e["attributeNameCn"])
        return 0
      })
      Object.keys(realPage[i]).map( e => {
        tableMsg[i]['machines'][realPage[i][e]["machineNameZh"]]=realPage[i][e]["machineNameEn"]
        return 0
      })
    }
    this.setState({
      tableMsg:tableMsg,
      tableDatas:tableDatas
    })
    this.getTableDatas(tableMsg)
    this.getSummary()
    this.intervalId = setInterval(() => {
      this.getSummary()
      this.getTableDatas(tableMsg)
    }, 10*1000);
  }

  componentWillUnmount(){
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  getTableDatas = async ( tableMsg ) => {
    Axios.post("/RealTime/listRealTimeDatasCache",{
      tableMsg:tableMsg,
      project:cookie.load('project')
    }).then(res =>{
      let newData = JSON.parse(JSON.stringify(this.state.tableDatas))
      let result = res.data
      Object.keys(result).map( e => {
        newData[e]["datas"]=[]
        for(let item in result[e]){
          let getDataArr = []
          Object.values(result[e][item]).map( e => getDataArr.push(e))
          newData[e]["datas"].push(getDataArr)
        }
        return {}
      })
      this.setState({
        tableDatas:newData
      })
      return {}
    }).catch(err => {
      console.log(err)
      // let toLogin = ()=>{this.props.history.push('/Login')}
      // GlobalModal.alert({ contentText: '请重新登录', onOk(){toLogin()}})
      return {}
    })
    // console.log(newData)
  }

  getSummary = async () => {
    Axios.post("/RealTime/getRealtimeSummary",{
      project:cookie.load('project')
    }).then(res =>{
      let result = res.data
      let newMainDatas = JSON.parse(JSON.stringify(this.state.mainDatas))
      Object.keys(result).map( e => {
        newMainDatas[e]["data"] = result[e]
        return {}
      })
      this.setState({
        mainDatas:newMainDatas
      })
      return {}
    }).catch(err => {
      console.log(err)
      // this.props.history.push('/Login')
      // let toLogin = ()=>{this.props.history.push('/Login')}
      // GlobalModal.alert({ contentText: '请重新登录', onOk(){toLogin()}})
      return {}
    })
    
  }

  render() {
    return (
      <Container fluid className="ml-0 mr-0">
        <Row>
          { Object.keys(this.state.mainDatas).map((key, index) => 
            <Col lg={3} md={6} sm={6} key={index} className="d-flex justify-content-center align-items-center">
              <Card className={style.realtimeTopCard + " self-card top-divider"}>
                <Card.Header className="d-flex justify-content-center align-items-center" style={{"backgroundColor":bgColors[index]}}>
                  <h2>{key}</h2>
                </Card.Header>
                <Card.Body className="self-card-content d-flex justify-content-center align-items-center" style={{ "position": "relative" }}>
                  <h2>{ this.state.mainDatas[key]['data']}</h2>
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
                      { this.state.tableDatas[key].labels.map((label, index) =>
                          <th key={index}>{label}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.tableDatas[key]["datas"] && Object.keys(this.state.tableDatas[key]["datas"]).map((data, index) =>
                        <tr key={index}>
                          
                        { Object.keys(this.state.tableDatas[key]["datas"][data]).map((msg, index) => 
                            typeof(this.state.tableDatas[key]["datas"][data][msg]) == 'boolean' 
                            ? (<td key={index} ><div style={{"height":"15px","width":"15px","borderRadius":"50%","backgroundColor":this.state.tableDatas[key]["datas"][data][msg]?"green":"red"}}></div></td> )
                            : (<td key={index} >{ typeof(this.state.tableDatas[key]["datas"][data][msg]) =='string' ? this.state.tableDatas[key]["datas"][data][msg] :(parseFloat(this.state.tableDatas[key]["datas"][data][msg])).toFixed(2) }</td> )
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
