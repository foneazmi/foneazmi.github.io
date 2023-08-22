import moment from "moment";

export const getDuration = (start, end) => {
  const endDate = end ? moment(end, "MM/Y") : moment();
  const startDate = moment(start, "MM/Y");
  const duration = moment.duration(endDate.diff(startDate));
  const startDateFormat = startDate.format("MMM y");
  const endDateFormat = end ? endDate.format("MMM y") : "Present";
  const durationYear = duration.years() > 0 ? `${duration.years()} yrs ` : "";
  const durationMonth = `${duration.months() + 1} mos`;
  return `${startDateFormat} - ${endDateFormat} · ${durationYear}${durationMonth}`;
};
