import { Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { supabase } from "../../supabaseClient";
import { DatabaseEvent } from "../../types/types";
import { stringToSlug } from "../../utils/stringToSlug";
import { linkStyle } from "./Calendar.styles";
import { generateSpecificDayRoute } from "./Calendar.utils";
import * as styles from "./QueryResultEventDisplay.styles";

// schema updates:
// create day, week, and month column for queries (all numbers) - remove day string query
// write code that will create tags for each event (if "communism" in event description, add tag)

// figure out how to make image size shrink to content of description column
// map tags, link to query by tags
// map social media shares
// css tweaks like gap between events
// remove unnecessary event props (make sure to update query to slim it down and only fetch what's needed)

export const QueryResultEventDisplay = ({
  title,
  date,
  day,
  otd,
  imgSrc,
  imgAltText,
}: Omit<DatabaseEvent, "id">) => {
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
    <Card sx={styles.queryEventContainer}>
      <Box sx={styles.imgContainer}>
        {imgSrc && (
          <img src={fetchedImgSrc} alt={imgAltText} style={styles.img} />
        )}
      </Box>
      <Box sx={styles.descriptionColumn}>
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
        <Typography>{otd}</Typography>
        {imgAltText && <Typography>{`Image: ${imgAltText}`}</Typography>}
      </Box>
    </Card>
  );
};
