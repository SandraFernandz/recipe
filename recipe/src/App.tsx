import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [recipesFound, setRecipesFound] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (query: string): Promise<any> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`);
    return (await result.json()).results;
  };

  const search = (event) => {};

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      const response = await searchForRecipes(query);
      setRecipesFound(response);
    })();
  });

  return (
    <div className="App">
      <h1>Recipe Search</h1>
      <form className="searchForm" onSubmit={(event) => search(event)}>
        <input id="searchText" type="text" />
        <button>Search</button>
      </form>
    </div>
  );
}

export default App;
