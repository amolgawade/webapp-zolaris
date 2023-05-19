import { Box, Button, Fab, Icon, IconButton, styled,Typography} from '@mui/material';
import { Slider} from "@mui/material";
import React from 'react';



export function ControlButton() {
  const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', };
  const containerRowStyle = { display: 'flex', flexDirection: 'row', justifyContent: 'center', };
  const containerColumnStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', };
  const reactBoxStyle = { width: '500px', height: '100px', backgroundColor: '#FFFFFF', border: '1px solid #000000',justifyContent: 'center'};
  const headerStyle = { display: 'flex', justifyContent: 'center',backgroundColor: '#f0f0f0',border: '1px solid #000000',margin: '-1px 0 0 0', }
  const Box = { margin: '20px 20px 40px 15px', height: '100px', backgroundColor: '#FFFFFF', border: '1px solid #000000',
                justifyContent: 'center',width: '1020px' };
  const messageHeaderStyle = { display: 'flex', justifyContent: 'center', backgroundColor: '#f0f0f0', border: '1px solid #000000', margin: '-1px 0 0 0',};
  const [message, setMessage] = React.useState(" your message");

  return (
       <div style={containerStyle}>
          <div style={containerRowStyle}>
            <div style={containerColumnStyle}>
              <div style={reactBoxStyle}>
              <h2 style={headerStyle}>Smart control</h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}> Current State : </div>
              <div style={{ display: 'flex', justifyContent: 'center'}}>
              <button style={{  padding: '8px 8px' }}>TURN ON</button>
              <button style={{  padding: '8px 8px' }}>TURN OFF</button>
              </div>
              </div>
            </div>
            <div style={containerColumnStyle}>
              <div style={reactBoxStyle}>
              <h2 style={headerStyle}>AC Power</h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}> Current State : </div>
              <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button style={{  padding: '8px 8px' }}>TURN ON</button>
                <button style={{  padding: '8px 8px' }}>TURN OFF</button>
               </div>
              </div>
            </div>
          </div>
          <div style={containerRowStyle}>
            <div style={containerColumnStyle}>
              <div style={reactBoxStyle}>
              <h2 style={headerStyle}>Intelligent Mode</h2>
              <InteModeButton />
              </div>
            </div>
            <div style={containerColumnStyle}>
              <div style={reactBoxStyle}>
              <h2 style={headerStyle}>Display Brightness</h2>
              <BrightnessButton />
              </div>
            </div>
          </div>
          <div style={Box}>
            <h2 style={messageHeaderStyle}>Input Message</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ width: '75%', margin: '20px 0 0 0' }}>{message}</span>
            </div>
          </div>
           <div style={Box}>
            <h2 style={messageHeaderStyle}>Latest update</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}></div>
          </div>
      </div>
  );
}



const IntelligentMode = styled("div")(({ theme }) => ({ marginLeft: '30px',display: 'flex',
            flexDirection: 'column',  alignItems: 'center', marginRight: '30px', marginTop: '0px',}));

const marks = [
  { value: 0, label: "Manual" },
  { value: 25, label: "Cool" },
  { value: 50, label: "Cooler" },
  { value: 75, label: "Coolest" },
  { value: 100, label: "Chilled" },
];

function valuetext(value) {
  return `${value}°C`;
}

export function InteModeButton() {
  const [value, setValue] = React.useState(25);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <IntelligentMode>
      <div style={{ flex: 1 }}></div>
      <Typography variant="subtitle1">{marks.find((mark) => mark.value === value).label}</Typography>
      <Slider step={25} marks={marks.value} defaultValue={25} valueLabelDisplay="auto"  onChange={handleChange} />
    </IntelligentMode>
  );
}

const BrightnessMode = styled("div")(({ theme }) => ({ marginLeft: '30px', marginRight: '30px', marginTop: '10px', }));
const brightnessMarks = Array.from(Array(11).keys()).map((value) => ({ value: value * 10, label: `${value * 10}%`, }));

export function BrightnessButton() {
  const [value, setValue] = React.useState(40);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BrightnessMode>
       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
             <div>{`${value}%`}</div>
       </div>
      <Slider marks={brightnessMarks.value} step={10} defaultValue={40} valueLabelDisplay="auto" getAriaValueText={brightnessvalue} value={value} onChange={handleChange}/>
    </BrightnessMode>
  );
}

function brightnessvalue(value) {
  return `${value}%`;
}