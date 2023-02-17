import { screen, waitFor } from "@testing-library/react";
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
  const initialEntriesNoParams = [`?sortBy=alphabetical-ascending`];
  const initialEntries = [
    `?queryInclude=included1&queryInclude=included2&queryExclude=excluded&startDate=1999/01/01&endDate=2000/01/01&tag=tag1&tag=tag2&sortBy=alphabetical-ascending`,
  ];
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(RouterModule, "useNavigate")
      .mockImplementation(() => mockNavigate);
  });
  const inputPlaceholderAndValues = [
    {
      value: "included1, included2",
      within: "Included Keywords",
    },
    {
      value: "excluded",
      within: "Excluded Keywords",
    },
    {
      value: "1999/01/01",
      within: "After This Date",
    },
    {
      value: "excluded",
      within: "2000/01/01",
    },
  ];
  it("should render loading state", () => {
    render(<SearchUI {...defaultProps} />, { initialEntries });
    screen.debug(undefined, 1000000);
  });
});
