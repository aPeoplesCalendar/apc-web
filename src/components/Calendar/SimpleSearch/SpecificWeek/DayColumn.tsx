import { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { stringToSlug } from "../../../../utils/stringToSlug";
import { fetchEvents } from "./SpecificWeek.utils";
import * as styles from "./SpecificWeek.styles";
import { linkStyle } from "../../Calendar.styles";
import {
  generateSpecificDayRoute,
  getMonthAndDayFromDate,
} from "../../Calendar.utils";

export const DayColumn = ({ day }: { day: Date }) => {
  const [events, setEvents] = useState<{ title: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const theme = useTheme();
  const aboveSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    const month = (day.getUTCMonth() + 1).toString();
    const queryDay = day.getUTCDate().toString();
    const handleFetchEvents = async () => {
      setLoading(true);
      const dayEvents = await fetchEvents(month, queryDay);
      setEvents(dayEvents);
      setLoading(false);
    };
    handleFetchEvents();
  }, [day]);

  const handleEventClick = (title: string) => {
    navigate(
      generatePath(ROUTES.SPECIFIC_EVENT, {
        eventName: stringToSlug(title),
      })
    );
  };

  const formattedColumnLabel = format(day, "eee M/d");
  const { month, day: specificDay } = getMonthAndDayFromDate(day);

  return (
    <Box sx={styles.dayColumnWrapper(!aboveSmallScreen)}>
      <Box sx={styles.columnHeader}>
        <Typography
          component="a"
          sx={linkStyle}
          href={generateSpecificDayRoute(month, specificDay)}
        >
          {formattedColumnLabel}
        </Typography>
      </Box>
      <Box sx={styles.dayEventsWrapper}>
        {loading && (
          <Box sx={styles.loadingSpinner}>
            <CircularProgress />
          </Box>
        )}
        {events.map(({ title }) => (
          <Typography
            key={title}
            component="a"
            sx={styles.eventLink(!aboveSmallScreen)}
            onClick={() => handleEventClick(title)}
          >
            {title}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
