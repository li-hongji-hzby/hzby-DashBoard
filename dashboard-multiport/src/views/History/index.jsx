import React, { Component, Suspense } from 'react'
import { Row, Container, Card, Badge, ButtonGroup, Button, Image, DropdownButton, Dropdown, Spinner } from 'react-bootstrap'
import cookie from 'react-cookies';
import Axios from 'axios'
import Chart from "react-apexcharts";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


import machineImg from './images/machine.png'
import machinesImg from './images/machines.png'
import rightArrow from './images/right-arrow.png'
import style from './style.module.css'

// 半天内降采样
const downSampleList1=[["10秒","10s"],["1分钟","1m"],["5分钟","5m"],["30分钟","30m"],["1小时","1h"]]
// 七天内降采样
const downSampleList2 = [["5分钟","5m"],["30分钟","30m"],["1小时","1h"],["6小时","6h"],["1天","1d"]]
// 一个月内降采样
const downSampleList3 = [["1小时","1h"],["6小时","6h"],["1天","1d"],["1周","1w"]]
// 一个月以上降采样
const downSampleList4 = [["6小时","6h"],["1天","1d"],["1周","1w"],["1个月","1n"]]
// ["10秒","10s"],["1分钟","1m"],["5分钟","5m"],["30分钟","30m"],["1小时","1h"],["6小时","6h"],["1天","1d"],["1周","1w"],["1个月","1n"]

const chartSeries = [{
  name: '',
  data: [],
}]
const chartOptions = {
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
  title: {
    text: '',
    align: 'left',
    style: {
      color: "#c5c5c5",
      fontSize: '14px'
    }
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
    labels:{
      datetimeUTC: false,
      style: {
        colors: "#c5c5c5",
        fontSize: '14px',
      },
    },
    categories: []
  },
  yaxis: { 
    borderColor: 'rgba(255,255,255,0.1)',
    show: true,
    labels:{
      style: {
        colors: "#c5c5c5",
        fontSize: '14px',
      },
    }
  },
  tooltip: {
    x: {
      format: 'yyyy/MM/dd HH:mm'
    },
    theme:'dark'
  },
}
export class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      machineList:{},
      attributeMap:{},
      machineKindList:[],
      machineName:'',
      attributeName:'',
      startTime:new Date(new Date().getTime() - 12*60*60*1000),
      endTime:new Date(),
      attributeList:[],
      downsample:'10s',
      downsampleZh:'10秒',
      device:'',
      chartDatas:[],
      downsampleList:[]
    }
  }

  loading = () => <div className="h-100 w-100 d-flex justify-content-center align-items-center"><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>

  // 选择机器
  setMachineName = (name) => {
    this.setState({
      machineName:name
    },() => this.getAttributes())
  }
  // 选择属性
  setAttributeName = (name) => {
    this.setState({
      attributeName:name
    },() => this.getMachineData())
  }
  // 选择时间间隔（降采样）
  setDownsample = (downsampleZh,downsample) => {
    this.setState({
      downsampleZh,
      downsample
    })
  }
  // 选择开始时间
  setStartTime = time => {
    this.setState({
      startTime:time
    },() => this.setDownSampleList())
  }
  // 选择结束时间
  setEndTime = time => {
    this.setState({
      endTime:time
    },() => this.setDownSampleList())
  }
  // 根据时间间隔选择降采样列表
  setDownSampleList = () =>{
    let time = parseInt(Date.parse(this.state.endTime)) - parseInt(Date.parse(this.state.startTime))
    let downSampleList = []
    let daySecond = 24*60*60*1000
    if(time <= daySecond){
      downSampleList = downSampleList1
    }else if(time > daySecond && time <= 7*daySecond){
      downSampleList = downSampleList2
    }else if(time > 7*daySecond && time <= 30*daySecond){
      downSampleList = downSampleList3
    }else{
      downSampleList = downSampleList4
    }
    this.setState({
      downsampleList: downSampleList
    },() => this.setDownsample(downSampleList[0][0],downSampleList[0][1]))
  }




  // 查询数据
  getMachineData =async () => {
    let machineName =this.state.machineName
    let metric = {}
    metric[this.state.attributeMap[this.state.attributeName]] = this.state.attributeName
    let resData = await Axios.post("/History/getHistory", {
      startTime:parseInt(Date.parse(this.state.startTime)/1000),
      endTime:parseInt(Date.parse(this.state.endTime)/1000),
      device:this.state.machineList[machineName]['machineNameEn'],
      downsample:this.state.downsample +'-avg',
      metric:metric
    }).then(res =>{
      return res.data
    }).catch(err => {
      console.log(err);
    })
    let newChartDatas = []
    for(let i in resData){
      let newSeries = JSON.parse(JSON.stringify(chartSeries))
      let newOptions = JSON.parse(JSON.stringify(chartOptions))
      newSeries[0]['name'] = i
      newSeries[0]['data'] = resData[i][1]
      newOptions['xaxis']['categories'] = resData[i][0]
      newOptions['title']['text'] = i
      newChartDatas.push({Series:newSeries,Options:newOptions})
    } 
    this.setState({
      chartDatas:newChartDatas
    })
  }

  // 根据项目和机器查询属性
  getAttributes = async () => {
    Axios.get("/Machine/mapAttributesByMachineAndProject",{
      params: {
        "project":cookie.load('project')['projectNameEn'],
        "machine":this.state.machineList[this.state.machineName]['machineNameEn']
      }
    }).then(res =>{
      let result = res.data
      this.setState({
        attributeMap:result,
        attributeName:Object.keys(result)[0]
      },() => this.getMachineData())
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount(){
    if(cookie.load('userMsg') === undefined){
      this.props.history.push('/Login')
    }
    // 获取localStorage数据并进进行处理
    let histPage = JSON.parse(localStorage.getItem("historyPage"))
    let machineList = JSON.parse(JSON.stringify(this.state.machineList))
    histPage.map( e => {
      machineList[e["machineNameZh"]]={}
      machineList[e["machineNameZh"]]["machineNameEn"] = e["machineNameEn"]
      machineList[e["machineNameZh"]]["attributeList"] = {}
      let attrList = JSON.parse(e["attributeList"])
      attrList.map( attr => {
        machineList[e["machineNameZh"]]["attributeList"][attr["attributeNameEn"]]=attr["attributeNameCn"]
        return null
      })
      return null
    })
    this.setState({
      machineName:histPage[0]["machineNameZh"],
      machineList:machineList,
      downsampleList:downSampleList1
    },() => {
      this.getAttributes()
    })
  }

  render() {
    return (
      <Container fluid className="ml-0 mr-0">
        <Row className="w-100 top-divider mr-0 ml-0">
          <Card className="w-100 self-card" style={{"boxShadow":"none"}}>
            <Card.Header className="d-flex justify-content-start align-items-center self-card-header">
              <Badge className="p-2 h-100 d-flex justify-content-center align-items-center" variant="primary">
                <Image src={machinesImg} className={style.cardIcon}></Image>
                设备列表
              </Badge>
            </Card.Header>
            <Card.Body className=" self-card-content">
                {this.state.machineList && Object.keys(this.state.machineList).map((key, index) => 
                  <Button className={style.machineBtn + " mr-2 mt-2 mobile-top-divider"} key={index} variant="info"
                    onClick={ () => this.setMachineName(key)}
                  >{key}
                  </Button>
                )}
            </Card.Body>
          </Card>
        </Row>
        <Row className="w-100 top-divider mr-0 ml-0">
          <Card className="w-100 self-card" style={{"boxShadow":"none"}}>
            <Card.Header className="d-flex justify-content-start align-items-center self-card-header">
              <Badge className="p-2 h-100 d-flex justify-content-center align-items-center" variant="primary">
                <Image src={machinesImg} className={style.cardIcon}></Image>
                属性列表
              </Badge>
            </Card.Header>
            <Card.Body className=" self-card-content">
              <Suspense fallback={this.loading()}>
                {this.state.attributeMap && Object.keys(this.state.attributeMap).map((key, index) => 
                  <Button className={style.machineBtn + " mr-2 mt-2 mobile-top-divider"} key={index} variant="info"
                    onClick={ () => this.setAttributeName(key)}
                  >{key}
                  </Button>
                )}
              </Suspense>
            </Card.Body>
          </Card>
        </Row>
        <Row className="w-100 top-divider mr-0 ml-0">
          <Card className="w-100 self-card" style={{"boxShadow":"none"}}>
            <Card.Header className="d-flex justify-content-start align-items-center self-card-header flex-wrap">
              <Badge className="p-2 mr-2 h-100 d-flex justify-content-center align-items-center" variant="primary">
                <Image src={machineImg} className={style.cardIcon}></Image>
                {this.state.machineName}
              </Badge>
              <Badge className="p-2 h-100 d-flex justify-content-center align-items-center" variant="primary">
                <Image src={machineImg} className={style.cardIcon}></Image>
                {this.state.attributeName}
              </Badge>
              <div className="d-flex mobile-top-divider">
                <Badge className={"ml-5 mr-2 d-flex justify-content-center align-items-center"} variant="primary">
                    选择时间
                </Badge>
                <div className="mobile-time-input mobile-top-divider d-flex align-items-center">
                  <DatePicker
                    selected={this.state.startTime}
                    onChange={time => this.setStartTime(time)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    timeCaption="time"
                    dateFormat="yyyy/MM/dd HH:mm"
                  />
                  <Image src={rightArrow} alt="向右" className={style.cardIcon +" ml-2"}></Image>
                  <DatePicker
                    selected={this.state.endTime}
                    onChange={time => this.setEndTime(time)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    timeCaption="time"
                    dateFormat="yyyy/MM/dd HH:mm"
                  />
                </div>
                <DropdownButton size="sm" className="ml-2 mobile-top-divider" as={ButtonGroup} title={this.state.downsampleZh}>
                  <Dropdown.Item disabled>时间间隔</Dropdown.Item>
                  { this.state.downsampleList.map((key,index) => 
                    <Dropdown.Item key={index} onClick={ () => this.setDownsample(key[0],key[1])}>{key[0]}</Dropdown.Item>
                  )}
                </DropdownButton>
                <Button className={style.machineBtn + " mr-2 ml-2 mobile-top-divider"}
                  onClick={ () => this.getMachineData() } 
                >
                  查询
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="self-card-content pr-5" style={{ "position": "relative" }}>
              <Suspense fallback={this.loading()}>
                { this.state.chartDatas.map((key,index) =>
                    <Chart key={index} options={key.Options} series={key.Series} type="area" height="350"/>
                )}  
              </Suspense>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    )
  }
}

export default index
