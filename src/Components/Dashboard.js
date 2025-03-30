// src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientCard from './ClientCard';
import '../styles/Dashboard.css';

const initialClients = [
  {
    id: 1,
    company: 'Acme Corp',
    name: 'John Smith',
    gst: '123456789',
    address: '123 Main St, Anytown',
  },
  {
    id: 2,
    company: 'Beta LLC',
    name: 'Jane Doe',
    gst: '987654321',
    address: '456 Elm St, Othertown',
  },
  {
    id: 3,
    company: 'Gamma Inc',
    name: 'Alice Johnson',
    gst: '112233445',
    address: '789 Oak St, Anothertown',
  },
];

const Dashboard = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 3;
  const navigate = useNavigate();

  // Search functionality
  const filteredClients = clients.filter(
    (client) =>
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.gst.includes(searchTerm)
  );

  // Pagination
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <button className="nav-button">DocManagement</button>
        <button className="nav-button active">Dashboard</button>
        <button className="nav-button create" onClick={() => navigate('/create')}>
          Create
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search clients by name, GST No.,"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>
      <h2>Client List</h2>
      <div className="client-list">
        {currentClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;