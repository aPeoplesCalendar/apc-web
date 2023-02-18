import {
  formatQueryString,
  generateTextSearchQueryString,
  IFormatQueryStringProps,
} from "./SpecificSearch.utils";

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
});
