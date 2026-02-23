import { Link } from 'react-router-dom';
import RecipeCard from '../componenets/RecipeCard';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Fav = () => {
  const flavor = JSON.parse(localStorage.getItem('fav')) || [];

  const renderRecipe = flavor.length > 0 ? (flavor.map((recipe) => {
    return (
      <RecipeCard recipe={recipe} key={recipe.id} />
    )
  })) : "Not happen"

  return flavor.length !== 0 ? (
    <div className="space-y-5">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5"
      >
        <h1 className="text-2xl sm:text-3xl font-bold">Favorite Recipes</h1>
        <p className="text-slate-300 text-sm sm:text-base mt-1">
          {flavor.length} saved favorite{flavor.length > 1 ? "s" : ""}
        </p>
      </motion.section>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center"
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
      <p className="text-slate-200 font-semibold mb-4">No favorite recipes yet</p>
      <Link
        to="/recipe"
        className="inline-block px-4 py-2 rounded-lg bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-400 transition"
      >
        Browse recipes
      </Link>
    </div>
  </motion.div>
}

export default Fav
