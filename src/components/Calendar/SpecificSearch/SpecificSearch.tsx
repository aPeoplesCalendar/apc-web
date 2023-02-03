import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";
import { QueryResultEventDisplay } from "../QueryResultEventDisplay";
import { SortByMetaData } from "./constants";
import { SearchUI } from "./SearchUI";
import {
  generateTextSearchQueryString,
  getAndFormatQueryParams,
  getTodayFormatted,
} from "./SpecificSearch.utils";

// query work to do:
// wildcard match on text if no text search provided (or write a different query?)
// don't return empty list if first page threshold crossed (issue with .textSearch)
// handle pagination (needs custom page tracking, fetch more)
// push business logic functions to utils as much as possible (and test)

export const SpecificSearch = () => {
  const { search } = useLocation();
  // get query params from url
  const { queryInclude, queryExclude, startDate, endDate, sortBy } = useMemo(
    () => getAndFormatQueryParams(search),
    [search]
  );

  const tableName = "events_test_duplicate";

  const [events, setEvents] = useState<DatabaseEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fullTextQuery = generateTextSearchQueryString({
      included: queryInclude,
      excluded: queryExclude,
    });
    // default start and end dates
    const queryStartDate = startDate === "null" ? "0001-01-01" : startDate;
    const queryEndDate = endDate === "null" ? getTodayFormatted() : endDate;
    const { column, ascending } = SortByMetaData.get(sortBy) as {
      displayText: string;
      column: string;
      ascending: boolean;
    };
    const fetchEvents = async () => {
      setLoading(true);
      const { data: events = [] } = await supabase
        .from(tableName)
        .select<"*", DatabaseEvent>()
        .lt("date", queryEndDate)
        .gt("date", queryStartDate)
        .textSearch("description", fullTextQuery)
        .order(column, { ascending })
        .range(0, 50);
      setEvents(events as DatabaseEvent[]);
      setLoading(false);
    };
    fetchEvents();
  }, [endDate, queryInclude, startDate, sortBy, queryExclude]);

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
