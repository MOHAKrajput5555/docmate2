// src/components/ClientForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ClientForm.css';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    gst: '',
    address: '',
    profileLink: '',
  });

  // Simulate fetching client data for editing
  useEffect(() => {
    if (id) {
      const client = {
        company: 'Acme Corp',
        name: 'John Smith',
        gst: '123456789',
        address: '123 Main St, Anytown',
        profileLink: '',
      };
      setFormData(client);
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving the client
    console.log('Form submitted:', formData);
    navigate('/');
  };

  return (
    <div className="client-form">
      <h2>{id ? 'Edit Client' : 'Create Client Form'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name of the company</label>
        <input
          type="text"
          name="company"
          placeholder="Enter company name"
          value={formData.company}
          onChange={handleChange}
        />
        <label>Client Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter client name"
          value={formData.name}
          onChange={handleChange}
        />
        <div className="form-row">
          <div>
            <label>GST No.</label>
            <input
              type="text"
              name="gst"
              placeholder="Enter GST number"
              value={formData.gst}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <label>Profile Link</label>
        <input
          type="text"
          name="profileLink"
          placeholder="Enter profile link"
          value={formData.profileLink}
          onChange={handleChange}
        />
        <button type="button" className="upload-button">
          Upload File
        </button>
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
      <div className="notification">Great! Keep going, done!</div>
    </div>
  );
};

export default ClientForm;