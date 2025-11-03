import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import BlogList from './components/BlogList';
import NewBlogPost from './components/NewBlogPost';
import BlogPost from './components/BlogPost';

function App() {
  const [blogPosts, setBlogPosts] = useState([
    { id: 0, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
    { id: 1, title: 'Second Blog Post', content: 'This is the content of the second blog post.' }
  ]);

  const handleNewBlogPost = (newPost) => {
    const post = {
      id: blogPosts.length,
      ...newPost
    };
    setBlogPosts([...blogPosts, post]);
  };

  return (
    <Router>
      <div className="App">
        <h1>Blog App</h1>
        <NavBar />
        <Routes>
          <Route path="/" element={<BlogList blogPosts={blogPosts} />} />
          <Route path="/create" element={<NewBlogPost onNewBlogPost={handleNewBlogPost} />} />
          <Route path="/post/:id" element={<BlogPost blogPosts={blogPosts} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;