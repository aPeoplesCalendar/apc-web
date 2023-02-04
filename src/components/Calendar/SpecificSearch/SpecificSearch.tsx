import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DatabaseEvent } from "../../../types/types";
import { QueryResultEventDisplay } from "../QueryResultEventDisplay";
import { SearchUI } from "./SearchUI";
import { fetchEvents } from "./SpecificSearch.utils";

// query work to do:
// don't return empty list if first page threshold crossed (issue with .textSearch)
// handle pagination (needs custom page tracking, fetch more)

export const SpecificSearch = () => {
  const { search } = useLocation();

  const [events, setEvents] = useState<DatabaseEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchEvents = useCallback(async () => {
    setLoading(true);
    const { events = [] } = await fetchEvents({ search });
    setEvents(events as DatabaseEvent[]);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    handleFetchEvents();
  }, [handleFetchEvents]);

  return (
    <div>
      <p>Specific Search</p>
      <SearchUI />
      <p>{loading ? "loading" : "not loading"}</p>
      {!!events?.length &&
        events.map(({ id, ...rest }) => (
          <QueryResultEventDisplay {...rest} key={id} />
        ))}
    </div>
  );
};
