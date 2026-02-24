import { motion } from "framer-motion";
import { Code, Database, Cloud, Terminal } from "lucide-react";
import { fadeInUp, staggerContainer } from "./aboutAnimations";
import { skills } from "./aboutData";
import SectionHeader from "./SectionHeader";
import Pill from "./Pill";

const SkillsSection = () => {
  const groups = [
    { title: "Programming", icon: Code, list: skills.programming },
    { title: "Frontend", icon: Terminal, list: skills.frontend },
    { title: "Backend", icon: Database, list: skills.backend },
    { title: "Databases", icon: Database, list: skills.databases },
    { title: "API", icon: Cloud, list: skills.api },
    { title: "Cloud & Tools", icon: Cloud, list: skills.cloud },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="space-y-5"
    >
      <SectionHeader icon={Terminal} title="Skills" subtitle="Core stack and tooling" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map(({ title, icon: Icon, list }) => (
          <motion.div
            key={title}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4"
          >
            <h3 className="text-slate-100 font-semibold flex items-center gap-2 mb-3">
              <Icon className="w-4 h-4 text-orange-400" />
              {title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {list.map((item) => (
                <Pill key={item} text={item} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default SkillsSection;
