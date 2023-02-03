import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";
import { QueryResultEventDisplay } from "../QueryResultEventDisplay";
import { SortByMetaData } from "./constants";
import { SearchUI } from "./SearchUI";
import {
  getAndFormatQueryParams,
  getTodayFormatted,
} from "./SpecificSearch.utils";

// query work to do:
// excluded queries
// don't return empty list if first page threshold crossed (issue with .textSearch)
// handle case insensitivity
// handle pagination (needs custom page tracking, fetch more)

export const SpecificSearch = () => {
  const { search } = useLocation();
  // get query params from url
  const { queryInclude, startDate, endDate, sortBy } =
    getAndFormatQueryParams(search);

  const tableName = "events_test_duplicate";

  const [events, setEvents] = useState<DatabaseEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const includedKeywordsQueryString = queryInclude.join(" & ");
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
        .textSearch("description", includedKeywordsQueryString)
        .order(column, { ascending })
        .range(0, 50);
      setEvents(events as DatabaseEvent[]);
      setLoading(false);
    };
    fetchEvents();
  }, [endDate, queryInclude, startDate, sortBy]);

  return (
    <div>
      <p>Specific Day</p>
      <SearchUI />
      <p>{loading ? "loading" : "not loading"}</p>
      {!!events?.length &&
        events.map(({ id, ...rest }) => (
          <QueryResultEventDisplay {...rest} key={id} />
        ))}
    </div>
  );
};
