import React from 'react';
import ReactDOM from 'react-dom';
import { ControlButton } from './ControlButton';
import { Charts } from './Charts';



// Page component
const Dashboard = () => (
  <div>
    <div style={{ display: 'flex' }}> </div>
    <ControlButton />
    <Charts />
  </div>
);

export default Dashboard;
