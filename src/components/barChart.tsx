import React, { CSSProperties } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrace komponent z Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
    labels:string[],
    inputData:any[],
    title:string,
    barColor:string,
    style?:CSSProperties,
};

export function BarChart({labels,inputData,title,barColor,style}:Props){

  const data = {
    labels: labels,
    datasets: [
      {
        data: inputData,
        backgroundColor: barColor,
        borderWidth: 1,
        borderRadius:2,
        barPercentage:1,
        categoryPercentage: 1.0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: title,
      },
      legend: {
        display:false,
      },
    },
    scale: {
        x: {
            barPercentage: 1.0,
            categoryPercentage: 1.0,
            ticks: {
                display:false,
            },
        },
        y: {
            beginAtZero: true,
        },
        grid: {
            display: false,
          },
    },
  };

  return (
      <Bar data={data} options={options} style={style} />
  );
};