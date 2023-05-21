import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { MachineContext } from '../../../MachineContext';

const RealTimeHumidityChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'spline',
      height: '300px',
    },
    title: null,
    credits: {
          enabled: false, // Disable the Highcharts credits
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%H:%M:%S}', // Display only time component
      },
    },
    yAxis: {
      title: {
        text: 'Humidity (%)',
      },
    },
    series: [
      {
        name: 'Humidity',
        data: [],
        color: 'blue',
      },
    ],
  });

const { machineData } = useContext(MachineContext);

useEffect(() => {
  // Simulating real-time data update
  const initialDelay = 1000; // 1 second
  const updateInterval = 30000; // 30 seconds

  const updateChart = () => {
    const now = Date.now();
    const time = new Date(now).getTime();
    const SensorReading = Object.values(machineData.sensor);
    const humidityReadings = SensorReading.map((reading) => ({
      humidity: reading.humidity,
      timestamp: reading.timestamp,
    }));
    const latestHumidityReadings = humidityReadings.slice(-10);
    //console.log("latest humidity Readings:", latestPressureReadings);
    console.log(`Refreshing humidity chart`);

    setChartOptions((prevOptions) => {
      const updatedData = [...prevOptions.series[0].data, [time, latestHumidityReadings]];
      if (updatedData.length > 10) {
        updatedData.shift();
      }
      const updatedChartData = latestHumidityReadings.map((reading) => [
        new Date(reading.timestamp)?.getTime(),
        parseFloat(reading.humidity),
      ]);
      return {
        ...prevOptions,
        series: [
          {
            ...prevOptions.series[0],
            data: updatedChartData,
          },
        ],
      };
    });
  };

  // Initial update after 1 second
  setTimeout(updateChart, initialDelay);

  // Update the chart every 30 seconds
  const interval = setInterval(updateChart, updateInterval);

  return () => {
    clearInterval(interval); // Cleanup the interval on component unmount
  };
}, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default RealTimeHumidityChart;
