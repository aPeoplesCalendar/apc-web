import { Box, Card, Typography } from "@mui/material";
import { useRef } from "react";
import { generatePath } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { stringToSlug } from "../../../utils/stringToSlug";
import { linkStyle } from "../Calendar.styles";
import { generateSpecificDayRoute } from "../Calendar.utils";
import { ShareIcons } from "../ShareIcons/ShareIcons";
import { EventTags } from "./EventTags";
import * as styles from "./QueryResultEventDisplay.styles";

export interface IFullScreenDisplayProps {
  title: string;
  month: string;
  day: string;
  date: string;
  otd: string;
  imgSrc: string;
  imgAltText: string | undefined;
  fetchedImgSrc: string;
  tags: string[];
}

export const FullScreenDisplay = ({
  title,
  month,
  day,
  date,
  otd,
  imgSrc,
  imgAltText,
  fetchedImgSrc,
  tags,
}: IFullScreenDisplayProps) => {
  const descriptionColumnRef = useRef<HTMLDivElement>(null);
  // set the total event card height to the description column + a bit extra
  // I don't like the roundabout way of doing this, but it allows for the image to always be fitted to dynamic text content height
  const cardHeight = descriptionColumnRef?.current?.clientHeight ?? 275;

  return (
    <Card sx={{ ...styles.largeEventContainer, maxHeight: cardHeight }}>
      <Box sx={styles.imgContainer}>
        {imgSrc && (
          <img
            src={fetchedImgSrc}
            alt={imgAltText}
            style={{ ...styles.img, maxHeight: cardHeight }}
          />
        )}
      </Box>
      <Box sx={styles.descriptionColumn} ref={descriptionColumnRef}>
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
        <EventTags tags={tags} />
        <ShareIcons title={title} />
      </Box>
    </Card>
  );
};
