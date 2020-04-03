import React, { Component } from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

const defaultData = {
  'kind':"电",
  "bgColor":"#352B9B",
  "data": [12,23,12,54,45,47,96],
  "labels": ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
}

class index extends Component {

  constructor(props){
    super(props)
    this.state={
      mainChart:{
        labels: this.props.labels?this.props.labels:defaultData.labels,
        datasets: [
          {
            label:  this.props.kind?this.props.kind:defaultData.kind,
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,0.5)',
            pointHoverBackgroundColor: this.props.bgColor?this.props.bgColor:defaultData.bgColor,
            pointBackgroundColor:this.props.bgColor?this.props.bgColor:defaultData.bgColor,
            borderWidth: 1,
            data: this.props.datas?this.props.datas:defaultData.data,
          },
        ],
      },
      mainChartOpts:{
        
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display:false,
            }],
          yAxes: [
            {
              display:false,
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                max:Math.max.apply(Math, this.props.datas?this.props.datas:defaultData.data) + 5,
                min:Math.min.apply(Math, this.props.datas?this.props.datas:defaultData.data) - 5
                // max: Math.min.apply(Math, this.state.mainChart.datasets[0].data),
              },
            }],
        },
        elements: {
          line: {
            tension: 0.00001,
            borderWidth: 1,
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
          },
        },
      },
    }
  }

  render() {
    return (
      <Grid.Column width={4} key={index} className="d-flex-center">
        <Card  className="w-100" style={{"backgroundColor":this.props.bgColor?this.props.bgColor:defaultData.bgColor,"boxShadow":"none"}}>
          <Card.Content>
            <Card.Header className="YaHei">{this.props.kind?this.props.kind:defaultData.kind} / 最近一周</Card.Header>
          </Card.Content>
          <Card.Content >
              <Line data={this.state.mainChart} options={this.state.mainChartOpts} height={120} />
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

export default index;
