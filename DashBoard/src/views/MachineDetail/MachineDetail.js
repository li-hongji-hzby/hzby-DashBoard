import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';
import LineTypeWithData from '../../components/LineCard/TypeWithData/TypeWithData'
import { CustomTooltips } from '../../utils/custom-tooltips';
import { dateFormat } from "../utils/DateUtils"
//https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Widget03 = lazy(() => import('../Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const base = 'http://127.0.0.1:5000'

class MachineDetail extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.state = {
      msgKindList:['系统压力','排气压力','功率','频率','排气温度','空气流量'],
      msgKind:'系统压力',
      startDate:'',
      endDate:'',
      dropdownOpen: false,
      radioSelected: 1,
      mainChart:{
        labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        datasets: [
          {
            label: 'coyote_creek',
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [12,23,12,54,45,47,96,12,23,12,54,45,47,96,12,23,12,54,45,47,96,12,23,12,54,45,47,96],
          },
        ],
      },
      mainChartOpts:{
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function(tooltipItem, chart) {
              return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
            }
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display:false,
              gridLines: {
                drawOnChartArea: false,
              },
            }],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
                max:150,
                min:-1
                // max: Math.min.apply(Math, this.state.mainChart.datasets[0].data),
              },
            }],
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          },
        },
      },
    };
  }
  
  getLatestDataMain = (limit) => {
    let _that = this 
    let newData = _that.state.tableDatas
    newData.datas=[
      ['一号','asd','321','123'],
      ['二号','asd','321','123'],
      ['三号','asd','321','123'],
      ['四号','asd','321','123'],
      ['五号','asd','321','123'],
      ['六号','asd','321','123'],
      ['七号','asd','321','123'],
      ['八号','asd','321','123'],
    ]
    _that.setState({
      tableDatas:newData
    })
  }

  setMsgKind = (kind) => {
    console.log(kind)
    let _that = this
    _that.setState({
      msgKind:kind
    })
  }

  // 设置开始时间
  setStartDate = (date) => {
    console.log(date)
    let _that = this 
    _that.setState({
      startDate:date
    })

  }

  // 设置结束时间
  setEndDate = (date) => {
    console.log(date)
    let _that = this 
    _that.setState({
      endDate:date
    })
  }

  // 根据开始、结束时间获取数据
  getDatasByTimes = () =>{
    console.log("------------------根据开始、结束时间获取数据-------------------")
    console.log(this.state.startDate)
    console.log(this.state.endDate)
    let _that = this 
    let newData = this.state.mainChart
    newData.datasets[0].data = [96,12,54,45,47,96,12,96,12,54,45,47,96,12,96,12,54,45,47,96,12,96,12,54,45,47,96,12,]
    _that.setState({
      mainChart:newData
    })
  }
  // 
  getStartDate = (date) => {
    this.getLatestDataMain(dateFormat("YYYYmmdd", date));
  };

  componentDidMount(){
    // this.getLatestDataMain(20);
    // console.log(data)
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
  



  render() {
    return (
      <Col className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>选择参数</strong> <small>/Parameter selection</small>
              </CardHeader>
              <CardBody>
                { this.state.msgKindList.map((kind,index) => 
                  <Button type="button" className="btn btn-brand btn-behance mr-3" key={index} onClick={this.setMsgKind.bind(this,kind)}>
                    {kind}
                  </Button>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardHeader>
                <Row className="justify-content-center" style={{"padding":"20px"}}>
                  <Col xs="12" sm="2" lg="2">
                    <Badge className="mr-1" color="primary" pill style={{"fontSize":"100%","lineHeight":'1.8'}}>
                      {this.state.msgKind}
                    </Badge>
                  </Col>
                  <Col xs="12" sm="5" lg="4">
                    <div className="formBox">
                    <Badge className="mr-1" color="primary" pill style={{"fontSize":"100%","lineHeight":'1.5'}}>
                      开始时间：
                      <DatePicker
                        // maxDate={new Date('2019-09-18 05:42:00')}
                        // minDate={new Date('2019-08-17 00:00:00')}
                        selected={this.state.startDate}
                        onChange={this.setStartDate}
                      />
                    </Badge>
                        {/* <input type="text" onChange={this.handelChange.bind(this)} defaultValue={this.state.inpValu}/> */}
                    </div>
                  </Col>
                  <Col xs="12" sm="5" lg="4">
                    <div className="formBox">
                      <Badge className="mr-1" color="primary" pill style={{"fontSize":"100%","lineHeight":'1.5'}}>
                        结束时间：
                        <DatePicker
                          // maxDate={new Date('2019-09-18 05:42:00')}
                          // minDate={new Date('2019-08-17 00:00:00')}
                          selected={this.state.endDate}
                          onChange={this.setEndDate}
                        />
                      </Badge>
                        {/* <input type="text" onChange={this.handelChange.bind(this)} defaultValue={this.state.inpValu}/> */}
                    </div>
                  </Col>
                  <Col xs="12" sm="2" lg="2">
                    <Button type="button" className="btn btn-brand btn-behance mr-3" pill onClick={this.getDatasByTimes}>
                      确定
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={this.state.mainChart} options={this.state.mainChartOpts} height={300} />
                </div>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>

      </Col> 
    );
  }
}

export default MachineDetail;
