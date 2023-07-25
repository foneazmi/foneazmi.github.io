import { getExperienceYear } from "../../../helpers";
import { Experience } from "./components";
import { useSelector } from "react-redux";
import { CONTACT_DATA } from "./contact-data";
import { photoStyle } from "../../../helpers";

export const DashboardScreen = () => {
  return (
    <div className="overflow-y-auto h-full justify-center items-center flex scrollbar-hide ">
      <div className="m-auto xl:w-6/12 lg:w-8/12 sm:w-10/12 w-full py-10 h-auto">
        <Profile />
        <Body />
      </div>
    </div>
  );
};

const Body = () => (
  <div className="flex flex-col mx-4">
    <div className="divider" />
    <Experience />
  </div>
);

const Profile = () => {
  const { theme } = useSelector(({ global }) => global);
  return (
    <div className="flex flex-col sm:flex-row mx-4">
      <div className="avatar">
        <div className={`h-28 w-28 sm:w-32 sm:h-32 ${photoStyle[theme]}`}>
          <img src="https://avatars.githubusercontent.com/u/26783512" alt="" />
        </div>
      </div>
      <div className="sm:ml-4 sm:mt-0 ml-0 mt-4 flex flex-col duration-300">
        <h1 className="font-bold text-3xl ">Farkhan Azmi</h1>
        <h1 className="text-lg font-mono">Software Engineer</h1>
        <h1 className=" text-xs">
          Talented software engineer with {getExperienceYear("2020")}+ years of
          work experience. who always try to challenge and learn some new
          experiences, knowledge, and skills.
        </h1>
        <div className="flex-row flex flex-wrap">
          {CONTACT_DATA.map((element, index) => (
            <a
              key={`${index}-contact`}
              href={element.link}
              aria-label={`${element.text} ${element.link}`}
              className="rounded-full  flex flex-row w-auto bg-primary text-primary-content p-2 mr-2 mt-2  items-center hover:bg-primary-focus transition-all ease-in-out duration-300 hover:scale-110"
            >
              {element.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
