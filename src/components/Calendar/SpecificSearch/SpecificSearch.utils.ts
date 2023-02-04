import { supabase } from "../../../supabaseClient";
import { DatabaseEvent } from "../../../types/types";
import { PossibleSortByModes, SortByMetaData } from "./constants";

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

export const fetchEvents = async ({ search }: { search: string }) => {
  const tableName = "events_test_duplicate";
  // get raw query param values
  const { queryInclude, queryExclude, startDate, endDate, sortBy } =
    getAndFormatQueryParams(search);
  // generate text search query string
  const fullTextQuery = generateTextSearchQueryString({
    included: queryInclude,
    excluded: queryExclude,
  });
  // default start and end dates
  const queryStartDate = startDate === "null" ? "0001-01-01" : startDate;
  const queryEndDate = endDate === "null" ? getTodayFormatted() : endDate;
  // get sort by query args
  const { column, ascending } = SortByMetaData.get(sortBy) as {
    column: string;
    ascending: boolean;
  };
  // finally do the query
  if (fullTextQuery) {
    const { data: events = [], ...rest } = await supabase
      .from(tableName)
      .select<"*", DatabaseEvent>()
      .lt("date", queryEndDate)
      .gt("date", queryStartDate)
      .textSearch("description", fullTextQuery)
      .order(column, { ascending })
      .range(0, 20);
    return { events, ...rest };
  } else {
    // unforutunately, could not figure out a way to dynamically method chain
    // and .textSearch will bork if it's an empty string - so we exclude it from the query chain in this case
    const { data: events = [], ...rest } = await supabase
      .from(tableName)
      .select<"*", DatabaseEvent>()
      .lt("date", queryEndDate)
      .gt("date", queryStartDate)
      .order(column, { ascending })
      .range(0, 20);
    return { events, ...rest };
  }
};
