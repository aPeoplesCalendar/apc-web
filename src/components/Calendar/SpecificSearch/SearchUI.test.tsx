import { screen, within } from "@testing-library/react";
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
  const inputLabelAndValues = [
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
      value: "2000/01/01",
      within: "Before This Date",
    },
  ];
  it.each(inputLabelAndValues)(
    "should render loading state",
    ({ within, value }) => {
      render(<SearchUI {...defaultProps} />, { initialEntries });
      expect(
        // @ts-ignore-next-line
        within(screen.getByText(within)).getByRole("combobox")
      ).toHaveValue(value);
    }
  );
});
