export const Experience = () => (
  <div>
    <p className=" text-xl">Experience</p>
    {EXPERIENCE_DATA.map((experience, index) => (
      <ExperienceItem
        key={`${index}-experience`}
        role={experience.role}
        company={experience.company}
        date={experience.date}
        location={experience.location}
      />
    ))}
  </div>
);

const ExperienceItem = ({ role, company, date, location }) => (
  <div className="flex flex-row mt-4">
    <div>
      <p className="antialiased  text-base font-black">{role}</p>
      <p className="antialiased  text-sm font-semibold">{company}</p>
      <p className="antialiased italic hover:not-italic  text-xs font-extralight">
        {date}
      </p>
      <p className="antialiased  text-xs font-medium">{location}</p>
    </div>
  </div>
);

const EXPERIENCE_DATA = [
  {
    role: "Software Engineer",
    company: "PT Appfuxion Consulting Indonesia",
    date: "Dec 2021 - Present",
    location: "Jakarta, Indonesia (Remote)",
  },
  {
    role: "Senior Frontend Mobile Developer",
    company: "GENESYS Application Indonesia",
    date: "Mar 2021 - Dec 2021",
    location: "Jakarta, Indonesia (Remote)",
  },
  {
    role: "React Native Developer",
    company: "PT. Karisma Zona Kreatifku",
    date: "Sep 2021 - Nov 2021",
    location: "Jakarta, Indonesia (Remote)",
  },
  {
    role: "Mobile Application Developer",
    company: "Birumerah Technology",
    date: "Apr 2020 - Mar 2021",
    location: "Jakarta, Indonesia (Remote)",
  },
];
