import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { RecipeDataContext } from "../context/Context"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Heart, Trash2, ArrowLeft, ChefHat } from "lucide-react";

const SingleRecipe = () => {
  const navigate = useNavigate();
  const { recipes, setrecipes } = useContext(RecipeDataContext)
  const params = useParams();
  const recipe = recipes.find((re) => params.id === re.id);

  const [favor, setfavor] = useState(
    JSON.parse(localStorage.getItem('fav')) || []
  )
  const [imgError, setImgError] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      ingredients: "",
      instructions: "",
      image: "",
      mealType: "",
      chef: "",
    }
  });

  useEffect(() => {
    if (!recipe) return;
    reset({
      name: recipe.name || "",
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(", ")
        : recipe.ingredients || "",
      instructions: Array.isArray(recipe.instructions)
        ? recipe.instructions.join(", ")
        : recipe.instructions || "",
      image: recipe.image || "",
      mealType: recipe.mealType || "",
      chef: recipe.chef || "",
    });
  }, [recipe, reset]);

  const submitHandeler = (re) => {
    const indx = recipes.findIndex((reci) => params.id === reci.id);
    if (indx === -1) {
      toast.error("Recipe not found");
      return;
    }

    const ingredients = String(re.ingredients || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const instructions = String(re.instructions || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    re.id = params.id;
    const copyData = [...recipes];
    copyData[indx] = { ...copyData[indx], ...re, ingredients, instructions };
    setrecipes(copyData);
    localStorage.setItem('recipe', JSON.stringify(copyData));
    toast.success("Recipe Updated Successfully!")
  }

  const deleteRecipe = () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    const data = recipes.filter((r) => r.id !== params.id);
    setrecipes(data);
    localStorage.setItem('recipe', JSON.stringify(data));

    const newFav = favor.filter((f) => f.id !== params.id);
    setfavor(newFav);
    localStorage.setItem("fav", JSON.stringify(newFav));

    navigate("/recipe");
    toast.warn("Recipe Deleted")
  }

  const addFav = () => {
    if (!recipe) return;
    if (favor.some((f) => f.id === recipe.id)) return;

    const newFav = [...favor, recipe];
    setfavor(newFav);
    localStorage.setItem("fav", JSON.stringify(newFav));
    toast.success("Added to favorites");
  }

  const removeFav = () => {
    const newfav = favor.filter((f) => f.id !== recipe?.id);
    setfavor(newfav)
    localStorage.setItem("fav", JSON.stringify(newfav));
    toast.info("Removed from favorites");
  }

  const isFav = favor.find((f) => f.id === recipe?.id);
  const handleImageError = () => setImgError(true);

  return recipe ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isFav ? removeFav : addFav}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${isFav
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
          {isFav ? "Remove from Favorites" : "Add to Favorites"}
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Recipe Image & Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {recipe.name}
          </h1>
          <p className="text-slate-400">
            by <span className="text-orange-400">{recipe.chef || "Unknown Chef"}</span>
          </p>

          {imgError ? (
            <div className="w-full h-64 sm:h-80 rounded-2xl bg-slate-800 flex items-center justify-center">
              <ChefHat className="w-20 h-20 text-slate-600" />
            </div>
          ) : (
            <img
              src={recipe.image}
              alt={recipe.name}
              onError={handleImageError}
              className="w-full h-64 sm:h-80 rounded-2xl object-cover"
            />
          )}

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
              {recipe.mealType || "Uncategorized"}
            </span>
          </div>
        </motion.div>

        {/* Right Column - Edit Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form
            onSubmit={handleSubmit(submitHandeler)}
            className="space-y-5 bg-slate-900/60 border border-slate-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold text-slate-200 mb-4">Edit Recipe</h2>

            {/* Name */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Recipe Name</label>
              <input
                type="text"
                {...register("name", { required: "Recipe name is required" })}
                className="w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-slate-200 focus:border-orange-400"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Chef */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Chef Name</label>
              <input
                type="text"
                {...register("chef", { required: "Chef name is required" })}
                className="w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-slate-200 focus:border-orange-400"
              />
              {errors.chef && <p className="text-red-400 text-xs mt-1">{errors.chef.message}</p>}
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Ingredients (comma separated)</label>
              <textarea
                rows={3}
                {...register("ingredients", { required: "Ingredients are required" })}
                className="w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-slate-200 focus:border-orange-400"
              />
              {errors.ingredients && <p className="text-red-400 text-xs mt-1">{errors.ingredients.message}</p>}
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Instructions (comma separated)</label>
              <textarea
                rows={3}
                {...register("instructions", { required: "Instructions are required" })}
                className="w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-slate-200 focus:border-orange-400"
              />
              {errors.instructions && <p className="text-red-400 text-xs mt-1">{errors.instructions.message}</p>}
            </div>

            {/* Category & Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Category</label>
                <select
                  {...register("mealType", { required: "Category is required" })}
                  className="w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-slate-200 focus:border-orange-400"
                >
                  <option value="">Select category</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snack">Snack</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Side Dish">Side Dish</option>
                </select>
                {errors.mealType && <p className="text-red-400 text-xs mt-1">{errors.mealType.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Image URL</label>
                <input
                  type="url"
                  {...register("image", { required: "Image URL is required" })}
                  className="w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-slate-200 focus:border-orange-400"
                />
                {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image.message}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-400 transition"
              >
                Update Recipe
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={deleteRecipe}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-500 transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete Recipe
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[50vh] flex flex-col items-center justify-center space-y-4"
    >
      <p className="text-slate-400 text-lg">Recipe not found</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/recipe")}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Recipes
      </motion.button>
    </motion.div>
  );
}

export default SingleRecipe
