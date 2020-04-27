import React, { Component } from 'react'
import { Col, Row, Container, Card, Badge, ButtonGroup, Button, Table } from 'react-bootstrap'
import Axios from 'axios';
import Chart from "react-apexcharts";
import cookie from 'react-cookies';

import CardWithTitle from '../../component/LineCard/CardWithTitle'
import { dateFormat } from '../../utils/DateUtils';

import './style.css'

export class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeRange:'月',
      timeFormat:'mm月dd号 ',
      kind:'电',
      labelColor:"#352B9B",
      clientHeight:document.body.clientHeight-2*56-49,
      cardDatas: [
        {
          'kind': "电",
          "bgColor": "#352B9B",
          "datas": [],
          "labels": [],
          "unit": "kW"
        },
        {
          'kind': "气",
          "bgColor": "#448BCD",
          "datas": [],
          "labels": [],
          "unit": "m³/min"
        },
        {
          'kind': "单耗",
          "bgColor": "#C65757",
          "datas": [],
          "labels": [],
          "unit": "kWh/m³"
        },
      ],
      mainSeries: [{
        name: '电',
        data: [],
      }],
      mainOptions: {
        chart: {
          type: 'area',
          height: 160,
          toolbar: {
            show:true,
            tools: {
              download: false
            }
          }
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: true,
          borderColor: 'rgba(0,0,0,0.1)'
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: []
        },
        yaxis: {
          borderColor: 'rgba(255,255,255,0.1)',
          show: true,
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
          theme:'dark'
        },
      },
      tableDatas:{
        labels:['时间','电','气','单耗'],
        datas:[]
      }
    }
  }

  componentDidMount = () => {
    // console.log(this.state.clientHeight)
    if(cookie.load('userMsg') === undefined){
      this.props.history.push('/Login')
    }
    this.getWeekDatas()
    this.getMainDatas(this.state.timeRange).then(() =>{
      this.changeKind(this.state.kind,this.state.labelColor)
    })
    this.intervalId = setInterval(() => {
      this.getWeekDatas()
    }, 60*1000);
  }

  componentWillUnmount(){
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  // 获取三个副图表数据
  getWeekDatas = () => {
    Axios.get("/Summary5min/getNewestLimit?limit=12").then(res => {
      let result = res.data
      // console.log(result);
      let labels = []
      let elects = []
      let airs = []
      let units = []
      for (let i in result) {
        labels.push(dateFormat('YYYY/mm/dd', new Date(result[i]['timestamp'] * 1000)))
        elects.push(result[i]['electricity'])
        airs.push(result[i]['air'])
        units.push(result[i]['unitCost'])
      }
      let newData = this.state.cardDatas
      newData[0]['datas'] = elects
      newData[0]['labels'] = labels
      newData[1]['datas'] = airs
      newData[1]['labels'] = labels
      newData[2]['datas'] = units
      newData[2]['labels'] = labels
      this.setState({
        cardDatas: newData
      })
    }).catch(err => {
      console.log(err);
      this.props.history.push('/Login')
    })
  }

  // 获取表格及主图表数据
  getMainDatas = async (range) =>{
    var _that = this
    let url = ""
    switch(range){
      case '月':
        url = "/SummaryDay/getNewestLimit?limit=30"
        break;
      case '日':
        url = "/SummaryHour/getNewestLimit?limit=24"
        break
      case '年':
        url = "/SummaryMonth/getNewestLimit?limit=24"
        break
      default:
        url = "/SummaryDay/getNewestLimit?limit=30"
    } 
    let resData = await Axios.get(url).then(res =>{
      return res.data
    }).catch(err => {
      console.log("=============getMainDatas==============")
      // console.log(err.response.status);
      console.log(err);
      this.props.history.push('/Login')
      return []
    })
    let newTableDatas = this.state.tableDatas
    // console.log(resData)
    newTableDatas['datas'] = resData
    _that.setState({
      tableDatas:newTableDatas
    })
    // console.log(_that.state.tableDatas)
  }

  intervalId 

  changeKind = (kind,color) => {
    let dataKind
    switch(kind){
      case '电':
        dataKind = 'electricity'
        break
      case '气':
        dataKind = 'air'
        break
      case '单耗':
        dataKind = 'unitCost'
        break
      default:
        dataKind = 'electricity'
    }
    let labels = []
    let datas = []
    for(let i in this.state.tableDatas.datas){
      datas.push(this.state.tableDatas.datas[i][dataKind])
      labels.push(dateFormat("YY/mm/dd HH:MM",new Date(this.state.tableDatas.datas[i]['timestamp']*1000)))
    }
    let newMainSeries = JSON.parse(JSON.stringify(this.state.mainSeries))
    newMainSeries[0]['data'] = datas
    let newMainOptions = JSON.parse(JSON.stringify(this.state.mainOptions))
    newMainOptions['xaxis']['categories'] = labels
    this.setState({
      mainSeries:newMainSeries,
      mainOptions:newMainOptions,
      kind:kind,
      labelColor:color
    })
  }
  changeTime = (range,format) => {
    this.getMainDatas(range).then(()=>{
      this.changeKind(this.state.kind,this.state.labelColor)
    })
    this.setState({
      timeRange:range,
      timeFormat:format
    })
  }

  render() {
    return (
      <Container fluid className="ml-0 mr-0">
        <Row>
          <Col lg={9} md={6} sm={12}>
            <Row>
              {this.state.cardDatas.map((key, index) =>
                <Col lg={4} md={12} sm={12} key={index} className="top-divider d-flex justify-content-center align-items-center" onClick={()=>{ this.changeKind(key.kind,key.bgColor) }}>
                  <CardWithTitle kind={key.kind} bgColor={key.bgColor} unit={key.unit} mainChart={key.mainChart} datas={key.datas} labels={key.labels}></CardWithTitle>
                </Col>
              )}
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Card className="self-card top-divider">
                  <Card.Header className="self-card-header d-flex justify-content-between align-items-center" >
                    <Badge className="p-2 h-100" style={{"backgroundColor":this.state.labelColor}} variant="dark">{this.state.kind} / {this.state.timeRange}</Badge>
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="outline-primary" onClick={()=>{ this.changeTime("年","YY年mm月")}}>年</Button>
                      <Button variant="outline-primary" onClick={()=>{ this.changeTime("月","mm月dd日")}}>月</Button>
                      <Button variant="outline-primary" onClick={()=>{ this.changeTime("日","dd日HH时") }}>日</Button>
                    </ButtonGroup>
                  </Card.Header>
                  <Card.Body className="self-card-content" style={{ "position": "relative" }}>
                    <Chart options={this.state.mainOptions} series={this.state.mainSeries} type="area" height={ this.state.clientHeight*0.49 } />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <Row className="self-card-box">
              <Card className="mobile-top-divider self-card w-100">
                <Card.Header className="self-card-header d-flex justify-content-between align-items-center" >
                  <Badge className="p-2 h-100" variant="primary">数据列表</Badge>
                  <Badge className="p-2 h-100" style={{"backgroundColor":this.state.labelColor}} variant="dark">{this.state.kind} / {this.state.timeRange}</Badge>
                </Card.Header>
                <Card.Body className="self-card-content self-table-card" style={{ "height":this.state.clientHeight*0.89 }}>
                  <Table className="self-table global-color" striped bordered >
                    <thead>
                      <tr>
                        {this.state.tableDatas.labels.map((label,index) =>
                          <th key={index}>{label}</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.tableDatas.datas.map((data,index) => 
                        <tr key={index}>
                            { Object.keys(data).map((msg, index) => 
                              <td key={index}>
                                {msg === 'timestamp'?dateFormat(this.state.timeFormat,new Date(data[msg]*1000)):data[msg]}
                              </td>  
                            )}
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default index
