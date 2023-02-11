import { Skeleton } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { DatabaseEvent } from "../../types/types";
import * as styles from "./Homepage.styles";
import { QueryResultEventDisplay } from "../Calendar/QueryResultEventDisplay/QueryResultEventDisplay";

export const Homepage = () => {
  const [eventOTD, setEventOTD] = useState<DatabaseEvent>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEventOfTheDay = async () => {
    setLoading(true);
    const month = `${new Date().getMonth() + 1}`;
    const day = `${new Date().getDate()}`;
    const { data: todayEvents = [] } = await supabase
      .from(process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string)
      .select<"*", DatabaseEvent>()
      .eq("day", day)
      .eq("month", month)
      .order("title", { ascending: true });
    setEventOTD(
      todayEvents?.reduce(
        (maxEvent: DatabaseEvent, currentEvent: DatabaseEvent) =>
          maxEvent.description.length > currentEvent.description.length
            ? maxEvent
            : currentEvent
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchEventOfTheDay();
  }, []);

  return (
    <div>
      <Typography variant="h3" sx={styles.header}>
        A People's Calendar
      </Typography>
      <Box sx={styles.homepageText}>
        <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Typography>
        <Typography>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </Typography>
      </Box>
      <div>
        {loading && <Skeleton />}
        <Typography variant="h6" sx={styles.eventOTDHeader}>
          Event of the Day
        </Typography>
        {!loading && eventOTD && <QueryResultEventDisplay {...eventOTD} />}
      </div>
    </div>
  );
};
