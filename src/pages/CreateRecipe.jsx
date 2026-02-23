import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { RecipeDataContext } from '../context/Context';
import { nanoid } from 'nanoid';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateRecipe = () => {
  const { recipes, setrecipes } = useContext(RecipeDataContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const inputData = (data) => {
    const ingredients = String(data.ingredients || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const instructions = String(data.instructions || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const recipe = {
      ...data,
      id: nanoid(),
      ingredients,
      instructions,
    };

    const copy = [...recipes];
    copy.push(recipe);
    setrecipes(copy);

    localStorage.setItem('recipe', JSON.stringify(copy));
    toast.success("Recipe Added");
    reset();
    navigate("/recipe");
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='rounded-3xl border border-slate-700 bg-slate-900/70 p-5 sm:p-8 mb-5'
      >
        <h1 className='text-2xl sm:text-4xl font-bold tracking-tight'>Add New Recipe</h1>
        <p className='text-slate-300 mt-2 text-sm sm:text-base'>
          Fill all fields. Use comma separated values for ingredients and instructions.
        </p>
      </motion.section>

      <motion.form
        onSubmit={handleSubmit(inputData)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='rounded-3xl border border-slate-700 bg-slate-900/70 p-5 sm:p-8 space-y-5'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className='block text-sm text-slate-300 mb-2'>Recipe Title</label>
            <input
              type="text"
              placeholder='Classic Margherita Pizza'
              {...register("name", { required: "Recipe title is required" })}
              className='w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-base focus:border-emerald-400'
            />
            {errors.name && <p className='text-rose-300 text-xs mt-1'>{errors.name.message}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className='block text-sm text-slate-300 mb-2'>Chef Name</label>
            <input
              type="text"
              placeholder='Your Name'
              {...register("chef", { required: "Chef name is required" })}
              className='w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-base focus:border-emerald-400'
            />
            {errors.chef && <p className='text-rose-300 text-xs mt-1'>{errors.chef.message}</p>}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className='block text-sm text-slate-300 mb-2'>Ingredients (comma separated)</label>
          <textarea
            rows={4}
            placeholder='Pizza dough, tomato sauce, mozzarella, basil'
            {...register("ingredients", { required: "Ingredients are required" })}
            className='w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-base focus:border-emerald-400'
          />
          {errors.ingredients && <p className='text-rose-300 text-xs mt-1'>{errors.ingredients.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className='block text-sm text-slate-300 mb-2'>Instructions (comma separated)</label>
          <textarea
            rows={4}
            placeholder='Preheat oven, spread sauce, add toppings, bake for 15 min'
            {...register("instructions", { required: "Instructions are required" })}
            className='w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-base focus:border-emerald-400'
          />
          {errors.instructions && <p className='text-rose-300 text-xs mt-1'>{errors.instructions.message}</p>}
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className='block text-sm text-slate-300 mb-2'>Category</label>
            <select
              defaultValue=""
              {...register("mealType", { required: "Meal type is required" })}
              className='w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-base focus:border-emerald-400'
            >
              <option value="" disabled>Select meal type</option>
              <option value="Dinner">Dinner</option>
              <option value="Lunch">Lunch</option>
              <option value="Snack">Snack</option>
              <option value="Dessert">Dessert</option>
              <option value="Side Dish">Side Dish</option>
            </select>
            {errors.mealType && <p className='text-rose-300 text-xs mt-1'>{errors.mealType.message}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className='block text-sm text-slate-300 mb-2'>Image URL</label>
            <input
              type="url"
              placeholder='https://example.com/recipe.jpg'
              {...register("image", { required: "Image URL is required" })}
              className='w-full bg-slate-950/60 border border-slate-600 rounded-xl p-3 outline-none text-base focus:border-emerald-400'
            />
            {errors.image && <p className='text-rose-300 text-xs mt-1'>{errors.image.message}</p>}
          </motion.div>
        </div>

        <motion.button
          type='submit'
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition disabled:opacity-60 disabled:cursor-not-allowed'
        >
          {isSubmitting ? "Saving..." : "Save Recipe"}
        </motion.button>
      </motion.form>
    </div>
  )
}

export default CreateRecipe
