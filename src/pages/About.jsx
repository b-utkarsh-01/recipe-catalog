const About = () => {
  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <section className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6 sm:p-8">
        <p className="text-xs tracking-[0.24em] uppercase text-orange-300">About</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mt-2">Recipe Catalog App</h1>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Recipe Catalog is a simple and fast app to create, manage, and explore recipes in one place.
          You can add new dishes, update details, mark favorites, and view everything in a clean interface.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">What You Can Do</h2>
        <ul className="mt-4 space-y-2 text-slate-300 text-sm sm:text-base">
          <li>Create and save your own recipes</li>
          <li>Edit or delete recipes anytime</li>
          <li>View recipe details on a dedicated page</li>
          <li>Mark recipes as favorites for quick access</li>
          <li>Use the app smoothly on mobile and desktop</li>
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">Tech Stack</h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Frontend is built with React, React Router, Tailwind CSS, and Framer Motion.
          Backend uses Node.js, Express, and MongoDB for storing recipes.
        </p>
      </section>
    </div>
  );
};

export default About;
