import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import Button from "@mui/material/Button";
import { PossibleSortByModes, SortByMetaData } from "./constants";
import {
  formatQueryString,
  getAndFormatQueryParams,
} from "./SpecificSearch.utils";

export const SearchUI = () => {
  const { search } = useLocation();
  // get query params from url
  const { queryInclude, queryExclude, startDate, endDate, sortBy } =
    getAndFormatQueryParams(search);

  const [includedKeywords, setIncludedKeywords] = useState<
    string[] | undefined
  >(queryInclude);
  const [excludedKeywords, setExcludedKeywords] = useState<
    string[] | undefined
  >(queryExclude);
  const [newStartDate, setNewStartDate] = useState<string | null>(startDate);
  const [newEndDate, setNewEndDate] = useState<string | null>(endDate);

  const navigate = useNavigate();

  const handleIncludeSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const termArr = e.target.value.split(", ");
    setIncludedKeywords(termArr);
  };

  const handleExcludeSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const termArr = e.target.value.split(", ");
    setExcludedKeywords(termArr);
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEndDate(e.target.value);
  };

  const handleSearch = () => {
    const queryString = formatQueryString({
      includedKeywords,
      excludedKeywords,
      newStartDate,
      newEndDate,
      newSortBy: sortBy,
    });
    navigate({ pathname: ROUTES.CALENDAR_SEARCH, search: queryString });
  };

  const handleSortByChange = (e: SelectChangeEvent) => {
    const newSortBy = e.target.value as PossibleSortByModes;
    const queryString = formatQueryString({
      includedKeywords,
      excludedKeywords,
      newStartDate,
      newEndDate,
      newSortBy,
    });
    navigate({ pathname: ROUTES.CALENDAR_SEARCH, search: queryString });
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField
          placeholder="Include keywords"
          onChange={handleIncludeSearchTermChange}
          defaultValue={includedKeywords?.join(", ")}
        />
        <TextField
          placeholder="Exclude keywords"
          onChange={handleExcludeSearchTermChange}
          defaultValue={excludedKeywords?.join(", ")}
        />
        <TextField
          type="date"
          onChange={handleStartDateChange}
          value={newStartDate}
        />
        <TextField
          type="date"
          onChange={handleEndDateChange}
          value={newEndDate}
        />
      </div>
      <Button onClick={handleSearch} variant="contained">
        Search
      </Button>
      <FormControl fullWidth>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={sortBy}
          label="Age"
          onChange={handleSortByChange}
        >
          {[...SortByMetaData.keys()].map((key) => (
            <MenuItem key={key} value={key}>
              {SortByMetaData.get(key)?.displayText}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
