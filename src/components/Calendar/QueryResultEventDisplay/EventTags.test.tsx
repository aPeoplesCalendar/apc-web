import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as RouterModule from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { render } from "../../../utils/testing.utils";
import { EventTags, IEventTagsProps } from "./EventTags";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("EventTags", () => {
  const tags = ["tag1", "tag2", "tag3"];
  const defaultProps: IEventTagsProps = { tags };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.each(tags)("should render a list of tags", (tag) => {
    render(<EventTags {...defaultProps} />);
    expect(screen.getByText(tag)).toBeInTheDocument();
  });
  it("should navigate to search page with tag query param on click", async () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(RouterModule, "useNavigate")
      .mockImplementation(() => mockNavigate);
    render(<EventTags {...defaultProps} />);
    userEvent.click(screen.getByText("tag1"));
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: ROUTES.CALENDAR_SEARCH,
        search: "?tag=tag1",
      })
    );
  });
});
