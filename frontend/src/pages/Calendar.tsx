import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMonths, subMonths } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { EmailSchedule, CreateEmailData } from '../types';
import { api } from '../lib/api';
import EmailModal from '../components/EmailModal';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar: React.FC = () => {
  const [emails, setEmails] = useState<EmailSchedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEmail, setSelectedEmail] = useState<EmailSchedule | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
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

  const events = emails.map((email) => ({
    id: email._id,
    title: email.email,
    start: new Date(email.date),
    end: new Date(email.date),
    resource: email,
  }));

  // Helper to preserve local date without timezone shift
  const preserveLocalDate = (date: Date): Date => {
    // Create date string in YYYY-MM-DD format from local time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    // Return new date parsed as local time (no timezone shift)
    return new Date(`${year}-${month}-${day}T00:00:00`);
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    // Preserve the local date to avoid timezone issues
    const localDate = preserveLocalDate(start);
    setSelectedDate(localDate);
    setSelectedEmail(null);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event: any) => {
    setSelectedEmail(event.resource);
    const localDate = preserveLocalDate(event.start);
    setSelectedDate(localDate);
    setIsModalOpen(true);
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
      setIsModalOpen(false);
      setSelectedEmail(null);
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

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Email Calendar</h1>
        <button 
          className="create-btn"
          onClick={() => {
            setSelectedEmail(null);
            setSelectedDate(new Date());
            setIsModalOpen(true);
          }}
        >
          + Create New Email
        </button>
      </div>

      <div className="calendar-toolbar">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>Back</button>
        <span className="current-month">{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>Next</button>
        <button onClick={() => setCurrentDate(new Date())}>Today</button>
      </div>

      <div className="calendar-wrapper">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          view={Views.MONTH}
          date={currentDate}
          onNavigate={handleNavigate}
        />
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
        selectedDate={selectedDate}
        email={selectedEmail}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Calendar;
