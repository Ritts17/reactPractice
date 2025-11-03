import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

function RecipeForm({ addRecipe, updateRecipe, editingRecipe, setEditingRecipe }) {
    console.log("Props inside form: ", editingRecipe);
    const {
        register,
        reset,
        formState: { errors },
        setValue,
        watch
    } = useForm();

    const title = watch('title');
    const ingredients = watch('ingredients');
    const instructions = watch('instructions');

    useEffect (() => {
        if(editingRecipe) {
            setValue('title', editingRecipe.title);
            setValue('ingredients', editingRecipe.ingredients);
            setValue('instructions', editingRecipe.instructions);
        }
    }, [editingRecipe, setValue])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title,
            instructions,
            ingredients
        }
        if (editingRecipe) {
            updateRecipe({ ...data, id: editingRecipe.id });
        } 
        else {
            addRecipe({...data});
        }
        reset();
        setEditingRecipe(null)
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    id='title'
                    placeholder='Recipe Title'
                    {...register('title', {
                        required: "Recipe title is required"
                    })}
                />
                {errors.title && <div>{errors.title.message}</div>}

                <textarea
                    type='text'
                    name='ingredients'
                    id='ingredients'
                    placeholder='Ingredients'
                    {...register('ingredients', {
                        required: "Ingredients are required"
                    })}
                />
                {errors.ingredients && <div>{errors.ingredients.message}</div>}

                <textarea
                    type='text'
                    name='instructions'
                    id='instructions'
                    placeholder='Instructions'
                    {...register('instructions', {
                        required: "Instructions are required"
                    })}
                />
                {errors.instructions && <div>{errors.instructions.message}</div>}

                <button type='submit'>{editingRecipe ? "Upadte Recipe" : "Add Recipe"}</button>
            </form>
        </div>
    )
}

export default RecipeForm