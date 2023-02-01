/**
 * @param dateQueryParam date in the form MM-DD (no zero pads)
 * @returns YYYY-MM-DD (zero pads)
 */
export const formatDateQueryParam = (dateQueryParam: string | undefined) => {
  if (!dateQueryParam) {
    return "";
  }
  // move to formatting function
  const splitDateString = dateQueryParam.split("-");
  // handle leap year case
  const year = dateQueryParam === "2-29" ? "2024" : new Date().getFullYear();
  // add any necessary zero padding to day and month
  let [month, queryDay] = splitDateString;
  if (month.length === 1) {
    month = `0${month}`;
  }
  if (queryDay.length === 1) {
    queryDay = `0${queryDay}`;
  }
  return `${year}-${month}-${queryDay}`;
};
