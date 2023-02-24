import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useState } from "react";
import { generatePath } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { stringToSlug } from "../../../utils/stringToSlug";
import { linkStyle } from "../Calendar.styles";
import { ShareIcons } from "../ShareIcons/ShareIcons";
import { DateLink } from "./DateLink";
import { EventTags } from "./EventTags";
import * as styles from "./QueryResultEventDisplay.styles";

export interface IFullScreenDisplayProps {
  title: string;
  month: string;
  day: string;
  date: string;
  otd: string;
  imgSrc: string | undefined;
  imgAltText: string | undefined;
  fetchedImgSrc: string;
  tags: string[];
}

export const FullScreenDisplay = ({
  title,
  date,
  otd,
  imgSrc,
  imgAltText,
  fetchedImgSrc,
  tags,
}: IFullScreenDisplayProps) => {
  const [maxHeight, setMaxHeight] = useState(280);
  const [imgLoading, setImgLoading] = useState<boolean>(!!imgSrc);

  const handleImgLoad = () => {
    setImgLoading(false);
  };

  // set the total event card height to the description column
  // I don't like this, but this ref allows for the image and card to match dynamic text content height
  const callbackRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setMaxHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <Card sx={{ ...styles.largeEventContainer, maxHeight }}>
      <Box sx={styles.imgContainer}>
        {imgLoading && (
          <Box sx={styles.imgLoadingSpinnerContainer}>
            <CircularProgress />
          </Box>
        )}
        {fetchedImgSrc && (
          <img
            src={fetchedImgSrc}
            alt={imgAltText}
            style={{
              ...styles.img,
              maxHeight,
              // don't attempt to make image visible until it is fully loaded to avoid layout shift
              display: imgLoading ? "none" : "flex",
            }}
            onLoad={handleImgLoad}
          />
        )}
      </Box>
      <Box sx={styles.descriptionColumn} ref={callbackRef}>
        <Typography
          component="a"
          sx={linkStyle}
          href={generatePath(ROUTES.SPECIFIC_EVENT, {
            eventName: stringToSlug(title),
          })}
        >
          {title}
        </Typography>
        <DateLink date={date} />
        <Typography>{otd}</Typography>
        {imgAltText && <Typography>{`Image: ${imgAltText}`}</Typography>}
        <EventTags tags={tags} />
        <ShareIcons title={title} otd={otd} />
      </Box>
    </Card>
  );
};
