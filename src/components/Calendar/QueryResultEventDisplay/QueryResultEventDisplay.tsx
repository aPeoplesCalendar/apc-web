import { useMediaQuery, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { staleTime } from "../../../constants/queryConfiguration";
import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";
import { FullScreenDisplay } from "./FullScreenDisplay";
import { SmallScreenDisplay } from "./SmallScreenDisplay";

export const QueryResultEventDisplay = (props: Omit<DatabaseEvent, "id">) => {
  const { imgSrc } = props;

  const theme = useTheme();
  const aboveMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const fetchImageUrl = async (imagePath: string) => {
    const { data } = await supabase.storage
      .from("event-photos")
      .getPublicUrl(imagePath);
    return data?.publicUrl;
  };

  const { data: fetchedImgSrc = "" } = useQuery({
    queryKey: ["fetchImageUrl", imgSrc],
    queryFn: () => fetchImageUrl(imgSrc),
    staleTime,
    enabled: !!imgSrc,
  });

  return aboveMediumScreen ? (
    <FullScreenDisplay {...props} fetchedImgSrc={fetchedImgSrc} />
  ) : (
    <SmallScreenDisplay {...props} fetchedImgSrc={fetchedImgSrc} />
  );
};
