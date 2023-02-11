import { ReactNode } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export const ResponsiveInputsContainer = ({
  children,
}: {
  children: ReactNode[];
}) => {
  const theme = useTheme();
  const aboveMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  if (aboveMediumScreen) {
    const firstColumn = children.slice(0, 2);
    const secondColumn = children.slice(2, 4);
    const secondRow = children.slice(4);
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr auto",
          columnGap: "15px",
          rowGap: "15px",
          marginBottom: "15px",
        }}
      >
        <Box
          sx={{
            gridRow: "1",
            gridColumn: "1",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {firstColumn}
        </Box>
        <Box
          sx={{
            gridRow: "1",
            gridColumn: "2",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {secondColumn}
        </Box>
        <Box sx={{ gridRow: "2", gridColumn: "1 / 3" }}>{secondRow}</Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginBottom: "15px",
      }}
    >
      {children}
    </Box>
  );
};
