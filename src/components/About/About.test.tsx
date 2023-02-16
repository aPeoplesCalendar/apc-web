import { screen } from "@testing-library/react";
import { render } from "../../utils/testing.utils";
import { About } from "./About";

describe("About", () => {
  it("should provide a link to contact page", () => {
    render(<About />);
    expect(screen.getByText("Contact us here")).toHaveAttribute(
      "href",
      "/contact"
    );
  });
  it("should provide link to apc github page", () => {
    render(<About />);
    expect(screen.getByText("Our project is open source")).toHaveAttribute(
      "href",
      "https://github.com/aPeoplesCalendar/apc-web"
    );
  });
});
