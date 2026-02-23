import { useContext } from "react";
import { Link } from "react-router-dom";
import { RecipeDataContext } from "../context/Context";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const Home = () => {
  const { recipes, loading } = useContext(RecipeDataContext);
  const favorites = JSON.parse(localStorage.getItem("fav")) || [];

  const stats = [
    { label: "Total Recipes", value: recipes.length },
    { label: "Favorites", value: favorites.length },
    { label: "Categories", value: new Set(recipes.map((r) => r.mealType).filter(Boolean)).size },
    { label: "Ready To Cook", value: "Today" }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section with Animation */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-3xl border border-slate-700 bg-slate-900/70 p-5 sm:p-8"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-block bg-orange-500/20 text-orange-200 px-3 py-1 rounded-full text-xs sm:text-sm mb-4"
          >
            Plan, Cook, Save
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight"
          >
            Build Your Personal Recipe Book
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-slate-300 mt-4 text-sm sm:text-base"
          >
            Add custom recipes, update them anytime, and keep your favorite meals ready for quick access.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mt-6"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/create"
                className="block px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold text-sm sm:text-base text-center hover:bg-emerald-400 transition"
              >
                Add New Recipe
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/recipe"
                className="block px-5 py-3 rounded-xl bg-slate-800 border border-slate-600 text-slate-100 text-sm sm:text-base text-center hover:bg-slate-700 transition"
              >
                View All Recipes
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Grid with Stagger Animation */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.article
            key={stat.label}
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5"
          >
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
          </motion.article>
        ))}
      </motion.section>
    </div>
  )
}

export default Home
