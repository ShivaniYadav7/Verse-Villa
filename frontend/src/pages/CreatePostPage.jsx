import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import { useAuth } from '../context/AuthContext';

const CreatePostPage = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('Please login to create a post.');
      navigate('/signin'); // redirect to login page
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get('/api/groups');
        setGroups(response.data);
      } catch {
        // silent error
      }
    };
    if (user) fetchUserGroups();
  }, [user]);

  const token = localStorage.getItem('token');

  const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axios.post('http://localhost:3001/api/posts/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data.imageUrl;
};


  const handleCreatePost = async (postData) => {
  setLoading(true);
  try {
    let imageUrl = '';
    if (postData.image) {
      imageUrl = await uploadImageToCloudinary(postData.image);
    }
    const payload = {
      title: postData.title,
      content: postData.content,
      imageUrl,
      groupId: postData.groupId || undefined,
    };
    await axios.post('/api/posts', payload, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    navigate('/');
  } catch {
    alert('Failed to create post. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return <CreatePost onSubmit={handleCreatePost} loading={loading} groups={groups} />;
};

export default CreatePostPage;
