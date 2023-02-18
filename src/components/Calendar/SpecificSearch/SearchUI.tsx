import { Box, MenuItem, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { StyledTextField } from "../StyledTextField/StyledTextField";

export const SearchUI = ({
  setLoading,
}: {
  setLoading: (newLoading: boolean) => void;
}) => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
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

  // when url params update and component doesn't remount, update controlled inputs with fresh params
  useEffect(() => {
    const { queryInclude, queryExclude, startDate, endDate, tags } =
      getAndFormatQueryParams(search);
    setIncludedKeywords(queryInclude);
    setExcludedKeywords(queryExclude);
    setNewStartDate(startDate);
    setNewEndDate(endDate);
    setSelectedTags(tags);
  }, [search]);

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
    setLoading(true);
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

  const handleSortByChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleKeyPress = (e: { key: string }) => {
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
        <StyledTextField
          type="date"
          onChange={handleStartDateChange}
          value={newStartDate}
          onKeyUp={handleKeyPress}
          label="After This Date"
          InputLabelProps={{ shrink: true }}
        />
        <StyledTextField
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
          <TextField
            select
            value={sortBy}
            onChange={handleSortByChange}
            variant="outlined"
            label="Sort By"
            InputLabelProps={{ shrink: true }}
          >
            {[...SortByMetaData.keys()].map((key) => (
              <MenuItem key={key} value={key}>
                {SortByMetaData.get(key)?.displayText}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </Box>
  );
};
