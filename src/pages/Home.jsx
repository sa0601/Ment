import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const handleEmpLogin = () => {
    navigate('/EmpLog');
  };

  const handlePatLogin = () => {
    navigate('/PatLog');
  };

  return (
    <div>
      {/* AppBar - Navigation */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"></Typography>
          {/* Other navigation items */}
        </Toolbar>
      </AppBar>

      {/* Hero Section with Title and Login Button */}
      <Container maxWidth="false" style={{ backgroundColor: '#282828', color: 'white', padding: '6rem 0', textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>Welcome to Ment</Typography>
        
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ marginRight: '20px' }}>
            <Button variant="contained" color="secondary" size="large" onClick={handlePatLogin}>
              Patient Login
            </Button>
          </motion.div> */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="contained" color="primary" size="large" onClick={handleEmpLogin}>
              Employee Login
            </Button>
          </motion.div>
        </div>
      </Container>
     

      {/* Footer */}
      <Container style={{ padding: '2rem 0', textAlign: 'center' }}>
        <Typography variant="body1">&copy; {new Date().getFullYear()} Ment</Typography>
        {/* Footer content */}
      </Container>
    </div>
  );
};

export default Home;
