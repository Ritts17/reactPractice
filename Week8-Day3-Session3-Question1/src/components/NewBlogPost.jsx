import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewBlogPost = ({ onNewBlogPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNewBlogPost) {
      onNewBlogPost({ title, content });
    }
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h2>New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', marginRight: '10px' }}>
          Post Blog
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default NewBlogPost;