import { screen } from "@testing-library/react";
import { render } from "../../utils/testing.utils";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("renders text input", () => {
    render(<Calendar />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
