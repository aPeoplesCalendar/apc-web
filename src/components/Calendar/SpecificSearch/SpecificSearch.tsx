import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";
import { QueryResultEventDisplay } from "../QueryResultEventDisplay";

// accept the following query params
// array of included keywords
// array of excluded keywords
// start date
// end date
// write a query that includes all of these, but doesn't break if any of them are undefined

export const SpecificSearch = () => {
  const { search } = useLocation();
  const includedKeywords =
    new URLSearchParams(search).get("queryInclude") ?? "";
  const excludedKeywords =
    new URLSearchParams(search).get("queryExclude") ?? "";
  const startDate = new URLSearchParams(search).get("startDate") ?? "";
  const endDate = new URLSearchParams(search).get("endDate") ?? "";
  const caseSensitive = new URLSearchParams(search).get("caseSensitive") ?? "";

  console.log(
    "params",
    includedKeywords,
    excludedKeywords,
    startDate,
    endDate,
    caseSensitive
  );

  const tableName = "events_test_duplicate";

  const [events, setEvents] = useState<DatabaseEvent[] | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data: dayEvents = [] } = await supabase
        .from(tableName)
        .select<"*", DatabaseEvent>()
        .like("description", `%${includedKeywords[0]}%`);
      setEvents(dayEvents);
      setLoading(false);
    };
    fetchEvents();
  }, [includedKeywords]);

  return (
    <div>
      <p>Specific Day</p>
      <p>{loading ? "loading" : "not loading"}</p>
      {events?.map(({ id, ...rest }) => (
        <QueryResultEventDisplay {...rest} key={id} />
      ))}
    </div>
  );
};
