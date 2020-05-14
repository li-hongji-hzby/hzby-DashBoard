import React, { Component } from 'react'
import Chart from "react-apexcharts";

export class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      series: [{
        name: this.props.id,
        data:this.props.datas
      }],
      options: {
        chart: {
          type: 'line',
          height: 160,
          id:this.props.id,
          group: this.props.group,
          toolbar: {
            show:true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: this.props.id,
          align: 'left',
          style: {
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
          categories: this.props.labels
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
    }
  }

  componentWillReceiveProps(nextProps){
    let newSeries = JSON.parse(JSON.stringify(this.state.series))
    newSeries[0]['data']= nextProps.datas
    console.log(nextProps.datas)
    let newOptions = JSON.parse(JSON.stringify(this.state.options))
    newOptions['xaxis']['categories'] = nextProps.labels
    this.setState({
      series:newSeries,
      options:newOptions
    })
  }

  componentDidMount = () => {
    console.log(this.state.series[0]['data'])
    console.log(this.state.options['xaxis']['categories'])
  }
  
  render() {
    return (
      <Chart options={this.state.options} series={this.state.series} type="line" height={180}/>
    )
  }
}

export default index
