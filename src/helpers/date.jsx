import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const getDuration = (start, end) => {
  const endDate = end ? dayjs(end, "MM/Y") : dayjs();
  const startDate = dayjs(start, "MM/Y");
  const duration = endDate.diff(startDate, "M") + 1;
  const startDateFormat = startDate.format("MMM YYYY");
  const endDateFormat = end ? endDate.format("MMM YYYY") : "Present";
  const year = Math.floor(duration / 12);
  const month = duration - year * 12;
  const durationYear = year > 0 ? `${year} yrs ` : "";
  const durationMonth = month > 0 ? `${month} mos` : "";
  return `${startDateFormat} - ${endDateFormat} · ${durationYear}${durationMonth}`;
};
