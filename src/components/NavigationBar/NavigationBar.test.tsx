import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as RouterModule from "react-router";
import { ROUTES } from "../../constants/routes";
import { render } from "../../utils/testing.utils";
import { NavigationBar } from "./NavigationBar";

describe("NavigationBar", () => {
  const navigateMock = jest.fn();
  jest
    .spyOn(RouterModule, "useNavigate")
    .mockImplementation(() => navigateMock);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders a home button with href to home", () => {
    render(<NavigationBar />);
    expect(screen.getByText("Home")).toHaveAttribute("href", ROUTES.HOME);
  });
  it("renders aPC text with href to home", () => {
    render(<NavigationBar />);
    expect(screen.getByText("aPC")).toHaveAttribute("href", ROUTES.HOME);
  });
  const navTextAndRoutes = [
    {
      navText: "About",
      route: { pathname: ROUTES.ABOUT, search: "" },
    },
    {
      navText: "Calendar",
      route: {
        pathname: ROUTES.CALENDAR_DAY,
        search: `?day=${new Date().getDate()}&month=${
          new Date().getMonth() + 1
        }`,
      },
    },
    {
      navText: "Contact",
      route: { pathname: ROUTES.CONTACT, search: "" },
    },
  ];
  it.each(navTextAndRoutes)(
    "clicking full nav bar links navigates as expected",
    async ({ navText, route }) => {
      render(<NavigationBar />);
      userEvent.click(
        within(screen.getByTestId("full-nav-links")).getByText(navText)
      );
      await waitFor(() => expect(navigateMock).toHaveBeenCalledWith(route));
    }
  );
  it.each(navTextAndRoutes)(
    "clicking small nav bar links navigates as expected",
    async ({ navText, route }) => {
      render(<NavigationBar />);
      userEvent.click(
        within(screen.getByTestId("small-nav-links")).getByText(navText)
      );
      await waitFor(() => expect(navigateMock).toHaveBeenCalledWith(route));
    }
  );
});
