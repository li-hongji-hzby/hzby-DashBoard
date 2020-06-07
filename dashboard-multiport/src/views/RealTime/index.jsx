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
    console.log(realPage)
    for(let i in realPage){
      tableMsg[i]={}
      tableMsg[i]["attributes"]={}
      tableMsg[i]['machines']={}
      tableDatas[i] = {}
      tableDatas[i]["labels"] = ["机器","状态"]
      JSON.parse(realPage[i][0]['attributeList']).map(e => {
        console.log(e)
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
    console.log(tableMsg)
    let result = await Axios.post("/RealTime/listRealTimeDatas",{
      tableMsg:tableMsg,
      project:cookie.load('project')
    }).then(res =>{
      return res.data
    }).catch(err => {
      console.log(err)
      this.props.history.push('/Login')
      return {}
    })
    console.log(result)
    let newData = JSON.parse(JSON.stringify(this.state.tableDatas))
    Object.keys(result).map( e => {
      newData[e]["datas"]=[]
      for(let item in result[e]){
        let getDataArr = []
        Object.values(result[e][item]).map( e => getDataArr.push(e))
        newData[e]["datas"].push(getDataArr)
      }
      return 0
    })
    this.setState({
      tableDatas:newData
    })
    // console.log(newData)
  }

  getSummary = async () => {
    let result = await Axios.post("/RealTime/getRealtimeSummary",{
      project:cookie.load('project')
    }).then(res =>{
      return res.data
    }).catch(err => {
      console.log(err)
      this.props.history.push('/Login')
      return {}
    })
    let newMainDatas = JSON.parse(JSON.stringify(this.state.mainDatas))
    Object.keys(result).map( e => {
      newMainDatas[e]["data"] = result[e]
    })
    this.setState({
      mainDatas:newMainDatas
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
                  <h2>{ (parseFloat(this.state.mainDatas[key]['data'])).toFixed(2) }</h2>
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
                      {this.state.tableDatas[key]["datas"] && this.state.tableDatas[key]["datas"].map((data, index) =>
                        <tr key={index}>
                        { data.map((msg, index) => 
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
