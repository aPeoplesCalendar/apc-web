import { ROUTES } from "../../constants/routes";

/**
 * @param month month 1-indexed
 * @param day day 1-indexed
 * @returns YYYY-MM-DD (zero pads)
 */
export const formatDateQueryParam = (month: string, day: string) => {
  // handle leap year case
  const year =
    month === "2" && day === "29" ? "2024" : new Date().getFullYear();
  // add any necessary zero padding to day and month
  const formattedMonth = month.length === 1 ? `0${month}` : month;
  const formattedDay = day.length === 1 ? `0${day}` : day;
  return `${year}-${formattedMonth}-${formattedDay}`;
};

/**
 * to be used in converting raw date picker string to format appropriate for query param and querying db
 * @param datePickerValue date string in the format of YYYY-MM-DD
 * @returns date string in the format of MM-DD (no zero pads)
 */
export const formatRawDatePickerValue = (
  datePickerValue: string | undefined
) => {
  if (!datePickerValue) {
    return { month: "", day: "" };
  }
  const monthAndDay = datePickerValue.split("-");
  // remove any zero padding from day and month
  if (monthAndDay[1][0] === "0") {
    monthAndDay[1] = monthAndDay[1].slice(1);
  }
  if (monthAndDay[2][0] === "0") {
    monthAndDay[2] = monthAndDay[2].slice(1);
  }
  const month = monthAndDay[1];
  const day = monthAndDay[2];
  return { month, day };
};

// normally we treat dates as utc (so dates defined in DB aren't off by one)
// but here we WANT to use the user's local time
export const generateSpecificDayRoute = (
  month = `${new Date().getMonth() + 1}`,
  day = `${new Date().getDate()}`,
  view = "day"
) => `${ROUTES.CALENDAR_DAY}?month=${month}&day=${day}&view=${view}`;

export const generateSpecificYearRoute = (
  year = `${new Date().getUTCFullYear()}`
) => `${ROUTES.CALENDAR_SEARCH}?startDate=${year}-01-01&endDate=${year}-12-31`;

export const getMonthAndDayFromDate = (date: Date) => {
  const month = (date.getUTCMonth() + 1).toString();
  const day = date.getUTCDate().toString();
  return {
    month,
    day,
  };
};
