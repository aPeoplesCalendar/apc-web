import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { stringToSlug } from "../../../utils/stringToSlug";
import { ShareIcons } from "../ShareIcons/ShareIcons";
import { DateLink } from "./DateLink";
import { EventTags } from "./EventTags";
import * as styles from "./QueryResultEventDisplay.styles";

export interface ISmallScreenDisplayProps {
  title: string;
  date: string;
  otd: string;
  imgSrc: string | undefined;
  imgAltText: string | undefined;
  fetchedImgSrc: string;
  tags: string[];
}

export const SmallScreenDisplay = ({
  title,
  date,
  otd,
  imgAltText,
  imgSrc,
  fetchedImgSrc,
  tags,
}: ISmallScreenDisplayProps) => {
  const navigate = useNavigate();
  const [imgLoading, setImgLoading] = useState<boolean>(!!imgSrc);

  const eventLink = generatePath(ROUTES.SPECIFIC_EVENT, {
    eventName: stringToSlug(title),
  });

  const handleImgLoad = () => {
    setImgLoading(false);
  };

  const handleImgClick = () => {
    navigate(eventLink);
  };

  // don't display loading box for image until we have event text to avoid layout shift
  const displayImageLoadingBox = !!title && imgLoading;

  return (
    <Card sx={styles.smallEventContainer}>
      <Box sx={styles.descriptionColumn}>
        <Typography component="a" sx={styles.smallEventLinks} href={eventLink}>
          {title}
        </Typography>
        <Box sx={styles.smallDateLinkContainer}>
          <DateLink date={date} />
        </Box>
        <Box sx={styles.smallImgContainer}>
          {displayImageLoadingBox && (
            <Box sx={styles.imgLoadingBox} data-testid="imgLoadingBox">
              <CircularProgress />
            </Box>
          )}
          <img
            src={fetchedImgSrc}
            alt={imgAltText}
            onLoad={handleImgLoad}
            onClick={handleImgClick}
            style={{
              ...styles.smallImg,
              // don't attempt to make image visible until it is fully loaded to avoid layout shift
              display: imgLoading ? "none" : "flex",
            }}
          />
        </Box>
        <Typography>{otd}</Typography>
        <EventTags tags={tags} />
        <ShareIcons title={title} otd={otd} />
      </Box>
    </Card>
  );
};
