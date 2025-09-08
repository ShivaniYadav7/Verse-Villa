import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const colors = {
  delftBlue: '#3d405bff',
  burntSienna: '#e07a5fff',
};

const CreateGroup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      setError('Name and description are required');
      return;
    }
    try {
      await axios.post('/api/groups', {
        name,
        description,
        creator: user._id,
        members: [user._id],
      });
      navigate('/groups');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create group');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h3" gutterBottom sx={{ color: colors.delftBlue }}>
        Create New Group
      </Typography>
      {error && (
        <Typography color="error" mb={3} sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Group Name"
          fullWidth
          required
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ '& input': { fontSize: '1.4rem', padding: '12px' } }}
        />
        <TextField
          label="Description"
          fullWidth
          required
          margin="normal"
          multiline
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ '& textarea': { fontSize: '1.4rem', padding: '14px' } }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 4,
            fontSize: '1.7rem',
            fontWeight: 'bold',
            backgroundColor: colors.delftBlue,
            '&:hover': { backgroundColor: colors.burntSienna },
            py: 1.8,
            px: 6,
          }}
        >
          Create Group
        </Button>
      </form>
    </Container>
  );
};

export default CreateGroup;
