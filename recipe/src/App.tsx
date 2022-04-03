import React, { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { IRecipe } from './IRecipe';
import RecipeComponent from './RecipeComponent';

function App() {
  const [recipesFound, setRecipesFound] = useState<IRecipe[]>([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (query: string): Promise<IRecipe[]> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`);
    return (await result.json()).results;
  };

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      if (query) {
        const response = await searchForRecipes(query);
        setRecipesFound(response);
      }
    })();
  }, [recipeSearch]);

  return (
    <div className="App">
      <h1>Recipe Search</h1>
      <form className="searchForm" onSubmit={(event) => search(event)}>
        <input id="searchText" type="text" />
        <button>Search</button>
      </form>
      {recipeSearch && <p>Results for {recipeSearch}...</p>}
      <div className="recipe-container">
        {recipesFound.length &&
          recipesFound.map((recipe) => (
            <RecipeComponent key={recipe.href} recipe={recipe} />
          ))}
      </div>
    </div>
  );
}

export default App;
