import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DatabaseEvent } from "../../../types/types";
import { QueryResultEventDisplay } from "../QueryResultEventDisplay/QueryResultEventDisplay";
import { SearchUI } from "./SearchUI";
import { fetchEvents } from "./SpecificSearch.utils";
import * as styles from "./SearchUI.styles";

export const SpecificSearch = () => {
  const [queryParams] = useSearchParams();
  const hasQueryParams = !!queryParams.toString();
  const pageSize = 15;

  const [currentCursor, setCurrentCursor] = useState<number>(0);
  const [events, setEvents] = useState<DatabaseEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const resetData = () => {
    setEvents([]);
    setLoading(true);
    setCurrentCursor(0);
    setHasNextPage(false);
  };

  const handleFetchInitialEvents = useCallback(async () => {
    // skip call if query params empty
    if (!queryParams.toString()) {
      setLoading(false);
      return;
    }
    resetData();
    const { events: result = [], hasNextPage: currentHasNextPage } =
      await fetchEvents({
        currentCursor: 0,
        pageSize,
        queryParams,
      });
    setEvents(result);
    setHasNextPage(currentHasNextPage);
    setCurrentCursor(result.length);
    setLoading(false);
  }, [queryParams]);

  useEffect(() => {
    handleFetchInitialEvents();
  }, [handleFetchInitialEvents]);

  const handleFetchMore = async () => {
    setLoading(true);
    const { events: fetchMoreResult, hasNextPage: currentHasNextPage } =
      await fetchEvents({
        currentCursor,
        pageSize,
        queryParams,
      });
    const combinedEvents = [...events, ...fetchMoreResult];
    setEvents(combinedEvents);
    setHasNextPage(currentHasNextPage);
    setCurrentCursor(combinedEvents.length);
    setLoading(false);
  };

  return (
    <div>
      <Typography sx={styles.searchPageHeader} variant="h5">
        Search
      </Typography>
      <SearchUI setLoading={setLoading} />
      {!!events.length && (
        <Box sx={styles.eventsContainer}>
          {events.map(({ id, ...rest }) => (
            <QueryResultEventDisplay {...rest} key={id} />
          ))}
        </Box>
      )}
      {!loading && hasQueryParams && !events.length && (
        <Typography sx={styles.noResultsText} variant="h6">
          No events found for these search parameters.
        </Typography>
      )}
      {loading && (
        <Box sx={styles.loadingSpinner}>
          <CircularProgress />
        </Box>
      )}
      {!loading && hasNextPage && (
        <Box sx={styles.loadMoreButton}>
          <Button onClick={handleFetchMore} variant="contained">
            Load More
          </Button>
        </Box>
      )}
    </div>
  );
};
