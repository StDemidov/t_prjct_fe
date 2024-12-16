import { Bar } from 'react-chartjs-2';
import { PiEmptyDuotone } from 'react-icons/pi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './style.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarplotVCRaw = ({ data, raw_data, dates }) => {
  const startDate = new Date(dates.start);
  const endDate = new Date(dates.end);

  let data_full = data.concat(raw_data);
  var labels = getDateNumberArray(data_full);
  labels = getDataForLabels(labels, startDate, endDate);

  data_full = getDataForPeriod(data, raw_data, startDate, endDate);

  const dataConcated = data_full.data.concat(data_full.raw_data);

  let sum = 0;
  dataConcated.forEach((num) => {
    sum += num;
  });
  if (sum === 0) {
    return <PiEmptyDuotone color="red" />;
  }

  const backgroundColors = [
    ...Array(data_full.data.length).fill('rgba(130, 84, 255, 0.3)'), // Цвет для первого массива
    ...Array(data_full.raw_data ? data_full.raw_data.length : null).fill(
      'rgba(0, 191, 255, 0.3)'
    ), // Цвет для второго массива
  ];

  const borderColors = [
    ...Array(data_full.data.length).fill('rgba(130, 84, 255, 1)'),
    ...Array(data_full.raw_data ? data_full.raw_data.length : null).fill(
      'rgba(0, 191, 255, 1)'
    ),
  ];
  const chartData = {
    labels,
    datasets: [
      {
        data: dataConcated,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
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
          size: 6, // Размер шрифта заголовка тултипа
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
      className={styles.barDiv}
      style={{
        width: '100px',
        height: '50px',
        textAlign: 'center',
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarplotVCRaw;

function getDateNumberArray(dataArray) {
  // Определяем вчерашнюю дату
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Функция для форматирования даты в формате "день - номер месяца"
  const formatDateNumber = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому +1
    return `${day}.${String(month).length === 1 ? '0' + String(month) : month}`;
  };

  // Создаем массив с датами на основе длины массива чисел
  const datesArray = [];
  for (let i = dataArray.length - 1; i >= 0; i--) {
    // Каждая дата уменьшается на i дней от вчерашнего дня
    const date = new Date(yesterday);
    date.setDate(yesterday.getDate() - i);
    datesArray.push(formatDateNumber(date));
  }

  return datesArray;
}

const getDataForPeriod = (data, raw_data, startDate, endDate) => {
  const todayDate = new Date();
  const startIndex = Math.ceil((todayDate - startDate) / (1000 * 60 * 60 * 24)); // Индекс начала
  const endIndex = Math.floor((todayDate - endDate) / (1000 * 60 * 60 * 24)); // Индекс конца
  if (startIndex <= raw_data.length + 1 && endIndex <= raw_data.length + 1) {
    if (endIndex === 1) {
      return { data: [], raw_data: raw_data.slice(-startIndex + 1) };
    }
    return {
      data: [],
      raw_data: raw_data.slice(-startIndex + 1, -endIndex + 1),
    };
  } else if (
    startIndex > raw_data.length + 1 &&
    endIndex > raw_data.length + 1
  ) {
    return {
      data: data.slice(
        -startIndex + raw_data.length + 1,
        -endIndex + raw_data.length + 1
      ),
      raw_data: [],
    };
  } else if (
    startIndex > raw_data.length + 1 &&
    endIndex <= raw_data.length + 1
  ) {
    if (endIndex === 1) {
      return {
        data: data.slice(-startIndex + raw_data.length + 1),
        raw_data: raw_data,
      };
    }
    return {
      data: data.slice(-startIndex + raw_data.length + 1),
      raw_data: raw_data.slice(0, -endIndex + 1),
    };
  }
};

const getDataForLabels = (data, startDate, endDate) => {
  const todayDate = new Date();
  const startIndex = Math.ceil((todayDate - startDate) / (1000 * 60 * 60 * 24)); // Индекс начала
  const endIndex = Math.floor((todayDate - endDate) / (1000 * 60 * 60 * 24)); // Индекс конца
  // Проверяем, что индексы в пределах массива
  if (startIndex < 0 || endIndex >= data.length || startIndex < endIndex) {
    throw new Error('Период выходит за пределы массива');
  }
  // Извлекаем данные за указанный период
  if (endIndex === 1) {
    return data.slice(-startIndex + 1);
  }
  return data.slice(-startIndex + 1, -endIndex + 1); // Используем reverse(), чтобы вернуть порядок
};
