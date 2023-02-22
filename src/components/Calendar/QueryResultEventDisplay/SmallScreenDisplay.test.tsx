import { screen } from "@testing-library/react";
import { render } from "../../../utils/testing.utils";
import {
  SmallScreenDisplay,
  ISmallScreenDisplayProps,
} from "./SmallScreenDisplay";

describe("SmallScreenDisplay", () => {
  const defaultProps: ISmallScreenDisplayProps = {
    title: "title",
    date: "1900/5/1",
    otd: "on this day",
    imgSrc: "storageRef.jpg",
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
  it("should provide a month day link", async () => {
    render(<SmallScreenDisplay {...defaultProps} />);
    expect(await screen.findByText("May 1st")).toHaveAttribute(
      "href",
      "/calendar/day?month=5&day=1&view=day"
    );
  });
  it("should provide a year link", async () => {
    render(<SmallScreenDisplay {...defaultProps} />);
    expect(await screen.findByText("1900")).toHaveAttribute(
      "href",
      "/calendar/search?startDate=1900-01-01&endDate=1900-12-31&sortBy=date-ascending"
    );
  });
  // skipping until we figure out how to deal with mocking image onLoad
  it.skip("should render image with image alt text", () => {
    render(<SmallScreenDisplay {...defaultProps} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "imgAltText");
  });
  it("should not provide an image if img url doesn't exist", () => {
    render(<SmallScreenDisplay {...defaultProps} fetchedImgSrc="" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
