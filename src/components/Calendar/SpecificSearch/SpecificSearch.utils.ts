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
  const queryInclude = new URLSearchParams(search).get("queryInclude")
    ? new URLSearchParams(search).get("queryInclude")?.split(" ")
    : undefined;
  const queryExclude = new URLSearchParams(search).get("queryExclude")
    ? new URLSearchParams(search).get("queryExclude")?.split(" ")
    : undefined;
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
  includedKeywords: string[] | undefined;
  excludedKeywords: string[] | undefined;
  newStartDate: string | null;
  newEndDate: string | null;
  newSortBy: PossibleSortByModes;
}

export const formatQueryString = ({
  includedKeywords = [],
  excludedKeywords = [],
  newStartDate,
  newEndDate,
  newSortBy,
}: IFormatQueryStringProps) => {
  const queryString = `?queryInclude=${includedKeywords.join(
    "+"
  )}&queryExclude=${excludedKeywords.join(
    "+"
  )}&startDate=${newStartDate}&endDate=${newEndDate}&sortBy=${newSortBy}`;
  return queryString;
};

export const generateTextSearchQueryString = ({
  included,
  excluded,
}: {
  included: string[] | undefined;
  excluded: string[] | undefined;
}) => {
  const includedKeywordsQueryString = `${
    included ? included.map((term) => `'${term}'`).join(" & ") : ""
  }`;
  const excludedKeywordsQueryString = `${
    excluded ? excluded.map((term) => `!'${term}'`).join(" & ") : ""
  }`;
  if (!included && !excluded) {
    return "";
  }
  if (!excluded && includedKeywordsQueryString) {
    return includedKeywordsQueryString;
  }
  if (!included && excludedKeywordsQueryString) {
    return excludedKeywordsQueryString;
  }
  return `${includedKeywordsQueryString} & ${excludedKeywordsQueryString}`;
};
