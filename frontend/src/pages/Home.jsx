import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Group, PostAdd } from '@mui/icons-material';

const colors = {
  eggshell: '#f4f1deff',
  burntSienna: '#e07a5fff',
  delftBlue: '#3d405bff',
  cambridgeBlue: '#81b29aff',
  sunset: '#f2cc8fff',
  darkBg: '#2c2c2c',
  darkHover: '#444444',
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
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

    const fetchGroups = async () => {
      try {
        const response = await axios.get('/api/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchPosts();
    fetchGroups();
  }, []);

  const visiblePosts = posts.slice(0, 4);
  const visibleGroups = groups.slice(0, 4);

  return (
    <Box
      sx={{
        mt: 6,
        px: { xs: 4, md: 10 },
        backgroundColor: colors.eggshell,
        minHeight: '100vh',
        fontFamily: '"Roboto", "Lato", sans-serif',
        color: colors.delftBlue,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, #708d81, #ecf8f8)`,
          color: 'inherit',
          borderRadius: 4,
          p: { xs: 6, md: 8 },
          mb: 10,
          textAlign: 'center',
          boxShadow: `0 6px 20px rgba(0, 0, 0, 0.1)`,
          fontWeight: 700,
        }}
      >
        <Typography
          variant="h2"
          mb={3}
          sx={{
            fontWeight: 900,
            fontSize: { xs: '3.2rem', md: '4.5rem' },
            color: '#780000',
          }}
        >
          Reader's Club
        </Typography>
        <Typography
          variant="h5"
          mb={6}
          sx={{
            opacity: 0.9,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            fontWeight: 600,
            color: '#14130e',
          }}
        >
          Discover, share, and join book groups. Connect with other passionate readers!
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: 12,
            px: 7,
            py: 2,
            backgroundColor: '#3d405bff',
            fontSize: '1.6rem',
            fontWeight: 700,
            '&:hover': { backgroundColor: '#e07a5fff' },
            color: '#fff',
          }}
          onClick={() => navigate('/groups')}
        >
          Explore Groups
        </Button>
      </Box>

      {/* Recent Posts */}
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
        sx={{ fontSize: { xs: '2.4rem', md: '3rem' } }}
      >
        Recent Posts
      </Typography>
      <Grid container spacing={4} mb={2}>
        {visiblePosts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              elevation={7}
              sx={{
                borderRadius: 5,
                height: 460,
                display: 'flex',
                flexDirection: 'column',
                fontSize: '1.3rem',
                boxShadow: '0 7px 20px rgba(0,0,0,0.2)',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/posts/${post._id}`)}
            >
              {post.imageUrl && (
                <Box
                  component="img"
                  src={post.imageUrl}
                  alt={post.title}
                  sx={{
                    height: '75%',
                    objectFit: 'cover',
                    borderRadius: '5px 5px 0 0',
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={900} sx={{ color: colors.burntSienna }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  {post.content.length > 120 ? post.content.substring(0, 120) + '...' : post.content}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
                <Button
                  size="medium"
                  sx={{
                    color: colors.delftBlue,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                  }}
                  onClick={() => navigate(`/posts/${post._id}`)}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Posts action buttons */}
      <Box
        textAlign="center"
        mb={8}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        {posts.length > 0 && (
          <Button
            variant="outlined"
            color="primary"
            sx={{
              color: colors.delftBlue,
              borderColor: colors.delftBlue,
              fontWeight: 900,
              fontSize: '1.6rem',
              px: 8,
              py: 2,
              textTransform: 'none',
            }}
            onClick={() => navigate('/posts')}
          >
            View All Posts
          </Button>
        )}
        <Button
          variant="contained"
          size="large"
          startIcon={<PostAdd sx={{ fontSize: 28 }} />}
          sx={{
            backgroundColor: colors.darkBg,
            color: colors.eggshell,
            fontWeight: 900,
            borderRadius: 3,
            px: 7,
            py: 2,
            fontSize: '1.6rem',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { backgroundColor: colors.darkHover, boxShadow: 'none' },
          }}
          onClick={() => navigate('/create-post')}
        >
          Create New Post
        </Button>
      </Box>

      {/* Groups */}
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
        sx={{ fontSize: { xs: '2.4rem', md: '3rem' } }}
      >
        Groups
      </Typography>
      <Grid container spacing={4} mb={2}>
        {visibleGroups.map((group) => (
          <Grid item key={group._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              elevation={7}
              sx={{
                borderRadius: 5,
                height: 460,
                display: 'flex',
                flexDirection: 'column',
                fontSize: '1.3rem',
                boxShadow: '0 7px 20px rgba(0,0,0,0.2)',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/groups/${group._id}`)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={900} sx={{ color: colors.burntSienna, mb: 1.5 }}>
                  {group.name}
                </Typography>
                <Chip label={group.theme} color="primary" size="medium" sx={{ mb: 3 }} />
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  Members: {group.members.length}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
                <Button
                  size="medium"
                  sx={{
                    color: colors.delftBlue,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    textTransform: 'none',
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

      {/* Groups action buttons */}
      <Box
        textAlign="center"
        mb={8}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        {groups.length > 0 && (
          <Button
            variant="outlined"
            color="primary"
            sx={{
              color: colors.delftBlue,
              borderColor: colors.delftBlue,
              fontWeight: 900,
              fontSize: '1.6rem',
              px: 8,
              py: 2,
              textTransform: 'none',
            }}
            onClick={() => navigate('/groups')}
          >
            View All Groups
          </Button>
        )}
        <Button
          variant="contained"
          size="large"
          startIcon={<Group sx={{ fontSize: 28 }} />}
          sx={{
            backgroundColor: colors.darkBg,
            color: colors.eggshell,
            fontWeight: 900,
            borderRadius: 3,
            px: 7,
            py: 2,
            fontSize: '1.6rem',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { backgroundColor: colors.darkHover, boxShadow: 'none' },
          }}
          onClick={() => navigate('/create-group')}
        >
          Create New Group
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
