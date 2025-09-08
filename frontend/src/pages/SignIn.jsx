import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';

const colors = {
  delftBlue: '#3d405bff',
  burntSienna: '#e07a5fff',
  sunset: '#f2cc8fff',
};

const SignIn = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: colors.delftBlue }}>
        Sign In
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3, fontSize: '1.5rem' }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          sx={{ '& input': { fontSize: '1.5rem', padding: '14px' } }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          sx={{ '& input': { fontSize: '1.5rem', padding: '14px' } }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 5,
            fontSize: '1.8rem',
            py: 1.8,
            backgroundColor: colors.delftBlue,
            '&:hover': { backgroundColor: colors.burntSienna },
          }}
        >
          Sign In
        </Button>
      </form>
      <Typography align="center" sx={{ mt: 4, fontSize: '1.4rem', color: colors.delftBlue }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: colors.burntSienna, fontWeight: 'bold' }}>
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
};

export default SignIn;
