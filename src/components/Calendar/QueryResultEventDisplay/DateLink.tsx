import { Typography } from "@mui/material";
import { format } from "date-fns";
import { linkStyle } from "../Calendar.styles";
import * as styles from "./QueryResultEventDisplay.styles";

export const DateLink = ({ date, href }: { date: string; href: string }) => {
  const formattedMonthAndDay = format(new Date(date), "MMM do");
  const formattedYear = format(new Date(date), ", yyyy");
  return (
    <span style={styles.dateLinkWrapper}>
      <Typography component="a" sx={linkStyle} href={href}>
        {formattedMonthAndDay}
      </Typography>
      <span>{formattedYear}</span>
    </span>
  );
};
