import React, { Component } from 'react'
import { Col, Row, Container, Card, Badge, ButtonGroup, Button, Table } from 'react-bootstrap'
import Axios from 'axios';
import Chart from "react-apexcharts";
import cookie from 'react-cookies';

import CardWithTitle from '../../component/LineCard/CardWithTitle'
import { dateFormat } from '../../utils/DateUtils';

import style from './style.module.css'

export class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeRange:'月',
      timeFormat:'mm月dd号 ',
      kind:'电',
      labelColor:"#352B9B",
      clientHeight:document.body.clientHeight-2*56-49,
      avgData:[],
      cardDatas: [
        {
          'kind': "电",
          "bgColor": "#352B9B",
          "datas": [],
          "labels": [],
          "unit": "kWh",
          "summary":0
        },
        {
          'kind': "气",
          "bgColor": "#448BCD",
          "datas": [],
          "labels": [],
          "unit": "m³",
          "summary":0
        },
        {
          'kind': "单耗",
          "bgColor": "#C65757",
          "datas": [],
          "labels": [],
          "unit": "kWh/m³",
          "summary":0
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
          },
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
    if(cookie.load('userMsg') === undefined){
      this.props.history.push('/Login')
    }
    this.getWeekDatas()
    this.getMainDatas(this.state.timeRange).then(() =>{
      this.changeKind(this.state.kind,this.state.labelColor)
    })
    this.intervalId = setInterval(() => {
      this.getWeekDatas()
    }, 5*1000);
    this.getSummaryData()
  }

  componentWillUnmount(){
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  // 获取三个副图表数据
  getWeekDatas = () => {
    Axios.post("/Home/getHoursAgo",{
      hour:1,
      metrics:["active_power","flowrate"]
    }).then(res => {
      let result = res.data.datas
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
        cardDatas: newData,
        avgData: [res.data.avgData["electricity"],res.data.avgData["air"],res.data.avgData["unitCost"]]
      })
    }).catch(err => {
      console.log(err);
      this.props.history.push('/Login')
    })
  }

  getSummaryData = async () => {
    let res = await Axios.post("/Home/getSummaryData",{
      project:cookie.load('project')
    }).then(res => {
      console.log(res.data)
      return res.data
    })
    let newCardData = JSON.parse(JSON.stringify(this.state.cardDatas))
    Object.keys(newCardData).map( e => {
      newCardData[e]['summary'] = res[newCardData[e]['kind']]
    })
    this.setState({
      cardDatas:newCardData
    })
  }

  // 获取表格及主图表数据
  getMainDatas = async (range) =>{
    var _that = this
    let url = "/Home/getMainChartData"
    let kind = ""
    switch(range){
      case '月':
        url = "/Home/getDaysData"
        kind = "月"
        break;
      case '日':
        url = "/Home/getHoursData"
        kind = "日"
        break
      case '年':
        url = "/Home/getMonthsData"
        kind = "年"
        break
      default:
        url = "/Home/getDaysData"
        kind = "月"
    } 
    let resData = await Axios.post(url,{
      project:cookie.load('project')
    }).then(res =>{
      return res.data
    }).catch(err => {
      console.log(err);
      this.props.history.push('/Login')
      return []
    })
    let newTableDatas = this.state.tableDatas
    newTableDatas['datas'] = resData
    for(let i in newTableDatas['datas']){
      switch(kind){
        case "日":
          newTableDatas['datas'][i]['electricity'] = newTableDatas['datas'][i]['electricity']
          newTableDatas['datas'][i]['air'] = newTableDatas['datas'][i]['air']*60
          break;
        case "月":
          newTableDatas['datas'][i]['electricity'] = newTableDatas['datas'][i]['electricity']*24
          newTableDatas['datas'][i]['air'] = newTableDatas['datas'][i]['air']*60*24
          break;
        case "年":
          newTableDatas['datas'][i]['electricity'] = newTableDatas['datas'][i]['electricity']*30*24
          newTableDatas['datas'][i]['air'] = newTableDatas['datas'][i]['air']*60*24*30
          break;
      }
    }
    _that.setState({
      tableDatas:newTableDatas
    })
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
                  <CardWithTitle avgData={key.summary} kind={key.kind} bgColor={key.bgColor} unit={key.unit} mainChart={key.mainChart} datas={key.datas} labels={key.labels}></CardWithTitle>
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
            <Row className={style.selfCardBox + " top-divider"}>
              <Card className="mobile-top-divider self-card w-100">
                <Card.Header className="self-card-header d-flex justify-content-between align-items-center" >
                  <Badge className="p-2 h-100" variant="primary">数据列表 / {this.state.timeRange}</Badge>
                </Card.Header>
                <Card.Body className={style.selfTableCard + " self-card-content"} style={{ "height":this.state.clientHeight*0.89 }}>
                  <Table className={style.selfTable+" global-color"} striped bordered >
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
