import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const colors = {
  eggshell: '#f4f1deff',
  delftBlue: '#3d405bff',
  burntSienna: '#e07a5fff',
};

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: colors.delftBlue }}>
          Please Sign In
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10, backgroundColor: colors.eggshell, p: 5, borderRadius: 3 }}>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{ fontWeight: '900', fontSize: '3.2rem', color: colors.burntSienna }}
      >
        Profile
      </Typography>
      <Typography variant="h5" sx={{ mb: 3, fontSize: '2rem', color: colors.delftBlue }}>
        <strong>Username:</strong> {user.name}
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, fontSize: '2rem', color: colors.delftBlue }}>
        <strong>Email:</strong> {user.email}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={logout}
        sx={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          backgroundColor: colors.burntSienna,
          '&:hover': { backgroundColor: colors.delftBlue },
          py: 1.8,
          px: 6,
          display: 'block',
          mx: 'auto',
        }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Profile;
