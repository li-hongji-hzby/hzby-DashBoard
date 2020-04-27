import React from 'react';

// const MainData = React.lazy(() => import('./views/MainData'))
// const MachineDetail = React.lazy(() => import('./views/MachineDetail'))
// const MachineRoom =React.lazy(() => import('./views/MachineRoom'))

// const routes = [
//   { path: '/Home', exact: true, name: 'MainData', component: MainData },
//   { path: '/Home/MachineRoom', exact: true, name: 'MachineRoom', component: MachineRoom },
//   { path: '/Home/Machine', exact: true, name: 'MachineDetail', component: MachineDetail },
// ]
const Home = React.lazy(() => import('./views/Home'))
const RealTime = React.lazy(() => import('./views/RealTime'))
// const ApexDemo = React.lazy(() => import('./component/LineCard/ApexLineDemo'))
const routes = [
  { path: '/Home', exact: true, name: 'Home', component: Home },
  { path: '/Home/RealTime', exact: true, name: 'RealTime', component: RealTime },
  // { path: '/ApexDemo', exact: true, name: 'ApexDemo', component: ApexDemo },
]
export default routes;