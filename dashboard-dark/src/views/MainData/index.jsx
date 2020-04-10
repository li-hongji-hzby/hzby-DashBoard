import React, { Component } from 'react';
import { Grid, Card, Label, Table, Dropdown } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import cookie from 'react-cookies';
import CardWithTitle from '../../components/LineCard/CardWithTitle';

const cardMock = [
  {
    'kind':"电",
    "bgColor":"#352B9B",
    "datas": [1,23,12,2,45,15,96],
    "labels": ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  },
  {
    'kind':"气",
    "bgColor":"#448BCD",
    "datas": [123,21,1,54,45,47,6],
    "labels": ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  },
  {
    'kind':"压力",
    "bgColor":"#DF9B28",
    "datas": [12,1,12,54,41,2,96],
    "labels": ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  },
  {
    'kind':"单耗",
    "bgColor":"#C65757",
    "datas": [12,23,12,3,45,47,96],
    "labels": ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  },
]

export default class index extends Component {

  constructor(props){
    super(props)
    this.state={
      timeRange:'最近一个月',
      kind:'电',
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
    }
  }

  changeKind = (kind) => {
    this.setState({
      kind:kind
    })
  }
  changeTime = (time) => {
    this.setState({
      timeRange:time
    })
  }

  componentDidMount(){
    if(cookie.load('user') === undefined){
      this.props.history.push('/Login')
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          { cardMock.map( (key, index) => 
            <CardWithTitle key={index} kind={key.kind} bgColor={key.bgColor} datas={key.datas} labels={key.labels}></CardWithTitle>
          )}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12} className="d-flex-center">
              <Card className="w-100" style={{"background":"#23242D","boxShadow":"none"}}>
                <Card.Content className="card-header" style={{"padding":"1.5rem 3rem 1rem 1.5rem"}}>
                  <Card.Header className="d-flex" style={{"justifyContent":"space-between"}}>
                    <Label className="YaHei" color='blue' >{this.state.kind} / {this.state.timeRange}</Label>
                    <div>
                      <Dropdown
                        text='选择种类'
                        icon='align left'
                        floating
                        labeled
                        button
                        className='icon YaHei'
                      >
                        <Dropdown.Menu>
                          <Dropdown.Header icon='align left' content='种类' />
                          <Dropdown.Item onClick={()=>{ this.changeKind("电") }}>电</Dropdown.Item>
                          <Dropdown.Item onClick={()=>{ this.changeKind("气") }}>气</Dropdown.Item>
                          <Dropdown.Item onClick={()=>{ this.changeKind("压力") }}>压力</Dropdown.Item>
                          <Dropdown.Item onClick={()=>{ this.changeKind("单耗") }}>单耗</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown
                        text='请选择周期'
                        icon='calendar alternate'
                        floating
                        labeled
                        button
                        className='icon YaHei'
                      >
                        <Dropdown.Menu>
                          <Dropdown.Header icon='calendar alternate' content='时间周期' />
                          <Dropdown.Item onClick={()=>{ this.changeTime("最近一小时") }}>最近一小时</Dropdown.Item>
                          <Dropdown.Item onClick={()=>{ this.changeTime("最近一天") }}>最近一天</Dropdown.Item>
                          <Dropdown.Item onClick={()=>{ this.changeTime("最近一个月") }}>最近一个月</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Card.Header>
                </Card.Content>
                <Card.Content className="card-body">
                  <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                    <Line data={this.state.mainChart} options={this.state.mainChartOpts} height={300} />
                  </div>
                </Card.Content>
              </Card>
          </Grid.Column>
          <Grid.Column width={4} className="d-flex-center" >
              <Card className="w-100" style={{"background":"#23242D","boxShadow":"none"}}>
                <Card.Content className="card-header" style={{"padding":"1.5rem 3rem 1rem 1.5rem"}}>
                  <Card.Header className="d-flex" style={{"justifyContent":"space-between"}}>
                    <Label className="YaHei" color='blue'>数据列表</Label>
                  </Card.Header>
                </Card.Content>
                <Card.Content className="card-body" style={{"maxHeight":"375px","overflowY":"scroll"}}>
                  <Table celled className="table-dark">
                    <Table.Header>  
                      <Table.Row>
                        {this.state.tableDatas.labels.map((label,index) =>
                          <Table.HeaderCell key={index}>{label}</Table.HeaderCell>
                        )}
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.tableDatas.datas.map((data,index) => 
                          <Table.Row key={index}>
                              { data.map((msg, index) => 
                                <Table.Cell scope={index===0?'row':''} key={index}>{msg}</Table.Cell>  
                              )}
                          </Table.Row>
                        )}
                    </Table.Body>
                  </Table>
                </Card.Content>
              </Card>
            {/*  */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
