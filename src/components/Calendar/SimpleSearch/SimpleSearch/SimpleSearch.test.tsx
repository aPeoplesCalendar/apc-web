import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../utils/testing.utils";
import { formatDateQueryParam } from "../../Calendar.utils";
import { SimpleSearch } from "./SimpleSearch";

describe("SimpleSearch", () => {
  const initialEntries = [`?day=1&month=2&view=week`];
  it("should pass date query params down to date picker", () => {
    const defaultDateValue = formatDateQueryParam("2", "1");
    render(<SimpleSearch />, { initialEntries });
    expect(screen.getByDisplayValue(defaultDateValue)).toBeInTheDocument();
  });
  it("defaults to today if no date query params are specified", () => {
    const defaultDateValue = formatDateQueryParam(
      (new Date().getMonth() + 1).toString(),
      new Date().getDate().toString()
    );
    render(<SimpleSearch />);
    expect(screen.getByDisplayValue(defaultDateValue)).toBeInTheDocument();
  });
  it("should render view tab specified by url", async () => {
    render(<SimpleSearch />, { initialEntries });
    expect(screen.getByRole("tab", { name: "Week" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
  it("should render day view if view mode not specified by url", async () => {
    render(<SimpleSearch />);
    expect(screen.getByRole("tab", { name: "Day" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
  it("should switch view modes on tab click", async () => {
    render(<SimpleSearch />);
    userEvent.click(screen.getByRole("tab", { name: "Month" }));
    await waitFor(() =>
      expect(screen.getByRole("tab", { name: "Month" })).toHaveAttribute(
        "aria-selected",
        "true"
      )
    );
  });
});
