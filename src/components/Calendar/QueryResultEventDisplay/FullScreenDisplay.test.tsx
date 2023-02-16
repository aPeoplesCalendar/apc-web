import { screen } from "@testing-library/react";
import { render } from "../../../utils/testing.utils";
import {
  FullScreenDisplay,
  IFullScreenDisplayProps,
} from "./FullScreenDisplay";

describe("FullScreenDisplay", () => {
  const defaultProps: IFullScreenDisplayProps = {
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
    render(<FullScreenDisplay {...defaultProps} />);
    expect(screen.getByText("title")).toHaveAttribute(
      "href",
      "/calendar/events/title"
    );
  });
  it("should provide a date link", () => {
    render(<FullScreenDisplay {...defaultProps} />);
    expect(screen.getByText("1900/5/1")).toHaveAttribute(
      "href",
      "/calendar/day?month=5&day=1&view=day"
    );
  });
  it("should provide an image caption", () => {
    render(<FullScreenDisplay {...defaultProps} />);
    expect(screen.getByText("Image: imgAltText")).toBeInTheDocument();
  });
  it("should render image with image alt text", () => {
    render(<FullScreenDisplay {...defaultProps} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "imgAltText");
  });
  it("should not provide an image caption if none exists", () => {
    render(<FullScreenDisplay {...defaultProps} imgAltText="" />);
    expect(screen.queryByText("Image: ")).not.toBeInTheDocument();
  });
  it("should not provide an image if img url doesn't exist", () => {
    render(<FullScreenDisplay {...defaultProps} fetchedImgSrc="" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
