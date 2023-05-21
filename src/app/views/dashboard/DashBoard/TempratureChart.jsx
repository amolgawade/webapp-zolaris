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
    const interval = setInterval(() => {
      const now = Date.now();
      const time = new Date(now).getTime();
      const SensorReading = Object.values(machineData.sensor)
      const temperatureReadings = SensorReading.map((reading) => ({
        temperature: reading.temperature,
        timestamp: reading.timestamp,
      }));
      const latestTemperatureReadings = temperatureReadings.slice(-10);
      //console.log("latest Temperature Readings:", latestTemperatureReadings);

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
          }, 10000); // Update the chart every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default RealTimeTemperatureChart;
