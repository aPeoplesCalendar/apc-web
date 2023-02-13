import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import * as styles from "./SimpleSearch.styles";

export const ResponsiveActionsContainer = ({
  children,
}: PropsWithChildren<{}>) => {
  const theme = useTheme();
  const aboveSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  if (aboveSmallScreen) {
    return <Box sx={styles.calendarActionsBig}>{children}</Box>;
  }
  return <Box sx={styles.calendarActionsSmall}>{children}</Box>;
};
