import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { MachineContext } from '../../../MachineContext';
import firebase from '../../../../fake-db/db/firebasekey';

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
    const fetchData = async () => {
      try {
        const { parentId, id } = machineData.data;
        const dataRef = firebase.database().ref(`UsersData/${parentId}/${id}`);
        const snapshot = await dataRef.once('value');
        const machine = snapshot.val();

        const pressureReadings = Object.values(machine.sensor).map((reading) => ({
          pressure: reading.pressure,
          timestamp: reading.timestamp,
        }));

        // Update the chart with fetched pressure readings
        updateChart(pressureReadings);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    // Simulating real-time data update
    const initialDelay = 1000; // 1 second
    const updateInterval = 15000; // 15 seconds

    const updateChart = (pressureReadings) => {
      const now = Date.now();
      const time = new Date(now).getTime();
      const latestPressureReadings = pressureReadings.slice(-10);
      console.log('Latest pressure readings:', latestPressureReadings);
      console.log('Refreshing pressure chart');

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
    };

    // Initial update after 1 second
    setTimeout(fetchData, initialDelay);

    // Update the chart every 30 seconds
    const interval = setInterval(fetchData, updateInterval);

    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, []);
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default RealTimePressureChart;
