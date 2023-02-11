import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export const ResponsiveAppContainer = ({ children }: PropsWithChildren<{}>) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("sm"));
  if (isLargeScreen) {
    return (
      <Box sx={{ width: "55%", margin: "auto", paddingBottom: "25px" }}>
        {children}
      </Box>
    );
  }
  if (isMediumScreen) {
    return (
      <Box sx={{ width: "75%", margin: "auto", paddingBottom: "25px" }}>
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
