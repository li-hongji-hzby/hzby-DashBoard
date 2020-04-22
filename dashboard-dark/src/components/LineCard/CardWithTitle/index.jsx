import React, { Component } from 'react';
import { Grid, Card, Header } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';


class index extends Component {

  constructor(props){
    super(props)
    this.state={
      kind:this.props.kind,
      mainChart:{
        labels:this.props.labels,
        datasets: [
          {
            label: this.props.kind,
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,0.5)',
            pointHoverBackgroundColor: this.props.bgColor,
            pointBackgroundColor: this.props.bgColor,
            borderWidth: 1,
            data: this.props.data,
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
                max:500,//Math.max.apply(Math, this.props.datas) + 5
                min: 0//Math.min.apply(Math, this.props.datas) - 5
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

  componentWillReceiveProps(nextProps){
    // console.log("新props");
    // console.log(nextProps);
    let chartData = this.state.mainChart
    chartData["labels"] = nextProps.labels
    chartData["datasets"][0]["data"] = nextProps.datas
    chartData["datasets"][0]["label"] = nextProps.kind
    let chartOpts = this.state.mainChartOpts
    chartOpts['scales']['yAxes'][0]['ticks']['max'] = Math.max.apply(Math, nextProps.datas) + Math.max.apply(Math, nextProps.datas)/3
    chartOpts['scales']['yAxes'][0]['ticks']['min'] = Math.min.apply(Math, nextProps.datas) - Math.max.apply(Math, nextProps.datas)/3
    this.setState({
      mainChart: chartData,
      kind:nextProps.kind,
      mainChartOpts:chartOpts
    })
    // console.log("新state");
    // console.log(this.state);
  }

  render() {
    return (
      <Grid.Column width={4} key={index} className="d-flex-center">
        <Card  className="w-100" style={{"backgroundColor":this.props.bgColor,"boxShadow":"none"}}>
          <Card.Content>
            <Card.Header className="YaHei" style={{"color":"#FFFFFF"}}>{this.state.kind}</Card.Header>
          </Card.Content>
          <Card.Content style={{"position":"relative"}}>
              <Line data={this.state.mainChart} options={this.state.mainChartOpts}/>
              <div className="d-flex-center" style={{"height":"100%","width":"100%","position":"absolute","top":'0',"left":"0"}}>
                  <Header as='h1' style={{"fontSize":"50px"}} className="color-gray m-0">{this.props.datas[this.props.datas.length-1]}</Header>
                  <Header as='h3' className="color-gray m-0" style={{"padding":"5px"}}>{this.props.unit}</Header>
              </div>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

export default index;
