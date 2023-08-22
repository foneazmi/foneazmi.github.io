import { getDuration } from "../../../../helpers/date";
import { useBio } from "../../../../stores";

export const Experience = () => {
  const { bio } = useBio();
  return (
    bio.experiences && (
      <div>
        <p className=" text-xl">Experience</p>
        {bio.experiences.map((experience, index) => (
          <ExperienceItem key={`${index}-experiences`} {...experience} />
        ))}
      </div>
    )
  );
};

const ExperienceItem = ({ company, roles }) => {
  return (
    <div className="flex mt-4 flex-col group hover:scale-110 hover:translate-x-8 duration-200">
      <div className="flex">
        <div className="h-5 group-hover:w-10 duration-200 w-2 bg-primary mr-2 rounded" />
        <p className="antialiased text-base font-extrabold">{company}</p>
      </div>
      {roles?.map((role, index) => (
        <RoleItem key={`${index}-role`} role={role} />
      ))}
    </div>
  );
};

const RoleItem = ({ role }) => (
  <div className="flex mb-2 group/item">
    <div className="w-2 mr-2 group-hover/item:mr-3 mt-2 duration-200">
      <div className="w-2 h-2 bg-secondary rounded-full duration-200 group-hover/item:h-9 group-hover/item:w-3" />
    </div>
    <div>
      <p className="antialiased text-sm font-semibold">{role.role}</p>
      <p className="antialiased italic text-xs font-light">
        {getDuration(role.startDate, role.endDate)}
      </p>
      <p className="antialiased text-xs font-medium">{role.location}</p>
      <p className="antialiased text-xs font-normal">{role.desc}</p>
    </div>
  </div>
);
