import React, { useState } from 'react'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'

function App() {
    const [recipes, setRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);

    console.log("Recipes value: ", recipes);

    const addRecipe = (newRecipe) => {
        const newObj = {
            id : recipes.length > 0 ? recipes[recipes.length - 1].id + 1 : 1,
            ...newRecipe
        }
        setRecipes( prevData => [...prevData, newObj])
    }

    const updateRecipe = (updatedRecipe) => {
        setRecipes(recipes.map((recipe) => {
            return recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        }))
        setEditingRecipe(null);
    }

    const deleteRecipe = (id) => {
        console.log(id);
        const filteredRecipes = recipes.filter(recipe => recipe.id !== id);
        setRecipes(filteredRecipes);
    }

    const handleEdit = (recipe) => {
        console.log("Recipe to edit: ",recipe);
        setEditingRecipe(recipe);
    }
  return (
    <div>
        <h1>Recipe Manager</h1>
        <RecipeForm 
        addRecipe={(newRecipe) => addRecipe(newRecipe)}
        updateRecipe = {updateRecipe}
        editingRecipe = {editingRecipe}
        setEditingRecipe = {setEditingRecipe}
        />
        <RecipeList 
        recipes={recipes}
        onEdit={handleEdit}
        onDelete={deleteRecipe}
        />
    </div>
  )
}

export default App