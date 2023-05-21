import React,{ useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { MachineContext } from '../../../MachineContext';

HighchartsMore(Highcharts);

const HumidityGauge = () => {

  const { machineData } = useContext(MachineContext);
  const latestSensorReading = Object.values(machineData.sensor).sort((a, b) => b.timestamp - a.timestamp).pop();
  //console.log(`This is latestSensorReading: `, latestSensorReading);

  const { humidity } = latestSensorReading;
  //console.log(`Humidity gauge:`, humidity);

  const minHumidity = 0; // Define the desired min temperature
  const maxHumidity = 100;

  const options = {
    chart: {
      type: 'gauge',
      height: '300px', // Set the desired height of the chart
      backgroundColor: 'white',
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
      min: minHumidity,
      max: maxHumidity,
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
        text: '%',
      },
      plotBands: [
        {
          from: 0,
          to: 30,
          color: '#00BFFF',
        },
        {
          from: 30,
          to: 70,
          color: '#32CD32',
        },
        {
          from: 70,
          to: 100,
          color: '#FF4500',
        },
      ],
    },
    series: [
      {
        name: 'Humidity',
        data: [((humidity - minHumidity) / (maxHumidity - minHumidity)) * 100],
        tooltip: {
          valueSuffix: ' %',
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HumidityGauge;
