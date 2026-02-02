import React, { useState, useEffect } from 'react';
import type { EmailSchedule, CreateEmailData } from '../types';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateEmailData) => Promise<void>;
  onUpdate: (id: string, data: CreateEmailData) => Promise<void>;
  onDelete: (id: string) => void;
  onSend: (id: string) => void;
  selectedDate: Date;
  email: EmailSchedule | null;
  isLoading: boolean;
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
  onSend,
  selectedDate,
  email,
  isLoading,
}) => {
  const [formData, setFormData] = useState<CreateEmailData>({
    email: '',
    date: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to format date to YYYY-MM-DD without timezone shift
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (email) {
      setFormData({
        email: email.email,
        date: email.date.split('T')[0],
        description: email.description,
      });
    } else {
      setFormData({
        email: '',
        date: formatDateForInput(selectedDate),
        description: '',
      });
    }
    setError('');
  }, [email, selectedDate, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (email) {
        await onUpdate(email._id, formData);
      } else {
        await onCreate(formData);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{email ? 'Edit Email' : 'Create Email'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="recipient@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Enter email description..."
            />
          </div>

          <div className="modal-actions">
            {email && (
              <>
                <button
                  type="button"
                  className="send-btn"
                  onClick={() => onSend(email._id)}
                  disabled={isLoading || email.status === 'sent'}
                >
                  {isLoading ? 'Sending...' : email.status === 'sent' ? 'Sent' : 'Send Now'}
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDelete(email._id)}
                >
                  Delete
                </button>
              </>
            )}
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (email ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
