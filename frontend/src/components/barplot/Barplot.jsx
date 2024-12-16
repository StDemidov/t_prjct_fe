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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Barplot = ({ data }) => {
  data = data.split(',').map(Number);
  let sum = 0;
  data.forEach((num) => {
    sum += num;
  });
  if (sum === 0) {
    return 'Данные отсутствуют';
  }

  const labels = [1, 2, 3, 4, 5, 6, 7];
  const chartData = {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: 'rgba(130, 84, 255, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Это позволяет графику растягиваться по ячейке
    plugins: {
      legend: {
        display: false, // Убирает легенду
      },
      title: {
        display: false, // Убирает заголовок
      },
      tooltip: {
        enabled: true, // Оставляем тултипы
        yAlign: 'top', // Тултип появляется сверху курсора
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Цвет фона тултипа
        titleFont: {
          size: 10, // Размер шрифта заголовка тултипа
          weight: 'bold', // Жирность заголовка тултипа
        },
        bodyFont: {
          size: 8, // Размер шрифта текста тултипа
        },
        padding: {
          top: 4,
          right: 6,
          bottom: 4,
          left: 6,
        },
      },
    },
    scales: {
      x: {
        display: false, // Убирает подписи на оси X
      },
      y: {
        display: false, // Убирает подписи на оси Y
        beginAtZero: true, // Начало отсчета с нуля (оставляем)
      },
    },
  };

  return (
    <div
      style={{
        width: '140px',
        height: '40px',
        padding: '5px',
        textAlign: 'center',
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Barplot;