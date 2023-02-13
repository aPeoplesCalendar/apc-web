import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { DatabaseEvent } from "../../../../types/types";
import { QueryResultEventDisplay } from "../../QueryResultEventDisplay/QueryResultEventDisplay";
import * as styles from "./SpecificDay.styles";
import { fetchEvents } from "./SpecificDay.utils";

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
