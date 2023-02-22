import { fetchEventOfTheDay } from "./Homepage.utils";

// ideally, we would move this to spyOn to be able to provide different data mocks
// but spyOn doesn't seem to work as expected here
jest.mock("@supabase/supabase-js", () => {
  const { createMockSupabaseClient } = require("../../utils/testing.utils");
  return {
    ...jest.requireActual("@supabase/supabase-js"),
    createClient: jest
      .fn()
      .mockImplementation(() =>
        createMockSupabaseClient([
          { description: "short" },
          { description: "very long description" },
          { description: "medium description" },
        ])
      ),
  };
});

describe("fetchEventOfTheDay", () => {
  it("should return event with longest description as event otd", async () => {
    const testMonth = "10";
    const testDay = "15";
    const result = await fetchEventOfTheDay(testMonth, testDay);
    expect(result).toEqual({ description: "very long description" });
  });
});
