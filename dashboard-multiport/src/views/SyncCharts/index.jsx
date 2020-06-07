import React, { Component } from 'react'
import { Col, Row, Container, Image } from 'react-bootstrap'
import GroupLine from '../../component/LineCard/GroupLine'
import Axios from 'axios';

import add from './images/add.png'
import { dateFormat } from '../../utils/DateUtils';
import style from './style.module.css'
export class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      labels:[],
      dataArr:{}
    }
  }

  // 获取三个副图表数据
  getWeekDatas = () => {
    Axios.post("/Home/getHoursAgo",{
      hour:1,
      metrics:["active_power","flowrate"]
    }).then(res => {
      // console.log(res.data)
      let result = res.data.datas
      // console.log(result);
      let labels = []
      let newDataArr={}
      console.log(result)
      for (let i in result) {
        labels.push(dateFormat('YYYY/mm/dd HH:MM', new Date(result[i]['timestamp'] * 1000)))
        for(let j in result[i]){
          if(newDataArr[j] !== undefined && j!=='timestamp'){
            newDataArr[j].push(result[i][j])
          }else if(j!=='timestamp'){
            newDataArr[j]=[]
          }
        }
      }
      this.setState({
        labels:labels,
        dataArr:newDataArr
      })
    }).catch(err => {
      console.log(err);
      // this.props.history.push('/Login')
    })
  }

  componentWillMount(){
    this.setState({
      clientHeight:document.body.clientHeight-2*56-49
    })
    this.getWeekDatas()
  }

  render() {
    return (
      <Container fluid className="pr-5 pt-4 pb-4">
        <Row>
          {Object.keys(this.state.dataArr).map((key,index) => 
            <Col lg={3} md={12} sm={12} key={index} className="mb-2">
              <div className={style.chartBox} style={{"backgroundColor":"#23242D"}}>
                <GroupLine id={key} datas={this.state.dataArr[key]} group='social' labels={this.state.labels}></GroupLine>
              </div>
            </Col>
          )}
          {Object.keys(this.state.dataArr).map((key,index) => 
            <Col lg={3} md={12} sm={12} key={index} className="mb-2">
              <div style={{"backgroundColor":"#23242D"}}>
                <GroupLine id={key} datas={this.state.dataArr[key]} group='social' labels={this.state.labels}></GroupLine>
              </div>
            </Col>
          )}
          {Object.keys(this.state.dataArr).map((key,index) => 
            <Col lg={3} md={12} sm={12} key={index} className="mb-2">
              <div style={{"backgroundColor":"#23242D"}}>
                <GroupLine id={key} datas={this.state.dataArr[key]} group='social' labels={this.state.labels}></GroupLine>
              </div>
            </Col>
          )}
          {Object.keys(this.state.dataArr).map((key,index) => 
            <Col lg={3} md={12} sm={12} key={index} className="mb-2">
              <div style={{"backgroundColor":"#23242D"}}>
                <GroupLine id={key} datas={this.state.dataArr[key]} group='social' labels={this.state.labels}></GroupLine>
              </div>
            </Col>
          )}
          {Object.keys(this.state.dataArr).map((key,index) => 
            <Col lg={3} md={12} sm={12} key={index} className="mb-2">
              <div style={{"backgroundColor":"#23242D"}}>
                <GroupLine id={key} datas={this.state.dataArr[key]} group='social' labels={this.state.labels}></GroupLine>
              </div>
            </Col>
          )}
          {Object.keys(this.state.dataArr).map((key,index) => 
            <Col lg={3} md={12} sm={12} key={index} className="mb-2">
              <div style={{"backgroundColor":"#23242D"}}>
                <GroupLine id={key} datas={this.state.dataArr[key]} group='social' labels={this.state.labels}></GroupLine>
              </div>
            </Col>
          )}
          <Col lg={3} md={12} sm={12} className="mb-2">
            <div className={style.chartBox + " d-flex justify-content-center align-items-center h-100"}>
              <Image src={add}></Image>
            </div>
          </Col>
        </Row>
      </Container>
          )
  }
}

export default index
