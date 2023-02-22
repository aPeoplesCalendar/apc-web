import { screen } from "@testing-library/react";
import { render } from "../../../utils/testing.utils";
import { SpecificEvent } from "./SpecificEvent";
import * as SpecificEventUtils from "./SpecificEvent.utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ eventName: "eventName" })),
}));

jest.mock("./SpecificEvent.utils.ts");

describe("SpecificEvent", () => {
  const links = ["link1", "link2"];
  const tags = ["Colonialism", "Independence"];
  const mockFetchEvent = jest.fn(async () => {
    // wait 100 ms to simulate loading
    await new Promise((r) => setTimeout(r, 100));
    return {
      id: "d68c2d99-a703-4720-89ba-87828afde030",
      title: "Ho Chi Minh Letter to Truman (1946)",
      date: "1946/02/16",
      day: 16,
      description: "first paragraph\n\nsecond paragraph",
      month: 2,
      otd: "On this day in 1946...",
      imgSrc: "Events/hoChiMinhTyping.jpg",
      imgAltText: "imgAltText",
      links,
      tags,
    };
  });
  const mockFetchPublicImgUrl = jest.fn(async () => {
    // wait 100 ms to simulate loading
    await new Promise((r) => setTimeout(r, 100));
    return "publicImgUrl";
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(SpecificEventUtils, "fetchEvent")
      // @ts-ignore-next-line
      .mockImplementation(mockFetchEvent);
    jest
      .spyOn(SpecificEventUtils, "fetchPublicImgUrl")
      // @ts-ignore-next-line
      .mockImplementation(mockFetchPublicImgUrl);
  });
  it("should render loading state", () => {
    render(<SpecificEvent />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
  it("should provide a month day link", async () => {
    render(<SpecificEvent />);
    expect(await screen.findByText("Feb 16th")).toHaveAttribute(
      "href",
      "/calendar/day?month=2&day=16&view=day"
    );
  });
  it("should provide a year link", async () => {
    render(<SpecificEvent />);
    expect(await screen.findByText("1946")).toHaveAttribute(
      "href",
      "/calendar/search?startDate=1946-01-01&endDate=1946-12-31&sortBy=date-ascending"
    );
  });
  const paragraphs = ["first paragraph", "second paragraph"];
  it.each(paragraphs)(
    "should render description split out into paragraphs",
    async (paragraph) => {
      render(<SpecificEvent />);
      expect(await screen.findByText(paragraph)).toBeInTheDocument();
    }
  );
  it.each(tags)("should render each tag", async (tag) => {
    render(<SpecificEvent />);
    expect(await screen.findByText(tag)).toBeInTheDocument();
  });
  it.each(links)("should render each link", async (link) => {
    render(<SpecificEvent />);
    expect(await screen.findByText(link)).toBeInTheDocument();
  });
  it.each(links)("each link should have the correct href", async (link) => {
    render(<SpecificEvent />);
    expect(await screen.findByText(link)).toHaveAttribute("href", link);
  });
});
