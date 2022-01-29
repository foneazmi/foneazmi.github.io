export const Experience = () => (
  <div>
    <p className="text-white text-xl">Experience</p>
    {EXPERIENCE_DATA.map((experience) => (
      <ExperienceItem {...experience} />
    ))}
  </div>
);

const ExperienceItem = ({ role, company, date, location, image }) => (
  <div className="flex flex-row mt-4">
    <img
      className="h-14 w-14 object-scale-down bg-cyan-200"
      src={image}
      alt="image_company"
    />
    <div className="ml-4">
      <p className="antialiased text-white text-base font-black">{role}</p>
      <p className="antialiased text-white text-sm font-semibold">{company}</p>
      <p className="antialiased italic hover:not-italic text-white text-xs font-extralight">
        {date}
      </p>
      <p className="antialiased text-white text-xs font-medium">{location}</p>
    </div>
  </div>
);

const EXPERIENCE_DATA = [
  {
    role: "Mobile Developer",
    company: "PT Appfuxion Consulting Indonesia",
    date: "Dec 2021 - Present",
    location: "Jakarta, Indonesia (Remote)",
    image:
      "https://static.wixstatic.com/media/c0e5d8_e20b55f9c7e24fe8a9e2f6b1a8279758~mv2.png/v1/fill/w_282,h_115,al_c,q_85,usm_0.66_1.00_0.01/appfuxion_logo.webp",
  },
  {
    role: "Frontend Mobile Developer",
    company: "GENESYS Application Indonesia",
    date: "Mar 2021 - Dec 2021",
    location: "Jakarta, Indonesia (Remote)",
    image: "https://www.genesys.co.id/static/media/genesys-white.e8ac6ad9.png",
  },
  {
    role: "React Native Developer",
    company: "PT. Karisma Zona Kreatifku",
    date: "Sep 2021 - Nov 2021",
    location: "Jakarta, Indonesia (Remote)",
    image: "https://www.kazokku.com/images/logo-kazokku.svg",
  },
  {
    role: "Mobile Application Developer",
    company: "Birumerah Technology",
    date: "Apr 2020 - Mar 2021",
    location: "Jakarta, Indonesia (Remote)",
    image:
      "https://www.birumerah.co.id/wp-content/themes/bmtemplate/images/logo.png",
  },
];
