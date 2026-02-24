const HeroBackground = () => {
  return (
    <>
      <div className="absolute -top-24 left-[-80px] h-72 w-72 rounded-full bg-orange-500/20 blur-[90px] pointer-events-none" />
      <div className="absolute -top-24 right-8 h-72 w-72 rounded-full bg-cyan-400/20 blur-[95px] pointer-events-none" />
      <div className="absolute bottom-[-120px] left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-[110px] pointer-events-none" />
    </>
  );
};

export default HeroBackground;
