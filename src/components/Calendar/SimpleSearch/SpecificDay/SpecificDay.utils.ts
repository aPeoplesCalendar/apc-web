import { supabase } from "../../../../supabaseClient";
import { DatabaseEvent } from "../../../../types/types";

export const fetchEvents = async (month: string, day: string) => {
  const { data: dayEvents = [] } = await supabase
    .from(process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string)
    .select<string, DatabaseEvent>(
      `id,
      title,
      month,
      day,
      date,
      otd,
      imgSrc,
      imgAltText,
      tags`
    )
    .eq("day", day)
    .eq("month", month)
    .order("title", { ascending: true });
  return dayEvents ?? [];
};
