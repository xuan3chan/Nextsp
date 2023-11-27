import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

const DashboardBar = () => {
  const monthlyOrderCountJSON = `{
    "weeklyDailyOrderCount": [
      {
          "startDate": "2023-11-01",
          "endDate": "2023-11-07",
          "orderCountByDay": {
              "2023-11-01": 10,
              "2023-11-02": 15,
              "2023-11-03": 20,
              "2023-11-04": 12,
              "2023-11-05": 8,
              "2023-11-06": 18,
              "2023-11-07": 22
          }
      },
      {
          "startDate": "2023-10-01",
          "endDate": "2023-10-07",
          "orderCountByDay": {
              "2023-10-01": 5,
              "2023-10-02": 10,
              "2023-10-03": 8,
              "2023-10-04": 14,
              "2023-10-05": 6,
              "2023-10-06": 9,
              "2023-10-07": 11
          }
      },
      {
          "startDate": "2023-09-01",
          "endDate": "2023-09-07",
          "orderCountByDay": {
              "2023-09-01": 7,
              "2023-09-02": 11,
              "2023-09-03": 9,
              "2023-09-04": 13,
              "2023-09-05": 5,
              "2023-09-06": 12,
              "2023-09-07": 16
          }
      },
      {
          "startDate": "2023-08-01",
          "endDate": "2023-08-07",
          "orderCountByDay": {
              "2023-08-01": 4,
              "2023-08-02": 9,
              "2023-08-03": 6,
              "2023-08-04": 11,
              "2023-08-05": 3,
              "2023-08-06": 7,
              "2023-08-07": 10
          }
      }
  ]
  }`;

  const monthlyOrderCountObject = JSON.parse(monthlyOrderCountJSON);

  const [selectedWeek, setSelectedWeek] = useState(monthlyOrderCountObject.weeklyDailyOrderCount[0]);

  const labels = Object.keys(selectedWeek.orderCountByDay);
  const data = Object.values(selectedWeek.orderCountByDay);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '# of Orders',
        data: data,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            var label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Number(context.parsed.y).toLocaleString();
            }
            return label;
          }
        }
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
      animationDuration: 400,
      onHover: (event, chartElement) => {
        event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      }
    },
    animation: {
      duration: 1000
    }
  };

  const handleWeekChange = (event) => {
    const weekIndex = event.target.value;
    setSelectedWeek(monthlyOrderCountObject.weeklyDailyOrderCount[weekIndex]);
  };

  return (
    <div>
      <select onChange={handleWeekChange}>
        {monthlyOrderCountObject.weeklyDailyOrderCount.map((week, index) => (
          <option key={index} value={index}>
            {week.startDate} - {week.endDate}
          </option>
        ))}
      </select>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DashboardBar;