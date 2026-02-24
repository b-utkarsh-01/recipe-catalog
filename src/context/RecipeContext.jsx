import { useState, useEffect } from "react";
import { RecipeDataContext } from "./Context";

// Use same-origin API path by default so Docker/K8s ingress and nginx proxy both work.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/recipe";

// Reusable API service functions for better maintainability
const recipeAPI = {
  // Fetch all recipes
  getAll: async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch recipes");
    return response.json();
  },

  // Create a new recipe
  create: async (recipeData) => {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) throw new Error("Failed to create recipe");
    return response.json();
  },

  // Get single recipe by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch recipe");
    return response.json();
  },

  // Update recipe
  update: async (id, recipeData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) throw new Error("Failed to update recipe");
    return response.json();
  },

  // Delete recipe
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete recipe");
    return response.json();
  },

  // Toggle favorite
  toggleFavorite: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}/favorite`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to toggle favorite");
    return response.json();
  },
};

const normalizeRecipe = (recipe) => ({
  ...recipe,
  id: recipe?.id || recipe?._id,
});

const normalizeRecipes = (data) =>
  Array.isArray(data) ? data.map(normalizeRecipe) : [];

const RecipeContext = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from backend on mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipeAPI.getAll();
        setRecipes(normalizeRecipes(data));
      } catch (error) {
        console.error("Error fetching recipes:", error);
        // Fallback to local storage if backend is not available
        try {
          const stored = JSON.parse(localStorage.getItem("recipe"));
          setRecipes(normalizeRecipes(stored));
        } catch {
          setRecipes([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Create new recipe
  const createRecipe = async (recipeData) => {
    const newRecipe = await recipeAPI.create(recipeData);
    const normalized = normalizeRecipe(newRecipe);
    setRecipes((prev) => [...prev, normalized]);
    return normalized;
  };

  // Update existing recipe
  const updateRecipe = async (id, recipeData) => {
    const updatedRecipe = await recipeAPI.update(id, recipeData);
    const normalized = normalizeRecipe(updatedRecipe);
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? normalized : r))
    );
    return normalized;
  };

  // Delete recipe
  const deleteRecipe = async (id) => {
    await recipeAPI.delete(id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  // Toggle favorite
  const toggleFavorite = async (id) => {
    try {
      const updatedRecipe = await recipeAPI.toggleFavorite(id);
      const normalized = normalizeRecipe(updatedRecipe);
      setRecipes((prev) =>
        prev.map((r) => (r.id === id ? normalized : r))
      );
      return normalized;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Fallback to local toggle
      setRecipes((prev) =>
        prev.map((r) => {
          if (r.id === id) {
            return { ...r, isFavorite: !r.isFavorite };
          }
          return r;
        })
      );
    }
  };

  // Keep for backward compatibility
  const setrecipes = (newRecipes) => {
    const normalized = normalizeRecipes(newRecipes);
    setRecipes(normalized);
    localStorage.setItem("recipe", JSON.stringify(normalized));
  };

  return (
    <RecipeDataContext.Provider
      value={{
        recipes,
        setrecipes,
        loading,
        createRecipe,
        updateRecipe,
        deleteRecipe,
        toggleFavorite,
      }}
    >
      {props.children}
    </RecipeDataContext.Provider>
  );
};

export default RecipeContext;
