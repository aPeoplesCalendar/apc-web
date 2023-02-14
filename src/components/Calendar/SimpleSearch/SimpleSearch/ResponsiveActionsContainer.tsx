import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import * as styles from "./SimpleSearch.styles";

export const ResponsiveActionsContainer = ({
  children,
}: PropsWithChildren<{}>) => {
  const theme = useTheme();
  const aboveMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  if (aboveMediumScreen) {
    return <Box sx={styles.calendarActionsBig}>{children}</Box>;
  }
  return <Box sx={styles.calendarActionsSmall}>{children}</Box>;
};
