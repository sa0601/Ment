import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../actions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Icon for registering a new patient
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function PatSignUp() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const patientData = {
            patient: {
                pID: formData.get('pID'),
                name: formData.get('name'),
                age: formData.get('age'),
                insurance: formData.get('insurance'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                // add other patient fields as necessary
            },
            login: {
                username: formData.get('username'), // make sure you have a field in the form for username
                password: formData.get('password'), // make sure you have a field in the form for password
            }
        };

        try {
            await createPatient(patientData);
            console.log("Patient created successfully");
            navigate('/EmpHome'); // Navigate to EmpHome on success
        } catch (error) {
            console.error("Error creating patient:", error);
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PersonAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register Patient
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pID"
                            label="Patient ID"
                            name="pID"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            id="name"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="age"
                            label="Age"
                            id="age"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="insurance"
                            label="Insurance"
                            id="insurance"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Phone Number"
                            id="phone"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email Address"
                            id="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="username"
                            label="Username"
                            id="username"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                    </Button>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default PatSignUp;
