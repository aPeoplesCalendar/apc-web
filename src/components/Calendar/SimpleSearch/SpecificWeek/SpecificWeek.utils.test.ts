import { calculateDayLabels, generateListOfDays } from "./SpecificWeek.utils";

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
});
