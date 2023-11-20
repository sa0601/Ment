import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Button from '@mui/material/Button';

const localizer = momentLocalizer(moment);

const EmpHome = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('https://mentbe.onrender.com/appointments/appointments');
      const formattedEvents = response.data.map(appointment => ({
        id: appointment._id, // Include appointment ID
        title: `${appointment.patientName} - ${appointment.exam}`, // Updated to use patientName
        start: new Date(appointment.startTime),
        end: new Date(appointment.endTime)
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleCreateAppointment = () => {
    navigate('/NewApp'); 
  };

  const handleRegisterPatient = () => {
    navigate('/PatSignUp'); 
  };

  const handleSelectEvent = (event) => {
    navigate(`/UpdApp/${event.id}`); // Navigate to the UpdateApp component
  };

  return (
    <div>
      <div style={{ margin: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleCreateAppointment}>
          Create Appointment
        </Button>
        <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }} onClick={handleRegisterPatient}>
          Register Patient
        </Button>
      </div>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent} // Add onSelectEvent handler
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default EmpHome;
