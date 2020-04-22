import React, { Component } from 'react';
import { Grid, Card, Label, Table, Button } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import cookie from 'react-cookies';
import Axios from 'axios';
import CardWithTitle from '../../components/LineCard/CardWithTitle';
import { dateFormat } from '../../utils/DateUtils';

import '../../server'



export default class index extends Component {

  constructor(props){
    super(props)
    this.state={
      timeRange:'月',
      timeFormat:'YY年mm月dd号 ',
      kind:'电',
      labelColor:"#352B9B",
      cardDatas:[
        {
          'kind':"电",
          "bgColor":"#352B9B",
          "datas": [],
          "labels": [],
          "unit":"kW"
        },
        {
          'kind':"气",
          "bgColor":"#448BCD",
          "datas": [],
          "labels": [],
          "unit":"m³/min"
        },
        {
          'kind':"单耗",
          "bgColor":"#C65757",
          "datas": [],
          "labels": [],
          "unit":"kW·H/m³"
        },
      ],
      mainChart:{
        labels: [],
        datasets: [
          {
            label: 'coyote_creek',
            backgroundColor: '#1F212A',
            borderColor: '#3399FF',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [],
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
        labels:['时间','电','气','单耗'],
        datas:[]
      }
    }
  }

  intervalId 

  changeKind = (kind,color) => {
    let dataKind
    switch(kind){
      case '电':
        dataKind = 'electricity'
        break
      case '气':
        dataKind = 'air'
        break
      case '单耗':
        dataKind = 'unitCost'
        break
      default:
        dataKind = 'electricity'
    }
    let labels = []
    let datas = []
    // console.log(datas)
    for(let i in this.state.tableDatas.datas){
      datas.push(this.state.tableDatas.datas[i][dataKind])
      labels.push(dateFormat("YY/mm/dd HH:MM",new Date(this.state.tableDatas.datas[i]['timestamp']*1000)))
    }
    let newChartData = this.state.mainChart
    newChartData['labels'] = labels
    newChartData['datasets'][0]['data'] = datas
    let newChartOpts = this.state.mainChartOpts
    newChartOpts['scales']['yAxes'][0]['ticks']['max'] = Math.max.apply(Math, datas) 
    newChartOpts['scales']['yAxes'][0]['ticks']['min'] = Math.min.apply(Math, datas) 
    this.setState({
      mainChart: newChartData,
      mainChartOpts:newChartOpts,
      kind:kind,
      labelColor:color
    })
  }
  changeTime = (range,format) => {
    this.getMainDatas(range).then(()=>{
      this.changeKind(this.state.kind,this.state.labelColor)
    })
    this.setState({
      timeRange:range,
      timeFormat:format
    })
  }

  componentDidMount(){
    if(cookie.load('userMsg') === undefined){
      this.props.history.push('/Login')
    }
    this.getWeekDatas()
    this.getMainDatas(this.state.timeRange).then(() =>{
      this.changeKind(this.state.kind,this.state.labelColor)
    })
    this.intervalId = setInterval(() => {
      console.log("等待数据接口")
    }, 10*1000);
  }

  componentWillUnmount(){
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  getWeekDatas = () => {
    Axios.get("http://139.196.28.123/API/SummaryDay/getNewestLimit?limit=7").then(res =>{
      let result = res.data
      // console.log(result);
      let labels = []
      let elects = []
      let airs = []
      let units = []
      for(let i in result){
        labels.push(dateFormat('YYYY/mm/dd',new Date(result[i]['timestamp']*1000)))
        elects.push(result[i]['electricity'])
        airs.push(result[i]['air'])
        units.push(result[i]['unitCost'])
      }
      let newData = this.state.cardDatas
      newData[0]['datas'] = elects
      newData[0]['labels'] = labels
      newData[1]['datas'] = airs
      newData[1]['labels'] = labels
      newData[2]['datas'] = units
      newData[2]['labels'] = labels
      this.setState({
        cardDatas:newData
      })
    }).catch(err => {
      console.log(err);
      this.props.history.push('/Login')
    })
  }

  getMainDatas = async (range) =>{
    var _that = this
    var url = "http://139.196.28.123/API"
    switch(range){
      case '月':
        url += '/SummaryDay/getNewestLimit?limit=30'
        break;
      case '日':
        url += '/SummaryHour/getNewestLimit?limit=24'
        break
      case '年':
        url += '/SummaryMonth/getNewestLimit?limit=24'
        break
      default:
        url += '/SummaryDay/getNewestLimit?limit=30'
    } 
    let resData = await Axios.get(url).then(res =>{
      return res.data
    }).catch(err => {
      console.log("=============getMainDatas==============")
      console.log(err.response.status);
      console.log(err);
      this.props.history.push('/Login')
      return []
    })
    let newTableDatas = this.state.tableDatas
    // console.log(resData)
    newTableDatas['datas'] = resData
    _that.setState({
      tableDatas:newTableDatas
    })
    // console.log(_that.state.tableDatas)
  }



  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
        <Grid.Row className="d-flex" style={{"justifyContent":"space-between","padding":"2rem"}}>
          { this.state.cardDatas.map( (key, index) => 
          <Grid.Column width={4} key={index}  onClick={()=>{ this.changeKind(key.kind,key.bgColor) }}>
            <CardWithTitle kind={key.kind} bgColor={key.bgColor} unit={key.unit} mainChart={key.mainChart} datas={key.datas} labels={key.labels}></CardWithTitle>
          </Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12} className="d-flex-center">
              <Card className="w-100" style={{"background":"#23242D","boxShadow":"none"}}>
                <Card.Content className="card-header" style={{"padding":"1.5rem 3rem 1rem 1.5rem"}}>
                  <Card.Header className="d-flex" style={{"justifyContent":"space-between"}}>
                    <Label className="YaHei" style={{"backgroundColor":this.state.labelColor,"color":"#FFFFFF","paddingTop": "0.8rem"}}>{this.state.kind} / {this.state.timeRange}</Label>
                    <div>
                      <Button.Group>
                        <Button inverted color='violet' onClick={()=>{ this.changeTime("年","YY年mm月") }}>
                          年
                        </Button>
                        <Button inverted color='violet' onClick={()=>{ this.changeTime("月","YY年mm月dd日") }}>
                          月
                        </Button>
                        <Button inverted color='violet' onClick={()=>{ this.changeTime("日","dd日HH时MM分") }}>
                          日
                        </Button>
                      </Button.Group>
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
        </Grid.Row>
        </Grid.Column>
        <Grid.Column width={4} className="d-flex" >
              <Card className="w-100" style={{"background":"#23242D","boxShadow":"none"}}>
                <Card.Content className="card-header" style={{"maxHeight": "55px","padding":"1.2rem 3rem 1rem 1.5rem"}}>
                  <Card.Header className="d-flex" style={{"justifyContent":"space-between"}}>
                    <Label className="YaHei" color='blue'>数据列表</Label>
                  </Card.Header>
                </Card.Content>
                <Card.Content className="card-body" style={{"maxHeight":"630px","overflowY":"scroll"}}>
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
                              { Object.keys(data).map((msg, index) => 
                                <Table.Cell scope={index===0?'row':''} style={{'fontSize': '0.8rem'}} key={index}>
                                  {msg === 'timestamp'?dateFormat(this.state.timeFormat,new Date(data[msg]*1000)):data[msg]}
                                </Table.Cell>  
                              )}
                          </Table.Row>
                        )}
                    </Table.Body>
                  </Table>
                </Card.Content>
              </Card>
            {/*  */}
          </Grid.Column>
      </Grid>
    )
  }
}
