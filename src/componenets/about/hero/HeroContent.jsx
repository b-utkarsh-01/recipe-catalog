import Pill from "../Pill";

const HeroContent = ({ profile, shortSummary }) => {
  return (
    <div className="space-y-5 text-left">
      <h1 className="hero-text-animate text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight">
        {profile.name}
      </h1>
      <p className="hero-text-animate text-xl sm:text-[2rem] leading-tight text-slate-300 font-semibold">
        {profile.title}
      </p>
      <p className="hero-text-animate text-slate-400 text-lg leading-relaxed max-w-3xl">
        {shortSummary}
      </p>

      <div className="hero-text-animate flex flex-wrap gap-2">
        {profile.highlights.slice(0, 3).map((highlight) => (
          <Pill key={highlight} text={highlight} />
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
