import { PossibleSortByModes } from "./constants";

export const getTodayFormatted = () => {
  const date = new Date();
  let day = date.getDate().toString();
  day = day.length === 2 ? day : `0${day}`;
  let month = (date.getMonth() + 1).toString();
  month = month.length === 2 ? month : `0${month}`;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const getAndFormatQueryParams = (search: string) => {
  const queryInclude = (
    new URLSearchParams(search).get("queryInclude") ?? ""
  ).split(" ");
  const queryExclude = (
    new URLSearchParams(search).get("queryExclude") ?? ""
  ).split(" ");
  const startDate = new URLSearchParams(search).get("startDate");
  const endDate = new URLSearchParams(search).get("endDate");
  const caseSensitive = Boolean(
    new URLSearchParams(search).get("caseSensitive")
  );
  const sortBy =
    (new URLSearchParams(search).get("sortBy") as PossibleSortByModes | null) ??
    "alphabetical-ascending";
  return {
    queryInclude,
    queryExclude,
    startDate,
    endDate,
    caseSensitive,
    sortBy,
  };
};

export interface IFormatQueryStringProps {
  includedKeywords: string[];
  excludedKeywords: string[];
  newStartDate: string | null;
  newEndDate: string | null;
  newCaseSensitive: boolean;
  newSortBy: PossibleSortByModes;
}

export const formatQueryString = ({
  includedKeywords,
  excludedKeywords,
  newStartDate,
  newEndDate,
  newCaseSensitive,
  newSortBy,
}: IFormatQueryStringProps) => {
  const queryString = `?queryInclude=${includedKeywords.join(
    "+"
  )}&queryExclude=${excludedKeywords.join(
    "+"
  )}&startDate=${newStartDate}&endDate=${newEndDate}&caseSensitive=${newCaseSensitive}&sortBy=${newSortBy}`;
  return queryString;
};
