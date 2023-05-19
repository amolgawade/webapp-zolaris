import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';
import { Slider} from "@mui/material";



export function ControlButton() {
  const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', };
  const containerRowStyle = { display: 'flex', flexDirection: 'row', justifyContent: 'center', };
  const containerColumnStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', };
  const reactBoxStyle = { width: '500px', height: '100px', backgroundColor: '#FFFFFF', border: '1px solid #000000',justifyContent: 'center'};
  const headerStyle = { display: 'flex', justifyContent: 'center',backgroundColor: '#f0f0f0',border: '1px solid #000000',margin: '-1px 0 0 0', }
  const buttonStyle = { margin: '1px 10px 10px 100px', padding: '8px 15px' };
  const Box = { margin: '20px 20px 40px 15px', height: '100px', backgroundColor: '#FFFFFF', border: '1px solid #000000',
                justifyContent: 'center',width: '1020px' };
  const messageHeaderStyle = { display: 'flex', justifyContent: 'center', backgroundColor: '#f0f0f0', border: '1px solid #000000', margin: '-1px 0 0 0',};


  return (
       <div style={containerStyle}>
          <div style={containerRowStyle}>
            <div style={containerColumnStyle}>
              <div style={reactBoxStyle}>
              <h2 style={headerStyle}>Smart control</h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}> Current State : </div>
              <button style={buttonStyle}>TURN ON</button>
              <button style={buttonStyle}>TURN OFF</button>
              </div>
            </div>
            <div style={containerColumnStyle}>
              <div style={reactBoxStyle}>
              <h2 style={headerStyle}>AC Power</h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}> Current State : </div>
                <button style={buttonStyle}>TURN ON</button>
                <button style={buttonStyle}>TURN OFF</button>
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
              <input style={{ width: '75%',margin: '20px 0 0 0' }} placeholder=" Enter your message" />
            </div>
          </div>
           <div style={Box}>
            <h2 style={messageHeaderStyle}>Latest update</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}></div>
          </div>
      </div>
  );
}



const IntelligentMode = styled("div")(({ theme }) => ({ marginLeft: '30px', marginRight: '30px', marginTop: '10px',}));

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
  return (
    <IntelligentMode>
      <Slider step={25} marks={marks} defaultValue={25} valueLabelDisplay="auto" getAriaValueText={valuetext} />
    </IntelligentMode>
  );
}

const BrightnessMode = styled("div")(({ theme }) => ({ marginLeft: '30px', marginRight: '30px', marginTop: '10px', }));
const brightnessMarks = Array.from(Array(11).keys()).map((value) => ({ value: value * 10, label: `${value * 10}%`, }));

export function BrightnessButton() {
  return (
    <BrightnessMode>
      <Slider marks={brightnessMarks} step={10} defaultValue={40} valueLabelDisplay="auto" getAriaValueText={valuetext} />
    </BrightnessMode>
  );
}
