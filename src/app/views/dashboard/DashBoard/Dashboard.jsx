import React from 'react';
import ReactDOM from 'react-dom';
import {ControlButton} from './ControlButton';
import {Charts} from './Charts';


// Container component
const Container = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...Box }}>
    {/* Content */}
  </div>
);

const Box = { margin: '20px 160px 40px 160px', height: '100px', backgroundColor: '#FFFFFF', border: '1px solid #000000',
  justifyContent: 'center',
};

const headerStyle = { display: 'flex', justifyContent: 'center',backgroundColor: '#f0f0f0',
                        border: '1px solid #000000',margin: '-1px 0 0 0', }

// Page component
const Dashboard = () => (
  <div>
    <div style={{ display: 'flex' }}> </div>
    <ControlButton />
    <div style={Box}>
      <h2 style={headerStyle}>Input Message</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input style={{ width: '75%',margin: '20px 0 0 0' }} placeholder=" Enter your message" />
      </div>
    </div>
    <div style={Box}>
      <h2 style={headerStyle}>Latest update</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}></div>
     </div>
     <Charts />
  </div>
);

export default Dashboard;
