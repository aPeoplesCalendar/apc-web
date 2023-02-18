import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";

export const fetchEvent = async (slugTitle: string | undefined) => {
  const { data } = await supabase
    .from(process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string)
    .select<"*", DatabaseEvent>()
    .eq("slugTitle", slugTitle);
  return data?.[0];
};

export const fetchPublicImgUrl = async (
  imgSrc: string | undefined
): Promise<string | undefined> => {
  if (!imgSrc) {
    return "";
  }
  const { data: imageData } = await supabase.storage
    .from("event-photos")
    .getPublicUrl(imgSrc);
  return imageData?.[0];
};
