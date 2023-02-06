import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";
import {
  formatDateQueryParam,
  formatRawDatePickerValue,
} from "../Calendar.utils";
import { QueryResultEventDisplay } from "../QueryResultEventDisplay";

export const SpecificDay = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const day = new URLSearchParams(search).get("day") ?? "1-1";

  const [events, setEvents] = useState<DatabaseEvent[] | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data: dayEvents = [] } = await supabase
        .from(process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string)
        .select<"*", DatabaseEvent>()
        .eq("day", day);
      setEvents(dayEvents);
      setLoading(false);
    };
    fetchEvents();
  }, [day]);

  const handleNewDate = (e: ChangeEvent<HTMLInputElement>): void => {
    // if the user did something weird and the given date is falsy, don't run anything
    if (!e.target.value) {
      return;
    }
    const formattedDateString = formatRawDatePickerValue(e.target.value);
    navigate({
      pathname: ROUTES.CALENDAR_DAY,
      search: `?day=${formattedDateString}`,
    });
  };

  const navigateToSearch = () => {
    navigate({
      pathname: ROUTES.CALENDAR_SEARCH,
    });
  };

  return (
    <div>
      <p>Specific Day</p>
      <div>
        <TextField
          type="date"
          defaultValue={formatDateQueryParam(day)}
          onChange={handleNewDate}
        />
        <Button onClick={navigateToSearch}>Advanced Search</Button>
      </div>
      <p>{loading ? "loading" : "not loading"}</p>
      {events?.map(({ id, ...rest }) => (
        <QueryResultEventDisplay {...rest} key={id} />
      ))}
    </div>
  );
};
