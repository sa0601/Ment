import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const URL = "https://mentbe.onrender.com";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Ment
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function EmpLogin() {
  const navigate = useNavigate();

  const authenticateEmployee = async (credentials) => {
    try {
      const response = await axios.post('https://mentbe.onrender.com/employees/login', credentials);
      return response.data.isAuthenticated; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios Error
        const serverResponse = error.response;
        if (serverResponse) {
          console.error("Server responded with status:", serverResponse.status);
          console.error("Response data:", serverResponse.data);
          console.error("Response headers:", serverResponse.headers);
        } else {
          // No response received from the server
          console.error("No response from server:", error.message);
        }
      } else {
        // Not an Axios error
        console.error("Non-Axios error:", error.message);
      }
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);    
    const credentials = {
        username: data.get('username'),
        password: data.get('password'),
    };


    try {
        const isAuthenticated = await authenticateEmployee(credentials);
        if (isAuthenticated) {
            navigate('/EmpHome'); // Navigate to EmpHome on successful login
        } else {
            // Handle login failure (e.g., show error message)
            alert('Invalid credentials'); // Simple alert, replace with a better error handling
        }
    } catch (error) {
        // Handle errors (e.g., show error message)
        console.error("Login error:", error);
    }
};

const handleSignUpClick = () => {
  navigate('/EmpSignUp'); // Use the correct path for EmpSignUp
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Employee Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
        <Grid item>
          <Link variant="body2" onClick={handleSignUpClick} style={{ cursor: 'pointer' }}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default EmpLogin;
