import { useState, useRef, useEffect } from 'react';
import Recipe from './Recipe';
import IngredientsList from './IngredientsList';
import { getRecipeFromMistral } from '../ai';

export default function Main() {
  const [ingredients, setIngredients] = useState([
    'chicken',
    'all the main spices',
    'corn',
    'heavy-cream',
    'pasta',
  ]);
  const [recipe, setRecipe] = useState('');
  const recipeSection = useRef(null);

  useEffect(() => {
    if (recipe !== '' && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView();
    }
  }, [recipe]);

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient');
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form className="add-ingredient-form" action={addIngredient}>
        <input
          className="add-ingredient-form__input-field"
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button className="add-ingredient-form__button">Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      )}

      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
}
