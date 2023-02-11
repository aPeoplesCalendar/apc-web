import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";
import {
  formatDateQueryParam,
  formatRawDatePickerValue,
  generateSpecificDayRoute,
} from "../Calendar.utils";
import { QueryResultEventDisplay } from "../QueryResultEventDisplay";
import { StyledTextField } from "../StyledTextField/StyledTextField";
import * as styles from "./SpecificDay.styles";

// make a container called simple search
// have a really basic picker - day, week, and month (default is day, initialized to today)
// render a daily, weekly, or monthly date picker for each mode
// render a different UI for each mode - what does a week's worth of events look like? a month?

export const SpecificDay = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const day = new URLSearchParams(search).get("day") ?? "1";
  const month = new URLSearchParams(search).get("month") ?? "1";

  const [events, setEvents] = useState<DatabaseEvent[] | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data: dayEvents = [] } = await supabase
        .from(process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string)
        .select<"*", DatabaseEvent>()
        .eq("day", day)
        .eq("month", month)
        .order("title", { ascending: true });
      setEvents(dayEvents);
      setLoading(false);
    };
    fetchEvents();
  }, [day, month]);

  const handleNewDate = (e: ChangeEvent<HTMLInputElement>): void => {
    // if the user did something weird and the given date is falsy, don't run anything
    if (!e.target.value) {
      return;
    }
    const { month, day } = formatRawDatePickerValue(e.target.value);
    navigate(generateSpecificDayRoute(month, day));
  };

  const navigateToSearch = () => {
    navigate({
      pathname: ROUTES.CALENDAR_SEARCH,
    });
  };

  return (
    <div>
      <Typography sx={styles.calendarPageHeader} variant="h5">
        Calendar
      </Typography>
      <Box sx={styles.calendarActions}>
        <StyledTextField
          type="date"
          defaultValue={formatDateQueryParam(month, day)}
          onChange={handleNewDate}
        />
        <Button
          onClick={navigateToSearch}
          variant="contained"
          sx={styles.advancedSearchButton}
        >
          Search
        </Button>
      </Box>
      {loading && (
        <Box sx={styles.loadingSpinner}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={styles.dayEventsContainer}>
        {events?.map(({ id, ...rest }) => (
          <QueryResultEventDisplay {...rest} key={id} />
        ))}
      </Box>
    </div>
  );
};
