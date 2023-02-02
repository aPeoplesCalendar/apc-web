import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";
import { QueryResultEventDisplay } from "../QueryResultEventDisplay";

export const SpecificDay = () => {
  const { search } = useLocation();
  const day = new URLSearchParams(search).get("day") ?? "1-1";

  const tableName = "events_test_duplicate";

  const [events, setEvents] = useState<DatabaseEvent[] | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data: dayEvents = [] } = await supabase
        .from(tableName)
        .select<"*", DatabaseEvent>()
        .eq("day", day);
      setEvents(dayEvents);
      setLoading(false);
    };
    fetchEvents();
  }, [day]);

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
