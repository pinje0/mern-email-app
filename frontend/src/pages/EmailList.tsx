import React, { useState, useEffect } from 'react';
import type { EmailSchedule, CreateEmailData } from '../types';
import { api } from '../lib/api';
import EmailModal from '../components/EmailModal';

const EmailList: React.FC = () => {
  const [emails, setEmails] = useState<EmailSchedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await api.get<EmailSchedule[]>('/emails');
      setEmails(response.data);
    } catch (error) {
      console.error('Failed to fetch emails:', error);
    }
  };

  const handleCreateEmail = async (data: CreateEmailData) => {
    try {
      await api.post('/emails', data);
      await fetchEmails();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create email:', error);
      throw error;
    }
  };

  const handleUpdateEmail = async (id: string, data: CreateEmailData) => {
    try {
      await api.put(`/emails/${id}`, data);
      await fetchEmails();
      setIsModalOpen(false);
      setSelectedEmail(null);
    } catch (error) {
      console.error('Failed to update email:', error);
      throw error;
    }
  };

  const handleDeleteEmail = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this email?')) return;
    
    try {
      await api.delete(`/emails/${id}`);
      await fetchEmails();
    } catch (error) {
      console.error('Failed to delete email:', error);
    }
  };

  const handleSendEmail = async (id: string) => {
    setIsLoading(true);
    try {
      await api.post(`/emails/${id}/send`);
      await fetchEmails();
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'sent':
        return 'status-sent';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-pending';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="email-list-container">
      <div className="email-list-header">
        <h1>Email Schedules List</h1>
        <button 
          className="create-btn"
          onClick={() => {
            setSelectedEmail(null);
            setIsModalOpen(true);
          }}
        >
          + Create New Email
        </button>
      </div>

      <div className="email-list-table-wrapper">
        <table className="email-list-table">
          <thead>
            <tr>
              <th>Email Address</th>
              <th>Scheduled Date</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {emails.length === 0 ? (
              <tr>
                <td colSpan={5} className="no-data">No email schedules found</td>
              </tr>
            ) : (
              emails.map((email) => (
                <tr key={email._id}>
                  <td>{email.email}</td>
                  <td>{formatDate(email.date)}</td>
                  <td className="description-cell">{email.description}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(email.status)}`}>
                      {email.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => {
                        setSelectedEmail(email);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn send-btn"
                      onClick={() => handleSendEmail(email._id)}
                      disabled={isLoading || email.status === 'sent'}
                    >
                      {email.status === 'sent' ? 'Sent' : 'Send'}
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteEmail(email._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EmailModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmail(null);
        }}
        onCreate={handleCreateEmail}
        onUpdate={handleUpdateEmail}
        onDelete={handleDeleteEmail}
        onSend={handleSendEmail}
        selectedDate={selectedEmail ? new Date(selectedEmail.date) : new Date()}
        email={selectedEmail}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EmailList;
