import { getExperienceMonth } from "../../../../helpers/date";
import { useBio } from "../../../../stores";

export const Experience = () => {
  const { bio } = useBio();
  return (
    bio.experiences && (
      <div>
        <p className=" text-xl">Experience</p>
        {bio.experiences.map((experience, index) => (
          <ExperiencesItem key={`${index}-experiences`} {...experience} />
        ))}
      </div>
    )
  );
};

const ExperiencesItem = ({ company, experiences }) => {
  const isMoreThanOneExperience = experiences.length > 1;
  return (
    <div className="flex mt-4 flex-col group hover:scale-110 hover:translate-x-8 duration-200">
      <div className="flex">
        <div className="h-5 group-hover:w-10 duration-200 w-2 bg-primary mr-2 rounded" />
        <p className="antialiased text-base font-extrabold">{company}</p>
      </div>
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={`${index}-experience`}
          experience={experience}
          isMoreThanOneExperience={isMoreThanOneExperience}
        />
      ))}
    </div>
  );
};

const ExperienceItem = ({ experience, isMoreThanOneExperience }) => (
  <div className="flex mb-2">
    <div className="w-2 mr-2 mt-2.5">
      {isMoreThanOneExperience && (
        <div className="w-2 h-2 bg-secondary rounded-full" />
      )}
    </div>
    <div>
      <p className="antialiased text-sm font-semibold">{experience.role}</p>
      {!isMoreThanOneExperience && (
        <p className="antialiased italic hover:not-italic  text-xs font-light">
          {getExperienceMonth(experience.startDate, experience.endDate)}
        </p>
      )}
      <p className="antialiased  text-xs font-medium">{experience.location}</p>
      <p className="antialiased  text-xs font-normal">{experience.desc}</p>
    </div>
  </div>
);
