import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
  formatDateQueryParam,
  formatRawDatePickerValue,
} from "../../Calendar.utils";
import { StyledTextField } from "../../StyledTextField/StyledTextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { SpecificWeek } from "../SpecificWeek/SpecificWeek";
import * as styles from "./SimpleSearch.styles";
import { SpecificDay } from "../SpecificDay/SpecificDay";
import { SpecificMonth } from "../SpecificMonth/SpecificMonth";
import { ResponsiveActionsContainer } from "./ResponsiveActionsContainer";

// to dos
// add suggest an event page?? - what do the RLS policies look like?
// finalize color scheme
// write the meta stuff - about page, contact page, homepage, readme
// website meta stuff - icons, meta tags, lock down github repo
// deploy via netlify
// update apc-form to work with new stuff

export const SimpleSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const day = new URLSearchParams(searchParams).get("day") ?? "1";
  const month = new URLSearchParams(searchParams).get("month") ?? "1";
  const viewMode = new URLSearchParams(searchParams).get("view") ?? "day";

  const handleNewDate = (e: ChangeEvent<HTMLInputElement>): void => {
    // if the user did something weird and the given date is falsy, don't run anything
    if (!e.target.value) {
      return;
    }
    const { month, day } = formatRawDatePickerValue(e.target.value);
    setSearchParams(`?${new URLSearchParams({ day, month, view: viewMode })}`);
  };

  const handleViewModeChange = (
    _: unknown,
    value: "day" | "week" | "month"
  ) => {
    setSearchParams(`?${new URLSearchParams({ day, month, view: value })}`);
  };

  return (
    <div>
      <Typography sx={styles.calendarPageHeader} variant="h5">
        Calendar
      </Typography>
      <ResponsiveActionsContainer>
        <StyledTextField
          type="date"
          defaultValue={formatDateQueryParam(month, day)}
          onChange={handleNewDate}
        />
        <Box sx={styles.tabsContainer}>
          <Tabs value={viewMode} onChange={handleViewModeChange}>
            <Tab label="Day" value="day" />
            <Tab label="Week" value="week" />
            <Tab label="Month" value="month" />
          </Tabs>
        </Box>
      </ResponsiveActionsContainer>
      {viewMode === "day" && <SpecificDay month={month} day={day} />}
      {viewMode === "week" && <SpecificWeek month={month} day={day} />}
      {viewMode === "month" && <SpecificMonth month={month} />}
    </div>
  );
};