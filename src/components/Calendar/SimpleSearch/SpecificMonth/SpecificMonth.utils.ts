import { addDays, subDays } from "date-fns";
import { getMonthAndDayFromDate } from "../../Calendar.utils";

export const generateListOfWeekDayStarts = (month: string) => {
  // get first day of selected month
  const selectedQueryDate = new Date(`${new Date().getFullYear()}/${month}/1`);
  const dayOfWeekNumber = selectedQueryDate.getUTCDay();
  const firstWeekStartDate = subDays(selectedQueryDate, dayOfWeekNumber);
  const weekStartDates: { month: string; day: string }[] = [
    getMonthAndDayFromDate(firstWeekStartDate),
  ];
  // get every week start, break if week start is in succeeding month
  for (let i = 7; i < 43; i += 7) {
    const currentDate = addDays(firstWeekStartDate, i);
    if (currentDate.getUTCMonth() + 1 !== parseInt(month)) {
      break;
    }
    weekStartDates.push(getMonthAndDayFromDate(currentDate));
  }
  return weekStartDates;
};
