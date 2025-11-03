import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import UserList from '../components/UserList';
import UserDetails from '../components/UserDetails';
import App from '../App';

const queryClient = new QueryClient();

const renderWithProviders = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

test('renders_user_list_with_heading', async () => {
  renderWithProviders(<App />);
  await waitFor(() => expect(screen.getByText('User List')).toBeInTheDocument());
});

test('renders_user_names_in_the_list', async () => {
  renderWithProviders(<App />);
  expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
  expect(await screen.findByText('Ervin Howell')).toBeInTheDocument();
});

test('displays_user_details_on_clicking_a_user', async () => {
  renderWithProviders(<App />);
  
  const user = await screen.findByText('Leanne Graham');
  fireEvent.click(user);
  
  expect(await screen.findByText('Email: Sincere@april.biz')).toBeInTheDocument();
  expect(await screen.findByText('Phone: 1-770-736-8031 x56442')).toBeInTheDocument();
  expect(await screen.findByText('Website: hildegard.org')).toBeInTheDocument();
});

test('renders_user_details_with_correct_information', async () => {
  renderWithProviders(<UserDetails userId={1} />);
  expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
  expect(await screen.findByText('Email: Sincere@april.biz')).toBeInTheDocument();
  expect(await screen.findByText('Phone: 1-770-736-8031 x56442')).toBeInTheDocument();
  expect(await screen.findByText('Website: hildegard.org')).toBeInTheDocument();
});

test('does_not_render_UserDetails_initially', () => {
  renderWithProviders(<App />);
  expect(screen.queryByText('Loading user details...')).not.toBeInTheDocument();
});
