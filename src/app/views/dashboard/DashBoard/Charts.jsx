import React,{ useContext } from 'react';
import TemperatureGauge from './TempratureGauge';
import HumidityGauge from './HumidityGauge';
import PressureGauge from './PressureGauge'
import RealTimeTemperatureChart from './TempratureChart'
import RealTimeHumidityChart from './HumidityChart'
import RealTimePressureChart from './PressureChart'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MachineContext } from '../../../MachineContext';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
  borderRadius: '10px',
  border: '2px solid #ccc',
}));

export function Charts() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { machineData } = useContext(MachineContext);
  const latestSensorReading = Object.values(machineData.sensor).sort((a, b) => b.timestamp - a.timestamp).pop();
   //console.log(`This is latestSensorReading: `, latestSensorReading);

  const { temperature, humidity, pressure } = latestSensorReading;

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={{ xs: 2, sm: 3}} direction={isMobile ? 'column' : 'row'} useFlexGap flexWrap="wrap" sx={{ margin: '20px 20px 20px 20px'}}>
        <Item sx={{ height: '90px',width: isMobile ? '100%' : '100px'}}>
          <strong>TEMPERATURE</strong>
          <p><strong>{temperature} °C</strong></p>
        </Item>
        <Item sx={{ height: '90px',width: isMobile ? '100%' : '100px' }}>
          <strong>HUMIDITY</strong>
          <p><strong>{humidity} %</strong></p>
        </Item>
        <Item sx={{ height: '90px',width: isMobile ? '100%' : '100px'}}>
          <strong>PRESSURE</strong>
          <p><strong>{pressure} Pa</strong></p>
        </Item>
      </Stack>
      <Stack spacing={{ xs: 2, sm: 3 }} direction={isMobile ? 'column' : 'row'} useFlexGap flexWrap="wrap" sx={{ margin: '20px 20px 20px 20px'}}>
        <Item sx={{ width: isMobile ? '100%' : '100px' }}>
          <strong>TEMPERATURE GAUGE</strong>
          <TemperatureGauge />
        </Item>
        <Item sx={{ width: isMobile ? '100%' : '100px' }}>
          <strong>HUMIDITY GAUGE</strong>
          <HumidityGauge />
        </Item>
        <Item sx={{ width: isMobile ? '100%' : '100px' }}>
          <strong>PRESSURE GAUGE</strong>
          <PressureGauge />
        </Item>
      </Stack>
      <Stack spacing={{ xs: 2, sm: 3 }} direction={isMobile ? 'column' : 'row'} useFlexGap flexWrap="wrap" sx={{ margin: '20px 20px 20px 20px'}}>
          <Item sx={{ width: isMobile ? '100%' : '100px' }}>
            <strong>TEMPERATURE CHART</strong>
            <RealTimeTemperatureChart />
          </Item>
          <Item sx={{ width: isMobile ? '100%' : '100px' }}>
            <strong>HUMIDITY CHART</strong>
            <RealTimeHumidityChart />
          </Item>
          <Item sx={{ width: isMobile ? '100%' : '100px' }}>
            <strong>PRESSURE CHART</strong>
            <RealTimePressureChart />
          </Item>
        </Stack>
    </Box>
  );
}
