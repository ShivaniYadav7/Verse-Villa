import React, { useState } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography, Box } from '@mui/material';

const colors = {
  caribbeanCurrent: '#006d77ff',
  tiffanyBlue: '#83c5beff',
  burntSienna: '#e07a5fff',
};

const CreatePost = ({ onSubmit, loading, groups }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [groupId, setGroupId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({ title, content, image, groupId });
    setTitle('');
    setContent('');
    setImage(null);
    setGroupId('');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: colors.caribbeanCurrent }}>
        Create New Post
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ fontSize: '1.4rem' }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 4, '& input': { fontSize: '1.4rem', padding: '14px' }, color: colors.caribbeanCurrent }}
        />
        <TextField
          label="Content"
          variant="outlined"
          multiline
          rows={8}
          fullWidth
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 4, '& textarea': { fontSize: '1.4rem', padding: '14px' }, color: colors.caribbeanCurrent }}
        />
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="group-select-label" sx={{ fontSize: '1.3rem' }}>
            Add to Group (optional)
          </InputLabel>
          <Select
            labelId="group-select-label"
            value={groupId}
            label="Add to Group (optional)"
            onChange={(e) => setGroupId(e.target.value)}
            sx={{ fontSize: '1.3rem', color: colors.caribbeanCurrent }}
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
          variant="outlined"
          component="label"
          sx={{ mb: 4, fontSize: '1.4rem', textTransform: 'none', color: colors.burntSienna, borderColor: colors.burntSienna }}
        >
          {image ? 'Change Image' : 'Upload Image'}
          <input type="file" accept="image/*" hidden onChange={handleImageChange} />
        </Button>
        {image && (
          <Typography variant="body1" sx={{ mb: 4, color: colors.caribbeanCurrent }}>
            Selected file: {image.name}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{
            fontSize: '1.6rem',
            fontWeight: 'bold',
            backgroundColor: colors.caribbeanCurrent,
            '&:hover': { backgroundColor: colors.tiffanyBlue, color: colors.caribbeanCurrent },
            py: 2,
          }}
        >
          {loading ? 'Submitting...' : 'Submit Post'}
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePost;
