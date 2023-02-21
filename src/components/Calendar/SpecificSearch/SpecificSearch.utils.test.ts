import {
  formatQueryString,
  generateTextSearchQueryString,
  IFormatQueryStringProps,
  fetchEvents,
} from "./SpecificSearch.utils";

// ideally, we would move this to spyOn to be able to provide different data mocks
// but spyOn doesn't seem to work as expected here
jest.mock("@supabase/supabase-js", () => {
  const { createMockSupabaseClient } = require("../../../utils/testing.utils");
  return {
    ...jest.requireActual("@supabase/supabase-js"),
    createClient: jest.fn().mockImplementation(() =>
      // the only aspect of the data mock that matters in this test is the length of results relative to page size
      createMockSupabaseClient([{ id: "1" }, { id: "2" }])
    ),
  };
});

describe("specific search util functions", () => {
  describe("formatQueryString", () => {
    it("converts all parameters into a query string", () => {
      const props: IFormatQueryStringProps = {
        includedKeywords: ["included1", "included2"],
        excludedKeywords: ["excluded"],
        newStartDate: "start",
        newEndDate: "end",
        newSortBy: "alphabetical-ascending",
        selectedTags: ["tag1", "tag2"],
      };
      const result = formatQueryString(props);
      expect(result).toEqual(
        `?queryInclude=included1&queryInclude=included2&queryExclude=excluded&startDate=start&endDate=end&tag=tag1&tag=tag2&sortBy=alphabetical-ascending`
      );
    });
    it("ignores undefined parameters", () => {
      const props: IFormatQueryStringProps = {
        includedKeywords: undefined,
        excludedKeywords: undefined,
        newStartDate: null,
        newEndDate: null,
        newSortBy: "alphabetical-ascending",
        selectedTags: undefined,
      };
      const result = formatQueryString(props);
      expect(result).toEqual(`?sortBy=alphabetical-ascending`);
    });
  });
  describe("generateTextSearchQueryString", () => {
    it("returns an empty string if both keyword arrays are empty", () => {
      const result = generateTextSearchQueryString({
        included: [],
        excluded: [],
      });
      expect(result).toEqual("");
    });
    it("returns an included query string if excluded keyword array is empty", () => {
      const result = generateTextSearchQueryString({
        included: ["include", "me"],
        excluded: [],
      });
      expect(result).toEqual("'include' & 'me'");
    });
    it("returns an excluded query string if included keyword array is empty", () => {
      const result = generateTextSearchQueryString({
        included: [],
        excluded: ["exclude", "me"],
      });
      expect(result).toEqual("!'exclude' & !'me'");
    });
    it("returns a query string for both if both arrays are not empty", () => {
      const result = generateTextSearchQueryString({
        included: ["include", "me"],
        excluded: ["exclude", "me"],
      });
      expect(result).toEqual("'include' & 'me' & !'exclude' & !'me'");
    });
  });
  describe("fetchEvents", () => {
    const defaultProps = {
      currentCursor: 0,
      pageSize: 2,
      queryParams: new URLSearchParams(
        // query string with all fields incldued
        `?queryInclude=included1&queryInclude=included2&queryExclude=excluded&startDate=1999/01/01&endDate=2000/01/01&tag=Anarchism&tag=Abolitionism&sortBy=alphabetical-ascending`
      ),
    };
    it("should call supabase filters with derived query string values", async () => {
      // @ts-ignore-next-line
      const { trackedArgs } = await fetchEvents(defaultProps);
      expect(trackedArgs).toEqual([
        ["date", "2000/01/01"],
        ["date", "1999/01/01"],
        ["tags", ["Anarchism", "Abolitionism"]],
        ["description", "'included1' & 'included2' & !'excluded'"],
        ["title", { ascending: true }],
        // calls range filter with currentCursor and page size - 1
        [0, 1],
      ]);
    });
    it("should still call order and range with an empty query string", async () => {
      // @ts-ignore-next-line
      const { trackedArgs } = await fetchEvents({
        ...defaultProps,
        // use empty query string
        queryParams: new URLSearchParams(),
      });
      expect(trackedArgs).toEqual([
        ["title", { ascending: true }],
        [0, 1],
      ]);
    });
    it("should evaluate has next page to true when page size matches data length", async () => {
      const { hasNextPage } = await fetchEvents(defaultProps);
      // passed page size from defaultProps matches data mock length
      expect(hasNextPage).toBe(true);
    });
    it("should evaluate has next page to false when page size is more than data length", async () => {
      const { hasNextPage } = await fetchEvents({
        ...defaultProps,
        pageSize: 3,
      });
      // passed page size is one greater than data mock length
      expect(hasNextPage).toBe(false);
    });
  });
});
