import { useMe } from "../context/MeContext";
import { ExperienceItem } from "@/components/features/ExperienceItem";

const Experience = () => {
  const data = useMe();
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Experience
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          My professional journey and work history
        </p>
      </div>

      {/* Experience List */}
      <div className="space-y-8 pt-8">
        {data.experiences.map((exp, idx) => (
          <ExperienceItem
            key={idx}
            data={exp}
            index={idx}
            isLast={idx === data.experiences.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
