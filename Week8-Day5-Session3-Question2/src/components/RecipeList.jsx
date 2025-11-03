import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';

const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const fetchData = async () => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log("Fetch Data: ", data.meals);
            return data.meals;
        } else {
            console.log("Error fetching data");
        }
    } catch (error) {
        console.error(error.message);
    }
}

function RecipeList() {
    const [filter, setFilter] = useState("All");
    const [currMeal, setCurrMeal] = useState({});
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['meals'],
        queryFn: fetchData
    });

    console.log("useQuery: ", typeof [data], isLoading, isError, error);
    
    if (isLoading) {
        return <div className="loading">Loading...</div>
    }
    
    if (isError) {
        return <div className="error">Error: {error.message}</div>
    }
    
    const categories = ["All", ...new Set(data.map(meal => meal.strCategory))];
    console.log(categories);

    let filteredData = [];

    if (filter === 'All') {
        filteredData = data;
    }
    else {
        filteredData = data.filter(meal => meal.strCategory === filter);
    }

    console.log("Curr filter", filter);
    console.log("filtered data: ", filteredData);

    const hanldeShowAndHide = (meal) => {
        if(currMeal.idMeal === meal.idMeal){
            setCurrMeal({});
        }else{
            setCurrMeal(meal);
        }
    }
    
    const getIngredients = (meal) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push({
                    ingredient: ingredient,
                    measure: measure ? measure.trim() : ''
                });
            }
        }
        return ingredients;
    }   
    return (
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    padding: 20px;
                }

                .loading, .error {
                    text-align: center;
                    font-size: 24px;
                    color: white;
                    padding: 50px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                }

                .error {
                    background: rgba(255, 0, 0, 0.2);
                }

                .filter-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 30px;
                    justify-content: center;
                    padding: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                }

                .filter-buttons button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 25px;
                    background: white;
                    color: #667eea;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .filter-buttons button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                    background: #667eea;
                    color: white;
                }

                .filter-buttons button:active {
                    transform: translateY(0);
                }

                .recipe-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 25px;
                    padding: 20px 0;
                    align-items: start;
                }

                .recipe-card {
                    background: white;
                    border-radius: 15px;
                    overflow: visible;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }

                .recipe-card img {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    display: block;
                    border-radius: 15px 15px 0 0;
                }

                .recipe-content {
                    padding: 20px;
                }

                .recipe-card h3 {
                    color: #333;
                    margin-bottom: 10px;
                    font-size: 22px;
                }

                .recipe-card p {
                    color: #666;
                    margin: 8px 0;
                    font-size: 14px;
                }

                .recipe-card p strong {
                    color: #667eea;
                    font-weight: 600;
                }

                .show-more-btn {
                    width: 100%;
                    padding: 12px;
                    margin-top: 15px;
                    border: none;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .show-more-btn:hover {
                    transform: scale(1.02);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                }

                .recipe-details {
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 2px solid #f0f0f0;
                    animation: slideDown 0.3s ease;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .recipe-details p {
                    line-height: 1.6;
                    text-align: justify;
                }

                .recipe-details p:first-child {
                    margin-bottom: 10px;
                }

                .recipe-details ul {
                    list-style: none;
                    padding-left: 0;
                    margin-top: 10px;
                }

                .recipe-details ul li {
                    padding: 8px 0;
                    border-bottom: 1px solid #f0f0f0;
                    color: #555;
                }

                .recipe-details ul li:last-child {
                    border-bottom: none;
                }
            `}</style>
            
            <div className="container">
                <div className="filter-buttons">
                    {
                        categories.map(btn => (
                            <button 
                                key={btn} 
                                onClick={() => setFilter(btn)}
                                style={filter === btn ? {
                                    background: '#667eea',
                                    color: 'white'
                                } : {}}
                            >
                                {btn}
                            </button>
                        ))
                    }
                </div>
                
                <div className="recipe-grid">
                    {
                        filteredData.map(meal => (
                            <div key={meal.idMeal} className="recipe-card">
                                <img src={meal.strMealThumb} alt={meal.strMeal} />
                                <div className="recipe-content">
                                    <h3>{meal.strMeal}</h3>
                                    <p><strong>Category:</strong> {meal.strCategory}</p>
                                    <p><strong>Area:</strong> {meal.strArea}</p>
                                    <button 
                                        className="show-more-btn"
                                        onClick={() => hanldeShowAndHide(meal)}
                                    >
                                        {currMeal.strMeal && meal.idMeal === currMeal.idMeal ? "Hide" : "Show More"}
                                    </button>

                                    {
                                        Object.keys(currMeal).length > 0 && meal.idMeal === currMeal.idMeal && 
                                        <div className="recipe-details">
                                            <p><strong>Instructions:</strong> {currMeal.strInstructions.split(" ").slice(0, 50).join(" ")}...</p>
                                            <div>
                                                <p><strong>Ingredients:</strong></p>
                                                <ul>
                                                    {getIngredients(currMeal).map((item, index) => (
                                                        <li key={index}>
                                                            {item.measure} {item.ingredient}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default RecipeList