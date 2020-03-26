export default {
  items: [
    {
      name: '数据概览',
      url: '/MainDataV2',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: '空压机',
      url: '/Machines',
      icon: 'icon-cursor',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
      children: [
        {
          name: '空压机一号',
          url: '/Machines/MachineDetail',
          icon: 'icon-cursor'
        },
        {
          name: '空压机二号',
          url: '/Machines/MachineDetail',
          icon: 'icon-cursor'
        },
      ],
    },
    {
      name: '机房数据',
      url: '/MachineRoom',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'TestPage',
      url: '/TestPage',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
      },
    },
    {
      name: 'MainData',
      url: '/MainData',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    {
      name: 'RealTime',
      url: '/RealTime',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    {
      name: 'QueryData',
      url: '/QueryData',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    // {
    //   name: 'Theme',
    //   wrapper: {            // optional wrapper object
    //     element: '',        // required valid HTML5 element tag
    //     attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: ''             // optional class names space delimited list for title item ex: "text-center"
    // },
    
  ],
};
