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
const History = React.lazy(() => import('./views/History'))
const SyncCharts = React.lazy(() => import('./views/SyncCharts'))
// const ApexDemo = React.lazy(() => import('./component/LineCard/ApexLineDemo'))
const routes = [
  { path: '/Home', exact: true, name: 'Home', component: Home },
  { path: '/Home/RealTime', exact: true, name: 'RealTime', component: RealTime },
  { path: '/Home/History', exact: true, name: 'History', component: History },
  { path: '/Home/SyncCharts', exact: true, name: 'SyncCharts', component: SyncCharts },
  // { path: '/ApexDemo', exact: true, name: 'ApexDemo', component: ApexDemo },
]
export default routes;