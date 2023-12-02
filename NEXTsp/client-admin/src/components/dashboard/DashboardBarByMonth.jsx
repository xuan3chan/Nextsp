import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

const apiURL = process.env.REACT_APP_STATISTICINMOTH;

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const DashboardBar = () => {
  const [monthlyOrderCount, setMonthlyOrderCount] = useState([]);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${apiURL}/${selectedYear}/${selectedMonth}`)
        .then(response => {
          if (response.data.success) {
            setMonthlyOrderCount(response.data.days);
            setServerMessage('');
          } else {
            setServerMessage(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 10000); // fetch data every 10 seconds
  
    return () => {
      clearInterval(intervalId); // clear interval on component unmount
    };
  }, [selectedYear, selectedMonth]);

  const sortedMonthlyOrderCount = [...monthlyOrderCount].sort((a, b) => new Date(a._id) - new Date(b._id));

  const labels = sortedMonthlyOrderCount.map(day => `Ngày ${new Date(day._id).getDate()}`);
  const data = sortedMonthlyOrderCount.map(day => day.total);
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Orders',
        data: data,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Đơn'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Ngày'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê order theo tháng',
      },
      tooltip: {
        enabled: true,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true,
      animationDuration: 1000,
      onHover: (event, chartElement) => {
        event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      }
    },
    animation: {
      duration: 1000
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className='w-[1160px]'>
      <select value={selectedYear} onChange={handleYearChange}>
        {Array.from({length: 10}, (_, i) => 2023 - i).map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {Array.from({length: 12}, (_, i) => i + 1).map(month => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      {serverMessage ? (
        <p>{serverMessage}</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
}
  
export default DashboardBar;