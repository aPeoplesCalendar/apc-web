import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as RouterModule from "react-router";
import { ROUTES } from "../../constants/routes";
import { render } from "../../utils/testing.utils";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
  const navigateMock = jest.fn();
  jest
    .spyOn(RouterModule, "useNavigate")
    .mockImplementation(() => navigateMock);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders medium screen logo", () => {
    render(<NavBar />);
    expect(screen.getByText("MED LOGO")).toBeInTheDocument();
  });
  it("renders small screen logo", () => {
    render(<NavBar />);
    expect(screen.getByText("XS LOGO")).toBeInTheDocument();
  });
  it("medium logo routes to homepage", async () => {
    render(<NavBar />);
    expect(screen.getByText("MED LOGO")).toHaveAttribute("href", ROUTES.HOME);
  });
  it("small logo routes to homepage", async () => {
    render(<NavBar />);
    expect(screen.getByText("XS LOGO")).toHaveAttribute("href", ROUTES.HOME);
  });
  const navTextAndRoutes = [
    {
      navText: "About",
      route: ROUTES.ABOUT,
    },
    {
      navText: "Calendar",
      route: ROUTES.CALENDAR_GENERIC,
    },
    {
      navText: "Contact",
      route: ROUTES.CONTACT,
    },
  ];
  it.each(navTextAndRoutes)(
    "clicking full nav bar links navigates as expected",
    ({ navText, route }) => {
      render(<NavBar />);
      userEvent.click(
        within(screen.getByTestId("full-nav-links")).getByText(navText)
      );
      expect(navigateMock).toHaveBeenCalledWith(route);
    }
  );
  it.each(navTextAndRoutes)(
    "clicking small nav bar links navigates as expected",
    ({ navText, route }) => {
      render(<NavBar />);
      userEvent.click(
        within(screen.getByTestId("small-nav-links")).getByText(navText)
      );
      expect(navigateMock).toHaveBeenCalledWith(route);
    }
  );
});
