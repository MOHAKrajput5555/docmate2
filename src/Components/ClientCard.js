// src/components/ClientCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientCard = ({ client }) => {
  const navigate = useNavigate();

  return (
    <div
      className="client-card"
      onClick={() => navigate(`/client/${client.id}`)}
    >
      <h3>{client.company}</h3>
      <p>{client.name}</p>
      <p>GST No.: {client.gst}</p>
      <p>{client.address}</p>
      <a href="#" onClick={(e) => e.stopPropagation()}>
        Profile Link
      </a>
      <button
        className="edit-button"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/edit/${client.id}`);
        }}
      >
        ✏️
      </button>
    </div>
  );
};

export default ClientCard;