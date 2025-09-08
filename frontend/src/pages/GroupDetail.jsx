import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const colors = {
  caribbeanCurrent: '#006d77ff',
  tiffanyBlue: '#83c5beff',
  aliceBlue: '#edf6f9ff',
  paleDogwood: '#ffddd2ff',
  atomicTangerine: '#e29578ff',
};

const largeQuoteStyle = {
  fontSize: '5rem',
  fontWeight: 900,
  lineHeight: 0.6,
  color: colors.tiffanyBlue,
  userSelect: 'none',
  fontFamily: '"Georgia", serif',
};

const GroupDetail = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`/api/groups/${groupId}`);
        setGroup(response.data);
      } catch {
        setError('Could not fetch group information.');
      } finally {
        setLoading(false);
      }
    };
    fetchGroup();
  }, [groupId]);

  useEffect(() => {
    const fetchGroupPosts = async () => {
      try {
        const response = await axios.get(`/api/groups/${groupId}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch group posts', error);
      }
    };
    fetchGroupPosts();
  }, [groupId]);

  const isMember =
    user &&
    group?.members?.some(
      (member) => member && member._id && member._id.toString() === user._id.toString()
    );

  const handleJoin = async () => {
    try {
      await axios.post(`/api/groups/${groupId}/join`);
      const response = await axios.get(`/api/groups/${groupId}`);
      setGroup(response.data);
    } catch (error) {
      console.error('Failed to join group:', error);
    }
  };

  const handleLeave = async () => {
    try {
      await axios.post(`/api/groups/${groupId}/leave`);
      const response = await axios.get(`/api/groups/${groupId}`);
      setGroup(response.data);
    } catch (error) {
      console.error('Failed to leave group:', error);
    }
  };

  if (loading)
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress sx={{ color: colors.caribbeanCurrent }} />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  if (!group) return null;

  return (
    <Container sx={{ mt: 4, mb: 6, color: colors.caribbeanCurrent }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        {group.name}
      </Typography>

      {/* Stylized group description with quotes */}
      <Box sx={{ position: 'relative', maxWidth: 800, mb: 4, mx: 'auto' }}>
        <Typography
          component="span"
          sx={{
            ...largeQuoteStyle,
            position: 'absolute',
            top: '-30px',
            left: '10px',
            userSelect: 'none',
          }}
        >
          “
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.3rem', lineHeight: 1.8 }}>
          {group.description}
        </Typography>
        <Typography
          component="span"
          sx={{
            ...largeQuoteStyle,
            position: 'absolute',
            bottom: '-30px',
            right: '10px',
            userSelect: 'none',
            transform: 'rotateY(180deg)',
          }}
        >
          ”
        </Typography>
      </Box>

      {/* Join / Leave Buttons */}
      {user && (
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          {isMember ? (
            <Button variant="outlined" color="error" onClick={handleLeave}>
              Leave Group
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.caribbeanCurrent,
                '&:hover': {
                  backgroundColor: colors.tiffanyBlue,
                  color: colors.caribbeanCurrent,
                },
              }}
              onClick={handleJoin}
            >
              Join Group
            </Button>
          )}
        </Box>
      )}

      {/* Member Toggle Button */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Button
          variant="text"
          size="small"
          onClick={() => setShowMembers((prev) => !prev)}
          sx={{ fontWeight: 'bold', color: colors.caribbeanCurrent }}
        >
          {showMembers ? 'Hide Members' : 'Show Members'}
        </Button>
      </Box>

      {/* Members List */}
      {showMembers && (
        <List sx={{ maxWidth: 500, mx: 'auto', mb: 6 }}>
          {group.members.map(
            (member) =>
              member && (
                <ListItem
                  key={member._id || member.name}
                  sx={{ borderBottom: `1px solid ${colors.tiffanyBlue}` }}
                >
                  <ListItemText primary={member.name || 'Unknown member'} />
                </ListItem>
              )
          )}
        </List>
      )}

      {/* Posts in Group as grid cards */}
      <Typography variant="h6" mt={4} mb={2}>
        Posts in this group
      </Typography>

      {posts.length === 0 ? (
        <Typography>No posts in this group yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: `0 4px 10px ${colors.tiffanyBlue}`,
                  height: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                }}
                onClick={() => window.location.href = `/posts/${post._id}`}
              >
                {post.imageUrl && (
                  <CardMedia
                    component="img"
                    height="220"
                    image={post.imageUrl}
                    alt={post.title}
                    sx={{ borderRadius: '3px 3px 0 0' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ color: colors.caribbeanCurrent }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    By {post.author?.name || 'Unknown'}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                    {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default GroupDetail;
