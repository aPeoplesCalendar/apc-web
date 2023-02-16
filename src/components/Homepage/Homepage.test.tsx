import { screen } from "@testing-library/react";
import { render } from "../../utils/testing.utils";
import { Homepage } from "./Homepage";
import * as CalendarUtils from "../Calendar/Calendar.utils";
import * as HomepageUtils from "./Homepage.utils";

jest.mock("./Homepage.utils.ts");

describe("Homepage", () => {
  const mockFetchEventOTD = jest.fn(async () => {
    // wait 100 ms to simulate loading
    await new Promise((r) => setTimeout(r, 100));
    return {
      id: "d68c2d99-a703-4720-89ba-87828afde030",
      title: "Ho Chi Minh Letter to Truman (1946)",
      date: "1946-02-16",
      day: 16,
      description: "long description",
      month: 2,
      otd: "On this day in 1946...",
      imgSrc: "Events/hoChiMinhTyping.jpg",
      imgAltText: null,
      tags: ["Colonialism", "Independence"],
    };
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(HomepageUtils, "fetchEventOfTheDay")
      // @ts-ignore-next-line
      .mockImplementation(mockFetchEventOTD);
  });
  it("should hide event when loading", () => {
    render(<Homepage />);
    expect(
      screen.queryByText("Ho Chi Minh Letter to Truman (1946)")
    ).not.toBeInTheDocument();
  });
  it("should render event of the day title", async () => {
    jest
      .spyOn(CalendarUtils, "generateSpecificDayRoute")
      .mockImplementation(() => "/some-route");
    render(<Homepage />);
    expect(
      await screen.findByText("Ho Chi Minh Letter to Truman (1946)")
    ).toBeInTheDocument();
  });
});
