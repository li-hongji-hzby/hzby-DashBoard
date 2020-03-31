import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from 'reactstrap';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import LineTypeWithData from '../../components/LineCard/TypeWithData/TypeWithData'
import { CustomTooltips } from '../../utils/custom-tooltips';


// const brandPrimary = getStyle('--primary')
// const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
// const brandWarning = getStyle('--warning')
// const brandDanger = getStyle('--danger')


// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}



class MainData extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.state = {
      lineDatas:[
        {
          data: [78, 81, 80, 45, 34, 12, 40],
          label: '模拟数据1',
          timeLabels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          variant:'#ADC259',
          title:'测试一下',
          num:'1,234'
        },{
          data: [78, 81, 80, 45, 34, 12, 40],
          label: '模拟数据2',
          timeLabels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          variant:'#CAC908',
          title:'测试两下',
          num:'10,234'
        },{
          data: [78, 81, 80, 45, 34, 12, 40],
          label: '模拟数据3',
          timeLabels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          variant:'#FEF789',
          title:'测试三下',
          num:'30,234'
        },{
          data: [78, 81, 80, 45, 34, 12, 40],
          label: '模拟数据4',
          timeLabels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          variant:'#0036fa',
          title:'测试四下',
          num:'50,234'
        }
      ],
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
      tableDatas:{
        labels:['时间','数据1','数据2','数据3'],
        datas:[
          ['一月','222','321','123'],
          ['二月','222','321','123'],
          ['三月','222','321','123'],
          ['四月','222','321','123'],
          ['五月','222','321','123'],
          ['六月','222','321','123'],
          ['七月','222','321','123'],
          ['八月','222','321','123'],
        ]
      }
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
    let newData2 = this.state.mainChart
    newData2.datasets[0].data = [96,12,54,45,47,96,12,96,12,54,45,47,96,12,96,12,54,45,47,96,12,96,12,54,45,47,96,12,]
    _that.setState({
      mainChart:newData
    })
    _that.setState({
      tableDatas:newData,
      mainChart:newData2
    })
  }


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
                Traffic {' & '} Sales
              </CardHeader>
              <CardBody>
                <Row>
                  {this.state.lineDatas.map((data,index) => 
                    <Col xs="12" sm="6" lg="3" key={index}>
                      <LineTypeWithData dataset={data}></LineTypeWithData>
                    </Col>
                  )}
                </Row>
                </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" lg="8">
            <Card>
              <CardHeader>
                <Row>
                    <Col sm="5">
                      <CardTitle className="mb-0">
                        <Col xs="12" sm="2" lg="12">
                          <Badge className="mr-1" color="primary" pill style={{"fontSize":"100%","lineHeight":'1.8'}}>
                            标题......
                          </Badge>
                        </Col>
                      </CardTitle>
                      <div className="small text-muted"></div>
                    </Col>
                    <Col sm="7" className="d-none d-sm-inline-block">
                      <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                      <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                        <ButtonGroup className="mr-3" aria-label="First group">
                          <Button color="outline-secondary" onClick={() => {this.onRadioBtnClick(1);this.getLatestDataMain(20);}} active={this.state.radioSelected === 1}>最近一个月</Button>
                          <Button color="outline-secondary" onClick={() => {this.onRadioBtnClick(2);this.getLatestDataMain(50);}} active={this.state.radioSelected === 2}>最近一日</Button>
                          <Button color="outline-secondary" onClick={() => {this.onRadioBtnClick(3);this.getLatestDataMain(100);}} active={this.state.radioSelected === 3}>最近一小时</Button>
                        </ButtonGroup>
                      </ButtonToolbar>
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
          <Col xs="12" sm="12" lg="4">
            <Card>
              <CardHeader>
                <ButtonToolbar className="justify-content-center" aria-label="Toolbar with button groups">
                  <ButtonGroup aria-label="First group">
                    <Button color="outline-secondary" onClick={() => {this.onRadioBtnClick(1);this.getLatestDataMain(20);}} active={this.state.radioSelected === 1}>月</Button>
                    <Button color="outline-secondary" onClick={() => {this.onRadioBtnClick(2);this.getLatestDataMain(50);}} active={this.state.radioSelected === 2}>日</Button>
                    <Button color="outline-secondary" onClick={() => {this.onRadioBtnClick(3);this.getLatestDataMain(100);}} active={this.state.radioSelected === 3}>时</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </CardHeader>
              <CardBody  style={{'height':'390px','overflowY': 'scroll'}}>
                <Table lg='3' className="table table-striped">
                  <thead>
                    <tr>
                      {this.state.tableDatas.labels.map((label,index) =>
                        <th scope="col" key={index}>{label}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.tableDatas.datas.map((data,index) => 
                        <tr key={index}>
                            { data.map((msg, index) => 
                              <th scope={index===0?'row':''} key={index}>{msg}</th>  
                            )}
                        </tr>
                      )}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
        </Row>
      </Col> 
    );
  }
}

export default MainData;
