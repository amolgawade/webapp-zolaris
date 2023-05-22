import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { MachineContext } from '../../../MachineContext';
import firebase from '../../../../fake-db/db/firebasekey';

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
  const fetchData = async () => {
    try {
      const { parentId, id } = machineData.data;
      const dataRef = firebase.database().ref(`UsersData/${parentId}/${id}`);
      const snapshot = await dataRef.once('value');
      const machine = snapshot.val();

      const humidityReadings = Object.values(machine.sensor).map((reading) => ({
        humidity: reading.humidity,
        timestamp: reading.timestamp,
      }));

      // Update the chart with fetched humidity readings
      updateChart(humidityReadings);
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  };

  // Simulating real-time data update
  const initialDelay = 1000; // 1 second
  const updateInterval = 15000; // 15 seconds

  const updateChart = (humidityReadings) => {
    const now = Date.now();
    const time = new Date(now).getTime();
    const latestHumidityReadings = humidityReadings.slice(-10);
    console.log('Latest humidity readings:', latestHumidityReadings);
    console.log('Refreshing humidity chart');

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
  setTimeout(fetchData, initialDelay);

  // Update the chart every 15 seconds
  const interval = setInterval(fetchData, updateInterval);

  return () => {
    clearInterval(interval); // Cleanup the interval on component unmount
  };
}, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default RealTimeHumidityChart;
