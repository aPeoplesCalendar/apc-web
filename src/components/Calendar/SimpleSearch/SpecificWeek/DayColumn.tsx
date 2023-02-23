import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useMediaQuery, useTheme } from "@mui/material";
import { format } from "date-fns";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { stringToSlug } from "../../../../utils/stringToSlug";
import { fetchEvents } from "./SpecificWeek.utils";
import * as styles from "./SpecificWeek.styles";
import {
  generateSpecificDayRoute,
  getMonthAndDayFromDate,
} from "../../Calendar.utils";
import { useQuery } from "@tanstack/react-query";
import { staleTime } from "../../../../constants/queryConfiguration";

export const DayColumn = ({ day }: { day: Date }) => {
  const { month, day: queryDay } = getMonthAndDayFromDate(day);

  const { isLoading, data: events = [] } = useQuery({
    queryKey: ["weekOrMonthCalendarViewEvents", month, queryDay],
    queryFn: () => fetchEvents(month, queryDay),
    staleTime,
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const aboveMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const aboveSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const handleEventClick = (title: string) => {
    navigate(
      generatePath(ROUTES.SPECIFIC_EVENT, {
        eventName: stringToSlug(title),
      })
    );
  };

  const formattedColumnLabel = format(day, "eee M/d");

  return (
    <Box sx={styles.dayColumnWrapper(!aboveSmallScreen)}>
      <Box sx={styles.columnHeader}>
        <Typography
          component="a"
          sx={styles.dayLinkStyle(aboveMediumScreen)}
          href={generateSpecificDayRoute(month, queryDay)}
        >
          {formattedColumnLabel}
        </Typography>
      </Box>
      <Box sx={styles.dayEventsWrapper}>
        {isLoading && (
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
