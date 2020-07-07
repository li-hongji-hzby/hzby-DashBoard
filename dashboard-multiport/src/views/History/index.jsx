import React, { Component } from 'react'
import { Row, Container, Card, Badge, ButtonGroup, Button, Image, DropdownButton, Dropdown } from 'react-bootstrap'
import cookie from 'react-cookies';
import Axios from 'axios'
import Chart from "react-apexcharts";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


import machineImg from './images/machine.png'
import machinesImg from './images/machines.png'
import rightArrow from './images/right-arrow.png'
import style from './style.module.css'


const downsampleList=[
  ["10秒","10s"],["1分钟","1m"],["5分钟","5m"],["30分钟","30m"],["1小时","1h"],["6小时","6h"],["1天","1d"],["1周","1w"],["1个月","1n"]
]

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
      format: 'dd/MM/yy HH:mm'
    },
    theme:'dark'
  },
}
export class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      machineList:{},
      machineKindList:[],
      machineName:'远洋流量计一号',
      startTime:new Date(new Date().getTime() - 24*60*60*1000),
      endTime:new Date(),
      attributeList:[],
      downsample:'5m',
      downsampleZh:'5分钟',
      device:'',
      chartDatas:[],
    }
  }




  changeMachineName = (name) => {
    this.setState({
      machineName:name
    })
  }

  setDownsample = (downsampleZh,downsample) => {
    this.setState({
      downsampleZh,
      downsample
    })
  }




  // 查询数据
  getMachineData =async () => {
    console.log(cookie.load('userMsg'));
    let machineName =this.state.machineName
    let resData = await Axios.post("/History/getHistory", {
      startTime:parseInt(Date.parse(this.state.startTime)/1000),
      endTime:parseInt(Date.parse(this.state.endTime)/1000),
      device:this.state.machineList[machineName]['machineNameEn'],
      downsample:this.state.downsample +'-avg',
      metrics:this.state.machineList[machineName]['attributeList'],
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
      machineList:machineList
    },() => {
      this.getMachineData()
    })
  }

  render() {
    return (
      <Container fluid className="ml-0 mr-0">
        <Row className="w-100 top-divider mr-0 ml-0" key={index}>
          <Card className="w-100 self-card" style={{"boxShadow":"none"}}>
            <Card.Header className="d-flex justify-content-start align-items-center self-card-header">
              <Badge className="p-2 h-100 d-flex justify-content-center align-items-center" variant="primary">
                <Image src={machinesImg} className={style.cardIcon}></Image>
                设备列表
              </Badge>
            </Card.Header>
            <Card.Body className=" self-card-content">
                {this.state.machineList && Object.keys(this.state.machineList).map((key, index) => 
                  <Button className={style.machineBtn + " mr-2 mobile-top-divider"} key={index} variant="info"
                    onClick={ () => this.changeMachineName(key)}
                  >{key}
                  </Button>
                )}
            </Card.Body>
          </Card>
        </Row>
        <Row className="w-100 top-divider mr-0 ml-0">
          <Card className="w-100 self-card" style={{"boxShadow":"none"}}>
            <Card.Header className="d-flex justify-content-start align-items-center self-card-header flex-wrap">
              <Badge className="p-2 h-100 d-flex justify-content-center align-items-center" variant="primary">
                <Image src={machineImg} className={style.cardIcon}></Image>
                {this.state.machineName}
              </Badge>
              <div className="d-flex mobile-top-divider">
                <Badge className={style.selectTimeLabel+" ml-5 mr-2 p-2"} variant="primary">
                    选择时间
                </Badge>
                <div className="mobile-time-input mobile-top-divider">
                  <DatePicker
                    selected={this.state.startTime}
                    onChange={time => this.setState({startTime:time})}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    timeCaption="time"
                    dateFormat="yyyy/MM/dd hh:mm"
                  />
                  <Image src={rightArrow} alt="向右" className={style.cardIcon +" ml-2"}></Image>
                  <DatePicker
                    selected={this.state.endTime}
                    onChange={time => this.setState({endTime:time})}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    timeCaption="time"
                    dateFormat="yyyy/MM/dd hh:mm"
                  />
                </div>
                <DropdownButton size="sm" className="ml-2 mobile-top-divider" as={ButtonGroup} title={this.state.downsampleZh}>
                  <Dropdown.Item disabled>时间间隔</Dropdown.Item>
                  { downsampleList.map((key,index) => 
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
              { this.state.chartDatas.map((key,index) =>
                  <Chart key={index} options={key.Options} series={key.Series} type="area" height="350"/>
              )}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    )
  }
}

export default index
