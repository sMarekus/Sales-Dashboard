import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchStatisticsForPeriod } from '../services/ApiService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DataPoint {
  day: string;
  totalOrders: number;
  uniqueCustomers: number;
}

interface ChartDataType {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const ChartComponent: React.FC = () => {
    const [chartData, setChartData] = useState<ChartDataType>({
      labels: [],
      datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const startDate = "2024-03-01";
            const endDate = "2024-03-31";
            
            const data: DataPoint[] = await fetchStatisticsForPeriod(startDate, endDate);

            const labels = data.map((d: DataPoint) => d.day);
            const totalOrdersData = data.map((d: DataPoint) => d.totalOrders);
            const uniqueCustomersData = data.map((d: DataPoint) => d.uniqueCustomers);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Total Orders',
                        data: totalOrdersData,
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    },
                    {
                        label: 'Customers',
                        data: uniqueCustomersData,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    }
                ]
            });
        };

        fetchData();
    }, []);

    return <Line data={chartData} />;
};

export default ChartComponent;
