import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { DatabaseEvent } from "../../types/types";
import * as styles from "./Homepage.styles";
import { QueryResultEventDisplay } from "../Calendar/QueryResultEventDisplay/QueryResultEventDisplay";
import { generateSpecificDayRoute } from "../Calendar/Calendar.utils";

export const Homepage = () => {
  const [eventOTD, setEventOTD] = useState<DatabaseEvent>();
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useTheme();
  const aboveMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const fetchEventOfTheDay = async () => {
    setLoading(true);
    const month = `${new Date().getMonth() + 1}`;
    const day = `${new Date().getDate()}`;
    const { data: todayEvents = [] } = await supabase
      .from(process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string)
      .select<any, DatabaseEvent>(
        `
        id,
        title,
        date,
        day,
        description,
        month,
        otd,
        imgSrc,
        imgAltText,
        tags
        `
      )
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
      <Typography variant={aboveMediumScreen ? "h3" : "h4"} sx={styles.header}>
        A People's Calendar
      </Typography>
      <Box sx={styles.homepageTextContainer}>
        <Typography sx={styles.homepageText(aboveMediumScreen)}>
          {`A People's Calendar (aPC) is a project that seeks to promote the
          worldwide history of working class movements and liberation struggles
          in the form of a searchable "On This Day" style `}
          <Typography
            component="a"
            sx={styles.homepageLinkStyle(aboveMediumScreen)}
            href={generateSpecificDayRoute()}
          >
            calendar
          </Typography>
          .
        </Typography>
      </Box>
      <div>
        <Typography variant="h6" sx={styles.eventOTDHeader}>
          Event of the Day
        </Typography>
        {!loading && eventOTD && <QueryResultEventDisplay {...eventOTD} />}
      </div>
    </div>
  );
};
