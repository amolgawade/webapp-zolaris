import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { MachineContext } from '../../../MachineContext';

const RealTimePressureChart = () => {
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
        text: 'Pressure (Pa)',
      },
    },
    series: [
      {
        name: 'Pressure',
        data: [],
        color: 'green',
      },
    ],
  });

  const { machineData } = useContext(MachineContext);
  useEffect(() => {
    // Simulating real-time data update
    const interval = setInterval(() => {
      const now = Date.now();
      const time = new Date(now).getTime();
      const SensorReading = Object.values(machineData.sensor)
      const pressureReadings = SensorReading.map((reading) => ({
          pressure: reading.pressure,
          timestamp: reading.timestamp,
      }));
      const latestPressureReadings = pressureReadings.slice(-10);
      console.log("latest Pressure Readings:", latestPressureReadings);

      setChartOptions((prevOptions) => {
        const updatedData = [...prevOptions.series[0].data, [time, latestPressureReadings]];
        if (updatedData.length > 10) {
          updatedData.shift();
        }
        const updatedChartData = latestPressureReadings.map((reading) => [
          new Date(reading.timestamp)?.getTime(),
          parseFloat(reading.pressure),
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
    }, 10000); // Update the chart every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default RealTimePressureChart;
