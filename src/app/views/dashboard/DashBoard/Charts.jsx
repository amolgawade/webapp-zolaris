import React,{ useContext, useState, useEffect } from 'react';
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
import firebase from '../../../../fake-db/db/firebasekey';



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
   const [latestReading, setLatestReading] = useState(null);

   //console.log(`This is selected machine id and parentId :`, machineData);
   const { parentId, id } = machineData.data;
   const dataRef = firebase.database().ref(`UsersData/${parentId}/${id}`);

   const fetchData = () => {
     dataRef.once('value').then((snapshot) => {
       const machine = snapshot.val();
       const latestSensorReading = Object.values(machine.sensor).sort((a, b) => b.timestamp - a.timestamp).pop();
       setLatestReading(latestSensorReading);
       //console.log(`This is latestSensorReading:`, latestSensorReading);
     });
   };

   useEffect(() => {
     fetchData();
     const intervalId = setInterval(fetchData, 15000); // Refresh every 15 seconds
     return () => {
       clearInterval(intervalId); // Clean up the interval on component unmount
     };
   }, []);

   if (!latestReading) {
     return <div>Loading...</div>;
   }

   const formattedTimestamp = new Date(latestReading.timestamp).toLocaleTimeString();
   const formattedDate = new Date(latestReading.timestamp).toLocaleDateString();
  //console.log(`Readings are:`, latestReading);

  return (
    <Box sx={{ width: '100%' }}>
      <Item sx={{ height: '100px', margin: '20px 20px 20px 20px'}}>
        <strong>Latest Update</strong>
        <p><strong>{formattedDate} {formattedTimestamp}</strong></p>
      </Item>
      <Stack spacing={{ xs: 2, sm: 3}} direction={isMobile ? 'column' : 'row'} useFlexGap flexWrap="wrap" sx={{ margin: '20px 20px 20px 20px'}}>
        <Item sx={{ height: '90px',width: isMobile ? '100%' : '100px'}}>
          <strong>TEMPERATURE</strong>
          <p><strong>{latestReading.temperature} °C</strong></p>
        </Item>
        <Item sx={{ height: '90px',width: isMobile ? '100%' : '100px' }}>
          <strong>HUMIDITY</strong>
          <p><strong>{latestReading.humidity} %</strong></p>
        </Item>
        <Item sx={{ height: '90px',width: isMobile ? '100%' : '100px'}}>
          <strong>PRESSURE</strong>
          <p><strong>{latestReading.pressure} Pa</strong></p>
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
