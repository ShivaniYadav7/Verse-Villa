import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const colors = {
  tyrianPurple: '#5f0f40ff',
  utOrange: '#fb8b24ff',
  carmine: '#96031aff',
};

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('/api/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <Box sx={{ mt: 4, px: { xs: 2, md: 6 } }}>
      <Typography variant="h4" fontWeight={700} mb={4} sx={{ color: colors.tyrianPurple }}>
        All Groups
      </Typography>
      <Grid container spacing={4}>
        {groups.map((group) => (
          <Grid 
            item 
            key={group._id} 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} // 4 columns on large screens
          >
            <Card
              sx={{
                borderRadius: 3,
                height: 320,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 15px rgba(95, 15, 64, 0.2)',
                cursor: 'pointer',
                ':hover': {
                  boxShadow: '0 8px 25px rgba(95, 15, 64, 0.35)',
                }
              }}
              onClick={() => navigate(`/groups/${group._id}`)}
              elevation={4}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: colors.utOrange }}>
                  {group.name}
                </Typography>
                <Chip label={group.theme} color="primary" size="small" sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Members: {group.members.length}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: colors.tyrianPurple,
                    color: '#fff',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { backgroundColor: colors.carmine },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/groups/${group._id}`);
                  }}
                >
                  View Group
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllGroups;
