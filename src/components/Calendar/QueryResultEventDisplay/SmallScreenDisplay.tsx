import { Box, Card, Typography } from "@mui/material";
import { generatePath } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { stringToSlug } from "../../../utils/stringToSlug";
import { generateSpecificDayRoute } from "../Calendar.utils";
import { ShareIcons } from "../ShareIcons/ShareIcons";
import { DateLink } from "./DateLink";
import { EventTags } from "./EventTags";
import * as styles from "./QueryResultEventDisplay.styles";

export interface ISmallScreenDisplayProps {
  title: string;
  month: string;
  day: string;
  date: string;
  otd: string;
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
  imgAltText,
  fetchedImgSrc,
  tags,
}: ISmallScreenDisplayProps) => {
  return (
    <Card sx={styles.smallEventContainer}>
      <Box sx={styles.descriptionColumn}>
        <Typography
          component="a"
          sx={styles.smallEventLinks}
          href={generatePath(ROUTES.SPECIFIC_EVENT, {
            eventName: stringToSlug(title),
          })}
        >
          {title}
        </Typography>
        <Box sx={styles.smallDateLinkContainer}>
          <DateLink date={date} href={generateSpecificDayRoute(month, day)} />
        </Box>
        <Box sx={styles.smallImgContainer}>
          {fetchedImgSrc && (
            <img src={fetchedImgSrc} alt={imgAltText} style={styles.smallImg} />
          )}
        </Box>
        <Typography>{otd}</Typography>
        <EventTags tags={tags} />
        <ShareIcons title={title} />
      </Box>
    </Card>
  );
};
