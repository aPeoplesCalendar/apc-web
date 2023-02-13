import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { DatabaseEvent } from "../../../../types/types";
import { QueryResultEventDisplay } from "../../QueryResultEventDisplay/QueryResultEventDisplay";
import * as styles from "./SpecificDay.styles";
import { fetchEvents } from "./SpecificDay.utils";

// to dos
// render a daily, weekly, or monthly date picker for each calendar mode
// render a different UI for each mode - what does a week's worth of events look like? a month?
// map social media share icons on each queried event (right side when big, bottom when small?)
// social media share icons on each specific event
// add suggest an event page?? - what do the RLS policies look like?
// finalize color scheme
// write the meta stuff - about page, contact page, homepage, readme
// website meta stuff - icons, meta tags, lock down github repo
// deploy via netlify
// update apc-form to work with new stuff

export const SpecificDay = ({ month, day }: { month: string; day: string }) => {
  const [events, setEvents] = useState<DatabaseEvent[] | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleFetchEvents = async () => {
      setLoading(true);
      const dayEvents = await fetchEvents(month, day);
      setEvents(dayEvents);
      setLoading(false);
    };
    handleFetchEvents();
  }, [day, month]);

  return (
    <>
      {loading && (
        <Box sx={styles.loadingSpinner}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={styles.dayEventsContainer}>
        {events?.map(({ id, ...rest }) => (
          <QueryResultEventDisplay {...rest} key={id} />
        ))}
      </Box>
    </>
  );
};
