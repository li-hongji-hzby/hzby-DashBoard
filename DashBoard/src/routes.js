import React from 'react';

const MainData = React.lazy(() => import('./views/MainData/MainData'));
const MainDataV2 = React.lazy(() => import('./views/MainData/MainData'));
const MachineDetail = React.lazy(() => import('./views/MachineDetail/MachineDetail'));
const MachineRoom = React.lazy(() => import('./views/MachineRoom/MachineRoom'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/MainData', name: 'MainData', component: MainData },
  { path: '/MainDataV2', name: 'MainDataV2', component: MainDataV2 },
  { path: '/Machines/MachineDetail', name: 'MachineDetail', component: MachineDetail },
  { path: '/MachineRoom', name: 'MachineRoom', component: MachineRoom },
];

export default routes;
