import React, { Component } from 'react';
import { Grid, Card, Header, Icon, Label } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
// https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cookie from 'react-cookies';

class index extends Component {

  constructor(props){
    super(props)
    this.state={
      msgKindList:['系统压力','排气压力','功率','频率'],
      msgKind:'系统压力',
      startDate:'',
      endDate:'',
      mainChart:{
        labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        datasets: [
          {
            label: 'coyote_creek',
            backgroundColor: '#1F212A',
            borderColor: '#3399FF',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [12,23,12,54,45,47,96,12,23,12,54,45,47,96,12,23,12,54,45,47,96,12,23,12,54,45,47,96],
          },
        ],
      },
      mainChartOpts:{
        
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
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
    }
  }

  changeMsgKind = (kind) => {
    this.setState({
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
  
  componentDidMount(){
    if(cookie.load('userMsg') === undefined){
      this.props.history.push('/Login')
    }
  }
  
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column className="w-100">
            <Card className="w-100" style={{"background":"#23242D","boxShadow":"none"}}>
              <Card.Content className="color-gray card-header" style={{"padding":"1rem 3rem 1rem 1.5rem"}}>
                <Card.Header className="d-flex" style={{"justifyContent":"start","alignItems":"center"}}>
                  <Label className="d-flex"  color='blue'style={{"justifyContent":"start","alignItems":"center"}} >
                    <Icon name="align left" className="color-gray" style={{"marginRight":"10px"}} />
                    <Header as='h2' className="color-gray m-0 YaHei">选择参数</Header>
                  </Label>
                </Card.Header>
              </Card.Content>
              <Card.Content className="d-flex card-body" style={{"justifyContent":"start","padding":"20px 30px","flexWrap":"wrap"}}>
                {this.state.msgKindList.map((key, index) => 
                  <Label key={index} as='a' color='teal' onClick={() => this.changeMsgKind(key)} style={{"marginRight":"20px","marginBottom":"10px"}} >{key}</Label>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="w-100">
          <Card className="w-100" style={{"background":"#23242D","boxShadow":"none"}}>
                <Card.Content className="color-gray card-header" style={{"padding":"1rem 3rem 1rem 1.5rem"}}>
                  <Card.Header className="d-flex" style={{"justifyContent":"start","alignItems":"center"}}>
                    <Label className="d-flex"  color='blue'style={{"justifyContent":"start","alignItems":"center"}}>
                      <Icon name="signal" className="color-gray" style={{"marginRight":"10px"}} />
                      <Header as='h2' className="color-gray m-0 YaHei">{this.state.msgKind}</Header>
                    </Label>
                    <DatePicker
                      // maxDate={new Date('2019-09-18 05:42:00')}
                      // minDate={new Date('2019-08-17 00:00:00')}
                      showTimeSelect
                      selected={this.state.startDate}
                      onChange={this.setStartDate}
                      className="ml-20"
                    />
                    <Label pointing='left' >开始时间</Label>
                    <DatePicker
                      // maxDate={new Date('2019-09-18 05:42:00')}
                      // minDate={new Date('2019-08-17 00:00:00')}
                      selected={this.state.endDate}
                      onChange={this.setEndDate}
                      className="ml-20"
                    />
                    <Label pointing='left' >结束时间</Label>
                  </Card.Header>
                </Card.Content>
                <Card.Content className="d-flex-center card-body" style={{"padding":"20px 30px"}}>
                  <div className="chart-wrapper w-100" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                    <Line data={this.state.mainChart} options={this.state.mainChartOpts} height={300} />
                  </div>
                </Card.Content>
              </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default index;
