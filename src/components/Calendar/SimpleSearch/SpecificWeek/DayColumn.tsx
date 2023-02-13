import { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { stringToSlug } from "../../../../utils/stringToSlug";
import { linkStyle } from "../../Calendar.styles";
import { fetchEvents } from "./SpecificWeek.utils";

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

  const formattedColumnLabel = format(day, "eee M-d");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "minmax(0px, 1fr)",
        borderLeft: "1px solid white",
        borderTop: aboveSmallScreen ? "none" : "1px solid white",
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid white",
          textAlign: "center",
          padding: "5px",
          fontSize: "13px",
        }}
      >
        {formattedColumnLabel}
      </Box>
      <Box
        sx={{
          padding: "7px",
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          textAlign: "left",
        }}
      >
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {events.map(({ title }) => (
          <Typography
            key={title}
            component="a"
            sx={{
              ...linkStyle,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              fontSize: aboveSmallScreen ? "12px" : "14px",
              cursor: "pointer",
            }}
            onClick={() => handleEventClick(title)}
          >
            {title}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
