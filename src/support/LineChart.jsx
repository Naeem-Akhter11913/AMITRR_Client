import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    const chartConfig = {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Hindi',
            data: data.hindiMarks,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'English',
            data: data.engMarks,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: false,
          },
          
          {
            label: 'Bengali',
            data: data.bangMarks,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Arabic',
            data: data.arabicMarks,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Urdu',
            data: data.urduMarks,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            beginAtZero: false,
          },
        },
      },
    };

    const myChart = new Chart(ctx, chartConfig);

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div style={{ boxShadow:" 0px 1px 37px -2px rgba(0,0,0,0.75)", borderRadius: "10px"}}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
