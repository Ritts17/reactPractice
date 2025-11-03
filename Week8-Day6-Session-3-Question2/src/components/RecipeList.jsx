import React from 'react'

function RecipeList({ recipes, onEdit, onDelete }) {
    return (
        <div>
            {recipes.length > 0 ? (
                <>
                    {
                        recipes.map(recipe => (
                            <div key={recipe.id}>
                                <h3>{recipe.title}</h3>
                                <p><strong>Ingredients</strong></p>
                                <p>{recipe.ingredients}</p>
                                <p><strong>Instructions</strong></p> 
                                <p>{recipe.instructions}</p>
                                <button onClick={() => onEdit(recipe)}>Edit</button>
                                <button onClick={() => onDelete(recipe.id)}>Delete</button>
                            </div>
                        ))
                    }
                </>
            ) : (
                <div>No recipes added yet. Add some delicious recipes!</div>
            )}
        </div>
    )
}

export default RecipeList