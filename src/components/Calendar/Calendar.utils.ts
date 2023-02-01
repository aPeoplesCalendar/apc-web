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

/**
 * to be used in converting raw date picker string to format appropriate for query param and querying db
 * @param datePickerValue date string in the format of YYYY-MM-DD
 * @returns date string in the format of DD-YY (no zero pads)
 */
export const formatRawDatePickerValue = (
  datePickerValue: string | undefined
) => {
  if (!datePickerValue) {
    return "";
  }
  const monthAndDay = datePickerValue.split("-");
  // remove any zero padding from day and month
  if (monthAndDay[1][0] === "0") {
    monthAndDay[1] = monthAndDay[1].slice(1);
  }
  if (monthAndDay[2][0] === "0") {
    monthAndDay[2] = monthAndDay[2].slice(1);
  }
  // create the lookup key to use with eventLibrary
  const newDateString = [monthAndDay[1], monthAndDay[2]].join("-");
  return newDateString;
};
