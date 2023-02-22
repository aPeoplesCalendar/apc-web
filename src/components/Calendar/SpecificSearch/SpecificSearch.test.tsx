import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../utils/testing.utils";
import { SpecificSearch } from "./SpecificSearch";
import * as SpecificSearchUtils from "./SpecificSearch.utils";

jest.mock("./SpecificSearch.utils", () => ({
  ...jest.requireActual("./SpecificSearch.utils"),
  fetchEvents: jest.fn(),
}));

jest.mock("../QueryResultEventDisplay/QueryResultEventDisplay", () => ({
  QueryResultEventDisplay: ({ title }: { title: string }) => (
    <span>{title}</span>
  ),
}));

describe("SpecificSearch", () => {
  const initialEntries = [`?sortBy=alphabetical-ascending`];
  const events = [
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
  const mockFetchEvents = jest.fn(async () => {
    // wait 100 ms to simulate loading
    await new Promise((r) => setTimeout(r, 100));
    return {
      events,
    };
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(SpecificSearchUtils, "fetchEvents")
      // @ts-ignore-next-line
      .mockImplementation(mockFetchEvents);
  });
  describe("when executing a search returns events", () => {
    it("should render loading state", () => {
      render(<SpecificSearch />, { initialEntries });
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
    it("should render event data", async () => {
      render(<SpecificSearch />, { initialEntries });
      await waitFor(() =>
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
      );
      expect(
        await screen.findByText("Ho Chi Minh Letter to Truman (1946)")
      ).toBeInTheDocument();
    });
    it("should NOT render load more button when not has next page", async () => {
      render(<SpecificSearch />, { initialEntries });
      await waitFor(() =>
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
      );
      expect(screen.queryByText("Load More")).not.toBeInTheDocument();
    });
  });
  describe("when executing a search returns results with next page", () => {
    const mockFetchEventsWithNextPage = jest.fn(async () => {
      // wait 100 ms to simulate loading
      await new Promise((r) => setTimeout(r, 100));
      return {
        events,
        hasNextPage: true,
      };
    });
    beforeEach(() => {
      jest.clearAllMocks();
      jest
        .spyOn(SpecificSearchUtils, "fetchEvents")
        // @ts-ignore-next-line
        .mockImplementation(mockFetchEventsWithNextPage);
    });
    it("should render event data with next page", async () => {
      render(<SpecificSearch />, { initialEntries });
      expect(
        await screen.findByText("Ho Chi Minh Letter to Truman (1946)")
      ).toBeInTheDocument();
    });
    it("should render load more button when has next page", async () => {
      render(<SpecificSearch />, { initialEntries });
      await waitFor(() =>
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
      );
      expect(screen.getByText("Load More")).toBeInTheDocument();
    });
    it("should fetch more events on load more click", async () => {
      render(<SpecificSearch />, { initialEntries });
      await waitFor(() =>
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
      );
      userEvent.click(screen.getByText("Load More"));
      await waitFor(() =>
        expect(mockFetchEventsWithNextPage).toHaveBeenCalledWith({
          // currentCursor comes from length of events data above
          currentCursor: 1,
          pageSize: 15,
          queryParams: expect.any(Object),
        })
      );
    });
    it("should enter loading state on load more click", async () => {
      render(<SpecificSearch />, { initialEntries });
      await waitFor(() =>
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
      );
      userEvent.click(screen.getByText("Load More"));
      expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    });
  });
  describe("search returns no results", () => {
    it("should render no event data found text", async () => {
      jest
        .spyOn(SpecificSearchUtils, "fetchEvents")
        // @ts-ignore-next-line
        .mockImplementation(async () => []);
      render(<SpecificSearch />, { initialEntries });
      expect(
        await screen.findByText("No events found for these search parameters.")
      ).toBeInTheDocument();
    });
    it("should NOT render no event data found text when no query params", async () => {
      jest
        .spyOn(SpecificSearchUtils, "fetchEvents")
        // @ts-ignore-next-line
        .mockImplementation(async () => []);
      // note we leave initial entries undefined here
      render(<SpecificSearch />);
      await waitFor(() =>
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
      );
      expect(
        screen.queryByText("No events found for these search parameters.")
      ).not.toBeInTheDocument();
    });
  });
});
