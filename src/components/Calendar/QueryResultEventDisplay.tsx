import {
  Box,
  Card,
  Chip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { generatePath } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { supabase } from "../../supabaseClient";
import { DatabaseEvent } from "../../types/types";
import { stringToSlug } from "../../utils/stringToSlug";
import { linkStyle } from "./Calendar.styles";
import { generateSpecificDayRoute } from "./Calendar.utils";
import * as styles from "./QueryResultEventDisplay.styles";

// create day, week, and month column for queries (all numbers)
// map social media shares (right side)
// css tweaks - distinct card color, chip color
// each chip is a link that pushes a tag query param to the url

export const QueryResultEventDisplay = ({
  title,
  date,
  day,
  month,
  otd,
  imgSrc,
  imgAltText,
  tags,
}: Omit<DatabaseEvent, "id">) => {
  const [fetchedImgSrc, setFetchedImgSrc] = useState<string>("");

  const descriptionColumnRef = useRef<HTMLSpanElement>(null);

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

  // set the total event card height to the description column + a bit extra
  // I don't like the roundabout way of doing this, but it allows for the image to always be fitted to dynamic text content height
  const cardHeight = (descriptionColumnRef?.current?.clientHeight ?? 275) + 25;

  if (aboveMediumScreen) {
    return (
      <Card sx={{ ...styles.largeEventContainer, maxHeight: cardHeight }}>
        <Box sx={styles.imgContainer}>
          {imgSrc && (
            <img src={fetchedImgSrc} alt={imgAltText} style={styles.img} />
          )}
        </Box>
        <Box>
          <span style={styles.descriptionColumn} ref={descriptionColumnRef}>
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
              href={generateSpecificDayRoute(month, day)}
            >
              {date}
            </Typography>
            <Typography>{otd}</Typography>
            {imgAltText && <Typography>{`Image: ${imgAltText}`}</Typography>}
            <Box sx={styles.tagsContainer}>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </Box>
          </span>
        </Box>
      </Card>
    );
  }
  return (
    <Card sx={styles.smallEventContainer}>
      <Box style={styles.descriptionColumn}>
        <Typography
          component="a"
          sx={styles.smallEventLinks}
          href={generatePath(ROUTES.SPECIFIC_EVENT, {
            eventName: stringToSlug(title),
          })}
        >
          {title}
        </Typography>
        <Typography
          component="a"
          sx={styles.smallEventLinks}
          href={generateSpecificDayRoute(month, day)}
        >
          {date}
        </Typography>
        <Box sx={styles.smallImgContainer}>
          {imgSrc && (
            <img src={fetchedImgSrc} alt={imgAltText} style={styles.smallImg} />
          )}
        </Box>
        <Typography>{otd}</Typography>
        <Box sx={styles.tagsContainer}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </Box>
      </Box>
    </Card>
  );
};
