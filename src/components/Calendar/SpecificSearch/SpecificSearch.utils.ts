import { PostgrestError } from "@supabase/supabase-js";
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

export const getAndFormatQueryParams = (search: URLSearchParams) => {
  const queryInclude = search.getAll("queryInclude");
  const queryExclude = search.getAll("queryExclude");
  const startDate = search.get("startDate") ?? "";
  const endDate = search.get("endDate") ?? "";
  const tags = search.getAll("tag");
  const sortBy =
    (search.get("sortBy") as PossibleSortByModes | null) ??
    "alphabetical-ascending";
  return {
    queryInclude,
    queryExclude,
    startDate,
    endDate,
    tags,
    sortBy,
  };
};

export interface IFormatQueryStringProps {
  includedKeywords: string[] | undefined;
  excludedKeywords: string[] | undefined;
  newStartDate: string | null;
  newEndDate: string | null;
  selectedTags: string[];
  newSortBy: PossibleSortByModes;
}

export const formatQueryString = ({
  includedKeywords = [],
  excludedKeywords = [],
  newStartDate,
  newEndDate,
  newSortBy,
  selectedTags = [],
}: IFormatQueryStringProps) => {
  const tags = selectedTags.map((tag) => `tag=${tag}`).join("&");
  const queryInclude = includedKeywords
    .map((includedKeyword) => `queryInclude=${includedKeyword}`)
    .join("&");
  const queryExclude = excludedKeywords
    .map((excludedKeyword) => `queryExclude=${excludedKeyword}`)
    .join("&");
  const startDateString = newStartDate ? `startDate=${newStartDate}` : "";
  const endDateString = newEndDate ? `endDate=${newEndDate}` : "";
  const sortByString = `sortBy=${newSortBy}`;
  const formattedQueryParams = [
    queryInclude,
    queryExclude,
    startDateString,
    endDateString,
    tags,
    sortByString,
  ]
    .filter((param) => !!param)
    .join("&");
  return `?${formattedQueryParams}`;
};

export const generateTextSearchQueryString = ({
  included,
  excluded,
}: {
  included: string[];
  excluded: string[];
}) => {
  if (!included.length && !excluded.length) {
    return "";
  }
  const includedKeywordsQueryString = included
    .map((term) => `'${term}'`)
    .join(" & ");
  const excludedKeywordsQueryString = excluded
    .map((term) => `!'${term}'`)
    .join(" & ");
  if (!excluded.length) {
    return includedKeywordsQueryString;
  }
  if (!included.length) {
    return excludedKeywordsQueryString;
  }
  return `${includedKeywordsQueryString} & ${excludedKeywordsQueryString}`;
};

type FetchEventsReturnType = (
  | {
      error: PostgrestError;
      count: null;
      status: number;
      statusText: string;
    }
  | {
      error: null;
      count: number | null;
      status: number;
      statusText: string;
    }
) & { hasNextPage: boolean; events: DatabaseEvent[] };

export const fetchEvents = async ({
  currentCursor,
  pageSize,
  queryParams,
}: {
  currentCursor: number;
  pageSize: number;
  queryParams: URLSearchParams;
}): Promise<FetchEventsReturnType> => {
  // get raw query param values
  const {
    queryInclude,
    queryExclude,
    startDate,
    endDate,
    tags = [],
    sortBy,
  } = getAndFormatQueryParams(queryParams);
  // generate text search query string
  const fullTextQuery = generateTextSearchQueryString({
    included: queryInclude,
    excluded: queryExclude,
  });
  // get sort by query args
  const { column, ascending } = SortByMetaData.get(sortBy) as {
    column: string;
    ascending: boolean;
  };

  let query = supabase.from(
    process.env.REACT_APP_SUPABASE_EVENT_TABLE_NAME as string
  ).select<any, DatabaseEvent>(`id, title,
  date,
  day,
  month,
  otd,
  imgSrc,
  imgAltText,
  tags`);
  // conditional query filters
  if (endDate) {
    query = query.lt("date", endDate);
  }
  if (startDate) {
    query = query.gt("date", startDate);
  }
  if (!!tags.length) {
    query = query.contains("tags", tags);
  }
  if (fullTextQuery) {
    query = query.textSearch("description", fullTextQuery);
  }
  query = query
    .order(column, { ascending })
    .range(currentCursor, currentCursor + pageSize - 1);
  const result = await query;
  const events = result?.data ?? [];
  const hasNextPage = events.length === pageSize;
  return { ...result, events, hasNextPage };
};
