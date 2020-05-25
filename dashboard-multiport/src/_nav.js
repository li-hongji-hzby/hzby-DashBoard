
import home from './images/home.png'
import homeOn from './images/home-on.png'
import realtime from './images/realtime.png'
import realtimeOn from './images/realtime-on.png'
export default [
    {        
      "name":"数据概览",
      "url":"/Home",
      "icon":home,
      "iconOn":homeOn,
      "mainNav":true,
      "children":[]
    },
    {        
      "name":"实时数据",
      "url":"/Home/RealTime",
      "icon":realtime,
      "iconOn":realtimeOn,
      "mainNav":true,
      "children":[]
    },
    {        
      "name":"历史数据",
      "url":"/",
      "icon":realtime,
      "iconOn":realtimeOn,
      "children":[
        {
          "name":"空压机一号",
          "url":"/Home/History",
          "icon":realtime,
          "iconOn":realtimeOn,
        },
        {
          "name":"空压机二号",
          "url":"/Home/Marchine",
          "icon":realtime,
          "iconOn":realtimeOn,
        },
      ]
    },
    {        
      "name":"异步图表",
      "url":"/Home/SyncCharts",
      "icon":realtime,
      "iconOn":realtimeOn,
      "mainNav":true,
      "children":[]
    },
  ]