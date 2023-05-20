import { Box, Button, Fab, Icon, IconButton, styled,Typography} from '@mui/material';
import { Slider} from "@mui/material";
import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100px',
  color: theme.palette.text.secondary,
  flexGrow: 1,
  borderRadius: '10px',
  border: '2px solid #ccc',
}));


export function ControlButton() {

  return (
<Box sx={{ width: '100%' }}>
      <Stack spacing={{ xs: 2, sm: 3 }} direction="row" useFlexGap flexWrap="wrap" sx={{ margin: '20px 20px 20px 20px'}}>
        <Item>
          <strong>SMART CONTROL</strong>
           <div>
            <button style={{padding : '8px 8px',marginRight: '25px'}}>TURN ON </button>
            <button style={{padding : '8px 8px'}}>TURN OFF </button>
           </div>
        </Item>
        <Item>
          <strong>AC POWER</strong>
           <div>
             <button style={{padding : '8px 8px', marginRight: '25px'}}>TURN ON </button>
             <button style={{padding : '8px 8px'}}>TURN OFF </button>
           </div>
        </Item>
      </Stack>
      <Stack spacing={{ xs: 2, sm: 3 }} direction="row" useFlexGap flexWrap="wrap" sx={{ margin: '20px 20px 20px 20px'}}>
        <Item>
          <strong>INTELLIGENT MODE</strong>
           <InteModeButton />
        </Item>
        <Item>
          <strong>BRIGHTNESS MODE</strong>
          <BrightnessButton />
        </Item>
      </Stack>
      <Item sx={{ margin: '20px 20px 20px 20px'}}>
         <strong>Input Message</strong>
      </Item>
      <Item sx={{ margin: '20px 20px 20px 20px'}}>
        <strong>Latest Update</strong>
      </Item>
    </Box>
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