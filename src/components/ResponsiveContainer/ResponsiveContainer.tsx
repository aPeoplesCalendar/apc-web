import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

/**
 * a simple container that will render children in rows on larger than medium screens, columns below
 */
export const ResponsiveContainer = ({ children }: PropsWithChildren<{}>) => {
  const theme = useTheme();
  const notMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const flexDirection = notMediumScreen ? "row" : "column";

  return (
    <Box sx={{ display: "flex", flexDirection, gap: "15px" }}>{children}</Box>
  );
};
