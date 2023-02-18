// date-fns only seems to format the date in local time, not UTC
// so we can't use their lovely format function for day-specific stuff
// this file contains some wheel-inventing stuff for our use case

export const shortMonths = {
  "1": "Jan",
  "2": "Feb",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "Aug",
  "9": "Sept",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

const english_ordinal_rules = new Intl.PluralRules("en", { type: "ordinal" });
const suffixes = {
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
};
export const ordinal = (day: string) => {
  const category = english_ordinal_rules.select(parseInt(day));
  const suffix = suffixes[category];
  return `${day}${suffix}`;
};

export const formatMonthAndDay = (month: string, day: string) => {
  const shortMonth = shortMonths[month];
  const formattedDay = ordinal(day);
  return `${shortMonth} ${formattedDay}`;
};
