import { render, screen } from "@testing-library/react";
import { About } from "./About";

describe("About", () => {
  it("renders dummy text", () => {
    render(<About />);
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
