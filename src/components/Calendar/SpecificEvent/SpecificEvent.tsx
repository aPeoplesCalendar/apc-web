import { DatabaseEvent } from "../../../types/types";
import { useParams } from "react-router-dom";
import { EventMetaTags } from "./EventMetaTags";
import { CardContent, Typography, Card, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { generateSpecificDayRoute } from "../Calendar.utils";
import { SpecificEventImage } from "./SpecificEventImage";
import { linkStyle } from "../Calendar.styles";
import * as styles from "./SpecificEvent.styles";
import { ShareIcons } from "../ShareIcons/ShareIcons";
import { useQuery } from "@tanstack/react-query";
import { fetchEvent, fetchPublicImgUrl } from "./SpecificEvent.utils";
import { staleTime } from "../../../constants/queryConfiguration";
import { EventTags } from "../QueryResultEventDisplay/EventTags";

export const SpecificEvent = () => {
  const { eventName } = useParams<{ eventName: string }>();

  const { isLoading: isLoadingEvent, data: dayEvent } = useQuery({
    queryKey: ["specificEvent", eventName],
    queryFn: () => fetchEvent(eventName),
    staleTime,
  });

  const { isLoading: isLoadingImgUrl, data: publicImgUrl } = useQuery({
    queryKey: ["eventPublicImgSrc", dayEvent?.imgSrc],
    queryFn: () => fetchPublicImgUrl(dayEvent?.imgSrc),
    staleTime,
    enabled: !!dayEvent?.imgSrc,
  });

  const isLoading = isLoadingEvent || isLoadingImgUrl;

  if (isLoading) {
    return (
      <Box sx={styles.loadingSpinner} data-testid={"loadingSpinner"}>
        <CircularProgress />
      </Box>
    );
  }

  if (!dayEvent) {
    return (
      <div>{`Could not find event ${eventName}. Try searching the database for keywords related to the event you are looking for.`}</div>
    );
  }

  const { title, description, date, day, month, tags, links, imgAltText } =
    dayEvent as DatabaseEvent;
  // split out description into paragraphs
  const paragraphs = description.split("\n\n");

  return (
    <Box sx={styles.container}>
      <EventMetaTags previewEvent={dayEvent} />
      <Card>
        <CardContent>
          <Box sx={styles.headerInfo}>
            <Typography variant="h5">{title}</Typography>
            <Typography
              component="a"
              sx={linkStyle}
              href={generateSpecificDayRoute(month, day)}
            >
              {date}
            </Typography>
            <SpecificEventImage
              publicImgURL={publicImgUrl}
              imgAltText={imgAltText}
            />
          </Box>
          <Box sx={styles.paragraphsContainer}>
            {paragraphs?.map((paragraph) => (
              <Typography key={paragraph}>{paragraph}</Typography>
            ))}
          </Box>
          <Box sx={styles.readMoreContainer}>
            <Typography variant="h6">Learn more:</Typography>
            {links?.map((link) => (
              <Typography key={link} href={link} component="a" sx={linkStyle}>
                {link}
              </Typography>
            ))}
          </Box>
          <EventTags tags={tags} />
          <ShareIcons title={title} />
        </CardContent>
      </Card>
    </Box>
  );
};
