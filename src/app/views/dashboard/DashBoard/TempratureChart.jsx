import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

  useEffect(() => {
    // Simulating real-time data update
    const interval = setInterval(() => {
      const now = Date.now();
      const time = new Date(now).getTime();
      const temperature = Math.random() * 30; // Generate random temperature value
       setChartOptions((prevOptions) => {
              const updatedData = [...prevOptions.series[0].data, [time, temperature]];
              if (updatedData.length > 10) {
                updatedData.shift(); // Remove the oldest data point if exceeding the limit
              }
              return {
                ...prevOptions,
                series: [
                  {
                    ...prevOptions.series[0],
                    data: updatedData,
                  },
                ],
              };
            });
          }, 5000); // Update the chart every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default RealTimeTemperatureChart;
