import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import RecipeList from '../components/RecipeList';
import RecipeForm from '../components/RecipeForm';
import App from '../App';


// Mock data - ADD IDs
const recipes = [
  { id: 1, title: 'Pasta', ingredients: 'Noodles, Sauce', instructions: 'Boil noodles, add sauce' },
  { id: 2, title: 'Salad', ingredients: 'Lettuce, Tomato', instructions: 'Mix ingredients' },
];

// Mock functions
const onEditMock = jest.fn(); // Renamed to match prop name in RecipeList
const onDeleteMock = jest.fn(); // Renamed to match prop name in RecipeList
const addRecipeMock = jest.fn(); // Renamed to match prop name in RecipeForm
const updateRecipeMock = jest.fn();
const setEditingRecipeMock = jest.fn();

describe('Recipe Manager App Integration Tests', () => {
  test('app_title_is_rendered', () => {
    render(<App />);
    expect(screen.getByText(/recipe manager/i)).toBeInTheDocument();
  });

  test('user_can_add_recipe_and_see_it_listed', () => {
    render(<App />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText(/recipe title/i), { target: { value: 'Toast' } });
    fireEvent.change(screen.getByPlaceholderText(/ingredients/i), { target: { value: 'Bread, Butter' } });
    fireEvent.change(screen.getByPlaceholderText(/instructions/i), { target: { value: 'Toast bread, add butter' } });

    // Click the Add Recipe button
    fireEvent.click(screen.getByText(/add recipe/i));

    // Expect the recipe to appear in the list
    expect(screen.getByText('Toast')).toBeInTheDocument();
    expect(screen.getByText('Ingredients')).toBeInTheDocument();
    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Bread, Butter')).toBeInTheDocument();
    expect(screen.getByText('Toast bread, add butter')).toBeInTheDocument();
  });
});

describe('RecipeList Component', () => {
  beforeEach(() => {
    // Pass the correct prop names: onEdit, onDelete
    render(<RecipeList recipes={recipes} onEdit={onEditMock} onDelete={onDeleteMock} />);
  });

  test('recipe_list_is_present', () => {
    recipes.forEach((recipe) => {
      expect(screen.getByText(recipe.title)).toBeInTheDocument();
    });
  });

  test('edit_button_is_present', () => {
    const editButtons = screen.getAllByText('Edit');
    expect(editButtons.length).toBe(recipes.length);
  });

  test('delete_button_is_present', () => {
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons.length).toBe(recipes.length);
  });

  test('delete_recipe_is_working', () => {
    const deleteButton = screen.getAllByText('Delete')[0]; // Get the first delete button
    fireEvent.click(deleteButton);
    // Expect onDeleteMock to be called with the ID of the first recipe
    expect(onDeleteMock).toHaveBeenCalledWith(recipes[0].id);
  });
});

describe('RecipeForm Component', () => {
  beforeEach(() => {
    // Pass the correct prop names: addRecipe, updateRecipe, editingRecipe, setEditingRecipe
    // For add scenario, editingRecipe should be null
    render(
      <RecipeForm
        addRecipe={addRecipeMock}
        updateRecipe={updateRecipeMock}
        editingRecipe={null} // Important for 'Add Recipe' scenario
        setEditingRecipe={setEditingRecipeMock}
      />
    );
  });

  test('recipe_form_is_present', () => {
    expect(screen.getByPlaceholderText('Recipe Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingredients')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Add Recipe')).toBeInTheDocument(); // Check button text
  });

  test('add_recipe_is_working', () => {
    fireEvent.change(screen.getByPlaceholderText('Recipe Title'), { target: { value: 'Soup' } });
    fireEvent.change(screen.getByPlaceholderText('Ingredients'), { target: { value: 'Water, Vegetables' } });
    fireEvent.change(screen.getByPlaceholderText('Instructions'), { target: { value: 'Boil water, add vegetables' } });

    fireEvent.click(screen.getByText('Add Recipe'));

    expect(addRecipeMock).toHaveBeenCalledTimes(1); // Check if it was called once
    expect(addRecipeMock).toHaveBeenCalledWith({
      title: 'Soup',
      ingredients: 'Water, Vegetables',
      instructions: 'Boil water, add vegetables',
    });

    // Optionally, check if the form fields are cleared after submission
    expect(screen.getByPlaceholderText('Recipe Title')).toHaveValue('');
    expect(screen.getByPlaceholderText('Ingredients')).toHaveValue('');
    expect(screen.getByPlaceholderText('Instructions')).toHaveValue('');
  });
});