import { getExperienceMonth } from "../../../../helpers/date";

export const Experience = () => (
  <div>
    <p className=" text-xl">Experience</p>
    {EXPERIENCE_DATA.map((experience, index) => (
      <ExperiencesItem key={`${index}-experience`} {...experience} />
    ))}
  </div>
);

const ExperiencesItem = ({ company, experiences }) => {
  const isMoreThanOneExperience = experiences.length > 1;
  return (
    <div className="flex mt-4 flex-col group hover:scale-110 hover:translate-x-8 duration-200">
      <div className="flex">
        <div className="h-5 group-hover:w-10 duration-200 w-2 bg-primary mr-2 rounded" />
        <p className="antialiased text-base font-extrabold">{company}</p>
      </div>
      {experiences.map((experience) => (
        <ExperienceItem
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

const EXPERIENCE_DATA = [
  {
    company: "Appfuxion Indonesia",
    experiences: [
      {
        role: "Software Engineer",
        // desc: "lorem ipsum",
        startDate: "12/2021",
        endDate: "",
        location: "Jakarta, Indonesia (Remote)",
      },
    ],
  },
  {
    company: "GENESYS Application Indonesia",
    experiences: [
      {
        role: "Frontend Mobile Developer",
        // desc: "lorem ipsum",
        startDate: "03/2021",
        endDate: "12/2021",
        location: "Jakarta, Indonesia (Remote)",
      },
    ],
  },
  {
    company: "KAZOKKU",
    experiences: [
      {
        role: "React Native Developer",
        // desc: "lorem ipsum",
        startDate: "09/2021",
        endDate: "11/2021",
        location: "Jakarta, Indonesia (Remote)",
      },
    ],
  },
  {
    company: "Birumerah Technology",
    experiences: [
      {
        role: "Mobile Application Developer",
        // desc: "lorem ipsum",
        startDate: "04/2020",
        endDate: "03/2021",
        location: "Jakarta, Indonesia (Remote)",
      },
    ],
  },
];
