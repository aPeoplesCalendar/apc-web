import { screen } from "@testing-library/react";
import { render } from "../../../../utils/testing.utils";
import { SpecificDay } from "./SpecificDay";
import * as SpecificDayUtils from "./SpecificDay.utils";

jest.mock("./SpecificDay.utils.ts");

describe("SpecificDay", () => {
  const defaultProps = { month: "5", day: "1" };
  const mockFetchEvents = jest.fn(async () => {
    // wait 100 ms to simulate loading
    await new Promise((r) => setTimeout(r, 100));
    return [
      {
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
      },
    ];
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(SpecificDayUtils, "fetchEvents")
      // @ts-ignore-next-line
      .mockImplementation(mockFetchEvents);
  });
  it("should render loading state", () => {
    render(<SpecificDay {...defaultProps} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
  it("should render event data", async () => {
    render(<SpecificDay {...defaultProps} />);
    expect(
      await screen.findByText("Ho Chi Minh Letter to Truman (1946)")
    ).toBeInTheDocument();
  });
});
