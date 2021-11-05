import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";
export const DashboardScreen = () => {
  return (
    <div className="flex select-none">
      <div className="h-screen w-full  ml-16 bg-gray-800 flex">
        <div className="md:mx-auto xl:w-6/12 lg:w-8/12  md:w-9/12 w-full mt-4">
          <Header />
          <Body />
        </div>
      </div>
    </div>
  );
};

const Divider = () => (
  <div className="w-full bg-gray-500 h-[0.5px] mt-6 mb-3" />
);

const Experience = () => (
  <div>
    <p className="text-white text-xl">Experience</p>
    <p className="text-white text-xs">Coming Soon</p>
  </div>
);

const Education = () => (
  <div>
    <p className="text-white text-xl">Education</p>
    <p className="text-white text-xs">Coming Soon</p>
  </div>
);

const Portfolio = () => (
  <div>
    <p className="text-white text-xl">Portfolio</p>
    <p className="text-white text-xs">Coming Soon</p>
  </div>
);

const Body = () => (
  <div className="flex flex-col mx-4">
    <Divider />
    <Education />
    <Divider />
    <Experience />
    <Divider />
    <Portfolio />
  </div>
);

const Header = () => (
  <div className="flex flex-col md:flex-row mx-4">
    <img
      className="h-24 w-24 rounded-full md:w-32 md:h-32"
      src="https://avatars.githubusercontent.com/u/26783512"
      alt=""
    />
    <div className="md:ml-4 md:mt-0 ml-0 mt-4 flex flex-col">
      <h1 className="font-bold text-3xl text-white">Farkhan Azmi</h1>
      <h1 className="text-lg text-white font-mono">Software Engineer</h1>
      <h1 className="text-white text-xs">
        Talented software engineer with 2+ years of work experience. who always
        try to challenge and learn some new experiences, knowledge, and skills.
        Have the ability to work alone or collaborate with a team.
      </h1>
      <div className="flex-row flex flex-wrap">
        {CONTACT_DATA.map((element) => (
          <a
            href={element.link}
            className="rounded-full  flex flex-row w-auto bg-gray-500 p-2 mr-2 mt-2 text-white items-center hover:text-gray-500 hover:bg-white transition-all ease-in-out duration-200"
          >
            {element.icon}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const CONTACT_DATA = [
  {
    text: "WA",
    link: "https://wa.me/+62895603404421",
    icon: <FaWhatsapp />,
  },
  {
    text: "IG",
    link: "https://www.instagram.com/farkhan.azmi/",
    icon: <FaInstagram />,
  },
  {
    text: "LI",
    link: "https://www.linkedin.com/in/farkhanazmi/",
    icon: <FaLinkedin />,
  },
];
