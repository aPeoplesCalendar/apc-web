import { Typography } from "@mui/material";
import { format } from "date-fns";
import { linkStyle } from "../Calendar.styles";
import {
  generateSpecificDayRoute,
  generateSpecificYearRoute,
} from "../Calendar.utils";
import * as styles from "./QueryResultEventDisplay.styles";

export const DateLink = ({ date }: { date: string }) => {
  const dateObj = new Date(date);
  // get links
  const month = `${dateObj.getUTCMonth() + 1}`;
  const day = `${dateObj.getUTCDate()}`;
  const year = `${dateObj.getUTCFullYear()}`;
  const monthDayRoute = generateSpecificDayRoute(month, day);
  const yearRoute = generateSpecificYearRoute(year);
  // get labels
  const formattedMonthAndDay = format(dateObj, "MMM do");
  const formattedYear = format(dateObj, "yyyy");
  return (
    <span style={styles.dateLinkWrapper}>
      <Typography component="a" sx={linkStyle} href={monthDayRoute}>
        {formattedMonthAndDay}
      </Typography>
      <span>{`, `}</span>
      <Typography component="a" sx={linkStyle} href={yearRoute}>
        {formattedYear}
      </Typography>
    </span>
  );
};
