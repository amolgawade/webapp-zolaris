import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

const TemperatureGauge = () => {
  const options = {
    chart: {
      type: 'gauge',
      height: '300px',
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
      min: -20,
      max: 40,
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
        data: [15],
        tooltip: {
          valueSuffix: ' °C',
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TemperatureGauge;
