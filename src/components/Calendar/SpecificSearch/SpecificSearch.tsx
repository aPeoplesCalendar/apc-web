import { Button } from "@mui/material";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DatabaseEvent } from "../../../types/types";
import { QueryResultEventDisplay } from "../QueryResultEventDisplay";
import { SearchUI } from "./SearchUI";
import { fetchEvents } from "./SpecificSearch.utils";

export const SpecificSearch = () => {
  const { search: queryParams } = useLocation();

  const pageSize = 15;

  const [currentCursor, setCurrentCursor] = useState<number>(0);
  const [events, setEvents] = useState<DatabaseEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const handleFetchInitialEvents = useCallback(async () => {
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
      <p>Specific Search</p>
      <SearchUI />
      {!!events?.length &&
        events.map(({ id, ...rest }) => (
          <QueryResultEventDisplay {...rest} key={id} />
        ))}
      <p>{loading ? "loading" : "not loading"}</p>
      {hasNextPage && <Button onClick={handleFetchMore}>Load More</Button>}
    </div>
  );
};
