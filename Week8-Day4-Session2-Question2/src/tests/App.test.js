import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import App from '../App';
import store from '../redux/store';

describe('CourseEnrollmentSystem_Integration_Tests', () => {
  const renderApp = () =>
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

  const generateTestData = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      name: `Student_${randomId}`,
      email: `student${randomId}@mail.com`,
      reason: 'To enhance skills'
    };
  };

  const waitForCourseToLoad = async () => {
    await waitFor(() => {
      expect(screen.getByText(/react js/i)).toBeInTheDocument();
    });
  };

  const openEnrollmentForm = async (courseName = 'React JS') => {
    await waitForCourseToLoad();
    const courseCard = screen.getByText(new RegExp(courseName, 'i')).closest('.course-card');
    const enrollButton = within(courseCard).getByRole('button', { name: /enroll/i });
    fireEvent.click(enrollButton);
  };

  const fillEnrollmentForm = ({ name, email, reason }) => {
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: name }
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: email }
    });
    fireEvent.change(screen.getByPlaceholderText(/reason/i), {
      target: { value: reason }
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  };

  test('renders_heading_and_courses', async () => {
    renderApp();
    await waitForCourseToLoad();
    expect(screen.getByText(/course enrollment system/i)).toBeInTheDocument();
    expect(screen.getByText(/react js/i)).toBeInTheDocument();
    expect(screen.getByText(/java fullstack/i)).toBeInTheDocument();
    expect(screen.getByText(/data science/i)).toBeInTheDocument();
  });

  test('shows_enrollment_form_on_clicking_enroll', async () => {
    renderApp();
    await openEnrollmentForm();
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/reason/i)).toBeInTheDocument();
  });

  test('shows_error_if_name_or_email_missing', async () => {
    window.alert = jest.fn();
    renderApp();
    await openEnrollmentForm();
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(window.alert).toHaveBeenCalledWith('Name and Email are required');
  });

  test('enrolls_student_and_displays_in_list', async () => {
    renderApp();
    const data = generateTestData();
    await openEnrollmentForm();
    fillEnrollmentForm(data);
  
    const studentEntry = await screen.findByText(data.name);
    const entryLi = studentEntry.closest('li');
  
    expect(
      within(entryLi).getByText((content, node) =>
        node.textContent.includes(data.email)
      )
    ).toBeInTheDocument();
  
    expect(
      within(entryLi).getByText((content, node) =>
        node.textContent.includes(data.reason)
      )
    ).toBeInTheDocument();
  });
  

  test('form_resets_after_submission', async () => {
    renderApp();
    const data = generateTestData();
  
    // Open, fill, and submit the form
    await openEnrollmentForm();
    fillEnrollmentForm(data);
  
    // Ensure the button is available before clicking
    await waitFor(() => {
      expect(screen.getByText(/submit/i)).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText(/submit/i));
  
    // Reopen the form to check that it resets
    await openEnrollmentForm();
  
    // Check that the form is cleared
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/name/i).value).toBe('');
      expect(screen.getByPlaceholderText(/email/i).value).toBe('');
      expect(screen.getByPlaceholderText(/reason/i).value).toBe('');
    });
  });
  
  
  

  test('edit_button_opens_form_with_prefilled_data', async () => {
    renderApp();
    const data = generateTestData();
    await openEnrollmentForm();
    fillEnrollmentForm(data);

    const entry = await screen.findByText(data.name);
    const listItem = entry.closest('li');
    const editButton = within(listItem).getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue(data.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(data.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(data.reason)).toBeInTheDocument();
  });

  test('delete_button_removes_enrollment', async () => {
    renderApp();
    const data = generateTestData();
    await openEnrollmentForm();
    fillEnrollmentForm(data);

    const entry = await screen.findByText(data.name);
    const listItem = entry.closest('li');
    const deleteButton = within(listItem).getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(data.name)).not.toBeInTheDocument();
    });
  });

  test('allows_multiple_enrollments_per_course_with_unique_students', async () => {
    renderApp();
    const data1 = generateTestData();
    const data2 = generateTestData();
    await openEnrollmentForm();
    fillEnrollmentForm(data1);
    await openEnrollmentForm();
    fillEnrollmentForm(data2);

    expect(await screen.findByText(data1.name)).toBeInTheDocument();
    expect(await screen.findByText(data2.name)).toBeInTheDocument();
  });
});
