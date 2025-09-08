import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const colors = {
  tyrianPurple: '#5f0f40ff',
  utOrange: '#fb8b24ff',
  carmine: '#96031aff',
};

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box sx={{ mt: 4, px: { xs: 2, md: 6 } }}>
      <Typography variant="h4" fontWeight={700} mb={4} sx={{ color: colors.tyrianPurple }}>
        All Posts
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid 
            item 
            key={post._id} 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} // 4 columns on large screens
          >
            <Card
              sx={{
                borderRadius: 3,
                height: 450,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 15px rgba(95, 15, 64, 0.2)',
                cursor: 'pointer',
                ':hover': {
                  boxShadow: '0 8px 25px rgba(95, 15, 64, 0.35)',
                }
              }}
              onClick={() => navigate(`/posts/${post._id}`)}
              elevation={4}
            >
              {post.imageUrl && (
                <Box
                  component="img"
                  src={post.imageUrl}
                  alt={post.title}
                  sx={{
                    width: '100%',
                    height: '75%', // occupy 75% height of card
                    objectFit: 'cover',
                    borderRadius: '3px 3px 0 0',
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, px: 2, pt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    color: colors.utOrange,
                    textAlign: 'center',
                    userSelect: 'none',
                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                    lineHeight: 1.2,
                  }}
                >
                  {post.title}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 1 }}>
                <Button
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
                    navigate(`/posts/${post._id}`);
                  }}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllPosts;
