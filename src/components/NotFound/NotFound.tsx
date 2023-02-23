import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ROUTES } from "../../constants/routes";
import { generateSpecificDayRoute } from "../Calendar/Calendar.utils";
import * as styles from "./NotFound.styles";

export const NotFound = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h5">
        Sorry, it looks like the link you tried didn't work!
      </Typography>
      <Typography variant="h5" data-testid="calendar-link">
        Looking for the events on a specific day? Check out our calendar
        <Typography
          variant="h5"
          component="a"
          sx={styles.notFoundLink}
          href={generateSpecificDayRoute()}
        >
          {` here`}
        </Typography>
        .
      </Typography>
      <Typography variant="h5" data-testid="search-link">
        Looking for a specific event? Search our event database
        <Typography
          variant="h5"
          component="a"
          sx={styles.notFoundLink}
          href={ROUTES.CALENDAR_SEARCH}
        >
          {` here`}
        </Typography>
        .
      </Typography>
    </Box>
  );
};
