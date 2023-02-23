import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import { DayColumn } from "./DayColumn";
import { generateListOfDays } from "./SpecificWeek.utils";
import * as styles from "./SpecificWeek.styles";

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
          ? styles.weekContainerDesktop
          : styles.weekContainerMobile
      }
    >
      {daysOfTheWeek.map((day) => (
        <DayColumn day={day} key={day.toUTCString()} />
      ))}
    </Box>
  );
};
