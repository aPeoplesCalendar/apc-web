import { Button, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import {
  formatDateQueryParam,
  formatRawDatePickerValue,
} from "./Calendar.utils";

export const CalendarParams = () => {
  const { search } = useLocation();
  const day = new URLSearchParams(search).get("day") ?? "";

  const navigate = useNavigate();

  const handleNewDate = (e: ChangeEvent<HTMLInputElement>): void => {
    // if the user did something weird and the given date is falsy, don't run anything
    if (!e.target.value) {
      return;
    }
    const formattedDateString = formatRawDatePickerValue(e.target.value);
    navigate({
      pathname: ROUTES.CALENDAR_DAY,
      search: `?day=${formattedDateString}`,
    });
  };

  const navigateToSearch = () => {
    navigate({
      pathname: ROUTES.CALENDAR_SEARCH,
    });
  };

  return (
    <div>
      <TextField
        type="date"
        defaultValue={formatDateQueryParam(day)}
        onChange={handleNewDate}
      />
      <Button onClick={navigateToSearch}>Advanced Search</Button>
    </div>
  );
};
