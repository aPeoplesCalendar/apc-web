import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import * as styles from "./Homepage.styles";
import { QueryResultEventDisplay } from "../Calendar/QueryResultEventDisplay/QueryResultEventDisplay";
import { generateSpecificDayRoute } from "../Calendar/Calendar.utils";
import { useQuery } from "@tanstack/react-query";
import { staleTime } from "../../constants/queryConfiguration";
import { fetchEventOfTheDay } from "./Homepage.utils";

export const Homepage = () => {
  const theme = useTheme();
  const aboveMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const month = `${new Date().getMonth() + 1}`;
  const day = `${new Date().getDate()}`;

  const { isLoading, data: eventOTD } = useQuery({
    queryKey: ["eventOTD", month, day],
    queryFn: () => fetchEventOfTheDay(month, day),
    staleTime,
  });

  return (
    <div>
      <Typography variant={aboveMediumScreen ? "h3" : "h4"} sx={styles.header}>
        A People's Calendar
      </Typography>
      <Box sx={styles.homepageTextContainer}>
        <Typography sx={styles.homepageText(aboveMediumScreen)}>
          {`A People's Calendar (aPC) is an open-source project that seeks to promote the
          worldwide history of working class movements and liberation struggles
          in the form of a searchable "On This Day" style `}
          <Typography
            component="a"
            sx={styles.homepageLinkStyle(aboveMediumScreen)}
            href={generateSpecificDayRoute()}
          >
            calendar
          </Typography>
          .
        </Typography>
      </Box>
      <div>
        <Typography variant="h6" sx={styles.eventOTDHeader}>
          Event of the Day
        </Typography>
        {!isLoading && eventOTD && <QueryResultEventDisplay {...eventOTD} />}
      </div>
    </div>
  );
};
