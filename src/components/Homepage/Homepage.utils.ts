import { supabase } from "../../supabaseClient";
import { DatabaseEvent } from "../../types/types";

export const fetchEventOfTheDay = async (month: string, day: string) => {
  const { data: todayEvents = [] } = await supabase
    .from(process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string)
    .select<any, DatabaseEvent>(
      `
        id,
        title,
        date,
        day,
        description,
        month,
        otd,
        imgSrc,
        imgAltText,
        tags
        `
    )
    .eq("day", day)
    .eq("month", month)
    .order("title", { ascending: true });
  const eventWithLongestDescription = todayEvents?.reduce(
    (maxEvent: DatabaseEvent, currentEvent: DatabaseEvent) =>
      maxEvent.description.length > currentEvent.description.length
        ? maxEvent
        : currentEvent
  );
  return eventWithLongestDescription;
};
