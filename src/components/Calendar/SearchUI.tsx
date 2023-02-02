import { Checkbox, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Button from "@mui/material/Button";

// handle the following search parameters
// array of include keywords
// array of exclude keywords
// case sensitive checkbox
// start date
// end date
// always render in complex mode (sheesh)

export const SearchUI = () => {
  const { search } = useLocation();
  // populate inputs with correct default values to enable deep linking
  const queryIncludeArr = (
    new URLSearchParams(search).get("queryInclude") ?? ""
  ).split(" ");
  const queryExcludeArr = (
    new URLSearchParams(search).get("queryExclude") ?? ""
  ).split(" ");
  const defaultStartDate = new URLSearchParams(search).get("startDate");
  const defaultEndDate = new URLSearchParams(search).get("endDate");
  const defaultCaseSensitive = Boolean(
    new URLSearchParams(search).get("caseSensitive")
  );

  const [includedKeywords, setIncludedKeywords] =
    useState<string[]>(queryIncludeArr);
  const [excludedKeywords, setExcludedKeywords] =
    useState<string[]>(queryExcludeArr);
  const [caseSensitive, setCaseSensitive] = useState(defaultCaseSensitive);
  const [startDate, setStartDate] = useState<string | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<string | null>(defaultEndDate);

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
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSearch = () => {
    const queryString = `?queryInclude=${includedKeywords.join(
      "+"
    )}&queryExclude=${excludedKeywords.join(
      "+"
    )}&startDate=${startDate}&endDate=${endDate}&caseSensitive=${caseSensitive}`;
    navigate({ pathname: ROUTES.CALENDAR_SEARCH, search: queryString });
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div>
        <TextField
          placeholder="Include keywords"
          onChange={handleIncludeSearchTermChange}
          defaultValue={queryIncludeArr.join(", ")}
        />
        <TextField
          placeholder="Exclude keywords"
          onChange={handleExcludeSearchTermChange}
          defaultValue={queryExcludeArr.join(", ")}
        />
        <FormControlLabel
          control={<Checkbox checked={caseSensitive} />}
          label="Case Sensitive"
          onChange={() => setCaseSensitive(!caseSensitive)}
        />
        <TextField
          type="date"
          onChange={handleStartDateChange}
          value={startDate}
        />
        <TextField type="date" onChange={handleEndDateChange} value={endDate} />
      </div>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};
