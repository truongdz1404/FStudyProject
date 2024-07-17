import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

interface DoughnutChartProps {
  data: number;
  loading: boolean;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data}) => {
  const chartData = {
    labels: ['Total Login'], // Adding a label for the single value
    datasets: [
      {
        label: 'My First Dataset',
        data: [data], // Assuming the total percentage is 100
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Basic Doughnut Chart'
      }
    }
  };

  return (
    <div>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
