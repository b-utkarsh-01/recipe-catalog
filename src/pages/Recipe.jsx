import { useContext } from "react"
import { Link } from "react-router-dom";
import { RecipeDataContext } from "../context/Context"
import RecipeCard from "../componenets/RecipeCard";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Recipe = () => {
  const { recipes, loading } = useContext(RecipeDataContext);

  const renderRecipe = recipes ? (recipes.map((recipe) => {
    return (
      <RecipeCard recipe={recipe} key={recipe.id || recipe._id} />
    )
  })) : "Not happen"

  if (loading) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading recipes...</p>
        </div>
      </div>
    );
  }

  return recipes.length !== 0 ? (
    <div className="space-y-5">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">All Recipes</h1>
          <p className="text-slate-300 text-sm sm:text-base mt-1">
            {recipes.length} recipe{recipes.length > 1 ? "s" : ""} available
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/create"
            className="inline-block px-4 py-2 rounded-xl bg-emerald-500 text-white font-semibold text-sm sm:text-base text-center hover:bg-emerald-400 transition"
          >
            Add Recipe
          </Link>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {renderRecipe}
      </motion.section>
    </div>
  ) : <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full min-h-[50vh] flex items-center justify-center"
  >
    <div className="text-center rounded-2xl border border-dashed border-slate-600 bg-slate-900/60 px-6 py-8">
      <p className="text-slate-200 font-semibold mb-4">No recipes found</p>
      <Link
        to="/create"
        className="inline-block px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-400 transition"
      >
        Create your first recipe
      </Link>
    </div>
  </motion.div>
}

export default Recipe
