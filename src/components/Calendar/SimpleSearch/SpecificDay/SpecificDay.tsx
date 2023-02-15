import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import { staleTime } from "../../../../constants/queryConfiguration";
import { QueryResultEventDisplay } from "../../QueryResultEventDisplay/QueryResultEventDisplay";
import * as styles from "./SpecificDay.styles";
import { fetchEvents } from "./SpecificDay.utils";

export const SpecificDay = ({ month, day }: { month: string; day: string }) => {
  const { isLoading, data: events = [] } = useQuery({
    queryKey: ["eventsOfOneDay", month, day],
    queryFn: () => fetchEvents(month, day),
    staleTime,
  });

  return (
    <>
      {isLoading && (
        <Box sx={styles.loadingSpinner}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={styles.dayEventsContainer}>
        {events.map(({ id, ...rest }) => (
          <QueryResultEventDisplay {...rest} key={id} />
        ))}
      </Box>
    </>
  );
};
