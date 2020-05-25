import React, { Component } from 'react';
// import { Line } from 'react-chartjs-2';
import { Card } from 'react-bootstrap'
import Chart from "react-apexcharts";
import style from './style.module.css'


class index extends Component {

  constructor(props){
    super(props)
    this.state={
      kind:this.props.kind,
      series: [{
        data: this.props.datas
      }],
      options: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['rgba(255,255,255,0.2)'],
        stroke: {
          width: 2,
          curve: 'smooth'
        },
        xaxis: {
          categories:this.props.labels,
          labels:{
            show:false
          },
          axisBorder:{
            show:false
          }
        },
        fill: {
          type: 'solid'
        },
        markers: {
          size: 4,
          colors: [this.props.bgColor],
          strokeColors: "rgba(255,255,255,0.2)",
          strokeWidth: 2,
          hover: {
            size: 7,
          }
        },
        yaxis: {
          show:false
        },
        grid: {
          show: false,
        }
      }
    }
  }

  componentWillMount(){
    this.setState({
      clientHeight:document.body.clientHeight-2*56-49
    })
  }
  componentWillReceiveProps(nextProps){
    let newSeries = JSON.parse(JSON.stringify(this.state.series))
    newSeries[0]['data']= nextProps.datas
    let newOptions = JSON.parse(JSON.stringify(this.state.options))
    newOptions['xaxis']['categories'] = nextProps.labels
    this.setState({
      kind:nextProps.kind,
      series:newSeries,
      options:newOptions
    })
  }

  render() {
    return (
        <Card className={style.cardBox} style={{"backgroundColor": this.props.bgColor}}>
          <Card.Header className="d-flex justify-content-center align-items-center" >
            {this.state.kind}
          </Card.Header>
          <Card.Body style={{"position":"relative"}}>
              <Chart options={this.state.options} series={this.state.series} type="line" height={this.state.clientHeight *0.15}></Chart>
              <div className="d-flex justify-content-center align-items-center w-100 h-100" style={{"position":"absolute","top":'0',"left":"0"}}>
                <div className="d-flex justify-content-center align-items-baseline">
                  <h1 className={style.cardNum}>{this.props.avgData}</h1>
                  <h3 className={style.cardUnit}>{this.props.unit}</h3>
                </div>
              </div>
          </Card.Body>
        </Card>
    );
  }
}

export default index;
