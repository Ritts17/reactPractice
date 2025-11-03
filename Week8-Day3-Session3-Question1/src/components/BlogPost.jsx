import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = ({ blogPosts }) => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div>
        <h2>Post Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div style={{ marginBottom: '20px' }}>
        <p>{post.content}</p>
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default BlogPost;