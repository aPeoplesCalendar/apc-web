import { fetchEvent, fetchPublicImgUrl } from "./SpecificEvent.utils";

// ideally, we would move this to spyOn to be able to provide different data mocks
// but spyOn doesn't seem to work as expected here
jest.mock("@supabase/supabase-js", () => {
  const { createMockSupabaseClient } = require("../../../utils/testing.utils");
  return {
    ...jest.requireActual("@supabase/supabase-js"),
    createClient: jest.fn().mockImplementation(() =>
      // the only aspect of the data mock that matters in this test is the length of results relative to page size
      createMockSupabaseClient([])
    ),
  };
});

describe("specific event util functions", () => {
  describe("fetchEvent", () => {
    it("should return null when query data is undefined", async () => {
      // query data is undefined because we didn't provide any mocked data above
      const result = await fetchEvent("someSlugTitle");
      expect(result).toEqual(null);
    });
  });
  describe("fetchPublicImgUrl", () => {
    it("should return an empty string if no storage reference string is provided", async () => {
      // query data is undefined because we didn't provide any mocked data above
      const result = await fetchPublicImgUrl("");
      expect(result).toEqual("");
    });
    it("should return some string if one is returned by the api", async () => {
      // query data is undefined because we didn't provide any mocked data above
      const result = await fetchPublicImgUrl("some-storage-ref");
      expect(result).toEqual(expect.any(String));
    });
  });
});
