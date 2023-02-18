import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../utils/testing.utils";
import { allTags } from "./constants";
import { ITagsSelectProps, TagsSelect } from "./TagsSelect";

describe("TagsSelect", () => {
  const mockSetSelectedTags = jest.fn();
  const selectedTags = [allTags[0], allTags[1]];
  const defaultProps: ITagsSelectProps = {
    setSelectedTags: mockSetSelectedTags,
    selectedTags,
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.each(selectedTags)("should render passed list of tags", (tag) => {
    render(<TagsSelect {...defaultProps} />);
    expect(screen.getByText(tag)).toBeInTheDocument();
  });
  // this test works when running individually, but fails when running all the tests. race condition?
  it.skip("should call setter function prop on tag click", async () => {
    render(<TagsSelect {...defaultProps} />);
    const tagOption = allTags[2];
    userEvent.click(screen.getByRole("combobox"));
    userEvent.type(
      screen.getByRole("combobox"),
      `${tagOption}{arrowdown}{Enter}`
    );
    await waitFor(() =>
      expect(mockSetSelectedTags).toHaveBeenCalledWith(allTags.slice(0, 3))
    );
  });
});
