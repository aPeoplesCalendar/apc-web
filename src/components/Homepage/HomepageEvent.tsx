import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { supabase } from "../../supabaseClient";
import { generatePath } from "react-router-dom";
import { stringToSlug } from "../../utils/stringToSlug";
import { ROUTES } from "../../constants/routes";
import { generateSpecificDayRoute } from "../Calendar/Calendar.utils";
import { linkStyle } from "../Calendar/Calendar.styles";

export interface IHomepageEventProps {
  title: string;
  date: string;
  day: string;
  otd: string;
  imgSrc: string;
  imgAltText: string;
}

export const HomepageEvent = ({
  title,
  date,
  day,
  otd,
  imgSrc,
  imgAltText,
}: IHomepageEventProps) => {
  const [fetchedImgSrc, setFetchedImgSrc] = useState<string>("");

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

  return (
    <Paper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <Typography
          component="a"
          sx={linkStyle}
          href={generatePath(ROUTES.SPECIFIC_EVENT, {
            eventName: stringToSlug(title),
          })}
        >
          {title}
        </Typography>
        <Typography
          component="a"
          sx={linkStyle}
          href={generateSpecificDayRoute(day)}
        >
          {date}
        </Typography>
      </div>
      <div>
        <img src={fetchedImgSrc} alt={imgAltText} />
      </div>
      <Typography>{otd}</Typography>
    </Paper>
  );
};
