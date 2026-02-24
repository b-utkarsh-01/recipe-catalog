import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

const Navbar = () => {
  const navItemClass = ({ isActive }) =>
    `block w-full text-center px-3 py-2.5 rounded-xl text-sm sm:text-base transition ${isActive
      ? "bg-orange-500 text-white font-semibold shadow-[0_8px_20px_rgba(249,115,22,0.35)]"
      : "bg-slate-900/70 text-slate-200 border border-slate-700 hover:bg-slate-800"
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
        className="capitalize mb-6 rounded-2xl border border-slate-700 bg-slate-900/55 p-3 sm:p-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:flex sm:justify-between sm:items-center"
      >
        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
          {navItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-0"
            >
              <NavLink to={item.to} className={navItemClass}>
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-2 sm:mt-0 w-full sm:w-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <NavLink to="/create" className={({ isActive }) => {
            const defaultStyle = "block w-full text-center sm:inline-block px-4 py-2.5 rounded-xl text-sm sm:text-base transition";
            const style = isActive
              ? `${defaultStyle} bg-emerald-500 text-white font-semibold shadow-[0_8px_20px_rgba(16,185,129,0.35)]`
              : `${defaultStyle} bg-emerald-500/90 text-white font-semibold hover:bg-emerald-400`;
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
