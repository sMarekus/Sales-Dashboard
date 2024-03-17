import React from 'react';
import './App.css';
import StatsComponent from './components/StatsComponent';
import Sidebar from './components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChartComponent from './components/ChartComponent';

const App: React.FC = () => {
  return (
    <div className="App d-flex">
      <Sidebar />
      <main className="p-4 w-100">
        <StatsComponent />
        <ChartComponent />
      </main>
    </div>
  );
}

export default App;
