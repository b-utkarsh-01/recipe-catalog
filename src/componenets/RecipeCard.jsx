import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";

const RecipeCard = (props) => {
  const { id, _id, image, instructions, name, chef } = props.recipe;
  const [imgError, setImgError] = useState(false);
  const recipeId = id || _id;

  // Check if image is empty or invalid
  const hasValidImage = image && image.trim() !== "";

  const description = Array.isArray(instructions)
    ? instructions[0]
    : String(instructions || "");

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={`/recipe/details/${recipeId}`}
        className="block w-full bg-slate-900/80 border border-slate-700 p-3 sm:p-4 rounded-2xl shadow-lg hover:border-orange-500/50 transition-colors h-full"
      >
        <div className="flex flex-col h-full ">
          {!hasValidImage || imgError ? (
            <div className="w-full h-44 sm:h-48 m-auto rounded-xl mb-4 object-cover bg-slate-800 flex items-center justify-center">
              <ChefHat className="w-12 h-12 text-slate-600" />
            </div>
          ) : (
            <img
              src={image}
              alt={name}
              onError={handleImageError}
              className="w-full h-44 sm:h-48 m-auto rounded-xl mb-4 object-cover"
            />
          )}
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="font-semibold tracking-tight text-lg sm:text-xl line-clamp-2">{name}</h2>
            <small className="text-sm sm:text-base text-slate-400 capitalize">
              by: <span className="text-rose-300">{chef || "unknown chef"}</span>
            </small>

            <p className="text-sm text-slate-300 line-clamp-3 mt-1">
              {description || "No instructions added yet"}...{" "}
              <small className="text-cyan-300">more</small>
            </p>

          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default RecipeCard
