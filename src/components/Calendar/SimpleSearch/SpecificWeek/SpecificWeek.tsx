import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DayColumn } from "./DayColumn";
import { generateListOfDays } from "./SpecificWeek.utils";

export interface ISpecificWeekProps {
  month: string;
  day: string;
}

export const SpecificWeek = ({ month, day }: ISpecificWeekProps) => {
  const theme = useTheme();
  const aboveSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const daysOfTheWeek = generateListOfDays(month, day);
  return (
    <Box
      sx={
        aboveSmallScreen
          ? {
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0px, 1fr))",
              border: "1px solid white",
              borderLeft: "none",
            }
          : {
              display: "flex",
              flexDirection: "column",
              border: "1px solid white",
              borderLeft: "none",
              borderTop: "none",
            }
      }
    >
      {daysOfTheWeek.map((day) => (
        <DayColumn day={day} key={day.toUTCString()} />
      ))}
    </Box>
  );
};
