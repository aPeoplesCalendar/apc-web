import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { SpecificEvent } from "../SpecificEvent/SpecificEvent";
import { formatDateQueryParam } from "./Calendar.utils";
import { SpecificDay } from "./SpecificDay/SpecificDay";
import { SpecificSearch } from "./SpecificSearch/SpecificSearch";

export const Calendar = () => {
  const { search } = useLocation();
  const day = new URLSearchParams(search).get("day") ?? "";
  const navigate = useNavigate();

  const [displayedDateInput, setDisplayedDateInput] = useState(
    formatDateQueryParam(day)
  );
  const [searchValue, setSearchValue] = useState("");

  const handleNewDate = (e: any): void => {
    // if the user did something weird and the given date is falsy, don't run anything
    if (!e.target.value) {
      return;
    }
    setSearchValue("");
    setDisplayedDateInput(e.target.value);
    // else, split the date string up into an array by dash character
    let newDateString = e.target.value.split("-");
    // remove any zero padding from day and month
    if (newDateString[1][0] === "0") {
      newDateString[1] = newDateString[1].slice(1);
    }
    if (newDateString[2][0] === "0") {
      newDateString[2] = newDateString[2].slice(1);
    }
    // create the lookup key to use with eventLibrary
    newDateString = [newDateString[1], newDateString[2]].join("-");
    navigate({
      pathname: ROUTES.CALENDAR_DAY,
      search: `?day=${newDateString}`,
    });
  };

  const trackSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    console.log("handleSearch running...");
    setDisplayedDateInput("");
    console.log("search", search);
    const oldSearchTerm = new URLSearchParams(search).get("query");
    console.log("oldSearchTerm", oldSearchTerm);
    if (oldSearchTerm !== searchValue) {
      navigate({
        pathname: ROUTES.CALENDAR_SEARCH,
        search: `?query=${searchValue}`,
      });
    }
  };

  return (
    <div>
      <div>
        <TextField
          placeholder="Search..."
          onChange={trackSearch}
          value={searchValue}
          InputProps={{
            endAdornment: (
              <Button type="submit" onClick={handleSearch}>
                <Typography>Search icon</Typography>
              </Button>
            ),
          }}
        />
        <TextField
          type="date"
          value={displayedDateInput}
          onChange={handleNewDate}
        />
      </div>
      <Routes>
        <Route path={ROUTES.CALENDAR_DAY} element={<SpecificDay />} />
        <Route path={ROUTES.CALENDAR_SEARCH} element={<SpecificSearch />} />
        <Route path={ROUTES.SPECIFIC_EVENT} element={<SpecificEvent />} />
      </Routes>
    </div>
  );
};
