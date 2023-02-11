import { Box, Card, Typography } from "@mui/material";
import { generatePath } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { stringToSlug } from "../../../utils/stringToSlug";
import { generateSpecificDayRoute } from "../Calendar.utils";
import { EventTags } from "./EventTags";
import * as styles from "./QueryResultEventDisplay.styles";

export interface ISmallScreenDisplayProps {
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

export const SmallScreenDisplay = ({
  title,
  month,
  day,
  date,
  otd,
  imgSrc,
  imgAltText,
  fetchedImgSrc,
  tags,
}: ISmallScreenDisplayProps) => {
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
        <EventTags tags={tags} />
      </Box>
    </Card>
  );
};
