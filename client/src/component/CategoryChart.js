import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const CategoryChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios
      .get('/chart')
      .then((response) => {
        const categoryData = response.data;
        setChartData({
          labels: categoryData.map((item) => item.name),
          datasets: [
            {
              label: 'number of listings',
              data: categoryData.map((item) => item.value),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const options = {
    indexAxis: 'y', // Display the data on the y-axis
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
      },
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Set the step size for the x-axis to 1
        },
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '200px' }}> {/* Set the width and height of the chart */}
      <h2>Number of Lists in Category</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CategoryChart;