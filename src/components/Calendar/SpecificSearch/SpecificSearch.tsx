import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DatabaseEvent } from "../../../types/types";
import { QueryResultEventDisplay } from "../QueryResultEventDisplay/QueryResultEventDisplay";
import { SearchUI } from "./SearchUI";
import { fetchEvents } from "./SpecificSearch.utils";
import * as styles from "./SearchUI.styles";

export const SpecificSearch = () => {
  const { search: queryParams } = useLocation();

  const pageSize = 15;

  const [currentCursor, setCurrentCursor] = useState<number>(0);
  const [events, setEvents] = useState<DatabaseEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const handleFetchInitialEvents = useCallback(async () => {
    // skip call if query params empty
    if (!queryParams) {
      return;
    }
    setCurrentCursor(0);
    setHasNextPage(false);
    setLoading(true);
    const { events: result, hasNextPage: currentHasNextPage } =
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
      <SearchUI />
      {!!events?.length && (
        <Box sx={styles.eventsContainer}>
          {events.map(({ id, ...rest }) => (
            <QueryResultEventDisplay {...rest} key={id} />
          ))}
        </Box>
      )}
      {!loading && queryParams && !events?.length && (
        <Typography sx={styles.noResultsText} variant="h6">
          No events found for these search parameters.
        </Typography>
      )}
      {loading && (
        <Box sx={styles.loadingSpinner}>
          <CircularProgress />
        </Box>
      )}
      {hasNextPage && (
        <Box sx={styles.loadMoreButton}>
          <Button onClick={handleFetchMore} variant="contained">
            Load More
          </Button>
        </Box>
      )}
    </div>
  );
};
