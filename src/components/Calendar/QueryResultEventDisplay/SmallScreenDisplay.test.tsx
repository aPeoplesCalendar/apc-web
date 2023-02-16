import { screen } from "@testing-library/react";
import { render } from "../../../utils/testing.utils";
import {
  SmallScreenDisplay,
  ISmallScreenDisplayProps,
} from "./SmallScreenDisplay";

describe("SmallScreenDisplay", () => {
  const defaultProps: ISmallScreenDisplayProps = {
    title: "title",
    month: "5",
    day: "1",
    date: "1900/5/1",
    otd: "on this day",
    imgAltText: "imgAltText",
    fetchedImgSrc: "fetchedImgSrc",
    tags: ["tag1", "tag2"],
  };
  it("should provide a title link", () => {
    render(<SmallScreenDisplay {...defaultProps} />);
    expect(screen.getByText("title")).toHaveAttribute(
      "href",
      "/calendar/events/title"
    );
  });
  it("should provide a date link", () => {
    render(<SmallScreenDisplay {...defaultProps} />);
    expect(screen.getByText("1900/5/1")).toHaveAttribute(
      "href",
      "/calendar/day?month=5&day=1&view=day"
    );
  });
  it("should render image with image alt text", () => {
    render(<SmallScreenDisplay {...defaultProps} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "imgAltText");
  });
  it("should not provide an image if img url doesn't exist", () => {
    render(<SmallScreenDisplay {...defaultProps} fetchedImgSrc="" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
