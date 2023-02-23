import { screen, within } from "@testing-library/react";
import { ROUTES } from "../../constants/routes";
import { render } from "../../utils/testing.utils";
import { generateSpecificDayRoute } from "../Calendar/Calendar.utils";
import { NotFound } from "./NotFound";

describe("NotFound", () => {
  it("should provide a link to calendar page", () => {
    render(<NotFound />);
    expect(
      within(screen.getByTestId("calendar-link")).getByText("here")
    ).toHaveAttribute("href", generateSpecificDayRoute());
  });
  it("should provide a link to search page", () => {
    render(<NotFound />);
    expect(
      within(screen.getByTestId("search-link")).getByText("here")
    ).toHaveAttribute("href", ROUTES.CALENDAR_SEARCH);
  });
});
