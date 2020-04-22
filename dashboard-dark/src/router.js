import React from 'react';

const MainData = React.lazy(() => import('./views/MainData'))
const MachineDetail = React.lazy(() => import('./views/MachineDetail'))
const MachineRoom =React.lazy(() => import('./views/MachineRoom'))

const routes = [
  { path: '/Home', exact: true, name: 'MainData', component: MainData },
  { path: '/Home/MachineRoom', exact: true, name: 'MachineRoom', component: MachineRoom },
  { path: '/Home/Machine', exact: true, name: 'MachineDetail', component: MachineDetail },
]

export default routes;