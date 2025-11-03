import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

const queryClient = new QueryClient();

const customRender = (ui, { ...renderOptions } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>,
    renderOptions
  );
};

const mockRecipes = [
  {
    idMeal: '1',
    strMeal: 'Pasta',
    strMealThumb: 'pasta.jpg',
    strCategory: 'Italian',
    strArea: 'Italian',
    strInstructions: 'Boil pasta and add sauce.',
    strIngredient1: 'Pasta',
    strMeasure1: '200g',
    strIngredient2: 'Tomato Sauce',
    strMeasure2: '100ml',
  },
  {
    idMeal: '2',
    strMeal: 'Sushi',
    strMealThumb: 'sushi.jpg',
    strCategory: 'Japanese',
    strArea: 'Japanese',
    strInstructions: 'Roll rice and fish.',
    strIngredient1: 'Rice',
    strMeasure1: '150g',
    strIngredient2: 'Fish',
    strMeasure2: '50g',
  },
];

describe('RecipeList App', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    fetch.mockClear();
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  test('recipe_catalog_heading_is_present', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: mockRecipes }),
    });

    customRender(<App />);
    const headings = await screen.findAllByText(/Recipe Catalog/i);
    expect(headings.length).toBeGreaterThan(0);
  });

  test('category_buttons_are_present', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: mockRecipes }),
    });

    customRender(<App />);

    const allBtn = await screen.findAllByText(/All/i);
    const italianBtn = await screen.findAllByText(/Italian/i);
    const japaneseBtn = await screen.findAllByText(/Japanese/i);

    expect(allBtn.length).toBeGreaterThan(0);
    expect(italianBtn.length).toBeGreaterThan(0);
    expect(japaneseBtn.length).toBeGreaterThan(0);
  });

  test('recipe_cards_are_present', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: mockRecipes }),
    });

    customRender(<App />);

    const pastaItems = await screen.findAllByText(/Pasta/i);
    const sushiItems = await screen.findAllByText(/Sushi/i);

    expect(pastaItems.length).toBeGreaterThan(0);
    expect(sushiItems.length).toBeGreaterThan(0);
  });



  test('clicking_show_more_expands_details', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: mockRecipes }),
    });

    customRender(<App />);

    const showMoreButtons = await screen.findAllByText(/Show More/i);
    fireEvent.click(showMoreButtons[0]);

    const instructions = await screen.findAllByText(/Instructions:/i);
    const ingredients = await screen.findAllByText(/Ingredients:/i);

    expect(instructions.length).toBeGreaterThan(0);
    expect(ingredients.length).toBeGreaterThan(0);
  });
});
