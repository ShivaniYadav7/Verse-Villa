import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const colors = {
  caribbeanCurrent: '#006d77ff',
  tiffanyBlue: '#83c5beff',
  burntSienna: '#e07a5fff',
};

const largeQuoteStyle = {
  fontSize: '6rem',
  fontWeight: 900,
  lineHeight: 0.6,
  color: colors.tiffanyBlue,
  userSelect: 'none',
  fontFamily: '"Georgia", serif',
};

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [assigning, setAssigning] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`);
        setPost(response.data);
      } catch {
        setError('Could not fetch post data.');
      } finally {
        setLoading(false);
      }
    };
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get('/api/groups');
        setGroups(response.data);
      } catch {
        // ignore
      }
    };
    fetchPost();
    fetchUserGroups();
  }, [postId]);

  const handleAssignGroup = async () => {
    if (!selectedGroup) return;
    setAssigning(true);
    try {
      await axios.patch(`/api/posts/${postId}/group`, { groupId: selectedGroup });
      const response = await axios.get(`/api/posts/${postId}`);
      setPost(response.data);
      alert('Post assigned to group successfully');
    } catch {
      alert('Failed to assign post to group');
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: 'center' }}>
        <CircularProgress sx={{ color: colors.caribbeanCurrent }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
          {error}
        </Typography>
      </Container>
    );
  }

  if (!post) return null;

  const isAuthor = user && post.author && user._id === post.author._id;

  return (
    <Container
      sx={{
        mt: 4,
        maxWidth: 'md',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: colors.caribbeanCurrent,
      }}
    >
      {/* Image centrally placed with max height */}
      {post.imageUrl && (
        <Box
          component="img"
          src={post.imageUrl}
          alt={post.title}
          sx={{
            width: '100%',
            maxHeight: { xs: 300, md: 450 },
            objectFit: 'cover',
            borderRadius: 3,
            mb: 4,
            boxShadow: `0 8px 20px rgba(0,0,0,0.3)`,
          }}
        />
      )}

      {/* Title centered and bold */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          mb: 3,
          textAlign: 'center',
          color: colors.burntSienna,
        }}
      >
        {post.title}
      </Typography>

      {/* Stylized double inverted commas */}
      <Box sx={{ position: 'relative', maxWidth: 800 }}>
        <Typography
          component="span"
          sx={{
            ...largeQuoteStyle,
            position: 'absolute',
            top: '-40px',
            left: '10px',
            userSelect: 'none',
          }}
        >
          “
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1.3rem',
            lineHeight: 1.9,
            whiteSpace: 'pre-line',
          }}
        >
          {post.content}
        </Typography>

        <Typography
          component="span"
          sx={{
            ...largeQuoteStyle,
            position: 'absolute',
            bottom: '-40px',
            right: '10px',
            userSelect: 'none',
            transform: 'rotateY(180deg)',
          }}
        >
          ”
        </Typography>
      </Box>

      {/* Date */}
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mt: 3, fontStyle: 'italic', fontSize: '0.9rem' }}
      >
        {new Date(post.createdAt).toLocaleString()}
      </Typography>

      {/* Assign group form */}
      {isAuthor && (
        <Box sx={{ mt: 5, width: '100%', maxWidth: 400 }}>
          <FormControl fullWidth sx={{ mb: 3, fontSize: '1.3rem' }} size="medium">
            <InputLabel id="group-select-label" sx={{ fontSize: '1.3rem' }}>
              Assign to Group
            </InputLabel>
            <Select
              labelId="group-select-label"
              value={selectedGroup}
              label="Assign to Group"
              onChange={(e) => setSelectedGroup(e.target.value)}
              sx={{ fontSize: '1.3rem' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {groups.map((group) => (
                <MenuItem key={group._id} value={group._id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedGroup || assigning}
            onClick={handleAssignGroup}
            sx={{ fontSize: '1.4rem', py: 1.5, px: 4, mt: 1 }}
            fullWidth
          >
            {assigning ? 'Assigning...' : 'Assign to Group'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PostDetail;
