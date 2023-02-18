import { ROUTES } from "../../constants/routes";
import {
  formatDateQueryParam,
  formatRawDatePickerValue,
  generateSpecificDayRoute,
  getMonthAndDayFromDate,
} from "./Calendar.utils";

describe("calendar util functions", () => {
  describe("formatDateQueryParam", () => {
    const currentYear = new Date().getFullYear();
    it("converts month and day into yyyy-mm-dd format for non leap years, adds zero pads", () => {
      const testMonth = "5";
      const testDay = "1";
      const result = formatDateQueryParam(testMonth, testDay);
      expect(result).toEqual(`${currentYear}-05-01`);
    });
    it("converts month and day into yyyy-mm-dd format for non leap years, does not add zero pads", () => {
      const testMonth = "10";
      const testDay = "15";
      const result = formatDateQueryParam(testMonth, testDay);
      expect(result).toEqual(`${currentYear}-10-15`);
    });
    it("handles leap year case", () => {
      const testMonth = "2";
      const testDay = "29";
      const result = formatDateQueryParam(testMonth, testDay);
      expect(result).toEqual(`2024-02-29`);
    });
  });
  describe("formatRawDatePickerValue", () => {
    it("converts yyyy-mm-dd format into object of month and day, removes zero pads", () => {
      const testDate = "2024-01-01";
      const result = formatRawDatePickerValue(testDate);
      expect(result).toEqual({ month: "1", day: "1" });
    });
    it("converts yyyy-mm-dd format into object of month and day", () => {
      const testDate = "2024-10-15";
      const result = formatRawDatePickerValue(testDate);
      expect(result).toEqual({ month: "10", day: "15" });
    });
    it("returns empty strings when date picker value is empty string", () => {
      // this should never happen, but it's redundant safety and makes typescript happy
      const result = formatRawDatePickerValue("");
      expect(result).toEqual({ month: "", day: "" });
    });
  });
  describe("generateSpecificDayRoute", () => {
    it("takes in month, day, and view mode and returns expected route", () => {
      const result = generateSpecificDayRoute("1", "10", "week");
      expect(result).toEqual(`${ROUTES.CALENDAR_DAY}?month=1&day=10&view=week`);
    });
    it("defaults to expected values", () => {
      const currentMonth = `${new Date().getUTCMonth() + 1}`;
      const currentDay = `${new Date().getUTCDate()}`;
      const result = generateSpecificDayRoute();
      expect(result).toEqual(
        `${ROUTES.CALENDAR_DAY}?month=${currentMonth}&day=${currentDay}&view=day`
      );
    });
  });
  describe("getMonthAndDayFromDate", () => {
    it("returns month and day of date object in object", () => {
      const currentMonth = `${new Date().getUTCMonth() + 1}`;
      const currentDay = `${new Date().getUTCDate()}`;
      const result = getMonthAndDayFromDate(new Date());
      expect(result).toEqual({
        month: currentMonth,
        day: currentDay,
      });
    });
  });
});
