import React,{ useContext, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { MachineContext } from '../../../MachineContext';
import firebase from '../../../../fake-db/db/firebasekey';

HighchartsMore(Highcharts);

const PressureGauge = () => {
  const { machineData } = useContext(MachineContext);
  const [latestPressure, setLatestPressure] = useState(null);
   //console.log(`This is selected machine id and parentId :`, machineData);
  const { parentId, id } = machineData.data;
  const dataRef = firebase.database().ref(`UsersData/${parentId}/${id}`);

  const fetchData = () => {
     dataRef.once('value').then((snapshot) => {
       const machine = snapshot.val();
       const latestSensorReading = Object.values(machine.sensor).sort((a, b) => b.timestamp - a.timestamp).pop();
       setLatestPressure(latestSensorReading.pressure);
       console.log(`This is latestSensorReading:`, latestSensorReading.pressure);
     });
   };

   useEffect(() => {
     fetchData();
     const intervalId = setInterval(fetchData, 15000); // Refresh every 15 seconds
     return () => {
       clearInterval(intervalId); // Clean up the interval on component unmount
     };
   }, []);;

  if (!latestPressure) {
    return <div>Loading...</div>;
  }

  const minPressure = 900; // Define the desired min temperature
  const maxPressure = 1100;


  const options = {
    chart: {
      type: 'gauge',
      height: '300px', // Set the desired height of the chart
    },
    title: null,
    credits: {
         enabled: false, // Disable the Highcharts credits
    },
    pane: {
      startAngle: -130,
      endAngle: 130,
      background: [
      {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#FFF'],
            [1, '#333'],
          ],
        },
        borderWidth: 0,
        outerRadius: '109%',
      },
      {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#333'],
            [1, '#FFF'],
          ],
        },
        borderWidth: 1,
        outerRadius: '107%',
      },
      {},
    ],
    },
    yAxis: {
      min: minPressure,
      max: maxPressure,
      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',
      tickPixelInterval: 30,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels: {
        step: 2,
        rotation: 'auto',
      },
      title: {
        text: 'hPa',
      },
      plotBands: [
        {
          from: 900,
          to: 950,
          color: '#6495ED',
        },
        {
          from: 950,
          to: 1050,
          color: '#32CD32',
        },
        {
          from: 1050,
          to: 1100,
          color: '#FF4500',
        },
      ],
    },
    series: [
      {
        name: 'Pressure',
        data:[((latestPressure - minPressure) / (maxPressure - minPressure)) * (1100 - 900) + 900],
        tooltip: {
          valueSuffix: ' hPa',
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PressureGauge;
