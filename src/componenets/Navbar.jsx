import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

const Navbar = () => {
  const navItemClass = ({ isActive }) =>
    `px-3 py-2 rounded-xl text-sm sm:text-base transition ${isActive
      ? "bg-orange-500 text-white font-semibold"
      : "text-slate-200 hover:bg-slate-700/60"
    }`;

  const navItems = [
    { to: "/", label: "home" },
    { to: "/about", label: "about" },
    { to: "/recipe", label: "recipes" },
    { to: "/favorites", label: "favorites" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="capitalize flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6"
      >
        <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3">
          {navItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink to={item.to} className={navItemClass}>
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="w-full sm:w-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <NavLink to="/create" className={({ isActive }) => {
            const defaultStyle = "block text-center sm:inline-block px-4 py-2 rounded-xl text-sm sm:text-base transition";
            const style = isActive
              ? `${defaultStyle} bg-emerald-500 text-white font-semibold`
              : `${defaultStyle} bg-slate-900 text-slate-200 hover:bg-slate-700`;
            return style
          }}
          >
            add recipe
          </NavLink>
        </motion.div>
      </motion.nav >
      <motion.hr
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='border-slate-700 my-5'
      />
    </>
  )
}

export default Navbar
