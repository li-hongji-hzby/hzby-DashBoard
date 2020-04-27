import { Line } from 'react-chartjs-2';
import React, { Component } from 'react';
import './style.css';

const dataDefault = {
  data: [78, 81, 80, 45, 34, 12, 40],
  label: '模拟数据',
  timeLabels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  variant:'#FFC107'
}

export default class TypeWithData extends Component {

  constructor(props){
    super(props)
    this.state={
      data:{
        labels: this.props.data?this.props.data.timeLabels:dataDefault.timeLabels,
        datasets: [
          {
            backgroundColor: 'transparent',
            borderColor: this.props.dataset ? this.props.dataset.variant : dataDefault.variant,
            data: this.props.dataset ? this.props.dataset.data : dataDefault.data,
            label: this.props.dataset ? this.props.dataset.label : dataDefault.label,
          },
        ],
      },
      lineOpts:{
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: false,
            }],
          yAxes: [
            {
              display: false,
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
    }
  }


  render() {
    return (
      <div  className="callout" 
            style={{'borderLeftColor':this.props.dataset ? this.props.dataset.variant:dataDefault.variant,}}
            >
        <div>  
          <small className="text-muted">{ this.props.dataset ? this.props.dataset.title : '标题'}</small>
          <br />
          <strong className="h4">{ this.props.dataset ? this.props.dataset.num : '1.0.0' }</strong>
        </div>
        <div className="chart-wrapper">
          <Line data={this.state.data} options={this.props.dataOpts ? this.props.dataOpts : this.state.lineOpts}
                width={100} height={30}/>
        </div>
      </div>
    )
  }
}
