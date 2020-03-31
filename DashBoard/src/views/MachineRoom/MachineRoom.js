import React, { Component } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from 'reactstrap';
// import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
// import axios from 'axios';
// import LineTypeWithData from '../../components/LineCard/TypeWithData/TypeWithData'
// import { CustomTooltips } from '../../utils/custom-tooltips';
import { dateFormat } from "../utils/DateUtils"
//https://www.npmjs.com/package/react-datepicker
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const Widget03 = lazy(() => import('../Widgets/Widget03'));

// const brandPrimary = getStyle('--primary')
// const brandSuccess = getStyle('--success')
// const brandInfo = getStyle('--info')
// const brandWarning = getStyle('--warning')
// const brandDanger = getStyle('--danger')

// const base = 'http://127.0.0.1:5000'

class MachineRoom extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.state = {
      dropdownOpen: false,
      radioSelected: 1,
      mainDatas:{
        "空气流量":"12",
        "功率":"23",
        "压力":"15",
        "气电比":"99",
        "水电比":"25",
        "耗电数":"22",
      },
      tableDatas:{
        "空压机":{    
          "labels":['机器','状态','出口压力','功率',"频率","排气温度"],
          "datas":[
            ['空压机一号','222','321','123','321','123'],
            ['空压机二号','222','321','123','321','123'],
            ['空压机三号','222','321','123','321','123'],
            ['空压机四号','222','321','123','321','123'],
            ['空压机五号','222','321','123','321','123'],
            ['空压机六号','222','321','123','321','123'],
            ['空压机七号','222','321','123','321','123'],
            ['空压机八号','222','321','123','321','123'],
            ['空压机九号','222','321','123','321','123'],
          ]
        },
        "干燥机":{    
          "labels":['机器','状态','压力','功率',"露点"],
          "datas":[
            ['干燥机一号','222','321','123','321'],
            ['干燥机二号','222','321','123','321'],
            ['干燥机三号','222','321','123','321'],
            ['干燥机四号','222','321','123','321'],
            ['干燥机五号','222','321','123','321'],
            ['干燥机六号','222','321','123','321'],
            ['干燥机七号','222','321','123','321'],
            ['干燥机八号','222','321','123','321'],
            ['干燥机九号','222','321','123','321'],
          ]
        },
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
                <i className="fa fa-align-justify"></i><strong>机房数据</strong> <small>/Data Of Machine</small>
              </CardHeader>
              <CardBody>
                <Row xs="12" sm="12" lg="12">
                  { Object.keys(this.state.mainDatas).map( (key,index) => 
                    <Col xs="6" sm="4" lg="2" key={index}>
                      <Card >
                        <CardHeader className="bg-info theme-color ">
                          <CardTitle className="mb-0" style={{"textAlign": "center"}}>
                            {key} 
                          </CardTitle>
                        </CardHeader>
                        <CardBody className="bg-success theme-color">
                          {console.log(this.state.mainDatas[key])}
                            <h3 style={{"textAlign": "center"}}>{this.state.mainDatas[key]}</h3>
                        </CardBody>
                      </Card>
                    </Col>
                  )}
                </Row>
                {Object.keys(this.state.tableDatas).map( (key,index) =>
                <Row xs="12" sm="12" lg="12" className="bg-light theme-color  p-2 ml-0 mr-0" key={index} style={{"marginBottom":"10px","borderRadius": "1rem"}}>
                    <Badge className="mr-1 mb-3" color="primary" pill style={{"fontSize":"100%","lineHeight":'1.8'}}>
                      <h3>{key}</h3>
                    </Badge>
                    <Table lg='12' className="table table-striped">
                      <thead>
                        <tr>
                          {this.state.tableDatas[key].labels.map((label,index) =>
                            <th scope="col" key={index}>{label}</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                          {this.state.tableDatas[key].datas.map((data,index) => 
                            <tr key={index}>
                                { data.map((msg, index) => 
                                  <th scope={index===0?'row':''} key={index}>{msg}</th>  
                                )}
                            </tr>
                          )}
                      </tbody>
                    </Table>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Col> 
    );
  }
}

export default MachineRoom;
