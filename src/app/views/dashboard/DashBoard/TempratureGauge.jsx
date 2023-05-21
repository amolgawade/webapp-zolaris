import React,{ useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { MachineContext } from '../../../MachineContext';

HighchartsMore(Highcharts);

const TemperatureGauge = () => {
  const { machineData } = useContext(MachineContext);
  const latestSensorReading = Object.values(machineData.sensor).sort((a, b) => b.timestamp - a.timestamp).pop();
  //console.log(`This is latestSensorReading: `, latestSensorReading);

  const { temperature } = latestSensorReading;
  //console.log(`temperature gauge:`, temperature);

  const minTemperature = 0; // Define the desired min temperature
  const maxTemperature = 40; // Define the desired max temperature

  const options = {
    chart: {
      type: 'gauge',
      height: '300px',
    },
    title: null,
    credits: {
      enabled: false,
    },
    pane: {
      startAngle: -150,
      endAngle: 150,
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
      min: minTemperature,
      max: maxTemperature,
      minorTickInterval: 1,
      minorTickWidth: 2,
      minorTickLength: 5,
      minorTickPosition: 'inside',
      minorTickColor: '#666',
      tickPixelInterval: 10,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 15,
      tickColor: '#000000',
      labels: {
        step: 5,
        rotation: 0,
      },
      title: {
        text: '°C',
      },
      plotBands: [
        {
          from: -20,
          to: 0,
          color: '#6495ED',
        },
        {
          from: 0,
          to: 20,
          color: '#00BFFF',
        },
        {
          from: 20,
          to: 40,
          color: '#FF4500',
        },
      ],
    },
    series: [
      {
        name: 'Temperature',
        data: [((temperature - minTemperature) / (maxTemperature - minTemperature)) * 40],
        tooltip: {
          valueSuffix: ' °C',
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TemperatureGauge;

