import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { MachineContext } from '../../../MachineContext';

const RealTimeTemperatureChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'spline',
      height: '300px',
    },
    title:null,
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
        text: 'Temperature (°C)',
      },
    },
    series: [
      {
        name: 'Temperature',
        data: [],
        color: '#6AEAD4',
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
    const temperatureReadings = SensorReading.map((reading) => ({
      temperature: reading.temperature,
      timestamp: reading.timestamp,
    }));
    const latestTemperatureReadings = temperatureReadings.slice(-10);
     //console.log("latest temperature Readings:", latestTemperatureReadings);
    console.log(`Refreshing temperature chart`)

    setChartOptions((prevOptions) => {
      const updatedData = [...prevOptions.series[0].data, [time, latestTemperatureReadings]];
      if (updatedData.length > 10) {
        updatedData.shift();
      }
      const updatedChartData = latestTemperatureReadings.map((reading) => [
        new Date(reading.timestamp)?.getTime(),
        parseFloat(reading.temperature),
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

export default RealTimeTemperatureChart;
