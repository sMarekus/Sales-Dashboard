import React, { useEffect, useState } from 'react';
import { fetchStatisticsForPeriod } from '../services/ApiService';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const StatsComponent: React.FC = () => {
  const [stats, setStats] = useState<any>({});
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  useEffect(() => {
    // Set initial dates to the last 30 days
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);
    const fromDateFormatted = lastMonth.toISOString().split('T')[0];
    const toDateFormatted = new Date().toISOString().split('T')[0];

    setFromDate(fromDateFormatted);
    setToDate(toDateFormatted);

    fetchStatisticsForPeriod(fromDateFormatted, toDateFormatted).then(([totalOrders, totalRevenue, totalCustomers]) =>
      setStats({ totalOrders, totalRevenue, totalCustomers })
    );
  }, []);

  const handleDateChange = (from: string, to: string) => {
    const adjustedToDate = new Date(to);
    adjustedToDate.setDate(adjustedToDate.getDate());
    const toDateString = adjustedToDate.toISOString().split('T')[0];

    fetchStatisticsForPeriod(from, toDateString).then(([totalOrders, totalRevenue, totalCustomers]) =>
      setStats({ totalOrders, totalRevenue, totalCustomers })
    );
  };

  return (
    <div className="container text-center mt-4">
      <h2 className="mb-4">Statistics</h2>
      <div className="row mb-4">
        <div className="col">
          <input 
            type="date" 
            className="form-control" 
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="col">
          <input 
            type="date" 
            className="form-control" 
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="col">
          <button 
            className="btn btn-primary" 
            onClick={() => handleDateChange(fromDate, toDate)}
          >
            Filter
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-header">Total Orders</div>
            <div className="card-body">
              <p className="card-text fs-3">{stats.totalOrders?.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-header">Total Revenue</div>
            <div className="card-body">
              <p className="card-text fs-3">{stats.totalRevenue?.totalRevenue?.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-header">Total Customers</div>
            <div className="card-body">
              <p className="card-text fs-3">{stats.totalCustomers?.totalCustomers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsComponent;
