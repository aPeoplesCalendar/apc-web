import { DatabaseEvent } from "../../../types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { EventMetaTags } from "./EventMetaTags";
import { CardContent, Typography, Card, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { generateSpecificDayRoute } from "../Calendar.utils";
import { SpecificEventImage } from "./SpecificEventImage";
import { linkStyle } from "../Calendar.styles";
import * as styles from "./SpecificEvent.styles";
import { ShareIcons } from "../ShareIcons/ShareIcons";

export const SpecificEvent = () => {
  const [dayEvent, setDayEvent] = useState<DatabaseEvent | null>(null);
  const [publicImgURL, setPublicImgURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { eventName } = useParams<{ eventName: string }>();

  useEffect(() => {
    queryDatabaseByTitle(eventName);
  }, [eventName]);

  const queryDatabaseByTitle = async (slugTitle: string | undefined) => {
    setLoading(true);
    // get event data
    const { data } = await supabase
      .from(process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string)
      .select<"*", DatabaseEvent>()
      .eq("slugTitle", slugTitle);

    if (data?.[0]?.imgSrc) {
      // get event image url
      const { data: imageData } = await supabase.storage
        .from("event-photos")
        .getPublicUrl(data[0].imgSrc);
      setPublicImgURL(imageData?.publicUrl);
    }

    setDayEvent(data?.[0] as DatabaseEvent | null);
    setLoading(false);
  };

  if (loading) {
    return (
      <Box sx={styles.loadingSpinner}>
        <CircularProgress />
      </Box>
    );
  }

  if (!dayEvent) {
    return (
      <div>{`Could not find event ${eventName}. Try searching the datbase for similar keywords (link).`}</div>
    );
  }

  const { title, description, date, day, month, links, imgAltText } =
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
              publicImgURL={publicImgURL}
              imgAltText={imgAltText}
            />
          </Box>
          <Box sx={styles.paragraphsContainer}>
            {paragraphs?.map((paragraph) => (
              <Typography key={paragraph}>{paragraph}</Typography>
            ))}
          </Box>
          <Box sx={styles.readMoreContainer}>
            <Typography variant="h6">Read more:</Typography>
            {links?.map((link) => (
              <Typography key={link} href={link} component="a" sx={linkStyle}>
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
