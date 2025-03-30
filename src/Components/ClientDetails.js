// src/components/ClientDetails.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ClientDetails.css';

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const folders = [
    { name: 'GST Documents', icon: '📜' },
    { name: 'Contracts', icon: '📝' },
    { name: 'Invoices', icon: '🧾' },
    { name: 'Reports', icon: '📊' },
    { name: 'Legal', icon: '⚖️' },
  ];

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="client-details">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <input
          type="text"
          placeholder="Search documents"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="folder-list">
        {filteredFolders.map((folder) => (
          <div key={folder.name} className="folder">
            <span>{folder.icon} {folder.name}</span>
            <button className="upload-button">Upload</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDetails;