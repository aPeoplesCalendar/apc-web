import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export const ResponsiveAppContainer = ({ children }: PropsWithChildren<{}>) => {
  const theme = useTheme();
  const aboveLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const aboveMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const aboveSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  if (aboveLargeScreen) {
    return (
      <Box sx={{ width: "63%", margin: "auto", paddingBottom: "25px" }}>
        {children}
      </Box>
    );
  }
  if (aboveMediumScreen) {
    return (
      <Box sx={{ width: "70%", margin: "auto", paddingBottom: "25px" }}>
        {children}
      </Box>
    );
  }
  if (aboveSmallScreen) {
    return (
      <Box sx={{ width: "80%", margin: "auto", paddingBottom: "25px" }}>
        {children}
      </Box>
    );
  }
  return (
    <Box sx={{ width: "90%", margin: "auto", paddingBottom: "25px" }}>
      {children}
    </Box>
  );
};
