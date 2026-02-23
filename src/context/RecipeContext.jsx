import { useState, useEffect } from "react";
import { RecipeDataContext } from "./Context";

const RecipeContext = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // First, get local storage data
        let localRecipes = [];
        try {
          const stored = JSON.parse(localStorage.getItem("recipe"));
          localRecipes = Array.isArray(stored) ? stored : [];
        } catch {
          localRecipes = [];
        }

        // Fetch from new API
        const response = await fetch('https://recipe-api.com/api/v1/dinner');
        const apiData = await response.json();

        // Transform API data to match app format - handle complex nested structure from new API
        const transformedApiRecipes = apiData.map((item) => {
          // Extract ingredient names from complex nested structure
          let ingredientsList = [];
          if (item.ingredients && Array.isArray(item.ingredients)) {
            item.ingredients.forEach(group => {
              if (group.items && Array.isArray(group.items)) {
                group.items.forEach(ing => {
                  if (ing.name) {
                    ingredientsList.push(ing.name);
                  }
                });
              }
            });
          }

          // Extract instruction texts from complex nested structure
          let instructionsList = [];
          if (item.instructions && Array.isArray(item.instructions)) {
            item.instructions.forEach(step => {
              if (step.text) {
                instructionsList.push(step.text);
              }
            });
          }

          return {
            id: item.id,
            name: item.name || "Untitled Recipe",
            chef: item.cuisine || "Unknown Chef",
            image: "",
            description: item.description || "",
            difficulty: item.difficulty || "",
            cuisine: item.cuisine || "",
            tags: [],
            mealType: "Dinner",
            fromApi: true,
          };
        });

        // Merge: local recipes first, then API recipes
        const allRecipes = [...localRecipes, ...transformedApiRecipes];
        setRecipes(allRecipes);
        localStorage.setItem("recipe", JSON.stringify(localRecipes));
      } catch (error) {
        console.error("Error fetching recipes:", error);
        // Fallback to local storage only
        try {
          const stored = JSON.parse(localStorage.getItem("recipe"));
          setRecipes(Array.isArray(stored) ? stored : []);
        } catch {
          setRecipes([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const setrecipes = (newRecipes) => {
    setRecipes(newRecipes);
    // Save to local storage (excluding API data, only user created)
    const userRecipes = newRecipes.filter(r => !r.fromApi);
    localStorage.setItem("recipe", JSON.stringify(userRecipes));
  };

  return (
    <RecipeDataContext.Provider value={{ recipes, setrecipes, loading }}>
      {props.children}
    </RecipeDataContext.Provider>
  );
};

export default RecipeContext;
