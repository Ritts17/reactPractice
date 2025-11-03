import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blogPosts }) => {
  return (
    <div>
      <h2>Blog Posts</h2>
      <div>
        {blogPosts && blogPosts.map((post) => (
          <div key={post.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
            <h3>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h3>
            <p>{post.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;