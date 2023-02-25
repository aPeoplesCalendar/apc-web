import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as RouterModule from "react-router-dom";
import { render } from "../../../utils/testing.utils";
import { SearchUI } from "./SearchUI";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SearchUI", () => {
  const mockNavigate = jest.fn();
  const setLoading = jest.fn();
  const defaultProps = { setLoading };
  const initialEntries = [
    `?queryInclude=included1&queryInclude=included2&queryExclude=excluded&startDate=1999/01/01&endDate=2000/01/01&tag=Anarchism&tag=Abolitionism&sortBy=alphabetical-ascending`,
  ];
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(RouterModule, "useNavigate")
      .mockImplementation(() => mockNavigate);
  });
  const inputValues = [
    "included1, included2",
    "excluded",
    "alphabetical-ascending",
  ];
  it.each(inputValues)("should render loading state", (value) => {
    render(<SearchUI {...defaultProps} />, { initialEntries });
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
  it("search button calls use navigate with expected props", async () => {
    render(<SearchUI {...defaultProps} />, { initialEntries });
    userEvent.click(screen.getByText("Search"));
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: "/calendar/search",
        search: initialEntries[0],
      })
    );
  });
  it("enter key press with input focus calls search", async () => {
    render(<SearchUI {...defaultProps} />, { initialEntries });
    userEvent.type(screen.getByDisplayValue("excluded"), "{Enter}");
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: "/calendar/search",
        search: initialEntries[0],
      })
    );
  });
  it("updates route with updated param values on search", async () => {
    render(<SearchUI {...defaultProps} />);
    fireEvent.change(
      screen.getByRole("textbox", { name: "Included Keywords" }),
      {
        target: { value: "include" },
      }
    );
    fireEvent.change(
      screen.getByRole("textbox", { name: "Excluded Keywords" }),
      {
        target: { value: "exclude" },
      }
    );
    userEvent.click(screen.getByText("Search"));
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: "/calendar/search",
        search:
          "?queryInclude=include&queryExclude=exclude&sortBy=alphabetical-ascending",
      })
    );
  });
  it("updating sort by calls navigate with expected props", async () => {
    render(<SearchUI {...defaultProps} />);
    fireEvent.change(screen.getByTestId("sortBy-input"), {
      target: { value: "date-descending" },
    });
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: "/calendar/search",
        search: "?sortBy=date-descending",
      })
    );
  });
});
