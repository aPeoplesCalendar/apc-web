import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../utils/testing.utils";
import { ShareIcons } from "./ShareIcons";

describe("ShareIcons", () => {
  const defaultProps = {
    title: "title",
    otd: "otd",
  };
  it("should provide a link to contact page", async () => {
    // provide writeText functionality to test environment
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
    render(<ShareIcons {...defaultProps} />);
    userEvent.click(screen.getByTestId("copy-button"));
    expect(await screen.findByText("Link copied!")).toBeInTheDocument();
  });
});
