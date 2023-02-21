import {
  calculateDayLabels,
  fetchEvents,
  generateListOfDays,
} from "./SpecificWeek.utils";

// ideally, we would move this to spyOn to be able to provide different data mocks
// but spyOn doesn't seem to work as expected here
jest.mock("@supabase/supabase-js", () => {
  const {
    createMockSupabaseClient,
  } = require("../../../../utils/testing.utils");
  return {
    ...jest.requireActual("@supabase/supabase-js"),
    createClient: jest
      .fn()
      .mockImplementation(() => createMockSupabaseClient()),
  };
});

describe("specific week util functions", () => {
  describe("calculateDayLabels", () => {
    it("returns a list of seven strings", () => {
      const testMonth = "5";
      const testDay = "1";
      const result = calculateDayLabels(testMonth, testDay);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
        ])
      );
    });
  });
  describe("generateListOfDays", () => {
    it("returns a list of seven dates", () => {
      const testMonth = "10";
      const testDay = "15";
      const result = generateListOfDays(testMonth, testDay);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
        ])
      );
    });
  });
  describe("fetchEvents", () => {
    it("should return an array when query data is undefined", async () => {
      // query data is undefined because we didn't provide any mocked data above
      const testMonth = "10";
      const testDay = "15";
      const result = await fetchEvents(testMonth, testDay);
      expect(result).toEqual([]);
    });
  });
});
