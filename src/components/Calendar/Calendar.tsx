import { TextField } from "@mui/material";
import debounce from "lodash/debounce";
import { ChangeEvent } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { SpecificEvent } from "../SpecificEvent/SpecificEvent";
import {
  formatDateQueryParam,
  formatRawDatePickerValue,
} from "./Calendar.utils";
import { SpecificDay } from "./SpecificDay/SpecificDay";
import { SpecificSearch } from "./SpecificSearch/SpecificSearch";

export const Calendar = () => {
  const { search } = useLocation();
  const day = new URLSearchParams(search).get("day") ?? "";
  const queryString = new URLSearchParams(search).get("query") ?? "";

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

  const handleSearchTermChange = debounce(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = e.target.value;
      if (queryString !== newSearchTerm) {
        navigate({
          pathname: ROUTES.CALENDAR_SEARCH,
          search: `?query=${newSearchTerm}`,
        });
      }
    },
    400
  );

  return (
    <div>
      <div>
        <TextField
          placeholder="Search..."
          onChange={handleSearchTermChange}
          defaultValue={queryString}
        />
        <TextField
          type="date"
          defaultValue={formatDateQueryParam(day)}
          onChange={handleNewDate}
        />
      </div>
      <Routes>
        <Route
          path={ROUTES.SUB_CALENDAR_ROUTES.CALENDAR_DAY}
          element={<SpecificDay />}
        />
        <Route
          path={ROUTES.SUB_CALENDAR_ROUTES.CALENDAR_SEARCH}
          element={<SpecificSearch />}
        />
        <Route
          path={ROUTES.SUB_CALENDAR_ROUTES.SPECIFIC_EVENT}
          element={<SpecificEvent />}
        />
      </Routes>
    </div>
  );
};
