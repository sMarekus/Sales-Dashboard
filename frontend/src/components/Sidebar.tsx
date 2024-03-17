// frontend/src/components/Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "250px"}}>
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">Sales Dashboard</span>
      </div>
    </div>
  );
}

export default Sidebar;
