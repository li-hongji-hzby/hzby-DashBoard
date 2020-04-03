import React from 'react';

const MainData = React.lazy(() => import('../../views/MainData'))
const MachineDetail = React.lazy(() => import('../../views/MachineDetail'))
const MachineRoom =React.lazy(() => import('../../views/MachineRoom'))

const routes = [
  { path: '/MainData', exact: true, name: 'MainData', component: MainData },
  { path: '/MachineRoom', exact: true, name: 'MachineRoom', component: MachineRoom },
  { path: '/MachineDetail', exact: true, name: 'MachineDetail', component: MachineDetail },
]

export default routes;