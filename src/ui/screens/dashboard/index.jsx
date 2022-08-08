import { getExperienceYear } from "../../../helpers";
import { Experience } from "./components";
import { CONTACT_DATA } from "./contact-data";
export const DashboardScreen = () => {
  return (
    <div className="md:mx-auto xl:w-6/12 lg:w-8/12  md:w-10/12 w-full mt-4 pb-4">
      <Profile />
      <Body />
    </div>
    // <div className="flex min-h-screen select-none">
    //   <div className="h-full w-full ml-16">
    //     <div className="md:mx-auto xl:w-4/12 lg:w-6/12  md:w-8/12 w-full mt-4 pb-4">
    //     </div>
    //   </div>
    // </div>
  );
};

const Divider = () => <div className="w-full h-[0.5px] mt-6 mb-3" />;

const Portfolio = () => (
  <div className="mb-10">
    <p className=" text-xl">Portfolio</p>
    <p className=" text-xs">Coming Soon</p>
  </div>
);

const Body = () => (
  <div className="flex flex-col mx-4">
    <Divider />
    <Experience />
    <Divider />
    <Portfolio />
  </div>
);

const Profile = () => (
  <div className="flex flex-col md:flex-row mx-4">
    <img
      className="h-24 w-24 rounded-full md:w-32 md:h-32"
      src="https://avatars.githubusercontent.com/u/26783512"
      alt=""
    />
    <div className="md:ml-4 md:mt-0 ml-0 mt-4 flex flex-col">
      <h1 className="font-bold text-3xl ">Farkhan Azmi</h1>
      <h1 className="text-lg  font-mono">Software Engineer</h1>
      <h1 className=" text-xs">
        Talented software engineer with {getExperienceYear("2020")}+ years of
        work experience. who always try to challenge and learn some new
        experiences, knowledge, and skills. Have the ability to work alone or
        collaborate with a team.
      </h1>
      <div className="flex-row flex flex-wrap">
        {CONTACT_DATA.map((element, index) => (
          <a
            key={`${index}-contact`}
            href={element.link}
            className="rounded-full  flex flex-row w-auto bg-primary text-primary-content p-2 mr-2 mt-2  items-center hover:bg-primary-focus transition-all ease-in-out duration-200"
          >
            {element.icon}
          </a>
        ))}
      </div>
    </div>
  </div>
);
