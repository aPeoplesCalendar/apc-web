import { addDays, format, subDays } from "date-fns";
import { supabase } from "../../../../supabaseClient";

export const calculateDayLabels = (month: string, day: string) => {
  // get first day of week of selected day (Sunday previous)
  const selectedQueryDate = new Date(
    `${new Date().getFullYear()}/${month}/${day}`
  );
  const dayOfWeekNumber = selectedQueryDate.getUTCDay();
  const startDate = subDays(selectedQueryDate, dayOfWeekNumber);
  const columnLabels: string[] = [];
  // for every day in this week
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    columnLabels.push(format(currentDate, "M-d"));
  }
  return columnLabels;
};

export const generateListOfDays = (month: string, day: string) => {
  // get first day of week of selected day (Sunday previous)
  const selectedQueryDate = new Date(
    `${new Date().getFullYear()}/${month}/${day}`
  );
  const dayOfWeekNumber = selectedQueryDate.getUTCDay();
  const startDate = subDays(selectedQueryDate, dayOfWeekNumber);
  const columnLabels: Date[] = [];
  // for every day in this week
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    columnLabels.push(currentDate);
  }
  return columnLabels;
};

export const fetchEvents = async (month: string, day: string) => {
  const { data: dayEvents = [] } = await supabase
    .from(process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string)
    .select<"title", { title: string }>("title")
    .eq("day", day)
    .eq("month", month)
    .order("title", { ascending: true });
  return dayEvents ?? [];
};
