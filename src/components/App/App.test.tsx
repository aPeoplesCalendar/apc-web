import { render, screen } from "@testing-library/react";
import App from "./App";
import * as CalendarUtils from "../Calendar/Calendar.utils";

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should show error boundary text when error", async () => {
    // mock error coming from util function used on homepage
    jest
      .spyOn(CalendarUtils, "generateSpecificDayRoute")
      .mockImplementation(() => {
        throw new Error("augh");
      });
    render(<App />);
    expect(
      await screen.findByText("An error occurred.", { exact: false })
    ).toBeInTheDocument();
  });
});
