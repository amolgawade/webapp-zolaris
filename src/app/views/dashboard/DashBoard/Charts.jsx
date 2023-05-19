import React from 'react';
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

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        spacing={{ xs: 1, sm: 0 }}
        direction={isMobile ? 'column' : 'row'}
        useFlexGap
        flexWrap="wrap"
      >
        <Item sx={{ height: '90px',width: isMobile ? '100%' : '420px', flexGrow: isMobile ? 1 : 0 }}>
          <strong>TEMPERATURE</strong>
        </Item>
        <Item sx={{ height: '90px',width: isMobile ? '100%' : '420px', flexGrow: isMobile ? 1 : 0 }}>
          <strong>HUMIDITY</strong>
        </Item>
        <Item sx={{ height: '90px',width: isMobile ? '100%' : '420px', flexGrow: isMobile ? 1 : 0 }}>
          <strong>PRESSURE</strong>
        </Item>
      </Stack>
      <Stack
        spacing={{ xs: 2, sm: 0 }}
        direction={isMobile ? 'column' : 'row'}
        useFlexGap
        flexWrap="wrap"
      >
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
      <Stack spacing={{ xs: 2, sm: 0 }} direction={isMobile ? 'column' : 'row'} useFlexGap flexWrap="wrap" >
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
