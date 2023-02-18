import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";

export const fetchEvent = async (slugTitle: string | undefined) => {
  const { data } = await supabase
    .from(process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string)
    .select<any, DatabaseEvent>(
      `title, description, date, tags, links, imgSrc, imgAltText`
    )
    .eq("slugTitle", slugTitle);
  return data?.[0] ?? null;
};

export const fetchPublicImgUrl = async (
  imgSrc: string | undefined
): Promise<string> => {
  if (!imgSrc) {
    return "";
  }
  const { data: imageData } = await supabase.storage
    .from("event-photos")
    .getPublicUrl(imgSrc);
  return imageData?.publicUrl ?? "";
};
