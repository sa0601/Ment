import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Container, CssBaseline, Box, Avatar, Typography,
  TextField, Button
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event'; // Icon for creating a new appointment

const defaultTheme = createTheme();

const NewApp = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [appointment, setAppointment] = useState({ date: '', exam: '', status: '' });
  const [startTime, setStartTime] = useState(''); 
  
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://mentbe.onrender.com/newpatients/');
      console.log(response.data);  // This should log the array of patients
      setPatients(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prevAppointment => ({
      ...prevAppointment,
      [name]: value
    }));
  };

  // Handle change for the time picker
  const handleTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  // Calculate the end time based on the start time
  const appointmentStartTime = new Date(appointment.date + 'T' + startTime);
  const appointmentEndTime = new Date(appointmentStartTime.getTime() + 30 * 60000); // Adds 30 minutes

  const appointmentData = {
    ...appointment,
    patient: selectedPatient,
    startTime: appointmentStartTime.toISOString(),
    endTime: appointmentEndTime.toISOString()
  };
    try {
      await axios.post('https://mentbe.onrender.com/appointments', appointmentData);
      console.log("Appointment created successfully");
      navigate('/EmpHome');
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
};

  
  return (
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <EventIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Appointment
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            select
            margin="normal"
            required
            fullWidth
            label="Select Patient"
            name="selectedPatient"
            value={selectedPatient}
            onChange={e => setSelectedPatient(e.target.value)}
          >
            {patients.length > 0 ? (
              patients.map((patient) => (
                <MenuItem key={patient._id} value={patient._id}>
                  {patient.name}  
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Loading patients...</MenuItem>
            )}
            </TextField>
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="date"
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
            />
            <TextField
               margin="normal"
              required
              fullWidth
              name="startTime"
              label="Start Time"
              type="time"
              value={startTime}
              onChange={handleTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 1800, // 30 min steps
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="exam"
              label="Exam"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="status"
              label="Status"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Appointment
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default NewApp;
