import React from 'react';
import { Route } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import BlogList from '../components/BlogList';
import NewBlogPost from '../components/NewBlogPost';
import NavBar from '../components/NavBar';


test('renders_app_without_crashing', () => {
  render(<App />);
  const linkElement = screen.getByText(/Blog App/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders_the_navbar_correctly', () => {
  render(
    <MemoryRouter>
    <NavBar/>
    </MemoryRouter>);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});


test('navigates_to_the_createpost_page_using_routing', async () => {
  render(<App />);

 
  const newPostLink = screen.getByText(/Create Post/i);
  fireEvent.click(newPostLink);

  const titleLabel = await screen.findByText(/New Blog Post/i);
   expect(titleLabel).toBeInTheDocument();
});

test('renders_a_list_of_blog_posts_with_correct_titles_and_links', () => {
 
  const mockBlogPosts = [
    { id: 0, title: 'Blog Post 1', content: 'Content 1' },
    { id: 1, title: 'Blog Post 2', content: 'Content 2' },
   
  ];

  render(
    <MemoryRouter>
      <BlogList blogPosts={mockBlogPosts} />
    </MemoryRouter>
  );

  
  mockBlogPosts.forEach((post) => {
    const postTitle = screen.getByText(post.title);
    const postLink = screen.getByRole('link', { name: post.title });

    expect(postTitle).toBeInTheDocument();
    expect(postLink).toBeInTheDocument();
    expect(postLink.getAttribute('href')).toBe(`/post/${post.id}`);
  });
});

test('submits_the_form_correctly', () => {
  const mockOnNewBlogPost = jest.fn(); // Mock function for onNewBlogPost

  render(
    <MemoryRouter>
      <NewBlogPost onNewBlogPost={mockOnNewBlogPost} />
    </MemoryRouter>
  );

  // Fill out the form fields
  const titleInput = screen.getByLabelText('Title:');
  const contentTextarea = screen.getByLabelText('Content:');

  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });

  // Submit the form
  const submitButton = screen.getByText('Post Blog');
  fireEvent.click(submitButton);

  // Check if the onNewBlogPost function was called with the correct data
  expect(mockOnNewBlogPost).toHaveBeenCalledWith({
    title: 'Test Title',
    content: 'Test Content',
  });
});



test('navigates_back_to_home_using_back_to_home_link', () => {
  const history = createMemoryHistory(); // Create a memory history instance

  render(
    <MemoryRouter history={history}> {/* Provide the history to MemoryRouter */}
      <NewBlogPost />
    </MemoryRouter>
  );

  // Click the "Back to Home" link
  const backButton = screen.getByText('Back to Home');
  fireEvent.click(backButton);

  // Check if the URL changes to the home route
  expect(history.location.pathname).toBe('/');
});