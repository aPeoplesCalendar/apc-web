import {
  Box,
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
import { TagsSelect } from "./TagsSelect";
import * as styles from "./SearchUI.styles";
import { ResponsiveInputsContainer } from "./ResponsiveInputsContainer";

export const SearchUI = () => {
  const { search } = useLocation();
  // get query params from url
  const { queryInclude, queryExclude, startDate, endDate, sortBy, tags } =
    getAndFormatQueryParams(search);

  const [includedKeywords, setIncludedKeywords] =
    useState<string[]>(queryInclude);
  const [excludedKeywords, setExcludedKeywords] =
    useState<string[]>(queryExclude);
  const [newStartDate, setNewStartDate] = useState<string>(startDate);
  const [newEndDate, setNewEndDate] = useState<string>(endDate);
  const [selectedTags, setSelectedTags] = useState<string[]>(tags);

  const navigate = useNavigate();

  const handleIncludeSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const termArr = e.target.value ? e.target.value.split(", ") : [];
    setIncludedKeywords(termArr);
  };

  const handleExcludeSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const termArr = e.target.value ? e.target.value.split(", ") : [];
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
      selectedTags,
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
      selectedTags,
      newSortBy,
    });
    navigate({ pathname: ROUTES.CALENDAR_SEARCH, search: queryString });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={styles.searchUIContainer}>
      <ResponsiveInputsContainer>
        <TextField
          label="Included Keywords"
          placeholder="First, Second, Third..."
          onChange={handleIncludeSearchTermChange}
          value={includedKeywords.join(", ")}
          onKeyUp={handleKeyPress}
        />
        <TextField
          label="Excluded Keywords"
          placeholder="First, Second, Third..."
          onChange={handleExcludeSearchTermChange}
          value={excludedKeywords.join(", ")}
          onKeyUp={handleKeyPress}
        />
        <TextField
          type="date"
          onChange={handleStartDateChange}
          value={newStartDate}
          onKeyUp={handleKeyPress}
          label="After This Date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          onChange={handleEndDateChange}
          value={newEndDate}
          onKeyUp={handleKeyPress}
          label="Before This Date"
          InputLabelProps={{ shrink: true }}
        />
        <TagsSelect
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </ResponsiveInputsContainer>
      <Box sx={styles.searchActionsContainer}>
        <Button
          onClick={handleSearch}
          variant="contained"
          sx={styles.searchButton}
        >
          Search
        </Button>
        <Box sx={styles.sortByWrapper}>
          <FormControl fullWidth>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              value={sortBy}
              label="Age"
              onChange={handleSortByChange}
              variant="outlined"
            >
              {[...SortByMetaData.keys()].map((key) => (
                <MenuItem key={key} value={key}>
                  {SortByMetaData.get(key)?.displayText}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
