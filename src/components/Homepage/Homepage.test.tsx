import { render, screen } from "@testing-library/react";
import { Homepage } from "./Homepage";

describe("Homepage", () => {
  it("renders dummy text", () => {
    render(<Homepage />);
    expect(screen.getByText("Homepage")).toBeInTheDocument();
  });
});
