import { DatabaseEvent } from "../../../types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { EventMetaTags } from "./EventMetaTags";
import { CardContent, Typography, Card } from "@mui/material";
import { Link } from "react-router-dom";
import { generateSpecificDayRoute } from "../Calendar.utils";
import { SpecificEventImage } from "./SpecificEventImage";

export const SpecificEvent = () => {
  const [event, setEvent] = useState<DatabaseEvent | null>(null);
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
      .select()
      .eq("slugTitle", slugTitle);
    // get event image url
    const { data: imageData } = await supabase.storage
      .from("event-photos")
      .getPublicUrl(data?.[0]?.imgSrc);
    setEvent(data?.[0] as DatabaseEvent | null);
    setPublicImgURL(imageData?.publicUrl ?? "");
    setLoading(false);
  };

  if (loading) {
    return <div>loading</div>;
  }

  if (!event) {
    return (
      <div>{`Could not find event ${eventName}. Try searching the datbase for similar keywords (link).`}</div>
    );
  }

  const { title, description, date, day, links, imgAltText } =
    event as DatabaseEvent;
  // split out description into paragraphs
  const paragraphs = description.split("\n\n");

  return (
    <>
      <EventMetaTags previewEvent={event} />
      <div>
        <Card>
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h6">
              <Link to={generateSpecificDayRoute(day)}>{date}</Link>
            </Typography>
            <SpecificEventImage
              publicImgURL={publicImgURL}
              imgAltText={imgAltText}
            />
            {paragraphs?.map((paragraph) => (
              <Typography key={paragraph}>{paragraph}</Typography>
            ))}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              <Typography>Read more:</Typography>
              {links?.map((link) => (
                <Link to={link} target="_blank" key={link}>
                  {link}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
