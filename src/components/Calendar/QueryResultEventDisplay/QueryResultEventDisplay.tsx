import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";
import { FullScreenDisplay } from "./FullScreenDisplay";
import { SmallScreenDisplay } from "./SmallScreenDisplay";

export const QueryResultEventDisplay = (props: Omit<DatabaseEvent, "id">) => {
  const { imgSrc } = props;
  const [fetchedImgSrc, setFetchedImgSrc] = useState<string>("");

  const theme = useTheme();
  const aboveMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const fetchImageUrl = async (imagePath: string) => {
    const { data } = await supabase.storage
      .from("event-photos")
      .getPublicUrl(imagePath);
    setFetchedImgSrc(data?.publicUrl ?? "");
  };

  useEffect(() => {
    if (imgSrc) {
      fetchImageUrl(imgSrc);
    }
  }, [imgSrc]);

  return aboveMediumScreen ? (
    <FullScreenDisplay {...props} fetchedImgSrc={fetchedImgSrc} />
  ) : (
    <SmallScreenDisplay {...props} fetchedImgSrc={fetchedImgSrc} />
  );
};
