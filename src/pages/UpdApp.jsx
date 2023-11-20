import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const UpdateApp = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState({
    patientName: '',
    date: '',
    startTime: '',
    endTime: '',
    exam: '',
    status: '',
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`https://mentbe.onrender.com/appointments/${appointmentId}`);
        const data = response.data;
        setAppointment({
          patientName: data.patient?.name,
          date: data.startTime ? new Date(data.startTime).toISOString().split('T')[0] : '',
          startTime: data.startTime ? new Date(data.startTime).toISOString().split('T')[1].substring(0, 5) : '',
          endTime: data.endTime ? new Date(data.endTime).toISOString().split('T')[1].substring(0, 5) : '',
          exam: data.exam,
          status: data.status,
        });
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prevAppointment => ({
      ...prevAppointment,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const startDateTime = new Date(`${appointment.date}T${appointment.startTime}`);
      const endDateTime = new Date(`${appointment.date}T${appointment.endTime}`);

      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        console.error("Invalid date or time values.");
        return;
      }

      const updatedAppointment = {
        ...appointment,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      };

      await axios.put(`https://mentbe.onrender.com/appointments/${appointmentId}`, updatedAppointment);
      console.log("Appointment updated successfully");
      navigate('/EmpHome');
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://mentbe.onrender.com/appointments/${appointmentId}`);
      console.log("Appointment deleted successfully");
      navigate('/EmpHome');
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Update Appointment</h2>
      <TextField
        label="Patient Name"
        value={appointment.patientName || ''}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={appointment.date}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Start Time"
        name="startTime"
        type="time"
        value={appointment.startTime}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 1800 }}
      />
      <TextField
        label="End Time"
        name="endTime"
        type="time"
        value={appointment.endTime}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 1800 }}
      />
      <TextField
        label="Exam"
        name="exam"
        value={appointment.exam || ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        name="status"
        value={appointment.status || ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginRight: "10px" }}>
          Update
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default UpdateApp;
