// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Navigation from "./components/Navigation";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetail from "./pages/PostDetail";
import CreateGroup from "./pages/CreateGroup";
import GroupDetail from "./pages/GroupDetail";
import AllPosts from "./pages/AllPosts";
import AllGroups from "./pages/AllGroups";

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/groups/:groupId" element={<GroupDetail />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/groups" element={<AllGroups />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
