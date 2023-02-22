import { DatabaseEvent } from "../../../types/types";
import { useParams } from "react-router-dom";
import { EventMetaTags } from "./EventMetaTags";
import {
  CardContent,
  Typography,
  Card,
  Box,
  useMediaQuery,
  useTheme,
  Skeleton,
} from "@mui/material";
import { SpecificEventImage } from "./SpecificEventImage";
import * as styles from "./SpecificEvent.styles";
import { ShareIcons } from "../ShareIcons/ShareIcons";
import { useQuery } from "@tanstack/react-query";
import { fetchEvent, fetchPublicImgUrl } from "./SpecificEvent.utils";
import { staleTime } from "../../../constants/queryConfiguration";
import { EventTags } from "../QueryResultEventDisplay/EventTags";
import { DateLink } from "../QueryResultEventDisplay/DateLink";

export const SpecificEvent = () => {
  const { eventName } = useParams<{ eventName: string }>();

  const { isLoading: isLoadingEvent, data: dayEvent } = useQuery({
    queryKey: ["specificEvent", eventName],
    queryFn: () => fetchEvent(eventName),
    staleTime,
  });

  const { data: publicImgUrl } = useQuery({
    queryKey: ["eventPublicImgSrc", dayEvent?.imgSrc],
    queryFn: () => fetchPublicImgUrl(dayEvent?.imgSrc),
    staleTime,
    enabled: !!dayEvent?.imgSrc,
  });

  const theme = useTheme();
  const aboveSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  if (!isLoadingEvent && !dayEvent) {
    return (
      <div>{`Could not find event ${eventName}. Try searching the database for keywords related to the event you are looking for.`}</div>
    );
  }

  const {
    title,
    description = "",
    date,
    tags,
    links,
    imgSrc,
    imgAltText,
  } = (dayEvent ?? {}) as DatabaseEvent;
  // split out description into paragraphs
  const paragraphs = description.split("\n\n");

  return (
    <Box sx={styles.container}>
      {dayEvent && <EventMetaTags previewEvent={dayEvent} />}
      <Card>
        <CardContent sx={styles.cardPadding(aboveSmallScreen)}>
          <Box sx={styles.headerInfo}>
            <Typography variant="h5">
              {isLoadingEvent ? (
                <Skeleton variant="text" sx={styles.headerLoadingSkeleton} />
              ) : (
                title
              )}
            </Typography>
            <Box sx={styles.dateLinkContainer}>
              {isLoadingEvent ? (
                <Skeleton sx={styles.headerLoadingSkeleton} />
              ) : (
                <DateLink date={date} />
              )}
            </Box>
            <SpecificEventImage
              publicImgURL={publicImgUrl}
              hasImage={!!imgSrc || isLoadingEvent}
              imgAltText={imgAltText}
            />
          </Box>
          <Box sx={styles.paragraphsContainer}>
            {isLoadingEvent ? (
              <Skeleton sx={styles.paragraphsLoadingSkeleton} />
            ) : (
              <>
                {paragraphs?.map((paragraph) => (
                  <Typography key={paragraph}>{paragraph}</Typography>
                ))}
              </>
            )}
          </Box>
          <Box sx={styles.tagsContainer}>
            <EventTags tags={tags} />
          </Box>
          <Box sx={styles.readMoreContainer}>
            <Typography variant="h6">Learn more:</Typography>
            {links?.map((link) => (
              <Typography
                key={link}
                href={link}
                component="a"
                sx={styles.specificEventLinkStyle}
              >
                {link}
              </Typography>
            ))}
          </Box>
          <ShareIcons title={title} />
        </CardContent>
      </Card>
    </Box>
  );
};
