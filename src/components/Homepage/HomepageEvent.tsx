import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { supabase } from "../../supabaseClient";
import { generatePath, Link } from "react-router-dom";
import { stringToSlug } from "../../utils/stringToSlug";
import { ROUTES } from "../../constants/routes";
import { formatRawDatePickerValue } from "../Calendar/Calendar.utils";

export interface IHomepageEventProps {
  title: string;
  date: string;
  otd: string;
  imgSrc: string;
  imgAltText: string;
}

export const HomepageEvent = ({
  title,
  date,
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
      <Link
        to={generatePath(ROUTES.SPECIFIC_EVENT, {
          eventName: stringToSlug(title),
        })}
      >
        {title}
      </Link>
      <Typography variant="h6">
        <Link
          to={`${ROUTES.CALENDAR_DAY}?day=${formatRawDatePickerValue(date)}`}
        >
          {date}
        </Link>
      </Typography>
      <div>
        <img src={fetchedImgSrc} alt={imgAltText} />
      </div>
      <Typography>{otd}</Typography>
    </Paper>
  );
};
