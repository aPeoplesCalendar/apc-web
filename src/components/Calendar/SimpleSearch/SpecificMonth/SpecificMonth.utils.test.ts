import { generateListOfWeekDayStarts } from "./SpecificMonth.utils";

describe("specific month util functions", () => {
  describe("generateListOfWeekDayStarts", () => {
    it("returns an array of month and day objects", () => {
      const result = generateListOfWeekDayStarts("1");
      // expect array of at least 4 weeks with the month string 1, any day string
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ month: "1", day: expect.any(String) }),
          expect.objectContaining({ month: "1", day: expect.any(String) }),
          expect.objectContaining({ month: "1", day: expect.any(String) }),
          expect.objectContaining({ month: "1", day: expect.any(String) }),
        ])
      );
    });
  });
});
