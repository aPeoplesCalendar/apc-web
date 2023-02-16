import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
import * as RouterModule from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { stringToSlug } from "../../../../utils/stringToSlug";
import { render } from "../../../../utils/testing.utils";
import { DayColumn } from "./DayColumn";
import * as SpecificWeekUtils from "./SpecificWeek.utils";

jest.mock("./SpecificWeek.utils.ts");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("DayColumn", () => {
  const currentDate = new Date();
  const mockNavigate = jest.fn();
  const defaultProps = { day: currentDate };
  const mockEventTitles = [
    {
      title: "Ho Chi Minh Letter to Truman (1946)",
    },
    {
      title: "Leaked Pike Committee Report Published (1976)",
    },
  ];
  const mockFetchEvents = jest.fn(async () => {
    // wait 100 ms to simulate loading
    await new Promise((r) => setTimeout(r, 100));
    return mockEventTitles;
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(RouterModule, "useNavigate")
      .mockImplementation(() => mockNavigate);
    jest
      .spyOn(SpecificWeekUtils, "fetchEvents")
      .mockImplementation(mockFetchEvents);
  });
  it("should render loading state", () => {
    render(<DayColumn {...defaultProps} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
  it.each(mockEventTitles)(
    "should render titles of each event",
    async ({ title }) => {
      render(<DayColumn {...defaultProps} />);
      expect(await screen.findByText(title)).toBeInTheDocument();
    }
  );
  const eventTitlesAndLinks = mockEventTitles.map(({ title }) => ({
    title,
    link: RouterModule.generatePath(ROUTES.SPECIFIC_EVENT, {
      eventName: stringToSlug(title),
    }),
  }));
  it.each(eventTitlesAndLinks)(
    "should render titles of each event",
    async ({ title, link }) => {
      render(<DayColumn {...defaultProps} />);
      userEvent.click(await screen.findByText(title));
      await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(link));
    }
  );
  it("should render formatted date", () => {
    const formattedDate = format(currentDate, "eee M/d");
    render(<DayColumn {...defaultProps} />);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
  it("should render formatted date with expected link", () => {
    const formattedDate = format(currentDate, "eee M/d");
    render(<DayColumn {...defaultProps} />);
    expect(screen.getByText(formattedDate)).toHaveAttribute(
      "href",
      `/calendar/day?month=${
        currentDate.getUTCMonth() + 1
      }&day=${currentDate.getUTCDate()}&view=day`
    );
  });
});
